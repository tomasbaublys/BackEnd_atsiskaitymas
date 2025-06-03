import { useFormik } from "formik";
import { useContext, useMemo, useRef } from "react";
import styled from "styled-components";
import BooksContext from "../../../contexts/BooksContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: white;
`;

const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #1f1f1f;
  color: white;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Button = styled.button`
  background-color: #f5c518;
  padding: 0.4rem 0.8rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: #e4b700;
  }
`;

const BookFilter = () => {
  const { books, applyFilter } = useContext(BooksContext)!;

  const { minYear, maxYear } = useMemo(() => {
    const years = books
      .map((book) => new Date(book.publishDate).getFullYear())
      .filter((year) => !isNaN(year));
    if (years.length === 0) {
      return { minYear: 1900, maxYear: new Date().getFullYear() };
    }
    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years),
    };
  }, [books]);

  const defaultRange = useRef({ min: minYear, max: maxYear });

  const formik = useFormik({
    initialValues: {
      publishDate_gte: minYear,
      publishDate_lte: maxYear,
      inStock: false,
    },
    onSubmit(values) {
      applyFilter({
        publishDate_gte: `${values.publishDate_gte}-01-01`,
        publishDate_lte: `${values.publishDate_lte}-12-31`,
        inStock: values.inStock,
      });
    },
  });

  const handleReset = () => {
    formik.setValues({
      publishDate_gte: defaultRange.current.min,
      publishDate_lte: defaultRange.current.max,
      inStock: false,
    });
    applyFilter({
      publishDate_gte: `${defaultRange.current.min}-01-01`,
      publishDate_lte: `${defaultRange.current.max}-12-31`,
      inStock: false,
    });
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FieldBlock>
        <Label htmlFor="publishDate_gte">Publication year from:</Label>
        <Input
          type="number"
          id="publishDate_gte"
          name="publishDate_gte"
          min={defaultRange.current.min}
          max={defaultRange.current.max}
          onChange={formik.handleChange}
          value={formik.values.publishDate_gte}
        />
      </FieldBlock>

      <FieldBlock>
        <Label htmlFor="publishDate_lte">Publication year to:</Label>
        <Input
          type="number"
          id="publishDate_lte"
          name="publishDate_lte"
          min={defaultRange.current.min}
          max={defaultRange.current.max}
          onChange={formik.handleChange}
          value={formik.values.publishDate_lte}
        />
      </FieldBlock>

      <CheckboxLabel>
        <Input
          type="checkbox"
          name="inStock"
          onChange={formik.handleChange}
          checked={formik.values.inStock}
        />
        Only available books
      </CheckboxLabel>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button type="submit">Apply filter</Button>
        <Button type="button" onClick={handleReset}>
          Reset filter
        </Button>
      </div>
    </Form>
  );
};

export default BookFilter;
