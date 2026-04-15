// ===== ESTADO DEL USUARIO =====
let currentUser = null;

// Estado del juego
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
let isAIMode = false;
let isPlayerX = true;

// Combinaciones ganadoras
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Elementos del DOM
const cells = document.querySelectorAll('.cell');
const statusBar = document.getElementById('status');
const btnNew = document.getElementById('btn-new');
const btnReset = document.getElementById('btn-reset');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');
const cardX = document.getElementById('card-x');
const cardO = document.getElementById('card-o');
const modeModal = document.getElementById('modeModal');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const playerNameDisplay = document.getElementById('playerName');
const btnTwoPlayers = document.getElementById('btn-two-players');
const btnVsAI = document.getElementById('btn-vs-ai');
const btnChangeMode = document.getElementById('btn-change-mode');
const btnLogout = document.getElementById('btn-logout');

// Inicializar
initializeApp();

// Event listeners de Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (username) {
    loginUser(username);
  }
});

// Event listeners del Juego
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

btnNew.addEventListener('click', resetGame);
btnReset.addEventListener('click', resetScore);
btnTwoPlayers.addEventListener('click', () => selectMode(false));
btnVsAI.addEventListener('click', () => selectMode(true));
btnChangeMode.addEventListener('click', showModeModal);
btnLogout.addEventListener('click', logout);



// ===== FUNCIONES DE INICIALIZACIÓN =====
function initializeApp() {
  const savedUser = localStorage.getItem('tictacToeUser');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    loginUser(user.name, false);
  } else {
    showLoginModal();
  }
}

function showLoginModal() {
  loginModal.classList.remove('hidden');
}

function hideLoginModal() {
  loginModal.classList.add('hidden');
}

function loginUser(username, saveUser = true) {
  if (saveUser) {
    localStorage.setItem('tictacToeUser', JSON.stringify({ name: username }));
  }
  currentUser = username;
  playerNameDisplay.textContent = username;
  hideLoginModal();
  resetScore(); // Resetear marcador al iniciar sesión
  showModeModal();
}

function logout() {
  if (confirm('¿Quieres cerrar sesión?')) {
    localStorage.removeItem('tictacToeUser');
    currentUser = null;
    scoreX = 0;
    scoreO = 0;
    gameState = ['', '', '', '', '', '', '', '', ''];
    showLoginModal();
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('taken', 'x-cell', 'o-cell', 'winner-cell');
    });
    hideAllModals();
  }
}

function hideAllModals() {
  loginModal.classList.add('hidden');
  modeModal.classList.add('hidden');
}

// ===== FUNCIONES DE MODO DE JUEGO =====
function showModeModal() {
  modeModal.classList.remove('hidden');
}

function hideModeModal() {
  modeModal.classList.add('hidden');
}

function selectMode(aiMode) {
  isAIMode = aiMode;
  hideModeModal();
  
  // Actualizar labels de las tarjetas
  if (isAIMode) {
    cardX.querySelector('.score-label').textContent = 'Tú';
    cardO.querySelector('.score-label').textContent = 'IA';
  } else {
    cardX.querySelector('.score-label').textContent = 'Jugador';
    cardO.querySelector('.score-label').textContent = 'Jugador';
  }
  
  initializeGame();
}

// ===== FUNCIONES DE GAMEPLAY =====
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.i;

  // Validar que la celda esté vacía y el juego esté activo
  if (gameState[index] !== '' || !gameActive) return;

  // En modo IA, solo permitir que el jugador X juegue
  if (isAIMode && currentPlayer !== 'X') return;

  makeMove(index);

  // Si es modo IA y el juego sigue activo, que juegue la IA
  if (isAIMode && gameActive && currentPlayer === 'O') {
    setTimeout(() => {
      const aiMove = getBestMove();
      makeMove(aiMove);
    }, 600); // Delay para que se vea más natural
  }
}

function makeMove(index) {
  // Marcar la celda
  gameState[index] = currentPlayer;
  cells[index].classList.add('taken', currentPlayer.toLowerCase() + '-cell');
  cells[index].textContent = currentPlayer;

  // Verificar ganador
  if (checkWinner()) {
    statusBar.innerHTML = `¡<strong>${currentPlayer}</strong> ganó! 🎉`;
    gameActive = false;
    
    if (currentPlayer === 'X') scoreX++;
    else scoreO++;
    
    updateScore();
    highlightWinner();
    return;
  }

  // Verificar empate
  if (gameState.every(cell => cell !== '')) {
    statusBar.textContent = '¡Empate! 🤝';
    gameActive = false;
    return;
  }

  // Cambiar turno
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      return true;
    }
  }
  return false;
}

function highlightWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      condition.forEach(i => {
        cells[i].classList.add('winner-cell');
      });
      break;
    }
  }
}

function updateStatus() {
  if (gameActive) {
    if (isAIMode) {
      statusBar.innerHTML = currentPlayer === 'X' ? `Tu turno` : `<strong>IA</strong> está pensando...`;
    } else {
      statusBar.innerHTML = `Turno de <strong>${currentPlayer}</strong>`;
    }
    updateActiveCard();
  }
}

function updateActiveCard() {
  cardX.classList.toggle('active', currentPlayer === 'X');
  cardO.classList.toggle('active', currentPlayer === 'O');
}

function updateScore() {
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusBar.innerHTML = isAIMode ? `Tu turno` : `Turno de <strong>X</strong>`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'x-cell', 'o-cell', 'winner-cell');
  });

  updateActiveCard();
}

function resetScore() {
  if (confirm('¿Estás seguro de que quieres reiniciar el marcador?')) {
    scoreX = 0;
    scoreO = 0;
    updateScore();
    resetGame();
  }
}

function initializeGame() {
  updateScore();
  updateActiveCard();
  updateStatus();
}

// ===== ALGORITMO MINIMAX (IA) =====
function minimax(state, depth, isMaximizing) {
  const score = evaluateBoard(state);

  // Casos base
  if (score === 10) return score - depth; // IA ganó
  if (score === -10) return score + depth; // Jugador ganó
  if (isBoardFull(state)) return 0; // Empate

  if (isMaximizing) {
    // IA intenta maximizar (O)
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (state[i] === '') {
        state[i] = 'O';
        const moveScore = minimax(state, depth + 1, false);
        state[i] = '';
        bestScore = Math.max(bestScore, moveScore);
      }
    }
    return bestScore;
  } else {
    // Jugador intenta minimizar (X)
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (state[i] === '') {
        state[i] = 'X';
        const moveScore = minimax(state, depth + 1, true);
        state[i] = '';
        bestScore = Math.min(bestScore, moveScore);
      }
    }
    return bestScore;
  }
}

function getBestMove() {
  let bestScore = -Infinity;
  let bestMove = 0;

  for (let i = 0; i < 9; i++) {
    if (gameState[i] === '') {
      gameState[i] = 'O';
      const score = minimax(gameState, 0, false);
      gameState[i] = '';

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function evaluateBoard(state) {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    const sum = 
      (state[a] === 'O' ? 1 : state[a] === 'X' ? -1 : 0) +
      (state[b] === 'O' ? 1 : state[b] === 'X' ? -1 : 0) +
      (state[c] === 'O' ? 1 : state[c] === 'X' ? -1 : 0);

    if (sum === 3) return 10; // IA ganó
    if (sum === -3) return -10; // Jugador ganó
  }
  return 0; // Neutral
}

function isBoardFull(state) {
  return state.every(cell => cell !== '');
}
