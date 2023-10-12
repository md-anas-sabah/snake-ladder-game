class SnakeLaddersGame {
  constructor(players) {
      this.players = players;
      this.currentPlayerIndex = 0;
      this.board = new Map();
      this.snakes = new Map();
      this.ladders = new Map();
      this.gameHistory = [];
      this.initializeBoard();
  }

  initializeBoard() {
      this.players.forEach(player => this.board.set(player, 1));
      this.board.set("gameStatus", "In progress");

      this.snakes.set(28, 10);
      this.snakes.set(37, 3);
      this.snakes.set(48, 16);
      this.snakes.set(75, 32);
      this.snakes.set(94, 71);
      this.snakes.set(96, 42);

      this.ladders.set(4, 56);
      this.ladders.set(12, 50);
      this.ladders.set(14, 55);
      this.ladders.set(22, 58);
      this.ladders.set(41, 79);
      this.ladders.set(54, 88);
  }

  isValidMove(move) {
      return move >= 1 && move <= 6;
  }

  getGameStatus() {
      for (const [player, position] of this.board.entries()) {
          if (position === 100) {
              return `${player} won the game!`;
          }
      }
      return "In progress";
  }

  makeMove(player, move) {
      const currentPosition = this.board.get(player);
      const nextPosition = currentPosition + move;

      if (this.snakes.has(nextPosition)) {
          console.log(`Fell down from ${nextPosition} to ${this.snakes.get(nextPosition)}`);
          this.board.set(player, this.snakes.get(nextPosition));
      } else if (this.ladders.has(nextPosition)) {
          console.log(`Went up from ${nextPosition} to ${this.ladders.get(nextPosition)}`);
          this.board.set(player, this.ladders.get(nextPosition));
      } else if (nextPosition <= 100) {
          this.board.set(player, nextPosition);
      }

      this.board.set("gameStatus", this.getGameStatus());

      if (move !== 6) {
          this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      }
  }

  play(player, move) {
      if (!this.players.includes(player) || player !== this.players[this.currentPlayerIndex]) {
          return [false, "Invalid player!", this.currentPlayerIndex];
      }

      if (!this.isValidMove(move)) {
          return [false, "Invalid move. Try Again!", this.currentPlayerIndex];
      }

      this.makeMove(player, move);

      this.gameHistory.push(new Map(this.board));

      return [true, this.board, this.players[this.currentPlayerIndex], this.gameHistory];
  }
}

module.exports = { SnakeLaddersGame };
