const board = document.getElementById("board");
const turnInfo = document.getElementById("turn-info");
const result = document.getElementById("result");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0 };
let boardState = Array(9).fill(null);

// Initialize the board
function initBoard() {
  board.innerHTML = "";
  boardState = Array(9).fill(null);
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWinner()) {
    result.textContent = `🎉 Player ${currentPlayer} Wins!`;
    scores[currentPlayer]++;
    updateScore();
    gameActive = false;
  } else if (boardState.every(cell => cell)) {
    result.textContent = "😅 It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnInfo.textContent = `Turn: Player ${currentPlayer}`;
  }
}

// Check for a winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winningCombos.some(combo =>
    combo.every(index => boardState[index] === currentPlayer)
  );
}

// Update score
function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

// Restart game
restartBtn.addEventListener("click", () => {
  currentPlayer = "X";
  gameActive = true;
  result.textContent = "";
  turnInfo.textContent = `Turn: Player ${currentPlayer}`;
  initBoard();
});

// Initialize
initBoard();
