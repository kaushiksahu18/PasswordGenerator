import { Progress } from "@/components/ui/progress";
import mergeRefs from "merge-refs";
import React from "react";
import gsap from "gsap";
import { atom, useRecoilValue } from "recoil";

import { currentPassLength } from "@/components/ui/slider+";

// i use any because i dont know type of element of radix-ui :)
function ProgressPlus({
  ref,
  value = 0,
  className,
}: {
  ref?: any;
  value: number;
  className?: string;
}) {
  const progressRef = React.useRef<any>(null);
  const { passStrength, passStrengthColor } = useRecoilValue(passStrenghState);
  const passLength = useRecoilValue(currentPassLength);

  React.useEffect(() => {
    const mouse_follower = document.getElementById("mouse-follower");
    if (progressRef && progressRef.current) {
      progressRef?.current.addEventListener("mouseenter", () => {
        if (mouse_follower) {
          mouse_follower.innerHTML = "strength";
          mouse_follower.classList.add(passStrengthColor);
          gsap.to(mouse_follower, {
            width: "80px",
            height: "80px",
            duration: 0.2,
          });
        }
      });
      progressRef?.current.addEventListener("mouseleave", () => {
        if (mouse_follower) {
          mouse_follower.innerHTML = "";
          mouse_follower.classList.remove(passStrengthColor);
          mouse_follower.classList.add("bg-primary");
          gsap.to(mouse_follower, {
            width: "10px",
            height: "10px",
          });
        }
      });
    }
  }, [progressRef]);

  return (
    <Progress
      ref={mergeRefs(ref, progressRef)}
      value={value}
      indicatorColor={`${
        Number(passLength) >= 8 ? passStrengthColor : "bg-primary"
      }`}
      indicatorText={`${Number(passLength) >= 8 ? passStrength : "week"}`}
      className={`w-full text-[white] ${className}`}
    />
  );
}

export const passStrenghState = atom({
  key: "passStrenghState", // unique ID (with respect to other atoms/selectors)
  default: {
    passStrength: "weak",
    passStrengthColor: "bg-primary",
  }, // default value (aka initial value)
});

export default ProgressPlus;
