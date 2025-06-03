import { useContext } from "react";
import styled from "styled-components";
import BooksContext from "../../../contexts/BooksContext";

const Container = styled.div`
  margin-top: 1rem;
  color: white;
`;

const Heading = styled.h4`
  margin-bottom: 0.5rem;
`;

const SortButton = styled.button`
  background-color: #f5c518;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e4b700;
  }
`;

const BookSort = () => {
  const { applySort } = useContext(BooksContext)!;

  return (
    <Container>
      <Heading>Rikiavimas pagal reitingą:</Heading>
      <SortButton value="1" onClick={applySort}>Aukščiausias pirmas ↑</SortButton>
      <SortButton value="-1" onClick={applySort}>Žemiausias pirmas ↓</SortButton>
    </Container>
  );
};

export default BookSort;
