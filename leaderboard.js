
const initialData = {
  reactionTimeScores: [],
  sequenceMemoryScores: [],
  aimTrainerScores: []
};
function initializeLeaderboard() {
  for (const key in initialData) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialData[key]));
    }
  }
}


function getScores(testType) {
  const scores = localStorage.getItem(testType + 'Scores');
  return scores ? JSON.parse(scores) : [];
}
function addScore(testType, name, score) {
  const scores = getScores(testType);
  scores.push({ name, score });

  if (testType === 'reactionTime') {
    scores.sort((a, b) => a.score - b.score);
  } else {
    scores.sort((a, b) => b.score - a.score);
  }
  const topScores = scores.slice(0, 10);
  localStorage.setItem(testType + 'Scores', JSON.stringify(topScores));

  return topScores;
}
function displayLeaderboard(testType) {
  const leaderboardBody = document.getElementById('leaderboardBody');
  leaderboardBody.innerHTML = '';

  const scores = getScores(testType);

  if (scores.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="3" class="no-scores">No scores yet. Be the first to play!</td>`;
    leaderboardBody.appendChild(row);
    return;
  }

  scores.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score}${testType === 'reactionTime' ? ' ms' : ''}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const testType = tab.dataset.test;
      displayLeaderboard(testType);
    });
  });
}
function checkForNewScore() {
  const urlParams = new URLSearchParams(window.location.search);
  const testType = urlParams.get('test');
  const score = urlParams.get('score');

  if (testType && score) {
    const userName = localStorage.getItem('userName') || 'You';
    addScore(testType, userName, parseInt(score));


    const tab = document.querySelector(`.tab-btn[data-test="${testType}"]`);
    if (tab) tab.click();


    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  initializeLeaderboard();
  setupTabs();
  checkForNewScore();


  document.querySelector('.tab-btn[data-test="reactionTime"]').click();
});
