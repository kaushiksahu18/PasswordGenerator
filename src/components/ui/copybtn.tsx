import { CopyPlus } from "lucide-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import gsap from "gsap";

import { inputValue } from "@/components/ui/input";

function CopyBTN() {
  const generatedPassworg = useRecoilValue(inputValue);
  useEffect(() => {
    const copy_button = document.getElementById("copy-button");
    const mouse_follower = document.getElementById("mouse-follower");
    copy_button?.addEventListener("mouseenter", () => {
      if (mouse_follower) {
        mouse_follower.innerHTML = "copy";
        gsap.to(mouse_follower, {
          width: "50px",
          height: "50px",
          duration: 0.2,
        });
      }
    });
    copy_button?.addEventListener("mouseleave", () => {
      if (mouse_follower) {
        mouse_follower.innerHTML = "";
        gsap.to(mouse_follower, {
          width: "10px",
          height: "10px",
        });
      }
    });
    copy_button?.addEventListener("click", async () => {
      const text = generatedPassworg;
      await navigator.clipboard.writeText(text);
    });
  }, []);
  return (
    <CopyPlus
      id="copy-button"
      className="w-[5%] absolute right-2 top-1/2 -translate-y-1/2 hover:text-primary"
    />
  );
}

export default CopyBTN;
