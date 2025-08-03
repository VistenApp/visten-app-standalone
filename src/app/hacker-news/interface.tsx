export interface Story {
  id: number;
  title: string;
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
