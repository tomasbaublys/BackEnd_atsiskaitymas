export type Book = {
  _id: string;
  title: string;
  description: string;
  author: string;
  genres: string[];
  pages: number;
  publishDate: string;
  rating: number;
  amountOfCopies: number;
  imageUrl: string;
};

export type BookContextType = {
  books: Book[];
};

export type BookContextReducerActions = 
  | { type: 'setBooks'; data: Book[] };

export type ChildrenElementProp = {
  children: React.ReactElement;
};
