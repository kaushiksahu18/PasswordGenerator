import { useRecoilValue, useSetRecoilState } from "recoil";

import { canInclude } from "@/App";
import { currentPassLength } from "@/components/ui/slider+";
import { passStrenghState } from "@/components/ui/progress+";
import { inputValue } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type passGeneratorPeramsTypesa = {
  canIncludeArr: { title: string; id: string }[];
  passLength: string | null;
  setPassStrengh: Function;
  setPassValue: Function;
};

function GeneratePassBTN() {
  const canIncludeArr = useRecoilValue(canInclude);
  const passLength = useRecoilValue(currentPassLength);
  const setPassStrengh = useSetRecoilState(passStrenghState);
  const setPassValue = useSetRecoilState(inputValue);

  const passGeneratorPerams = {
    canIncludeArr,
    passLength,
    setPassStrengh,
    setPassValue,
  };

  return (
    <Button
      onClick={() => generatePassword(passGeneratorPerams)}
      className="w-full"
    >
      Generate
    </Button>
  );
}

const generatePassword = (props: passGeneratorPeramsTypesa) => {
  let finalPassword = "";
  const optionsHTMLElementsIds: string[] = props.canIncludeArr.map(
    (item: { title: string; id: string }) => {
      return item.id;
    }
  );
  let optionsArr = optionsHTMLElementsIds.map((item) => {
    return (
      document.getElementById(item)?.getAttribute("data-state") === "checked" &&
      Number(item) - 1001
    );
  });
  if (
    document
      .getElementById(optionsHTMLElementsIds[4])
      ?.getAttribute("data-state") === "checked"
  ) {
    optionsArr = [0, 1, 2, 3];
  } else {
    optionsArr = optionsArr.filter((item) => item !== false);
  }

  for (let i = 0; i < Number(props.passLength); i++) {
    const getCharFuncs = [
      getAUpperCaseAlphabaticChar,
      getLowerCaseAlphabaticChar,
      getANumberChar,
      getASpecialChar,
    ];
    let num = Math.floor(Math.random() * getCharFuncs.length);
    let temp = getCharFuncs[num]();
    finalPassword += temp;
  }
  props.setPassValue(finalPassword);
  switch (optionsArr.length) {
    case 2:
      props.setPassStrengh({
        passStrength: "good",
        passStrengthColor: "bg-blue-500",
      });
      break;
    case 3:
      props.setPassStrengh({
        passStrength: "strong",
        passStrengthColor: "bg-green-500",
      });
      break;
    case 4:
      props.setPassStrengh({
        passStrength: "papa level",
        passStrengthColor: "bg-red-500",
      });
      break;
    default:
      props.setPassStrengh({
        passStrength: "weak",
        passStrengthColor: "bg-primary",
      });
      break;
  }
};

function getASpecialChar() {
  const SpecialCharArr = `!@#$^&*_?`.split("");
  const randomIndex = Math.floor(Math.random() * SpecialCharArr.length);
  return SpecialCharArr[randomIndex];
}
function getAUpperCaseAlphabaticChar() {
  let AlphabaticCharArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const randomIndex = Math.floor(Math.random() * AlphabaticCharArr.length);
  return AlphabaticCharArr[randomIndex];
}
function getLowerCaseAlphabaticChar() {
  let AlphabaticCharArr = "abcdefghijklmnopqrstuvwxyz".split("");
  const randomIndex = Math.floor(Math.random() * AlphabaticCharArr.length);
  return AlphabaticCharArr[randomIndex];
}
function getANumberChar() {
  const NumberArr = "0123456789".split("");
  const randomIndex = Math.floor(Math.random() * NumberArr.length);
  return NumberArr[randomIndex];
}

export default GeneratePassBTN;
