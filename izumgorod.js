const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let ellie = {
    x: 50,
    y: 500,
    width: 50,
    height: 50,
    color: 'green',
    speed: 5
};

let map = {x: 700, y: 50, width: 50, height: 50, color: 'gold'};
let obstacles = [
    {x: 200, y: 400, width: 50, height: 50, color: 'brown'},
    {x: 400, y: 300, width: 50, height: 50, color: 'brown'},
    {x: 600, y: 200, width: 50, height: 50, color: 'brown'},
];

document.addEventListener('keydown', moveEllie);

function moveEllie(event) {
    switch(event.key) {
        case 'ArrowUp':
            ellie.y -= ellie.speed;
            break;
        case 'ArrowDown':
            ellie.y += ellie.speed;
            break;
        case 'ArrowLeft':
            ellie.x -= ellie.speed;
            break;
        case 'ArrowRight':
            ellie.x += ellie.speed;
            break;
    }
}

function drawEllie() {
    context.fillStyle = ellie.color;
    context.fillRect(ellie.x, ellie.y, ellie.width, ellie.height);
}

function drawMap() {
    context.fillStyle = map.color;
    context.fillRect(map.x, map.y, map.width, map.height);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        context.fillStyle = obstacle.color;
        context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function checkWin() {
    if (checkCollision(ellie, map)) {
        alert('Поздравляем! Вы нашли карту и прошли первый уровень!');
    }
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawEllie();
    drawMap();
    drawObstacles();

    obstacles.forEach(obstacle => {
        if (checkCollision(ellie, obstacle)) {
            alert('Вы столкнулись с препятствием! Попробуйте снова.');
            ellie.x = 50;
            ellie.y = 500;
        }
    });

    checkWin();

    requestAnimationFrame(gameLoop);
}

gameLoop();

