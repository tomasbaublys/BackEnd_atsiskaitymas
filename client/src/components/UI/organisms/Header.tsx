import { useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import BooksContext from "../../../contexts/BooksContext"; // adjust path if needed

const HeaderWrapper = styled.header`
  background-color: #121212;
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  color: #f5c518;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const NavLink = styled.span`
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #f5c518;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { resetFilters } = useContext(BooksContext)!;

  const goHome = () => navigate("/");

  const goAllBooks = () => {
    resetFilters();
    window.location.href = "/books";
  };

  return (
    <HeaderWrapper>
      <Logo onClick={goHome}>BookReview</Logo>
      <Nav>
        <NavLink onClick={goHome}>Home</NavLink>
        <NavLink onClick={goAllBooks}>All Books</NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
