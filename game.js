var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var counter = 0
ctx.font = "80px Arial";
ctx.fillStyle = "000000"
var rectangles = [];
newRect();
ctx.fillText("0", 0, c.height * 0.1);

let origTime = 0;
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
  var  newR, newG, newB;
  newR = Math.floor(Math.random() * 255);
  newG = Math.floor(Math.random() * 255);
  newB = Math.floor(Math.random() * 255);
  return `rgb(${newR}, ${newG}, ${newB})`
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onMouseMove(e)
{
  // get x and y coords of mouse
  var cRect = c.getBoundingClientRect();
  var mouseX = Math.round(e.clientX - cRect.left);
  var mouseY = Math.round(e.clientY - cRect.top);
  for (let i in rectangles) {
    // get x, y, width, and height of rectangle
    var x = rectangles[i].pos[0]
    var y = rectangles[i].pos[1]
    var width = rectangles[i].pos[2]
    var height = rectangles[i].pos[3]

    // slice
    const now = new Date();
    if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height && e.buttons == 1 && now.getTime() - origTime > 100) {
      ctx.clearRect(x - 1, y - 1, width + 2, height + 2);
      rectangles[i].stopMoving();
      delete rectangles[i];
      ctx.fillStyle = "#FFFFFF"
      // not the best solution
      ctx.fillText(counter, 0, c.height * 0.1);
      ctx.fillText(counter, 0, c.height * 0.1);
      ctx.fillText(counter, 0, c.height * 0.1);
      ctx.fillText(counter, 0, c.height * 0.1);
      ctx.fillText(counter, 0, c.height * 0.1);
      ctx.fillText(counter, 0, c.height * 0.1);
      ctx.fillText(counter, 0, c.height * 0.1);
      ctx.fillText(counter, 0, c.height * 0.1);
      ctx.fillStyle = "#000000"
      ctx.font = "80px Arial";
      counter += 1
      //ctx.clearRect(0, 0, 100, 1000)
      ctx.fillText(counter, 0, c.height * 0.1);
      newRect()
    }
  }
}

const intervalID = setInterval(checkGameOver, 50);

function checkGameOver()
{
  for (let i in rectangles) {
    if (rectangles[i].isGameOver() == true) {
      for (let i in rectangles) {
        rectangles[i].stopMoving();
      }
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillText("u suck", c.width * 0.5, c.height * 0.5);
      ctx.fillText("score: " + counter, c.width * 0.5, c.height * 0.6);
    }
  }
}

const intervalID2 = setInterval(newRect, randomInt(5000, 10000));

function newRect()
{
  rectangles.push(new Rectangle(randomInt(1, c.width * 0.9), c.height, randomInt(50, 200), randomInt(50, 200), randomColor(), "#000000", 0, c.height));
  rectangles[rectangles.length - 1].draw();
}

c.addEventListener("mousedown", onMouseDown);
c.addEventListener("mousemove", onMouseMove);
