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

const Select = styled.select`
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #1f1f1f;
  color: white;
  cursor: pointer;
`;

const Option = styled.option`
  background-color: #1f1f1f;
  color: white;
`;

const BookSort = () => {
  const { applySort } = useContext(BooksContext)!;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    applySort(e.target.value);
  };

  return (
    <Container>
      <Heading>Sort by rating:</Heading>
      <Select onChange={handleChange}>
        <Option value="-1">Highest first ↑</Option>
        <Option value="1">Lowest first ↓</Option>
      </Select>
    </Container>
  );
};

export default BookSort;
