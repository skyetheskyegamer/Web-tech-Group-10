const squares = document.querySelectorAll('.square');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameBoard = document.getElementById('game-board');
const gameArea = document.querySelector('.game-area');
const endScreen = document.getElementById('end-screen');
const scoreDisplay = document.getElementById('score');

let sequence = [];
let playerSequence = [];
let level = 0;

function startGame() {
  startBtn.classList.add('hidden');
  gameArea.classList.remove('hidden');
  endScreen.classList.add('hidden');
  sequence = [];
  playerSequence = [];
  level = 0;
  nextLevel();
}

function nextLevel() {
  level++;
  const nextStep = Math.floor(Math.random() * 4);
  sequence.push(nextStep);
  playerSequence = [];
  showSequence();
}

function showSequence() {
  let delay = 0;
  sequence.forEach((index, i) => {
    setTimeout(() => {
      flashSquare(index);
    }, delay);
    delay += 600;
  });
}

function flashSquare(index) {
  squares[index].classList.add('active');
  setTimeout(() => {
    squares[index].classList.remove('active');
  }, 300);
}

function handleSquareClick(e) {
  const index = parseInt(e.target.id);
  playerSequence.push(index);

  flashSquare(index);

  const currentStep = playerSequence.length - 1;
  if (playerSequence[currentStep] !== sequence[currentStep]) {
    endGame();
    return;
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(nextLevel, 1000);
  }
}

function endGame() {
  gameArea.classList.add('hidden');
  endScreen.classList.remove('hidden');
  scoreDisplay.textContent = `Score: ${level - 1}`;
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
squares.forEach(square => {
  square.addEventListener('click', handleSquareClick);
});