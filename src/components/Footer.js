import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background: #333;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
`;

const Footer = () => (
  <FooterSection>
    <p>&copy; 2024 Rabbiya Jehangir</p>
  </FooterSection>
);

export default Footer;
