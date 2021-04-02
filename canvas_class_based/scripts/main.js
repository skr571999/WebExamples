const canvasElem = document.querySelector("canvas");
const startElem = document.querySelector("#start");
const clearElem = document.querySelector("#clear");
const stopElem = document.querySelector("#stop");

const sc = new Scribble(canvasElem);

startElem.addEventListener("click", function () {
  sc.startScribble();
  console.log("AA", arguments);
});
clearElem.addEventListener("click", () => sc.clearScribble());
stopElem.addEventListener("click", () => sc.stopScribble());
