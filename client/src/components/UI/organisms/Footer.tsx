import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #121212;
  color: #bbb;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.85rem;
  margin-top: auto;
`;

const FooterLinks = styled.div`
  margin-top: 0.5rem;
  a {
    color: #f5c518;
    margin: 0 0.5rem;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #bbb;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>© {new Date().getFullYear()} Public Library • All rights reserved.</div>
      <div>Working hours: Mon–Fri 10:00–18:00 | Sat 10:00–14:00</div>
      <div>Address: Freedom Blvd. 123, Vilnius, Lithuania</div>
      <FooterLinks>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
      </FooterLinks>
    </FooterWrapper>
  );
};

export default Footer;
