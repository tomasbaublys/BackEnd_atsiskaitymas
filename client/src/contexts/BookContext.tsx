import { createContext, useEffect, useReducer } from "react";
import { Book, BookContextType, BookContextReducerActions, ChildrenElementProp } from "../types";

const reducer = (state: Book[], action: BookContextReducerActions): Book[] => {
  switch (action.type) {
    case "setBooks":
      return action.data;
    default:
      return state;
  }
};

const BookContext = createContext<BookContextType | undefined>(undefined);

const BookProvider = ({ children }: ChildrenElementProp) => {
  const [books, dispatch] = useReducer(reducer, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5500/books");
      const data: Book[] = await response.json();
      dispatch({ type: "setBooks", data });
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BookContext.Provider value={{ books }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookProvider };
export default BookContext;
