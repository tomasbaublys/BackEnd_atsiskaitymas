import { Link } from "react-router";
import styled from "styled-components";
import { Book } from "../../../types";

type Props = {
  book: Book;
};

const Card = styled.div`
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
  color: #f5c518;
`;

const BookDescription = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.5rem;
`;

const BookAuthor = styled.div`
  font-size: 0.85rem;
  color: #bbb;
  margin-bottom: 0.25rem;
`;

const BookGenres = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.25rem;
`;

const BookDate = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 1rem;
`;

const ReadMore = styled(Link)`
  margin-top: auto;
  text-align: center;
  padding: 0.5rem;
  background-color: #f5c518;
  color: #1f1f1f;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e4b700;
  }
`;

const BookCard = ({ book }: Props) => {
  return (
    <Card>
      <div>
        <BookTitle>{book.title}</BookTitle>
        <BookDescription>{book.description.slice(0, 100)}...</BookDescription>
        <BookAuthor>Author: {book.author}</BookAuthor>
        <BookGenres>Genres: {book.genres.join(", ")}</BookGenres>
        <BookDate>Published: {book.publishDate}</BookDate>
      </div>

      <ReadMore to={`/books/${book._id}`} target="_blank" rel="noopener noreferrer">
        Read more
      </ReadMore>
    </Card>
  );
};

export default BookCard;
