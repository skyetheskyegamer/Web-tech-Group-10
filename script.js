const gameBox = document.getElementById('game-box');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let gameInterval;
let countdown;
let score = 0;
let timeLeft = 60; // 60 seconds

function spawnTarget() {
  const target = document.createElement('div');
  target.classList.add('target');

  const x = Math.random() * (gameBox.clientWidth - 30);
  const y = Math.random() * (gameBox.clientHeight - 30);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  target.onclick = () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    target.remove();
  };

  gameBox.appendChild(target);

  setTimeout(() => {
    if (gameBox.contains(target)) target.remove();
  }, 1500);
}

function startGame() {
  score = 0;
  timeLeft = 60;
  scoreDisplay.textContent = 'Score: 0';
  timerDisplay.textContent = 'Time: 60s';
  gameBox.innerHTML = '';
  clearInterval(gameInterval);
  clearInterval(countdown);

  gameInterval = setInterval(spawnTarget, 1000);

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(countdown);
      alert(`Time's up! Final Score: ${score}`);
    }
  }, 1000);
}

startBtn.onclick = startGame;
