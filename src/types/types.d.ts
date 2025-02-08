export interface Char {
  char: string;
  isUserTyped: boolean;
}

export type WordBoundary = {
  start: number;
  end: number;
};
