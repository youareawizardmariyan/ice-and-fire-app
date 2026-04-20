export type SingleBook = {
  url: string;
  name: string;
  isbn: string;
  authors: Array<string>;
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: string;
  characters: Array<string>;
  povCharacters: Array<string>;
};

export type BooksBEResponse = Array<SingleBook>;
