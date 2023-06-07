// GLOBAL VARIABLES
let setBtn = document.querySelector(".setting-btn");
let setBox = document.querySelector(".setting-box");
let gameBoard = document.querySelector(".game-board");

// SETTING BUTTON CODING
setBtn.addEventListener("click", () => {
    setBox.classList.toggle("active"); 
});

// CREATING FOOD AND SNAKE
let i;
let snakeBody = [];
let gameOver = false;
let foodX = 13, foodY = 10;
let sankeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let setIntervalId;

// UPDATE FOOD POSITION FUNCTION CODING
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 + 1);
    foodY = Math.floor(Math.random() * 30 + 1);
}

// HANDLE GAME OVER FUNCTION CODING
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("GAME OVER !");
    // Swal.fire({
    //     title: 'Custom animation with Animate.css',
    //     showClass: {
    //       popup: 'animate__animated animate__fadeInDown'
    //     },
    //     hideClass: {
    //       popup: 'animate__animated animate__fadeOutUp'
    //     }
    // })
    location.reload();
}

// SNAKE GAME FUNCTION CODING
const snakeGame = () => {

    // RETURN HANDLE GAME OVER FUNCTION
    if(gameOver == true) return handleGameOver();

    let html = `<div class="food" style="grid-area : ${foodY} / ${foodX}"></div>`; // CREATE RANDOM FOOD

    // CHANGE FOOD POSITION WHEN SNAKE TOUCH THE FOOD
    if(sankeX == foodX && snakeY == foodY) {
        updateFoodPosition(); // calling...
        snakeBody.push([foodX, foodY]);
    }

    // START REVERSE FOR LOOP FOR SNAKE BODY TO CONCAT
    for(i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    // BYDEFAULT SNAKE BODY
    snakeBody[0] = [sankeX, snakeY]; 

    // MOVE SNAKE TO FOOD POSITION
    sankeX += velocityX;
    snakeY += velocityY;

    // GAME OVER CODE
    if(sankeX <= 0 || sankeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    // START FOR LOOP FOR SNAKE BODY
    for(i = 0; i < snakeBody.length; i++) {

        html += `<div class="head" style="grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; // CREATE SNAKE
    }

    gameBoard.innerHTML = html;
}

// DIRECTION FUNCTION CODING
const direction = (e) => {
    if(e.key == "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key == "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key == "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key == "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}

updateFoodPosition(); // calling...
setIntervalId = setInterval(snakeGame, 125); // calling...

// KEY DOWN EVENT LISTNER FUNCTION
document.addEventListener('keydown', direction);