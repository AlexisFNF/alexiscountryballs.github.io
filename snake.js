// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20; // Tamaño de cada segmento de la serpiente y la comida
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
let food;
let direction = 'RIGHT';
let isGameOver = false;
let score = 0;

function setup() {
    snake = [];
    snake[0] = { x: Math.floor(columns / 2) * scale, y: Math.floor(rows / 2) * scale };
    direction = 'RIGHT';
    score = 0; // Reinicia la puntuación
    placeFood();
    updateScore();
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);

    // Update snake position
    let headX = snake[0].x;
    let headY = snake[0].y;

    switch (direction) {
        case 'LEFT':
            headX -= scale;
            break;
        case 'RIGHT':
            headX += scale;
            break;
        case 'UP':
            headY -= scale;
            break;
        case 'DOWN':
            headY += scale;
            break;
    }

    // Check for collisions with walls or itself
    if (headX >= canvas.width || headX < 0 || headY >= canvas.height || headY < 0 || snake.some(segment => segment.x === headX && segment.y === headY)) {
        isGameOver = true;
        alert(`Game Over! Puntuación final: ${score}`);
        setup();
        return;
    }

    // Move snake
    snake.unshift({ x: headX, y: headY });

    // Check if food is eaten
    if (headX === food.x && headY === food.y) {
        placeFood();
        score++; // Aumenta la puntuación
        updateScore();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') direction = 'LEFT'; // Flecha izquierda
    if (key === 38 && direction !== 'DOWN') direction = 'UP'; // Flecha arriba
    if (key === 39 && direction !== 'LEFT') direction = 'RIGHT'; // Flecha derecha
    if (key === 40 && direction !== 'UP') direction = 'DOWN'; // Flecha abajo
}

document.addEventListener('keydown', changeDirection);

function updateScore() {
    document.getElementById('score').textContent = `Puntuación: ${score}`;
}

function gameLoop() {
    if (!isGameOver) {
        draw();
        setTimeout(gameLoop, 100); // Controla la velocidad del juego
    }
}

setup();
gameLoop();
