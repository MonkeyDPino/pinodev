import { svgs } from "./../types/svgs.type";
import linkedin from "../assets/linkedin.svg";
import github from "../assets/github.svg";
import download from "../assets/download.svg";

export const svgsConstants: {
  [key in svgs]: string;
} = {
  linkedin: linkedin,
  github: github,
  download: download,
};
