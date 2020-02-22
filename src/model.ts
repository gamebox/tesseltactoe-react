import { Pos, Mark, BoardOrSquare, IBoard, BoardSquares } from "./types";

export const positions: Pos[] = [
  "topLeft",
  "topMid",
  "topRight",
  "midLeft",
  "midMid",
  "midRight",
  "bottomLeft",
  "bottomMid",
  "bottomRight"
];

export const square = (mark?: Mark): BoardOrSquare => ({
  kind: "square",
  owner: mark
});

const wonBy = (markA?: Mark, markB?: Mark, markC?: Mark): Mark | undefined =>
  markA === markB && markB === markC ? markA : undefined;

const winningConditions: Array<[Pos, Pos, Pos]> = [
  ["topLeft", "topMid", "topRight"],
  ["midLeft", "midMid", "midRight"],
  ["bottomLeft", "bottomMid", "bottomRight"],
  ["topLeft", "midLeft", "bottomLeft"],
  ["topMid", "midMid", "bottomMid"],
  ["topRight", "midRight", "bottomRight"],
  ["topRight", "midMid", "bottomLeft"],
  ["topLeft", "midMid", "bottomRight"]
];

const boardSquaresWinner = (squares: BoardSquares): Mark | undefined => {
  const winners = {
    topLeft: squares.topLeft && winner(squares.topLeft),
    topMid: squares.topMid && winner(squares.topMid),
    topRight: squares.topRight && winner(squares.topRight),
    midLeft: squares.midLeft && winner(squares.midLeft),
    midMid: squares.midMid && winner(squares.midMid),
    midRight: squares.midRight && winner(squares.midRight),
    bottomLeft: squares.bottomLeft && winner(squares.bottomLeft),
    bottomMid: squares.bottomMid && winner(squares.bottomMid),
    bottomRight: squares.bottomRight && winner(squares.bottomRight)
  };

  return winningConditions.reduce(
    (acc: Mark | undefined, [a, b, c]: [Pos, Pos, Pos]) => {
      const condsWinners: [Mark?, Mark?, Mark?] = [
        winners[a],
        winners[b],
        winners[c]
      ];
      const w = wonBy(...condsWinners);
      return w === undefined ? acc : w;
    },
    undefined
  );
};

export const boardCreate = (
  squares: BoardSquares,
  level: number = 0
): IBoard => {
  const newBoard: IBoard = {
    kind: "board",
    level,
    squares: positions.reduce((acc: BoardSquares, pos) => {
      acc[pos] = squares[pos] || square();
      return acc;
    }, {})
  };

  const owner = boardSquaresWinner(squares);

  return {
    ...newBoard,
    owner
  };
};

export const mark = (bos: IBoard, pos: Pos, mark: Mark): IBoard => {
  return boardCreate(
    {
      ...bos.squares,
      [pos]: {
        ...(bos.squares[pos] || square()),
        owner: mark
      }
    },
    bos.level
  );
};

export const createBoardOfSquares = (level: number) =>
  positions.reduce(
    (acc, pos) => ({
      ...acc,
      [pos]: boardCreate({}, level)
    }),
    {}
  );

export const winner = (bos: BoardOrSquare): Mark | undefined =>
  bos.owner ??
  (bos && bos.kind === "board" ? boardSquaresWinner(bos.squares) : undefined);

export const squarelike = (bos: BoardOrSquare): boolean => {
  return (
    bos.kind === "square" || (bos.kind === "board" && winner(bos) !== undefined)
  );
};
