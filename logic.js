
document.addEventListener('DOMContentLoaded', () => {
    //the necessary elements
    const squares = document.querySelectorAll('.square');
    const resetBtn = document.querySelector('.resetBtn');
    const replayBtn = document.querySelector('.replayBtn');
  
    let currentPlayer = 1;
    let player1Score = 0;
    let player2Score = 0;
    let tieScore = 0;
  
    // Add event listener to each square
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        if (square.textContent === '') {
          square.textContent = currentPlayer === 1 ? 'X' : 'O';
          square.classList.add(currentPlayer === 1 ? 'player1' : 'player2');
  
          // Check for a winner
          if (checkWinner(currentPlayer)) {
            currentPlayer === 1 ? player1Score++ : player2Score++;
            updateScores();
            resetBoard();
            return;
          }
  
          // Check for a tie
          if (checkTie()) {
            tieScore++;
            updateScores();
            resetBoard();
            return;
          }
  
          currentPlayer = currentPlayer === 1 ? 2 : 1;
          updateCurrentPlayer();
        }
      });
    });
  
    // Reset button click event
    resetBtn.addEventListener('click', () => {
      resetBoard();
    });
  
    // Replay button click event
    replayBtn.addEventListener('click', () => {
      resetBoard();
      player1Score = 0;
      player2Score = 0;
      tieScore = 0;
      updateScores();
    });
  
    // Function to check for a winner
    function checkWinner(player) {
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
      
        return winningCombinations.some(combination => {
          const [a, b, c] = combination;
          const squareA = squares[a].textContent;
          const squareB = squares[b].textContent;
          const squareC = squares[c].textContent;
      
          return squareA === squareB && squareB === squareC && squareA === (player === 1 ? 'X' : 'O');
        });
      }
  
    // Function to check for a tie
    function checkTie() {
      return [...squares].every(square => {
        return square.textContent !== '';
      });
    }
  
    // Function to update the current player display
    function updateCurrentPlayer() {
      const playerElement = document.querySelector('.player');
      playerElement.textContent = `player ${currentPlayer}.`;
      playerElement.className = `player player${currentPlayer}`;
    }
  
    // Function to update the scores
    function updateScores() {
      const p1WinsElement = document.querySelector('.p1wins');
      const p2WinsElement = document.querySelector('#p2wins');
      const tiesElement = document.querySelector('.ties');
  
      p1WinsElement.textContent = player1Score;
      p2WinsElement.textContent = player2Score;
      tiesElement.textContent = tieScore;
    }
  
    // Function to reset the board
    function resetBoard() {
      squares.forEach((square) => {
        square.textContent = '';
        square.className = 'square';
      });
  
      currentPlayer = 1;
      updateCurrentPlayer();
    }
  
    // Initial setup
    updateCurrentPlayer();
    updateScores();
  });