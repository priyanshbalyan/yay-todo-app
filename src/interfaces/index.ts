export interface Todo {
  _id: string;
  text: string;
  isDone: boolean;
  createdAt: number;
  username: string;
}

export type FilterType = "all" | "done" | "undone";
