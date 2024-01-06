// Get a reference to the canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Game variables
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballXSpeed = 5;
let ballYSpeed = 5;
const paddleWidth = 10;
const paddleHeight = 50;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let leftScore = 0;
let rightScore = 0;

// Function to draw objects on the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw the ball
  ctx.fillStyle = "#000"; // Black color
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();

  // Draw the paddles
  ctx.fillStyle = "#fff"; // White color
  ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 20 - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

  // Draw the scores
  ctx.font = "20px Arial";
  ctx.fillStyle = "#f00"; // Red color
  ctx.fillText(leftScore, canvas.width / 4, 50);
  ctx.fillText(rightScore, canvas.width * 3 / 4, 50);
}

// Function to update the ball's position
function update() {
  ballX += ballXSpeed;
  ballY += ballYSpeed;

  // Check for collisions with walls
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballXSpeed = -ballXSpeed;
  }
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballYSpeed = -ballYSpeed;
  }

  // Check for collisions with paddles
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballXSpeed = 5;
  }
  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballXSpeed = -5;
  }

  // Check for scoring
  if (ballX - ballRadius > canvas.width) {
    leftScore++;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
  if (ballX + ballRadius < 0) {
    rightScore++;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
}

// Event listeners for paddle movement
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp") {
    rightPaddleY -= 10;
  } else if (event.code === "ArrowDown") {
    rightPaddleY += 10;
  }
});

