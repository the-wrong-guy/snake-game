var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasW = canvas.width;
var canvasH = canvas.height;

var snakeW = 10;
var snakeH = 10;

var score = 0;
var highestScore = 0;

var direction = "right";

//event listener for key pressed
document.addEventListener("keydown", getDirection);

function getDirection(e) {
  if (e.keyCode == 37 && direction !== "right") {
    direction = "left";
  } else if (e.keyCode == 38 && direction !== "down") {
    direction = "up";
  } else if (e.keyCode == 39 && direction !== "left") {
    direction = "right";
  } else if (e.keyCode == 40 && direction !== "up") {
    direction = "down";
  }
}

function drawSnake(x, y) {
  ctx.fillStyle = "lime";
  ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

  ctx.fillStyle = "#000";
  ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
}

//by defalut we have 4 snake cells
var len = 4;
var snake = [];

for (let i = len - 1; i >= 0; i--) {
  snake.push({
    x: i,
    y: 0
  });
}

var food = {
  x: Math.round(Math.random() * (canvasW / snakeW - 1)),
  y: Math.round(Math.random() * (canvasH / snakeH - 1))
};

//draw food function
function drawFood(x, y) {
  ctx.fillStyle = "red";
  ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

  ctx.fillStyle = "#000";
  ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
}

//collision detector
function collisonDectector(x, y, array) {
  for (let i = 2; i < array.length - 1; i++) {
    if (x == array[i].x && y == array[i].y) {
      return true;
    }
  }
  return false;
}

//to reset the game
function reset(){
   setTimeout(location.reload(),1000);
};


function drawScore(x) {
  ctx.fillStyle = "yellow";
    ctx.font = "12px Verdana";
  ctx.fillText("Score : " + x, 5, canvasH - 5);
}

function draw() {
  ctx.clearRect(0, 0, canvasW, canvasH);

  for (let i = 0; i < snake.length; i++) {
    let x = snake[i].x;
    let y = snake[i].y;
    drawSnake(x, y);
  }

  //snake head
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvasW / snakeW ||
    snakeY >= canvasH / snakeH ||
    collisonDectector(snakeX, snakeY, snake)
  ) {
      reset();
//   location.reload(true);
  }
  switch (direction) {
    case "left":
      snakeX--;
      break;
    case "up":
      snakeY--;
      break;
    case "right":
      snakeX++;
      break;
    case "down":
      snakeY++;
      break;
  }

  if (snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.round(Math.random() * (canvasW / snakeW - 1)),
      y: Math.round(Math.random() * (canvasH / snakeH - 1))
    };
    let newHead = {
      x: snakeX,
      y: snakeY
    };
    score++;
  } else {
    snake.pop();
  }

  drawFood(food.x, food.y);

  var newHead = {
    x: snakeX,
    y: snakeY
  };
  //adding
  snake.unshift(newHead);
  drawScore(score);
}


//Function for mobile devices
var RIGHT = document.getElementById("right");
var LEFT =  document.getElementById("left");
var UP = document.getElementById("up");
var DOWN = document.getElementById("down");

function myFunction() {
    RIGHT.addEventListener('click',()=>{
        if(direction !== "left"){
        direction = "right";}
    })
    LEFT.addEventListener('click',()=>{
        if(direction !== "right"){
        direction = "left";}
    })
    UP.addEventListener('click',()=>{
        if(direction !== "down"){
        direction = "up";}
    })
    DOWN.addEventListener('click',()=>{
        if(direction !== "up"){
        direction = "down";}
    })
}

var x = window.matchMedia("(max-width: 600px)")
myFunction() // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes




setInterval(draw, 60);

//draw(); //output will be {0,0} ,{0,1},{0,2},{0,3}
