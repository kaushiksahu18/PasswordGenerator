import { useEffect, useRef } from "react";
import gsap from "gsap";

import { Input } from "@/components/ui/input";
import Option from "@/components/ui/option";
import SliderPlus, { currentPassLength } from "@/components/ui/slider+";
import ProgressPlus, { passStrenghState } from "@/components/ui/progress+";
import CopyBTN from "@/components/ui/copybtn";
import { atom, useRecoilValue } from "recoil";
import GeneratePassBTN from "./generatePassBTN";

// hover:shadow-[0_0_90px_1px_#6D28D9]

function App() {
  const canIncludeObj = useRecoilValue(canInclude);
  const passLength = useRecoilValue(currentPassLength);
  const passStrength = useRecoilValue(passStrenghState);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef && mainRef?.current) {
      mainRef?.current?.addEventListener("mouseenter", () => {
        gsap.to(mainRef?.current, {
          boxShadow: "0 0 70px 1px #6D28D9",
          duration: 1,
          ease: `rough({
            template:none.in,
            strength: 0.2,
            points:20,
            taper:none,
            randomize:true,
            clamp:true
            })`,
        });
      });
      mainRef?.current?.addEventListener("mouseleave", () => {
        gsap.to(mainRef?.current, {
          boxShadow: "0 0 5px 1px #6D28D9",
          duration: 0.6,
        });
      });
    }
  }, [mainRef]);

  return (
    <div
      id="app"
      className="w-[100dvw] h-[100dvh] overflow-x-hidden overflow-y-auto flex justify-center items-center"
    >
      <div
        id="main"
        className="lg:max-w-[28%] sm:w-[90%] sm:h-[90%] md:w-1/2 w-[80%] border-2 border-primary rounded-lg lg:w-1/3 flex flex-col gap-8 p-8 shadow-[0_0_5px_1px_#6D28D9]"
        ref={mainRef}
      >
        <h1 className="bg-muted text-secondary-foreground text-center py-2">
          Password Generator
        </h1>
        <div id="container" className="flex flex-col justify-center gap-4">
          <div className="relative">
            <Input />
            <CopyBTN />
          </div>
          <div className="mt-6 mb-3 flex items-center gap-2 w-full">
            <SliderPlus />
            <div className="group text-center px-2 text-sm py-1 bg-primary rounded-lg text-primary-foreground w-1/3">
              <p id="length">{passLength}</p>
            </div>
          </div>
          <div id="options" className="flex flex-col gap-3">
            {canIncludeObj.map((item) => {
              return (
                <Option key={item.id} className="capitalize" id={item.id}>
                  {item.title}
                </Option>
              );
            })}
          </div>
          <div className="flex items-center gap-2 w-full">
            <ProgressPlus value={4 * 25} />
          </div>
          <GeneratePassBTN />
        </div>
      </div>
    </div>
  );
}


export const canInclude = atom({
  key: "canInclude",
  default: [
    { title: "uppercase letters", id: "1001" },
    { title: "lowercase letters", id: "1002" },
    { title: "numbers", id: "1003" },
    { title: "symbols", id: "1004" },
    { title: "include all", id: "1005" },
  ],
});

export default App;
