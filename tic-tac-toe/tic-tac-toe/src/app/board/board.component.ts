import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board: string[] = Array(9).fill(null); // The game board
  player: 'X' | 'O' = 'X'; // Track the player's choice
  computer: 'X' | 'O' = 'O'; // Track the computer's choice
  currentPlayer: 'X' | 'O' = 'X'; // Track the current player
  gameWon: boolean = false; // Track if the game is won
  gameStarted: boolean = false; // Track if the game has started
  isDraw: boolean = false;

  choosePlayer(choice: 'X' | 'O'): void {
    this.player = choice;
    this.computer = choice === 'X' ? 'O' : 'X';
    this.currentPlayer = 'X'; // X always starts first
    this.gameStarted = true;

    // If computer is 'X', make the first move
    if (this.computer === 'X') {
      this.computerMove();
    }
  }

  makeMove(index: number): void {
    if (!this.board[index] && !this.gameWon) {
      this.board[index] = this.currentPlayer;
      this.checkGameWon();

      // Switch player if the game is not won
      if (!this.gameWon) {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

        // If it's the computer's turn, make a random move
        if (this.currentPlayer === this.computer) {
          this.computerMove();
        }
      }
    }
  }

  // Method to make a random move for the computer
  computerMove(): void {
    let availableMoves = this.board
        .map((val, idx) => (val === null ? idx : null))
        .filter(val => val !== null);

    if (availableMoves.length > 0) {
      let randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      this.makeMove(randomIndex!);
    }
  }


  checkGameWon(): void {
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

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.gameWon = true;
        return;
      }
    }

    // Check if the board is full and there's no winner
    this.isDraw = this.board.every(cell => cell !== null) && !this.gameWon;
  }
  resetGame(): void {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameWon = false;
    this.isDraw = false;
    this.gameStarted = false;
  }

}
