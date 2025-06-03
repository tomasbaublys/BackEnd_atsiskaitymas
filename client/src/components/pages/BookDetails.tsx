import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Book } from "../../types";

const Wrapper = styled.section`
  max-width: 650px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Card = styled.div`
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 2rem;
  color: white;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  color: #f5c518;
  margin-bottom: 1rem;
  text-align: center;
`;

const InfoBlock = styled.div`
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #bbb;
`;

const Label = styled.span`
  font-weight: bold;
  color: #999;
`;

const Description = styled.p`
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  display: block;
  margin: 1rem auto;
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 6px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: #ccc;
  text-align: center;
`;

const BookDetails = () => {
  const { _id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5500/books/${_id}`)
      .then((res) => res.json())
      .then((data: Book) => {
        setBook(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setIsLoading(false);
      });
  }, [_id]);

  if (isLoading) return <LoadingMessage>Loading book details...</LoadingMessage>;
  if (!book) return <LoadingMessage>Book not found.</LoadingMessage>;

  return (
    <Wrapper>
      <Card>
        {book.imageUrl && <Image src={book.imageUrl} alt={book.title} />}
        <Title>{book.title}</Title>
        <Description>{book.description}</Description>
        <InfoBlock><Label>Author:</Label> {book.author}</InfoBlock>
        <InfoBlock><Label>Genres:</Label> {book.genres.join(", ")}</InfoBlock>
        <InfoBlock><Label>Published:</Label> {book.publishDate}</InfoBlock>
        <InfoBlock><Label>Pages:</Label> {book.pages}</InfoBlock>
        <InfoBlock><Label>Rating:</Label> {book.rating}</InfoBlock>
        <InfoBlock><Label>Copies Available:</Label> {book.amountOfCopies}</InfoBlock>
      </Card>
    </Wrapper>
  );
};

export default BookDetails;
