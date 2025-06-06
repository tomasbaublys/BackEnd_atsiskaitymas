import { createContext, useEffect, useReducer, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  const filterQueryRef = useRef('');
  const sortQueryRef = useRef('');

  const fetchBooks = () => {
    setLoading(true);
    const query = [filterQueryRef.current, sortQueryRef.current]
      .filter(Boolean)
      .join("&");

    const url = `http://localhost:5500/books${query ? `?${query}` : ""}`;

    fetch(url)
      .then((res) => res.json())
      .then((data: Book[]) => {
        dispatch({ type: "setBooks", data });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  };

  const applySort = (sortValue: string) => {
    if (sortValue === "ratingAsc") {
      sortQueryRef.current = "sort_rating=1";
    } else if (sortValue === "ratingDesc") {
      sortQueryRef.current = "sort_rating=-1";
    } else if (sortValue === "yearAsc") {
      sortQueryRef.current = "sort_publishDate=1";
    } else if (sortValue === "yearDesc") {
      sortQueryRef.current = "sort_publishDate=-1";
    } else {
      sortQueryRef.current = "";
    }
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

  const resetFilters = () => {
    filterQueryRef.current = '';
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
        applyFilter,
        resetFilters,
        loading,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksProvider };
export default BooksContext;
