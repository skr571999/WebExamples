const startElem = document.getElementById("start");
const stopELem = document.getElementById("stop");
const saveElem = document.getElementById("save");
const clearElem = document.getElementById("clear");
const videoElem = document.querySelector("video");
const durationElem = document.querySelector("#duration");
const recordAudioCheckBoxElem = document.querySelector("#recordAudioCheckBox");

let recorder, durationInterval;

const stopRecording = () => {
  stopELem.setAttribute("disabled", true);
  startElem.removeAttribute("disabled");

  clearInterval(durationInterval);

  if (recorder.state !== "inactive") recorder.stop();
  recorder.stream.getTracks().forEach((_track) => _track.stop());
};

const startScreenCapture = async () => {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
    });
  } catch (err) {
    console.error("Error: " + err);
  }
  return captureStream;
};

const startAudioRecording = async () => {
  let audioStream = null;

  try {
    audioStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
  } catch (err) {
    console.error("Error: " + err);
  }

  return audioStream;
};

const startRecording = async () => {
  const recordAudio = recordAudioCheckBoxElem.checked;
  const recordScreen = true;

  const stream = new MediaStream();

  if (recordAudio) {
    const _audioStream = await startAudioRecording();

    if (_audioStream) {
      const _audioTracks = _audioStream.getAudioTracks();
      if (_audioTracks.length > 0) stream.addTrack(_audioTracks[0]);
    }
  }

  if (recordScreen) {
    const _screenStream = await startScreenCapture();

    if (_screenStream) {
      const _screenTracks = _screenStream.getTracks();
      if (_screenTracks.length > 0) stream.addTrack(_screenTracks[0]);
    }
  }

  recorder = new MediaRecorder(stream);

  const chunks = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => {
    stopRecording();

    const completeBlob = new Blob(chunks, { type: "video/mp4" });
    videoElem.src = URL.createObjectURL(completeBlob);

    saveElem.removeAttribute("disabled");
  };

  recorder.onstart = () => {
    startElem.setAttribute("disabled", true);
    stopELem.removeAttribute("disabled");
    saveElem.setAttribute("disabled", true);
    videoElem.src = "";

    const _startTime = new Date().getTime();
    durationInterval = setInterval(() => {
      const _currentTime = new Date().getTime();
      durationElem.innerHTML = `${(_currentTime - _startTime) / 1000}`;
    }, 100);
  };

  if (recorder.stream.getTracks().length > 0) recorder.start();
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
