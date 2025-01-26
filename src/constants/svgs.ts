import { svgs } from "./../types/svgs.type";
import linkedin from "../assets/linkedin.svg";
import github from "../assets/github.svg";
import download from "../assets/download.svg";
import aws from "../assets/aws.svg";
import css from "../assets/css.svg";
import git from "../assets/git.svg";
import html from "../assets/html.svg";
import javascript from "../assets/javascript.svg";
import mongodb from "../assets/mongodb.svg";
import nodejs from "../assets/nodejs.svg";
import npm from "../assets/npm.svg";
import postgresql from "../assets/postgresql.svg";
import postman from "../assets/postman.svg";
import python from "../assets/python.svg";
import react from "../assets/react.svg";
import sass from "../assets/sass.svg";
import terminal from "../assets/terminal.svg";
import typescript from "../assets/typescript.svg";
import vscode from "../assets/vscode.svg";
import express from "../assets/express.svg";
import docker from "../assets/docker.svg";
import tailwind from "../assets/tailwind.svg";

export const svgsConstants: {
  [key in svgs]: string;
} = {
  linkedin: linkedin,
  github: github,
  download: download,
  aws: aws,
  css: css,
  git: git,
  html: html,
  javascript: javascript,
  mongodb: mongodb,
  nodejs: nodejs,
  npm: npm,
  postgresql: postgresql,
  postman: postman,
  python: python,
  react: react,
  sass: sass,
  terminal: terminal,
  typescript: typescript,
  vscode: vscode,
  express: express,
  docker: docker,
  tailwind: tailwind,
};
