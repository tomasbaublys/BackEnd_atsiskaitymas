import { Link } from "react-router";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: #121212;
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  color: #f5c518;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;

  &:hover {
    color: #f5c518;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo to="/">BookReview</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">All Books</NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
