import { useContext } from "react";
import styled from "styled-components";
import BookContext from "../../contexts/BooksContext";
import { BookContextType } from "../../types";
import BookCard from "../UI/molecules/BookCard";
import CircularProgress from "@mui/material/CircularProgress";

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
`;

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContent = styled.main`
  flex: 1;
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

const Home = () => {
  const { books } = useContext(BookContext) as BookContextType;
  const isLoading = books.length === 0;

  return (
    <PageWrapper>
      <Title>Welcome to our Book Review site</Title>
      <PageLayout>
        <MainContent>
          {isLoading ? (
            <LoaderWrapper>
              <CircularProgress sx={{ color: "#f5c518" }} />
            </LoaderWrapper>
          ) : (
            <BookList>
              {books.slice(0, 4).map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </BookList>
          )}
        </MainContent>
      </PageLayout>
    </PageWrapper>
  );
};

export default Home;
