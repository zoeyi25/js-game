// references:
// https://stackoverflow.com/questions/29300280/update-html5-canvas-rectangle-on-hover
// https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
// https://stackoverflow.com/questions/3793397/html5-canvas-drawimage-with-at-an-angle
// and others but I don't remember which ones so I don't have the links

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let counter = 0;
let chances = 3;
let origTime = 0;
let rectangles = [];

var intervalCheckGameOverID;
var intervalNewRectsID;
var intervalCreateBombID;
var intervals;

function setUpAssets()
{
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
}

function randomColor()
{
  let newR, newG, newB;
  newR = Math.floor(Math.random() * 255);
  newG = Math.floor(Math.random() * 255);
  newB = Math.floor(Math.random() * 255);
  return `rgb(${newR}, ${newG}, ${newB})`
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setUpCounter()
{
  ctx.font = "50px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText(counter, c.width * 0.03, c.height * 0.07);
}

function setUpChances()
{
  ctx.fillStyle = "#06038D";
  ctx.fillText("x", c.width * 0.85, c.height * 0.07);
  ctx.fillText("x", c.width * 0.9, c.height * 0.07);
  ctx.fillText("x", c.width * 0.95, c.height * 0.07);
}

function updateCounter()
{
  counter += 1
  ctx.clearRect(0, 0, 200, 100);
  ctx.fillStyle = "#000000";
  ctx.fillText(counter, c.width * 0.03, c.height * 0.07);
}

function onMouseMove(e)
{
  // get x and y coords of mouse
  const cRect = c.getBoundingClientRect();
  const mouseX = Math.round(e.clientX - cRect.left);
  const mouseY = Math.round(e.clientY - cRect.top);
  for (let i in rectangles) {
    // get x, y, width, and height of rectangle
    const x = rectangles[i].pos[0];
    const y = rectangles[i].pos[1];
    const width = rectangles[i].pos[2];
    const height = rectangles[i].pos[3];

    // slice
    const now = new Date();
    if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height) {
      // if bomb
      if (width == 35) {
        gameOver();
      }
      else {
        updateCounter();
        rectangles[i].stopMoving();
        rectangles[i].fall();
        delete rectangles[i];
      }
    }
    setUpCounter();
  }
}

function gameOver()
{
  for (let i in rectangles) {
    rectangles[i].stopMoving();
  }
  for (let i in intervals) {
    clearInterval(intervals[i]);
  }

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#000000";
  ctx.fillText("game over", c.width * 0.5, c.height * 0.5);
  ctx.fillText("score: " + counter, c.width * 0.5, c.height * 0.6);
  setTimeout(() => {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("new game", c.width * 0.5, c.height * 0.5);
  }, 1000)
  setTimeout(() => {
    location.reload();
  }, 2000);
}

function checkGameOver()
{
  for (let i in rectangles) {
    if (rectangles[i].pos[1] >= c.height && rectangles[i].getDirection() == "down" && rectangles[i].pos[2] != 35 && rectangles[i].pos[3] != 35) {
      chances -= 1;
      delete rectangles[i];
    }
  }
  setUpChances();
  if (chances < 3) {
    ctx.fillStyle = "#FF0000";
  }
  if (chances == 2) {
    ctx.fillText("x", c.width * 0.85, c.height * 0.07);
  }
  if (chances == 1) {
    ctx.fillText("x", c.width * 0.9, c.height * 0.07);
    ctx.fillText("x", c.width * 0.85, c.height * 0.07);
  }
  if (chances <= 0) {
    gameOver();
  }
}

function makeOneRect()
{
  let fruit = "";
  let w = 0;
  let h = 0;
  const int = randomInt(0, 3);
  if (int == 0) {
    fruit = "apple";
    w = 48;
    h = 48;
  }
  else if (int == 1) {
    fruit = "melon";
    w = 56;
    h = 56;
  }
  else if (int == 2) {
    fruit = "berry";
    w = 40;
    h = 40;
  }
  else if (int == 3) {
    fruit = "mango";
    w = 46;
    h = 38;
  }
  rectangles.push(new Rectangle(randomInt(1, c.width * 0.9), c.height, w, h, randomColor(), "#000000", 0));
  rectangles[rectangles.length - 1].setFruit(fruit);
  rectangles[rectangles.length - 1].draw();
}

function newRects()
{
  const int = randomInt(0, 1);
  if (int == 0) {
    for (let i = 1; i <= randomInt(1, 4); i++) {
      makeOneRect();
    }
  }
  else {
    let timeouts = [];
    const int = randomInt(1, 4);
    if (int < 2) {
      let timeoutID = setTimeout(makeOneRect(), 1000);
      timeouts.push(timeoutID);
    }
    else if (int < 3) {
      let timeoutID2 = setTimeout(makeOneRect(), 2000);
      timeouts.push(timeoutID2);
    }
    else if (int < 4) {
      let timeoutID3 = setTimeout(makeOneRect(), 3000);
      timeouts.push(timeoutID3);
    }
    else if (int < 5) {
      let timeoutID4 = setTimeout(makeOneRect(), 4000);
      timeouts.push(timeoutID4);
    }
  }
}

function createBomb()
{
  rectangles.push(new Rectangle(randomInt(1, c.width * 0.9), c.height, 35, 35, "#000000", "#000000", 0));
  rectangles[rectangles.length - 1].draw();
  rectangles[rectangles.length - 1].setFruit("bomb");
}

setUpAssets();
ctx.font = "50px Arial";
ctx.fillStyle = "#000000"
ctx.textAlign = "center";
ctx.fillText("starting in:", c.width * 0.5, c.height * 0.5);
setTimeout(() => {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillText("3", c.width * 0.5, c.height * 0.5);
}, 1000)
setTimeout(() => {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillText("2", c.width * 0.5, c.height * 0.5);
}, 2000)
setTimeout(() => {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillText("1", c.width * 0.5, c.height * 0.5);
}, 3000)
setTimeout(() => {
  ctx.clearRect(0, 0, c.width, c.height);
  newRects();
  setUpCounter();
  setUpChances();
  intervalCheckGameOverID = setInterval(checkGameOver, 50);
  intervalNewRectsID = setInterval(newRects, 4000);
  intervalCreateBombID = setInterval(createBomb, 6000);
  intervals = [intervalCheckGameOverID, intervalNewRectsID, intervalCreateBombID];
}, 4000)

c.addEventListener("mousemove", onMouseMove);
