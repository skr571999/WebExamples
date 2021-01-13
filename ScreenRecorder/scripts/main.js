const startElem = document.querySelector("#start");
const stopELem = document.querySelector("#stop");
const saveElem = document.querySelector("#save");
const clearElem = document.querySelector("#clear");

const durationElem = document.querySelector("#duration");
const outputContainerElem = document.querySelector("#outputContainer");
const recordAudioCheckBoxElem = document.querySelector("#recordAudioCheckBox");
const captureScreenCheckBoxElem = document.querySelector(
  "#captureScreenCheckBox"
);

let recorder, durationInterval;

const stopRecording = () => {
  if (recorder.state !== "inactive") recorder.stop();
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
  const recordScreen = captureScreenCheckBoxElem.checked;
  if (!recordAudio && !recordScreen) {
    alert("Nothing to Record, Select any of the checkbox");
    return;
  }

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

  recorder.onstop = () => handleRecordingOnStop(chunks);
  recorder.onstart = handleRecordingOnStart;

  if (recorder.stream.getTracks().length > 0) recorder.start();
};

const handleRecordingOnStop = (chunks) => {
  if (!chunks && chunks.length === undefined && chunks.length === 0) return;
  stopRecording();

  clearInterval(durationInterval);
  recorder.stream.getTracks().forEach((_track) => _track.stop());

  const finalType = chunks[0].type.startsWith("video")
    ? "video/mp4"
    : chunks[0].type.startsWith("audio")
    ? "audio/mp3"
    : "";

  if (finalType) {
    const completeBlob = new Blob(chunks, { type: finalType });

    const _mediaElem =
      finalType === "video/mp4" ? getVideoElement() : getAudioElement();
    _mediaElem.src = URL.createObjectURL(completeBlob);
    outputContainerElem.innerHTML = "";
    outputContainerElem.appendChild(_mediaElem);
  }

  startElem.removeAttribute("disabled");
  stopELem.setAttribute("disabled", true);
  saveElem.removeAttribute("disabled");
};

const getVideoElement = () => {
  const _videoElem = document.createElement("video");
  _videoElem.classList.add("w-100");
  _videoElem.setAttribute("controls", true);
  _videoElem.setAttribute("autoplay", true);

  return _videoElem;
};

const getAudioElement = () => {
  const _audioElem = document.createElement("audio");
  _audioElem.classList.add("w-100");
  _audioElem.setAttribute("controls", true);
  _audioElem.setAttribute("autoplay", true);

  return _audioElem;
};

const handleRecordingOnStart = () => {
  startElem.setAttribute("disabled", true);
  stopELem.removeAttribute("disabled");
  saveElem.setAttribute("disabled", true);

  const _startTime = new Date().getTime();
  durationInterval = setInterval(() => {
    const _currentTime = new Date().getTime();
    durationElem.innerHTML = `${(_currentTime - _startTime) / 1000}`;
  }, 100);
};

const saveRecording = () => {
  const _aElem = document.createElement("a");
  const _videoElem = outputContainerElem.querySelector("video");
  const _audioElem = outputContainerElem.querySelector("audio");

  if (_videoElem) {
    _aElem.href = _videoElem.src;
  } else if (_audioElem) {
    _aElem.href = _audioElem.src;
  } else {
    return;
  }

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
