const { SnakeLaddersGame } = require("./index.js");

const rollDie = () => Math.floor(Math.random() * 6 + 1);

let playerNames = ["Alice", "Bob", "Charlie", "Diana"];
const game = new SnakeLaddersGame(playerNames);

console.log("Game has started!");

function playGame() {
  let currentPlayerIndex = 0;
  while (game.board.get("gameStatus") === "In progress") {
    const currentPlayerName = playerNames[currentPlayerIndex];
    const roll = rollDie();

    console.log(`${currentPlayerName} rolled: ${roll}`);
    const [status, messageOrBoard] = game.play(currentPlayerName, roll);

    console.log(status);
    console.log(messageOrBoard);

    currentPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
  }

  console.log(game.board.get("gameStatus"));
}

playGame();
