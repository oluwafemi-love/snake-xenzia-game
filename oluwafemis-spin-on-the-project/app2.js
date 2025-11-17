// Initialise Storage
import Storage from "./storage.js";
const storage = new Storage();

// DEFINE HTML ELEMENTS
const board = document.getElementById("game-board");
const infoText = document.querySelector(".info-text");
const startGameBtn = document.getElementById("start-game");
const scoreEl = document.getElementById("score");
const highScoreText = document.getElementById("high-score");
const playerName = document.getElementById("player-name");

//Define Game Variables
let gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;

// DRAW GAME MAP, SNAKE, FOOD
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScoreOnTheUI();
}

//Draw Snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// DRAW FOOD FUNCTION
function drawFood() {
  if (gameStarted) {
    const foodElement = createElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
  }
}

//Create a snake or food
function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

//Set the positon of the snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// GENERATE FOOD
function generateFood() {
  const x = Math.floor(Math.random() * gridSize + 1);
  const y = Math.floor(Math.random() * gridSize + 1);
  return { x, y };
}

// MOVE THE SNAKE
function moveTheSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); //clear the previous SetInterval
    gameInterval = setInterval(() => {
      moveTheSnake();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// Start Game Function
function startGame() {
  const { bestPlayer, bestScore } = storage.getHighestScoringPlayer();
  infoText.textContent = `Game on can you beat the highest score ${bestScore} by ${bestPlayer}`;
  gameStarted = true; //Keeep track of a runnning game.
  gameInterval = setInterval(() => {
    moveTheSnake();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
}

//Keypress Event Listener
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}
document.addEventListener("keydown", handleKeyPress);
// Handle Button Click
function startGameByClick() {
  if (!gameStarted) startGame();
}
startGameBtn.addEventListener("click", startGameByClick);

// Increase Speed
function increaseSpeed() {
  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

//Detect Collision
function checkCollision() {
  const head = snake[0];
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  const currentScore = snake.length - 1;
  const name = playerName.textContent.trim();

  // Save this player's score
  storage.savePlayerScore(name, currentScore);

  // Get global highest score
  const { bestPlayer, bestScore } = storage.getHighestScoringPlayer();

  // Show message
  infoText.textContent = `Game Over! Highest score is ${bestScore} by ${bestPlayer}.`;

  updateHighScoreOnTheUI();
  stopGame();

  // Reset data for next play
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
  updateScoreOnTheUI();
}

//Update Score
function updateScoreOnTheUI() {
  const currentScore = snake.length - 1;
  scoreEl.textContent = `Score: ${currentScore.toString().padStart(3, "0")}`;
}

function updateHighScoreOnTheUI() {
  const { bestScore } = storage.getHighestScoringPlayer();
  highScoreText.textContent = `Best Score: ${bestScore
    .toString()
    .padStart(3, "0")}`;
}
