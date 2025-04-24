const gameScreen = document.getElementById('game-screen');
const gameMessage = document.getElementById('game-message');

let isWaiting = false;
let isReady = false;
let clickStartTime;
let delayTimeout;

gameScreen.addEventListener('click', () => {
  if (!isWaiting && !isReady) {
    gameMessage.textContent = 'Wait for the signal...';
    gameScreen.classList.add('waiting');
    isWaiting = true;

    // 2-5 seconds
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    delayTimeout = setTimeout(() => {
      gameScreen.classList.remove('waiting');
      gameScreen.classList.add('ready');
      gameMessage.textContent = 'NOW! Click!';
      clickStartTime = Date.now();
      isReady = true;
      isWaiting = false;
    }, randomDelay);
  } 

  else if (isReady) {
    const reaction = Date.now() - clickStartTime;
    gameMessage.textContent = `Nice! Your reaction time: ${reaction}ms`;

    gameScreen.classList.remove('ready');
    isReady = false;
  } 

  else if (isWaiting) {
    clearTimeout(delayTimeout);
    gameMessage.textContent = 'Oops, too early! Give it another go.';
    gameScreen.classList.remove('waiting');
    isWaiting = false;
  }
});

