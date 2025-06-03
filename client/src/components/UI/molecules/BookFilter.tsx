import { useFormik } from 'formik';
import { useContext, useMemo, useRef } from "react";
import styled from "styled-components";
import BooksContext from "../../../contexts/BooksContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: white;
`;

const Label = styled.label`
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
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

const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BookFilter = () => {
  const { books, applyFilter } = useContext(BooksContext)!;

  const { minYear, maxYear } = useMemo(() => {
    const years = books
      .map(book => new Date(book.publishDate).getFullYear())
      .filter(year => !isNaN(year));
    const min = years.length ? Math.min(...years) : 1900;
    const max = years.length ? Math.max(...years) : new Date().getFullYear();
    return { minYear: min, maxYear: max };
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

  const handleClear = () => {
    const resetValues = {
      publishDate_gte: defaultRange.current.min,
      publishDate_lte: defaultRange.current.max,
      inStock: false,
    };
    formik.setValues(resetValues);
    applyFilter({
      publishDate_gte: `${resetValues.publishDate_gte}-01-01`,
      publishDate_lte: `${resetValues.publishDate_lte}-12-31`,
      inStock: false,
    });
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div>
        <Label htmlFor="publishDate_gte">Leidimo metai nuo:</Label>
        <Input
          type="number"
          id="publishDate_gte"
          name="publishDate_gte"
          min={defaultRange.current.min}
          max={defaultRange.current.max}
          onChange={formik.handleChange}
          value={formik.values.publishDate_gte}
        />
      </div>

      <div>
        <Label htmlFor="publishDate_lte">Leidimo metai iki:</Label>
        <Input
          type="number"
          id="publishDate_lte"
          name="publishDate_lte"
          min={defaultRange.current.min}
          max={defaultRange.current.max}
          onChange={formik.handleChange}
          value={formik.values.publishDate_lte}
        />
      </div>

      <CheckboxLabel>
        <Input
          type="checkbox"
          name="inStock"
          onChange={formik.handleChange}
          checked={formik.values.inStock}
        />
        Tik turimas knygas
      </CheckboxLabel>

      <ButtonRow>
        <Button type="submit">Filtruoti</Button>
        <Button type="button" onClick={handleClear}>Išvalyti</Button>
      </ButtonRow>
    </Form>
  );
};

export default BookFilter;
