// function to create rectangle objects
class Rectangle {
  // arguments passed in
  constructor(x, y, width, height, fillColor, strokeColor, strokeWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.canvasHeight = canvasHeight;
    this.direction = "up";
    this.move();
    this.id;
  }

  get pos()
  {
    return [this.x, this.y, this.width, this.height];
  }

  getDirection() {
    return this.direction;
  }

  getFillColor() {
    return this.fillColor;
  }

  isGameOver() {
    return this.gameOver;
  }

  setWidth(value) {
    this.width = value;
  }

  setHeight(value) {
    this.height = value;
  }

  draw() {
    // save the current styles set elsewhere to avoid overwriting them
    ctx.save();

    // set the styles for this shape
    ctx.fillStyle = this.fillColor;
    ctx.lineWidth = this.strokeWidth;

    // create path
    ctx.beginPath();
    ctx.strokeStyle = this.strokeColor;
    ctx.rect(this.x, this.y, this.width, this.height);

    // draw the path to screen
    ctx.fill();
    ctx.stroke();

    // restore the styles from earlier preventing the colors used here from
    // polluting other drawings
    ctx.restore();
  }

  move() {
    const a = 10;
    const timeInterval = 0.5;
    let vY = -115;
    const vX = this.x <= c.width * 0.5? 20 : -20;
    this.id = setInterval(() =>
    {
      // code between these curly brackets {} will run repeatedly at interval
      ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);

      if (vY >= 0) {
        this.direction = "down";
      }

      vY += a * timeInterval;
      this.y += vY * timeInterval;
      this.x += vX * timeInterval;

      this.draw();
    }, 50);   //repeat interval every 50 ms
  }

stopMoving() {
  clearInterval(this.id);
  }
}
