var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var myRectangle = new Rectangle(100, 500, 50, 50, "#FF0000", "#000000", 0, c.height);
myRectangle.draw();

function onMouseClick()
{
  alert("sup");
}

function onKeyPress(e)
{
  var kp = e.key;

  if (kp == "w" || kp == "W")
  {
    alert("you pressed the w key");
  }
  else if (kp == "a" || kp == "A")
  {
    alert("you pressed the a key");
  }
  else if (kp == "s" || kp == "S")
  {
    alert("you pressed the s key");
  }
  else if (kp == "d" || kp == "D")
  {
    alert("you pressed the d key");
  }
}

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

function onMouseMove(e)
{
  // get x and y coords of mouse
  var cRect = c.getBoundingClientRect();
  var mouseX = Math.round(e.clientX - cRect.left);
  var mouseY = Math.round(e.clientY - cRect.top);

  console.log("mouse at " + mouseX + ", " + mouseY)

  // get x, y, width, and height of rectangle
  var x = myRectangle.pos[0]
  var y = myRectangle.pos[1]
  var width = myRectangle.pos[2]
  var height = myRectangle.pos[3]

  // if mouse is in rectangle and user is left clicking
  const now = new Date();
  if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height && e.buttons == 1 && now.getTime() - origTime > 1) {
    console.log("sliced at " + x + ", " + y + ", " + width + ", " + height)
    ctx.clearRect(x - 1, y - 1, width + 2, height + 2);
    myRectangle = new Rectangle(50, 50, 200, 100, "#123456", "#000000", 0, c.height);
    myRectangle.draw();
  }
}

c.addEventListener("keydown", onKeyPress);
c.addEventListener("mousedown", onMouseDown);
c.addEventListener("mousemove", onMouseMove);
