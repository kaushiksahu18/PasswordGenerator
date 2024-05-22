import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { canInclude } from "@/App";
import { currentPassLength } from "@/components/ui/slider+";
import { passStrenghState } from "@/components/ui/progress+";
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

  let temp = 0;
  const tempOptionArr = [...optionsArr];
  for (let i = 0; i < optionsArr.length; i++) {
    let num = getRandomeIndex(tempOptionArr);
    const index = tempOptionArr.indexOf(num);
    if (index > -1) {
      tempOptionArr.splice(index, 1);
    }
    finalPassword += getCharFuncs[Number(num)]();
    temp++;
  }

  for (let i = temp; i < Number(props.passLength); i++) {
    try {
      let temp = getCharFuncs[getRandomeIndex(optionsArr)]();
      finalPassword += temp;
    } catch (error) {
      finalPassword += "atleast select one";
      break;
    }
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

function getRandomeIndex(arr: (number | false)[]): number {
  let num = -1;
  let length = arr.length;

  while (length) {
    num = Math.floor(Math.random() * length);
    if (arr[num] !== undefined) {
      return Number(arr[num]);
    }
    return -1;
  }
  return num;
}

export const inputValue = atom({
  key: "inputValue",
  default: "",
});

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
const getCharFuncs = [
  getAUpperCaseAlphabaticChar,
  getLowerCaseAlphabaticChar,
  getANumberChar,
  getASpecialChar,
];
export default GeneratePassBTN;
