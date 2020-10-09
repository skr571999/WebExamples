var i = 0;

function timedCount() {
  i = i + 1;

  // sending the data to the worker caller file
  postMessage(i);
  setTimeout("timedCount()", 500);
}

timedCount();
