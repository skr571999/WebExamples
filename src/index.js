// import _ from "lodash";
import "./style.css";
import Icon from "./icon.png";
import Data from "./data.xml";
import Notes from "./data.csv";
import Techs from "./data.json";
import toml from "./data.toml";
import yaml from "./data.yaml";
import json from "./data.json5";

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`

console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  //   element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.innerHTML = "Hello In World of WebPack";
  element.classList.add("hello");

  const myIcon = new Image();
  myIcon.src = Icon;

  console.log("Data : ", Data);
  console.log("Notes : ", Notes);
  console.log("Techs : ", Techs);

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
