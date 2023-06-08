// GLOBAL VARIABLES
let setBtn = document.querySelector(".setting-btn");
let setBox = document.querySelector(".setting-box");
let gameBoard = document.querySelector(".game-board");
let scoreEl = document.querySelector(".score");
let highScoreEl = document.querySelector(".high-score");
let controls = document.querySelectorAll(".controls i");
let container = document.querySelector(".container");

// SETTING VARIABLES
let set_btn = document.querySelector("#set-btn");
let defaultEl = document.querySelector("#default");
let detailEl = document.querySelector("#detail-color");
let boardEl = document.querySelector("#board-color");
let snakeEl = document.querySelector("#snake-color");
let foodEl = document.querySelector("#food-color");
let speedEl = document.querySelector("#speed");


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
let score = 0;
let speed = 125;

// GET SETTING DETAILS FROM LOCAL STORAGE
if(localStorage.getItem("details") != null) {
    const all_details = JSON.parse(localStorage.getItem("details"));

    detailEl.value = all_details.detail_color;
    boardEl.value = all_details.board_color;
    snakeEl.value = all_details.snake_color;
    foodEl.value = all_details.food_color;
    speedEl.value = all_details.speed;

    if(all_details.active == false) {
        defaultEl.checked = true;
    }
    else {
        defaultEl.checked = false;
    }

    // CHANGE COLOR OF BOARDS
    container.style.backgroundColor = detailEl.value;
    gameBoard.style.backgroundColor = boardEl.value;
    speed = all_details.speed;
}

// GET HIGH SCORE FROM LOCAL STORAGE
let highScore = localStorage.getItem("high-score") || 0;
highScoreEl.innerHTML = `High Score : ${highScore}`;

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

// HANDLE CONTOLES BUTTONS FOR MOBILE
controls.forEach((key) => {
    key.addEventListener("click", () => {
        direction({key: key.dataset.key}); // calling
    })
})

// SNAKE GAME FUNCTION CODING
const snakeGame = () => {

    // RETURN HANDLE GAME OVER FUNCTION
    if(gameOver == true) return handleGameOver();

    let html = `<div class="food" style="grid-area : ${foodY} / ${foodX}"></div>`; // CREATE RANDOM FOOD

    // CHANGE FOOD POSITION WHEN SNAKE TOUCH THE FOOD
    if(sankeX == foodX && snakeY == foodY) {
        updateFoodPosition(); // calling...
        snakeBody.push([foodX, foodY]);
        scoreEl.innerHTML = `Current Score : ${score++}`; // increment score
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
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

        // GAME OVER CODE WHILE SNAKE TOUCH HIS BODY
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) { 
            gameOver = true;
        }
    }

    gameBoard.innerHTML = html;

    if(localStorage.getItem("details") != null) {
        document.querySelector(".food").style.backgroundColor = foodEl.value;
        document.querySelector(".head").style.backgroundColor = snakeEl.value;
    }
}

// DIRECTION FUNCTION CODING
const direction = (e) => {
    if(e.key == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

updateFoodPosition(); // calling...
setIntervalId = setInterval(snakeGame, speed); // calling...

// KEY DOWN EVENT LISTNER FUNCTION
document.addEventListener('keydown', direction);

// START SETTING BUTTON CODING
set_btn.onclick = function() {
    if(defaultEl.checked == true) {
        const set_data = {
            detail_color: "#293447",
            board_color: "#212837",
            snake_color: "#60cbff",
            food_color: "#ff003d",
            speed: 125,
            active: false
        }

        localStorage.setItem("details", JSON.stringify(set_data));
    }
    else {
        const set_data = {
            detail_color: detailEl.value,
            board_color: boardEl.value,
            snake_color: snakeEl.value,
            food_color: foodEl.value,
            speed: speedEl.value,
            active: true
        }

        localStorage.setItem("details", JSON.stringify(set_data));
    }

    setBtn.click();
    location.reload();
}