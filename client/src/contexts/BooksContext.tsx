import { createContext, useEffect, useReducer, useRef } from "react";
import {
  Book,
  BookContextType,
  BookContextReducerActions,
  BooksContextValues,
  ChildrenElementProp,
} from "../types";

const reducer = (state: Book[], action: BookContextReducerActions): Book[] => {
  switch (action.type) {
    case "setBooks":
      return action.data;
    default:
      console.error("Unknown reducer action");
      return state;
  }
};

const BooksContext = createContext<BookContextType | undefined>(undefined);

const BooksProvider = ({ children }: ChildrenElementProp) => {
  const [books, dispatch] = useReducer(reducer, []);

  const filterQueryRef = useRef('');
  const sortQueryRef = useRef('');

  const fetchBooks = () => {
    const query = [filterQueryRef.current, sortQueryRef.current]
      .filter(Boolean)
      .join("&");
    const url = `http://localhost:5500/books${query ? `?${query}` : ""}`;

    fetch(url)
      .then((res) => res.json())
      .then((data: Book[]) => dispatch({ type: "setBooks", data }))
      .catch((err) => console.error("Failed to fetch books:", err));
  };

  const applySort = (sortValue: string) => {
    sortQueryRef.current = `sort_rating=${sortValue}`;
    fetchBooks();
  };

  const applyFilter = (values: BooksContextValues) => {
    const filters: string[] = [];

    if (values.publishDate_gte) {
      filters.push(`filter_publishDate_gte=${values.publishDate_gte}`);
    }
    if (values.publishDate_lte) {
      filters.push(`filter_publishDate_lte=${values.publishDate_lte}`);
    }
    if (values.inStock) {
      filters.push(`filter_amountOfCopies_gt=0`);
    }
    filterQueryRef.current = filters.join("&");
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider 
      value={{ 
        books, 
        applySort, 
        applyFilter
      }}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksProvider };
export default BooksContext;
