import { useContext } from "react";
import styled from "styled-components";
import BookContext from "../../contexts/BooksContext";
import { BookContextType } from "../../types";
import BookCard from "../UI/molecules/BookCard";
import BookFilter from "../UI/molecules/BookFilter";
import BookSort from "../UI/molecules/BookSort";

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
`;

const PageLayout = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 280px;
  background-color: #1c1c1c;
  padding: 1rem;
  border-radius: 8px;
  color: white;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
  height: fit-content;

  @media (max-width: 768px) {
    width: 100%;
    position: static;
  }
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

const AllBooks = () => {
  const { books, loading } = useContext(BookContext) as BookContextType;

  return (
    <PageWrapper>
      <Title>All Books ({books.length})</Title>
      <PageLayout>
        <Sidebar>
          <h3>Filter</h3>
          <BookFilter />
          <hr style={{ margin: "1rem 0", borderColor: "#333" }} />
          <h3>Sort</h3>
          <BookSort />
        </Sidebar>

        <MainContent>
          {loading ? (
            <Message>Loading books...</Message>
          ) : books.length > 0 ? (
            <BookList>
              {books.map((book) => (
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

export default AllBooks;
