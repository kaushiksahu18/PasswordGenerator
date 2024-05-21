// import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";

function MouseFollower() {
  useEffect(() => {
    const curcer = document.getElementById("mouse-follower");
    window.addEventListener("mousemove", (event) => {
      // Check if curcerRef and curcerRef.current exist
      if (curcer) {
        const computedStyle = window.getComputedStyle(curcer);
        const curcer_width = computedStyle.getPropertyValue("width");
        const curcer_height = computedStyle.getPropertyValue("height");
        var mouseX = event.x;
        var mouseY = event.y;

        gsap.to(curcer, {
          x: mouseX - parseInt(curcer_width) / 2,
          y: mouseY - parseInt(curcer_height) / 2,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    });
  }, []);

  return (
    <div
      id="mouse-follower"
      className="hidden w-[10px] h-[10px] translate-x-[-50vw] rounded-full bg-primary text-primary-foreground fixed z-[999] pointer-events-none text-center lg:flex justify-center items-center text-sm p-2"
    ></div>
  );
}

export default MouseFollower;
