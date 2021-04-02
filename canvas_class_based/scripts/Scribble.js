class Scribble {
  constructor(canvasElem) {
    this.canvas = canvasElem;
    this.ctx = this.canvas.getContext("2d");
    // inactive, paused, active
    this.state = "inactive";
    this.scribble = {
      dimensions: {
        height: "",
        width: "",
      },
      points: {},
    };
    this.previous = {
      x: 0,
      y: 0,
    };
    this.current = {
      x: 0,
      y: 0,
    };

    this.flag = false;
    this.dot_flag = false;
    this.config = {
      color: "black",
      width: 2,
    };

    this.addBackground();

    const handleMouseMove = function (e) {
      this._findXY("move", e);
    };

    const handleMouseDown = function (e) {
      this._findXY("down", e);
    };

    const handleMouseUp = function (e) {
      this._findXY("up", e);
    };

    const handleMouseOut = function (e) {
      this._findXY("out", e);
    };

    this._handleMouseDown = handleMouseDown.bind(this);
    this._handleMouseMove = handleMouseMove.bind(this);
    this._handleMouseOut = handleMouseOut.bind(this);
    this._handleMouseUp = handleMouseUp.bind(this);
  }

  downloadBackgroundImage() {
    const _fileName = "Background Image.png";
    const _a = document.createElement("a");
    _a.href = _imgElem.src.replace(
      /^data:image\/png/,
      "data:application/octet-stream"
    );
    _a.download = _fileName;
    _a.click();
  }

  downloadScribble() {
    const _fileName = "Scribble.json";
    const _a = document.createElement("a");
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(_scribble));
    _a.href = dataStr;
    _a.download = _fileName;
    _a.click();
  }

  _draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.previous.x, this.previous.y);
    this.ctx.lineTo(this.current.x, this.current.y);
    this.ctx.strokeStyle = this.config.color;
    this.ctx.lineWidth = this.config.width;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  _findXY(res, e) {
    if (this.state === "inactive" || this.state === "paused") return;
    if (res == "down") {
      this.previous.x = this.current.x;
      this.previous.y = this.current.y;
      this.current.x = e.clientX - this.canvas.offsetLeft;
      this.current.y = e.clientY - this.canvas.offsetTop;

      this.flag = true;

      this.dot_flag = true;
      if (this.dot_flag) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.config.color;
        this.ctx.fillRect(this.current.x, this.current.y, 2, 2);
        this.ctx.closePath();
        this.dot_flag = false;
      }
    }
    if (res == "up" || res == "out") {
      this.flag = false;
    }
    if (res == "move") {
      if (this.flag) {
        this.previous.x = this.current.x;
        this.previous.y = this.current.y;
        this.current.x = e.clientX - this.canvas.offsetLeft;
        this.current.y = e.clientY - this.canvas.offsetTop;
        this._draw();
      }
    }
  }

  startScribble() {
    this.state = "active";
    this.canvas.addEventListener("mousemove", this._handleMouseMove);
    this.canvas.addEventListener("mousedown", this._handleMouseDown);
    this.canvas.addEventListener("mouseup", this._handleMouseUp);
    this.canvas.addEventListener("mouseout", this._handleMouseOut);
  }

  addBackground() {
    const background = new Image();
    background.src = "./images/Angular.png";

    let ratio = background.width / background.height;
    let newW = 400;
    let newH = newW / ratio;
    this.canvas.width = newW;
    this.canvas.height = newH;

    background.onload = () => {
      this.ctx.drawImage(background, 0, 0, newW, newH);
    };
  }

  pauseScribble() {
    this.state = "paused";
  }

  resumeScribble() {
    this.state = "active";
  }

  stopScribble() {
    this.state = "inactive";
    this.canvas.removeEventListener("mousemove", this._handleMouseMove);
    this.canvas.removeEventListener("mousedown", this._handleMouseDown);
    this.canvas.removeEventListener("mouseup", this._handleMouseUp);
    this.canvas.removeEventListener("mouseout", this._handleMouseOut);
  }

  clearScribble() {
    this.ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    this.addBackground();
  }
}
