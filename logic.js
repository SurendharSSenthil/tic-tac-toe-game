
document.addEventListener('DOMContentLoaded', () => {
    //the necessary elements
    const squares = document.querySelectorAll('.square');
    const menu = document.querySelector('.menu');
    const resetBtn = document.querySelector('.resetBtn');
    const replayBtn = document.querySelector('.replayBtn');
    const main = document.querySelector('.full');
    let currentPlayer = 1;
    let player1Score = 0;
    let player2Score = 0;
    let tieScore = 0;

     //Displaying reset and restart buttons
     menu.addEventListener('click',() => {
      menu.classList.toggle('borderperfect');
      resetBtn.classList.toggle('hidden');
      replayBtn.classList.toggle('hidden');
  });
  
    // Add event listener to each square
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        if (square.classList.contains('fa-x')||square.classList.contains('fa-o')) {
          return;
        }
        else{
          currentPlayer === 1 ? (square.classList.add('fa-light','fa-x')):(square.classList.add('fa-light','fa-o'));
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
    
      for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        const [a, b, c] = combination;
        const squareA = squares[a].className.split(' ');
        const squareB = squares[b].className.split(' ');
        const squareC = squares[c].className.split(' ');
        const squareA1 = squareA[3];
        const squareB1 = squareB[3];
        const squareC1 = squareC[3];
        if (
          squareA1 === squareB1 &&
          squareB1 === squareC1 &&
          squareA1 === (player === 1 ? 'fa-x' : 'fa-o')
        ) {
          return true; // Found a winning combination
        }
      }
      return false; // No winning combination found
    }
    
    // Function to check for a tie
    function checkTie() {
      return [...squares].every(square => {
        if(square.classList.contains('fa-x') || square.classList.contains('fa-o'))
        {
          return true;
        }
        return false;
      });
    }
  
    // Function to update the current player display
    function updateCurrentPlayer() {
      const playerElement = document.querySelector('.player');
      playerElement.classList.toggle('fa-x');
      playerElement.classList.toggle('fa-o');
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
      if(player1Score >= 5 || player2Score >= 5)
      {
        const finalWin = document.getElementById('finalwin');
        main.classList.add('win');
        finalWin.classList.toggle('hidden');
        finalWin.textContent=`  -player ${currentPlayer} is the winner!`;
        finalWin.classList.add(currentPlayer === 1 ? 'fa-x' : 'fa-o');
      }
    }
  
    // Function to reset the board
    function resetBoard() {
      squares.forEach((square) => {
        square.textContent = '';
        square.className = '';
        square.classList.add('square');
        square.classList.add('button');
      });
  
      currentPlayer = 1;
      updateCurrentPlayer();
    }
  
    // Initial setup
    updateCurrentPlayer();
    updateScores();
  });
