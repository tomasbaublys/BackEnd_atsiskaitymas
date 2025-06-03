import { useContext } from "react";
import styled from "styled-components";
import BookContext from "../../contexts/BooksContext";
import { BookContextType } from "../../types";
import BookCard from "../UI/molecules/BookCard";

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
  align-items: center;
  min-height: 65vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const Message = styled.p`
  color: white;
  text-align: center;
  font-size: 1rem;
`;

const Home = () => {
  const { books, loading } = useContext(BookContext) as BookContextType;

  return (
    <PageWrapper>
      <Title>Welcome to our Book Review site</Title>
      <PageLayout>
        <MainContent>
          {loading ? (
            <Message>Loading books...</Message>
          ) : books.length > 0 ? (
            <BookList>
              {books.slice(0, 4).map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </BookList>
          ) : (
            <Message>No books were found...</Message>
          )}
        </MainContent>
      </PageLayout>
    </PageWrapper>
  );
};

export default Home;
