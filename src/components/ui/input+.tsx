import { CopyPlus } from "lucide-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import gsap from "gsap";

import { Input } from "@/components/ui/input";
import { inputValue } from "@/generatePassBTN";

function InputPlus() {
  const currentPass = useRecoilValue(inputValue);

  const copy_button = document.getElementById("copy-button");
  useEffect(() => {
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
      const text = currentPass;
      await navigator.clipboard.writeText(text);
    });
  }, [currentPass]);

  return (
    <div className="relative">
      <Input defaultValue={currentPass} />
      <CopyPlus
        id="copy-button"
        className="w-[5%] absolute right-2 top-1/2 -translate-y-1/2 hover:text-primary"
      />
    </div>
  );
}

export default InputPlus;
