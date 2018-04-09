import React, { Component } from "react";

export default class Drawing extends Component {
  canvas = React.createRef();
  pos = { x: 0, y: 0 };

  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
    window.addEventListener("mouseup", this.onUp, false);
    window.addEventListener("mouseenter", this.onEnter, false);
    window.addEventListener("mousedown", this.onMove, false);
    window.addEventListener("mousemove", this.onDown, false);
  }
  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onUp, false);
    window.removeEventListener("mouseenter", this.onEnter, false);
    window.removeEventListener("mousedown", this.onMove, false);
    window.removeEventListener("mousemove", this.onDown, false);
  }
  onUp = e => {
    this.props.onNewImage(this.getImageData());
  };
  onEnter = e => {
    this.setPosition(e);
  };
  onMove = e => {
    this.setPosition(e);
  };
  onDown = e => {
    if (e.buttons !== 1) {
      return;
    }
    this.ctx.beginPath();

    this.ctx.lineWidth = 10;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "#111111";

    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
  };
  setPosition = e => {
    this.pos.x = e.offsetX;
    this.pos.y = e.offsetY;
  };
  clear = () => {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  };
  getImageData = () => {
    this.ctx.drawImage(this.canvas.current, 0, 0, 28, 28); //Scaled Canvas
    return this.ctx.getImageData(0, 0, 28, 28);
  };
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <canvas ref={this.canvas} />
        </div>
        <button className="btn btn-sm btn-warning" onClick={this.clear}>
          Erase
        </button>
      </React.Fragment>
    );
  }
}
