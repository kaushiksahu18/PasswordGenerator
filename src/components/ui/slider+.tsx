import React from "react";
import { Slider } from "@/components/ui/slider";
import gsap from "gsap";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

function SliderPlus() {
  const setPassLength = useSetRecoilState(currentPassLength);

  React.useEffect(() => {
    const slThumb = document.getElementById("SliderPrimitiveThumb");
    const mouse_follower = document.getElementById("mouse-follower");
    slThumb?.classList.add("relative");
    slThumb?.addEventListener("mouseenter", () => {
      gsap.to(mouse_follower, {
        opacity: 0,
      });
    });
    slThumb?.addEventListener("mouseleave", () => {
      gsap.to(mouse_follower, {
        opacity: 1,
      });
    });
  }, []);

  return (
    <Slider
      defaultValue={[10]}
      max={20}
      min={4}
      step={1}
      onValueChange={(value) => setPassLength(String(value[0]))}
      className="hover:cursor-grab active:cursor-grabbing"
    >
      <Showlength />
    </Slider>
  );
}

function Showlength() {
  const passLength = useRecoilValue(currentPassLength);
  return (
    <div className="w-[150%] h-[150%] bg-primary text-xs rounded-full flex justify-center items-center text-center absolute -translate-y-[140%] -translate-x-[10%]">
      {passLength}
    </div>
  );
}

export const currentPassLength = atom<string | null>({
  key: "currentPassLength", // unique ID (with respect to other atoms/selectors)
  default: "10", // default value (aka initial value)
});

export default SliderPlus;
