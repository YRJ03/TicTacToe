import { useState } from 'react';
import './App.css';

const TicTacToe = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState(null);

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBoxClick = (index) => {
    if (boxes[index] === "" && winner === null) {
      const newBoxes = [...boxes];
      newBoxes[index] = currentPlayer;
      setBoxes(newBoxes);
      setCount(count + 1);

      if (checkWinner(newBoxes)) {
        setWinner(currentPlayer);
        return;
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (newBoxes) => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (newBoxes[a] && newBoxes[a] === newBoxes[b] && newBoxes[a] === newBoxes[c]) {
        return true;
      }
    }
    if (count === 8) {
      setWinner("Draw");
    }
    return false;
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(""));
    setCurrentPlayer("X");
    setCount(0);
    setWinner(null);
  };

  return (
    <div className="ticTac">
      <h1 className={winner ? (winner === "Draw" ? "draw" : "winner") : ""}>
        {winner ? (winner === "Draw" ? "Match Draw" : `Winner is ${winner}`) : `Tic Tac Toe`}
      </h1>
      <div className="board">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`box ${box !== "" ? "filled" : ""} ${box === "X" ? "player-x" : box === "O" ? "player-o" : ""}`}
            onClick={() => handleBoxClick(index)}
          >
            {box}
          </div>
        ))}
      </div>
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
