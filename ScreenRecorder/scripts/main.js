const startElem = document.getElementById("start");
const stopELem = document.getElementById("stop");
const saveElem = document.getElementById("save");
const clearElem = document.getElementById("clear");
const videoElem = document.querySelector("video");
const durationElem = document.querySelector("#duration");

let recorder, screenStream, audioStream, durationInterval;

const stopRecording = () => {
  stopELem.setAttribute("disabled", true);
  startElem.removeAttribute("disabled");

  clearInterval(durationInterval);

  if (recorder.state !== "inactive") recorder.stop();
  if (screenStream.getVideoTracks()[0].state !== "inactive") {
    screenStream.getVideoTracks()[0].stop();
    audioStream.getAudioTracks()[0].stop();
  }
};

const startRecording = async () => {
  startElem.setAttribute("disabled", true);
  stopELem.removeAttribute("disabled");

  screenStream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
    // audio: true
  });

  audioStream = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });
  const AV_Stream = new MediaStream([
    ...screenStream.getTracks(),
    ...audioStream.getAudioTracks(),
  ]);
  recorder = new MediaRecorder(AV_Stream);

  const chunks = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => {
    stopRecording();

    const completeBlob = new Blob(chunks, { type: "video/mp4" });
    videoElem.src = URL.createObjectURL(completeBlob);

    saveElem.removeAttribute("disabled");
  };

  recorder.start();

  const _startTime = new Date().getTime();

  durationInterval = setInterval(() => {
    const _currentTime = new Date().getTime();
    durationElem.innerHTML = `${(_currentTime - _startTime) / 1000} seconds`;
  }, 100);
};

const saveRecording = () => {
  const _aElem = document.createElement("a");
  _aElem.href = videoElem.src;

  const dateStr = new Date().toDateString();
  const fileName = `${
    prompt("Enter name of File for Saving") || "Screen Recording"
  } - ${dateStr}`;

  _aElem.download = fileName;
  _aElem.click();
};

const clearRecording = () => {
  const _clear = confirm(
    "You will loss your recording. Do you want to continue ?"
  );
  if (_clear) location.reload();
};

startElem.addEventListener("click", startRecording);
stopELem.addEventListener("click", stopRecording);
saveElem.addEventListener("click", saveRecording);
clearElem.addEventListener("click", clearRecording);
