import React, { memo } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #2d3748;
  color: #e2e8f0;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: #cbd5e0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const Footer = memo(() => (
  <FooterContainer>
    <FooterContent>
      <FooterText>
        © 2025 Portal do Aluno - Plataforma Educacional
      </FooterText>
      <FooterLinks>
        <FooterLink href="#sobre">Sobre</FooterLink>
        <FooterLink href="#contato">Contato</FooterLink>
        <FooterLink href="#ajuda">Ajuda</FooterLink>
        <FooterLink href="#privacidade">Privacidade</FooterLink>
      </FooterLinks>
      <FooterText>
        Desenvolvido com ❤️ para educação
      </FooterText>
    </FooterContent>
  </FooterContainer>
));

Footer.displayName = 'Footer';

export default Footer;