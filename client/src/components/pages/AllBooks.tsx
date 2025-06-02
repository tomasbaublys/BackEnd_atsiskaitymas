import { useContext } from "react";
import styled from "styled-components";
import BookContext from "../../contexts/BookContext";
import { BookContextType } from "../../types";
import BookCard from "../UI/molecules/BookCard";
import CircularProgress from "@mui/material/CircularProgress";

const Wrapper = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

const AllBooks = () => {
  const { books } = useContext(BookContext) as BookContextType;

  const isLoading = books.length === 0;

  return (
    <Wrapper>
      <Title>All Books</Title>

      {isLoading ? (
        <LoaderWrapper>
          <CircularProgress sx={{ color: "#f5c518" }} />
        </LoaderWrapper>
      ) : (
        <BookList>
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </BookList>
      )}
    </Wrapper>
  );
};

export default AllBooks;
