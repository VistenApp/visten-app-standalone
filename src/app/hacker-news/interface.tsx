export interface Story {
  id: number;
  by: string;
  title: string;
  score: number;
  time: number;
  descendants: number;
  url: string;
  kids: number[];
}

export interface Comment {
  id: number;
  by: string;
  text: string;
  time: number;
  dead?: boolean;
  deleted?: boolean;
  kids?: number[];
}
