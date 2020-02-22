import React from "react";

import Square from "./Square";
import { boardCreate, squarelike, positions } from "./model";

import { IBoard, Pos, BoardOrSquare, ISquare } from "./types";

const BoardView = ({
  board = boardCreate({}),
  position = "midMid",
  onMark,
  path = []
}: {
  board: IBoard;
  position?: Pos;
  onMark: (path: string[], pos: Pos) => void;
  path?: string[];
}) => (
  <div className="board">
    {positions.map((pos: Pos) => {
      const square: BoardOrSquare | undefined = board.squares[pos];
      if (square === undefined || squarelike(square)) {
        return (
          <Square
            square={board.squares[pos]}
            position={pos}
            onMark={onMark}
            path={path}
            key={[...path, pos].join("-")}
          />
        );
      } else if (square.kind === "board") {
        return (
          <BoardView
            board={square}
            position={pos}
            onMark={onMark}
            path={[...path, pos]}
            key={[...path, pos].join("-")}
          />
        );
      } else {
        return <div>Something isn't right here...</div>;
      }
    })}
  </div>
);

export default BoardView;
