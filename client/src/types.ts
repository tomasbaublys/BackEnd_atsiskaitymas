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

export type BooksContextValues = {
  publishDate_gte?: string;
  publishDate_lte?: string;
  inStock?: boolean;
};

export type BookContextType = {
  books: Book[];
  applyFilter: (values: BooksContextValues) => void;
  applySort: (sortValue: string) => void;
};

export type BookContextReducerActions = 
  | { type: 'setBooks'; data: Book[] };

export type ChildrenElementProp = {
  children: React.ReactElement;
};
