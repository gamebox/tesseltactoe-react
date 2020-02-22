export type Mark = "X" | "O";
export type Pos =
  | "topLeft"
  | "topMid"
  | "topRight"
  | "midLeft"
  | "midMid"
  | "midRight"
  | "bottomLeft"
  | "bottomMid"
  | "bottomRight";

export type IBoard = {
  kind: "board";
  squares: Partial<Record<Pos, BoardOrSquare>>;
  level: number;
  owner?: Mark;
};

export type ISquare = {
  kind: "square";
  owner: Mark | undefined;
};

export type BoardOrSquare = IBoard | ISquare;

export type BoardSquares = Partial<Record<Pos, BoardOrSquare>>;
