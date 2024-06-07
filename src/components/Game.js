import React, { useState, useEffect } from "react";
import Board from "./Board";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    socket.on("move", handleMove);
    return () => socket.off("move", handleMove);
  }, []);

  const handleMove = (newSquares) => {
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    socket.emit("move", newSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="mb-4 text-2xl">{status}</div>
      <Board squares={squares} onClick={handleClick} />
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
