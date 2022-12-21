// function to create rectangle objects
class Rectangle {
  // arguments passed in
  constructor(x, y, width, height, fillColor, strokeColor, strokeWidth) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  get pos()
  {
    return [this.x, this.y, this.width, this.height];
  }

  draw() {
    // destructuring
    const {
      x, y, width, height, fillColor, strokeColor, strokeWidth
    } = this;

    // save the current styles set elsewhere to avoid overwriting them
    ctx.save();

    // set the styles for this shape
    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;

    // create path
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.rect(x, y, width, height);

    // draw the path to screen
    ctx.fill();
    ctx.stroke();

    // restore the styles from earlier preventing the colors used here from
    // polluting other drawings
    ctx.restore();
  }
}
