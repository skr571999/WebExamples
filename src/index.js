// import _ from "lodash";
import printMe from "./print.js";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  //   element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.innerHTML = `Hello In World of WebPack and 
    <br/>
    - webpack --watch option
    <br/>
    - webpack dev server
    <br/>
    - webpack-dev-middleware(with express)
    <br/>
    `;
  btn.innerHTML = "Click me and check the console!";

  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
