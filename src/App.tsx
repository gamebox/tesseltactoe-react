import React from "react";
import iassign from "immutable-assign";
import _get from "lodash.get";

import BoardView from "./Board";
import {
  boardCreate,
  mark,
  winner,
  createBoardOfSquares,
  square
} from "./model";

import "./App.css";
import "./index.scss";
import { IBoard, Mark } from "./types";

type UseStateTuple<T> = [T, (newState: T) => void];

export default () => {
  const [board, setBoard]: UseStateTuple<IBoard> = React.useState(
    boardCreate({})
  );
  const [player, setPlayer]: UseStateTuple<Mark> = React.useState("X" as Mark);
  const [score, setScore]: UseStateTuple<
    { [M in Mark]: number }
  > = React.useState({ X: 0, O: 0 });
  const [zoom, setZoom]: UseStateTuple<number> = React.useState(board.level);
  const gameWinner = winner(board);

  console.log(gameWinner || "No winner");

  return (
    <>
      {gameWinner ? <div className="winner">{gameWinner} Wins!</div> : null}
      <BoardView
        board={board}
        onMark={
          gameWinner
            ? () => {}
            : (path, pos) => {
                const squareToClick = _get(
                  board,
                  [...path, pos]
                    .map(segment => `squares["${segment}"]`)
                    .join(".")
                );
                if (winner(squareToClick) !== undefined) {
                  return;
                }
                const newBoard = iassign(
                  board,
                  b => {
                    return path.length > 0
                      ? _get(
                          b,
                          path.map(segment => `squares["${segment}"]`).join(".")
                        )
                      : b;
                  },
                  b => {
                    if (winner(b.squares[pos]) !== undefined) {
                      return b;
                    }
                    return mark(b, pos, player);
                  }
                );
                if (winner(newBoard)) {
                  setScore({
                    ...score,
                    [player]: score[player] + 3 * (newBoard.level + 1)
                  });
                  setBoard(
                    boardCreate(
                      {
                        ...createBoardOfSquares(newBoard.level),
                        midMid: newBoard
                      },
                      newBoard.level + 1
                    )
                  );
                } else {
                  setScore({ ...score, [player]: score[player] + 1 });
                  setBoard(newBoard);
                }
                setPlayer(player === "X" ? "O" : "X");
              }
        }
      />
      <div className="score">
        <div className="player">
          <span className={`player-x ${player === "X" ? "currentPlayer" : ""}`}>
            X
          </span>
          {score["X"]}
        </div>
        <div className="player">
          {score["O"]}
          <span className={`player-o ${player === "O" ? "currentPlayer" : ""}`}>
            O
          </span>
        </div>
      </div>
    </>
  );
};
