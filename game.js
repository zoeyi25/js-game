const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let counter = 0;
let chances = 3;
let origTime = 0;
let rectangles = [];
let totalSingleRects = 0;
let lastBirthday = 0;
let timeSinceBirthday = 0;

var intervalID = setInterval(checkGameOver, 50);
var intervalID2 = setInterval(newRects, 4000);
var intervalID3 = setInterval(createBomb, 70000);
var intervals = [intervalID, intervalID2, intervalID3];

function onMouseDown()
{
  const now = new Date();
  origTime = now.getTime();
}

function onMouseUp()
{
  const now = new Date();
  alert((now.getTime() - origTime) / 1000);
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

function setUpCounter() {
  ctx.font = "50px Arial";
  ctx.fillStyle = "#000000"
  ctx.fillText("0", c.width * 0.01, c.height * 0.07);
}

function setUpChances() {
  ctx.fillStyle = "#06038D"
  ctx.fillText("x", c.width * 0.85, c.height * 0.07);
  ctx.fillText("x", c.width * 0.9, c.height * 0.07);
  ctx.fillText("x", c.width * 0.95, c.height * 0.07);
}

function updateCounter() {
  counter += 1
  ctx.clearRect(0, 0, 200, 100)
  ctx.fillStyle = "#000000"
  ctx.fillText(counter, c.width * 0.01, c.height * 0.07);
}

function onMouseMove(e)
{
  // get x and y coords of mouse
  const cRect = c.getBoundingClientRect();
  const mouseX = Math.round(e.clientX - cRect.left);
  const mouseY = Math.round(e.clientY - cRect.top);
  for (let i in rectangles) {
    // get x, y, width, and height of rectangle
    const x = rectangles[i].pos[0]
    const y = rectangles[i].pos[1]
    const width = rectangles[i].pos[2]
    const height = rectangles[i].pos[3]

    // slice
    const now = new Date();
    if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height && e.buttons == 1 && now.getTime() - origTime > 100) {
      ctx.clearRect(x - 1, y - 1, width + 2, height + 2);
      // if bomb
      if (width == 200 & height == 200) {
        gameOver();
      }
      else {
        rectangles[i].stopMoving();
        delete rectangles[i];
        updateCounter();
      }
    }
  }
}

function gameOver()
{
  console.log("game over");
  for (let i in rectangles) {
    rectangles[i].stopMoving();
  }
  for (let i in intervals) {
    clearInterval(intervals[i]);
  }
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#000000"
  ctx.fillText("u suck", c.width * 0.5, c.height * 0.5);
  ctx.fillText("score: " + counter, c.width * 0.5, c.height * 0.6);
}

function checkGameOver()
{
  for (let i in rectangles) {
    if (rectangles[i].pos[1] >= c.height & rectangles[i].getDirection() == "down") {
      chances -= 1;
      delete rectangles[i];
    }
  }
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
  rectangles.push(new Rectangle(randomInt(1, c.width * 0.9), c.height, randomInt(50, 100), randomInt(50, 100), randomColor(), "#000000", 0, c.height));
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
    setTimeout(() => {
      makeOneRect();
    }, 1000)
    setTimeout(() => {
      makeOneRect();
    }, 2000)
    setTimeout(() => {
      makeOneRect();
    }, 3000)
  }
}

function createBomb()
{
  rectangles.push(new Rectangle(randomInt(1, c.width * 0.9), c.height, 200, 200, "#000000", "#000000", 0, c.height));
  rectangles[rectangles.length - 1].draw();
}

newRects();
setUpCounter();
setUpChances();

c.addEventListener("mousedown", onMouseDown);
c.addEventListener("mousemove", onMouseMove);

// to do:
// make actual physics: done
// make the fruit not rectangles
// add background: done
// add bombs: done
// add the three chances thing: done
// figure out delay thing: done
