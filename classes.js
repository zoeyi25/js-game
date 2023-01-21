class Rectangle {
  constructor(x, y, width, height, fillColor, strokeColor, strokeWidth) {
    this.fruit = "";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.direction = "up";
    this.id;
    this.deg = 0;

    melon = new Image();
    melon.src = "assets/melon.png";
    melonSlice1 = new Image();
    melonSlice1.src = "assets/melonSlice1.png";
    melonSlice2 = new Image();
    melonSlice2.src = "assets/melonSlice2.png";
    apple = new Image();
    apple.src = "assets/apple.png";
    appleSlice1 = new Image();
    appleSlice1.src = "assets/appleSlice1.png";
    appleSlice2 = new Image();
    appleSlice2.src = "assets/appleSlice2.png";
    berry = new Image();
    berry.src = "assets/berry.png";
    berrySlice1 = new Image();
    berrySlice1.src = "assets/berrySlice1.png";
    berrySlice2 = new Image();
    berrySlice2.src = "assets/berrySlice2.png";
    mango = new Image();
    mango.src = "assets/mango.png";
    mangoSlice1 = new Image();
    mangoSlice1.src = "assets/mangoSlice1.png";
    mangoSlice2 = new Image();
    mangoSlice2.src = "assets/mangoSlice2.png";
    bomb = new Image();
    bomb.src = "assets/bomb.png";

    this.data = {
      "melon": {"xOffset": 16, "yOffset": 14, "width": 98, "height": 85, "whole": melon, "slice1": melonSlice1, "slice2": melonSlice2},
      "apple": {"xOffset": 10, "yOffset": 10, "width": 66, "height": 66, "whole": apple, "slice1": appleSlice1, "slice2": appleSlice2},
      "berry": {"xOffset": 8, "yOffset": 18, "width": 68, "height": 72, "whole": berry, "slice1": berrySlice1, "slice2": berrySlice2},
      "mango": {"xOffset": 10, "yOffset": 10, "width": 62, "height": 59, "whole": mango, "slice1": mangoSlice1, "slice2": mangoSlice2},
      "bomb": {"xOffset": 16, "yOffset": 22, "width": 66, "height": 68, "whole": bomb}
    };
    this.move();
  }

  setFruit(fruit)
  {
    this.fruit = fruit;
  }

  get pos()
  {
    return [this.x, this.y, this.width, this.height];
  }

  getDirection() {
    return this.direction;
  }

  isGameOver() {
    return this.gameOver;
  }

  draw() {
    // save the current styles set elsewhere to avoid overwriting them
    ctx.save();

    // set the styles for this shape
    ctx.fillStyle = this.fillColor;
    ctx.lineWidth = this.strokeWidth;

    ctx.beginPath();
    ctx.strokeStyle = this.strokeColor;
    ctx.rect(this.x, this.y, this.width, this.height);

    ctx.fill();
    ctx.stroke();

    // restore the styles from earlier preventing the colors used here from
    // polluting other drawings
    ctx.restore();
  }

move() {
  const acceleration = 11;
  const timeInterval = 0.4;
  let vY = -115;
  const vX = this.x <= c.width * 0.5? 20 : -20;
  this.id = setInterval(() =>
  {
    // rotate canvas to last rotated position to clear fruit/bomb
    ctx.save();
    ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
    ctx.rotate(this.deg);
    ctx.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)));
    ctx.clearRect(this.x - this.data[this.fruit]["xOffset"], this.y - this.data[this.fruit]["yOffset"], this.data[this.fruit]["width"] + 2, this.data[this.fruit]["height"] + 2);
    ctx.restore();

    this.deg += 0.1;

    if (vY >= 0) {
      this.direction = "down";
    }

    vY += acceleration * timeInterval;
    this.y += vY * timeInterval;
    this.x += vX * timeInterval;

    this.draw();
    if (this.fruit == "bomb") {
      ctx.save();
      ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
      ctx.rotate(this.deg);
      ctx.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)));
      ctx.drawImage(bomb, this.x - this.data["bomb"]["xOffset"], this.y - this.data["bomb"]["yOffset"]);
      ctx.restore();
    }
    else {
      ctx.save();
      ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
      ctx.rotate(this.deg);
      ctx.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)));
      ctx.drawImage(this.data[this.fruit]["whole"], this.x - this.data[this.fruit]["xOffset"], this.y - this.data[this.fruit]["yOffset"]);
      ctx.restore();
    }
  }, 50);
}

fall() {
  const acceleration = 10;
  const timeInterval = 0.5;
  let vY = 0;
  const splitOffset = 30;
  this.id = setInterval(() =>
  {
    // clear
    ctx.save();
    ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
    ctx.rotate(this.deg);
    ctx.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)));
    ctx.clearRect(this.x - splitOffset, this.y, this.data[this.fruit]["width"], this.data[this.fruit]["height"]);
    ctx.clearRect(this.x + splitOffset, this.y, this.data[this.fruit]["width"], this.data[this.fruit]["height"]);
    ctx.restore();

    // increment
    this.deg += 0.1;
    vY += acceleration * timeInterval;
    this.y += vY * timeInterval;

    // draw
    ctx.save();
    ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
    ctx.rotate(this.deg);
    ctx.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)));
    if (this.fruit != "bomb"){
      ctx.drawImage(this.data[this.fruit]["slice1"], this.x - splitOffset, this.y);
      ctx.drawImage(this.data[this.fruit]["slice2"], this.x + splitOffset, this.y);
    }
    ctx.restore();

    if (this.y >= c.height + 100) {
      clearInterval(this.id);
    }
  }, 50);
}

stopMoving() {
  clearInterval(this.id);
  }
}
