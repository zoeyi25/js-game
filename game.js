var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var myRectangle = new Rectangle(100, 100, 50, 50, "#FF0000", "#000000", 0);
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

function onMouseMove(e)
{
  // get x and y coords of mouse
  var cRect = c.getBoundingClientRect();
  var mouseX = Math.round(e.clientX - cRect.left);
  var mouseY = Math.round(e.clientY - cRect.top);

  // get x, y, width, and height of rectangle
  var x = myRectangle.pos[0]
  var y = myRectangle.pos[1]
  var width = myRectangle.pos[2]
  var height = myRectangle.pos[3]

  // if mouse is in rectangle and user is left clicking
  if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height && e.buttons == 1) {
    ctx.clearRect(x - 1, y - 1, width + 2, height + 2);

    // random color
    var  newR, newG, newB;
    newR = Math.floor(Math.random() * 255);
    newG = Math.floor(Math.random() * 255);
    newB = Math.floor(Math.random() * 255);
    let color = `rgb(${newR}, ${newG}, ${newB})`

    // new rectangle
    myRectangle = new Rectangle(Math.floor(Math.random() * (c.width - 50)), Math.floor(Math.random() * (c.height - 50)), Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), color, "#000000", 0);
    myRectangle.draw();
  }
  else {
    console.log(x + " " + y + " " + width + " " + height);
  }

  //console.log(canvasX + ", " + canvasY);
}

//c.addEventListener("click", onMouseClick);
c.addEventListener("keydown", onKeyPress);
//c.addEventListener("mousedown", onMouseDown);
//c.addEventListener("mouseup", onMouseUp);
c.addEventListener("mousemove", onMouseMove);
