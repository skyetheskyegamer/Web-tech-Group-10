// Default data (used only on first visit)
const initialData = {
  reactionTimeScores: [],
  sequenceMemoryScores: [],
  aimTrainerScores: []
};

// Initialize leaderboard with empty arrays if not present
function initializeLeaderboard() {
  for (const key in initialData) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialData[key]));
    }
  }
}

// Fetch scores from localStorage
function getScores(testType) {
  const scores = localStorage.getItem(testType + 'Scores');
  return scores ? JSON.parse(scores) : [];
}

// Add a new score to the leaderboard
function addScore(testType, name, score) {
  const scores = getScores(testType);
  scores.push({ name, score });

  // Sort: low-to-high for reactionTime, high-to-low for others
  if (testType === 'reactionTime') {
    scores.sort((a, b) => a.score - b.score);
  } else {
    scores.sort((a, b) => b.score - a.score);
  }

  const topScores = scores.slice(0, 10);
  localStorage.setItem(testType + 'Scores', JSON.stringify(topScores));

  return topScores;
}

// Display scores in leaderboard table
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

// Handle tab switching
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

// Process score from query params
function checkForNewScore() {
  const urlParams = new URLSearchParams(window.location.search);
  const testType = urlParams.get('test');
  const score = urlParams.get('score');

  if (testType && score) {
    const userName = localStorage.getItem('userName') || 'You';
    addScore(testType, userName, parseInt(score));

    // Auto-select corresponding tab
    const tab = document.querySelector(`.tab-btn[data-test="${testType}"]`);
    if (tab) tab.click();

    // Remove score from URL to prevent re-submission
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, document.title, url);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeLeaderboard();
  setupTabs();
  checkForNewScore();

  // Default tab if nothing else is selected
  document.querySelector('.tab-btn[data-test="reactionTime"]').click();
});
