const container = document.querySelector(".container");
const timeContainer = document.querySelector(".timeContainer");
const dateContainer = document.querySelector(".dateContainer");
const startBtn = document.querySelector(".startBtn");
const stopBtn = document.querySelector(".stopBtn");

let timeControl;
let status = false;

startBtn.addEventListener("click", () => {
  if (!status) {
    status = true;
    timeControl = startTime();
    container.classList.toggle("red");
    container.classList.toggle("green");
    stopBtn.removeAttribute("disabled");
    startBtn.setAttribute("disabled", "true");
  }
});

stopBtn.addEventListener("click", () => {
  if (status) {
    status = false;
    stopTime();
    container.classList.toggle("red");
    container.classList.toggle("green");
    stopBtn.setAttribute("disabled", "true");
    startBtn.removeAttribute("disabled");
  }
});

function startTime() {
  return setInterval(() => {
    let date = new Date();

    timeContainer.innerHTML = `
        ${format2(date.getHours().toString())} : 
        ${format2(date.getMinutes().toString())} : 
        ${format2(date.getSeconds().toString())} : 
        ${date.getMilliseconds().toString()[0]}
    `;

    dateContainer.innerHTML = `
        ${format2(date.getDate().toString())} / 
        ${format2((date.getMonth() + 1).toString())} / 
        ${date.getFullYear()}
    `;
  }, 100);
}

function format2(s) {
  return s.length < 2 ? "0" + s : s;
}

function stopTime() {
  clearInterval(timeControl);
}
