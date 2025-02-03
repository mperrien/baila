export interface Entry {
  id: string;
  created_at: string;
  sentence: string;
  first_word: string;
  second_word: string;
  third_word: string;
}

export interface stats {
  first: {
    et: number;
    mais: number;
  };
  second: {
    amour: number;
    amor: number;
    mort: number;
  };
  third: {
    mathia: number;
    mathias: number;
    marcia: number;
  };
}

export interface WordStats {
  [key: string]: number;
}
