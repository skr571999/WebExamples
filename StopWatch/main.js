const container = document.querySelector(".stopWatchContainer");
const timeContainer = document.querySelector("#timeContainer");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

let timeInterval;
let milliSeconds = 0;

const format2 = (s) => {
  return s.length < 2 ? "0" + s : s;
};

const render = () => {
  const minutes = format2(
    (Math.floor(milliSeconds / (1000 * 60)) % 60).toString()
  );
  const seconds = format2((Math.floor(milliSeconds / 1000) % 60).toString());
  const ms = format2(((milliSeconds / 100) % 10).toString());

  const timeString = ` ${minutes} : ${seconds} : ${ms}`;
  timeContainer.innerHTML = timeString;
};

const startStopWatch = () => {
  return setInterval(() => {
    milliSeconds += 100;
    render();
  }, 100);
};

const stopWatch = () => {
  clearInterval(timeInterval);
  stopBtn.setAttribute("disabled", true);
  startBtn.removeAttribute("disabled");
};

const handleStopBtnClick = () => {
  stopWatch();
};

const handleStartBtnClick = () => {
  timeInterval = startStopWatch();
  stopBtn.removeAttribute("disabled");
  resetBtn.removeAttribute("disabled");
  startBtn.setAttribute("disabled", true);
};

const handleResetBtnClick = () => {
  stopWatch();
  milliSeconds = 0;
  render();
  resetBtn.setAttribute("disabled", true);
};

startBtn.addEventListener("click", handleStartBtnClick);
stopBtn.addEventListener("click", handleStopBtnClick);
resetBtn.addEventListener("click", handleResetBtnClick);
