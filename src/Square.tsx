import React from "react";
import { winner } from "./model";
import { BoardOrSquare, Pos } from "./types";

const Square = ({
  square,
  position,
  onMark,
  path
}: {
  square?: BoardOrSquare;
  position: Pos;
  onMark: (path: string[], pos: Pos) => void;
  path: string[];
}) => {
  if (square === undefined) {
    return <div className="square"></div>;
  } else {
    const owner = winner(square);
    const ownerClass = owner !== undefined ? `won-${owner.toLowerCase()}` : "";
    return (
      <div
        className={`square ${ownerClass}`}
        onClick={() => onMark(path, position)}
      >
        {winner(square)}
      </div>
    );
  }
};

export default Square;
