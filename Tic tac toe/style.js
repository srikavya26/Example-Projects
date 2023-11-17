document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const messageElement = document.getElementById("message");
    const cells = [];

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }

    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            cells[index].classList.add("animate");

            setTimeout(() => cells[index].classList.remove("animate"), 300);

            currentPlayer = currentPlayer === "X" ? "O" : "X";

            if (checkWinner()) {
                displayMessage(`Player ${currentPlayer === "X" ? "O" : "X"} wins!`);
                resetGameWithDelay();
            } else if (gameBoard.every(cell => cell !== "")) {
                displayMessage("It's a tie!");
                resetGameWithDelay();
            }
        }
    }

    function displayMessage(message) {
        messageElement.textContent = message;
        messageElement.classList.add("animate");
        setTimeout(() => {
            messageElement.classList.remove("animate");
            messageElement.textContent = "";
        }, 3000);
    }
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }
    function resetGameWithDelay() {
        setTimeout(() => {
            resetGame();
        }, 3000);
    }
    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
    }
});
