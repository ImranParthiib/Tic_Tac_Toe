import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((square, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
