import React, { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: 0 2rem;
`;

const PageTitle = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageSubtitle = styled.p`
  color: #4a5568;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
`;

const Layout = memo(({ 
  children, 
  title, 
  subtitle, 
  maxWidth,
  showCard = true 
}) => (
  <LayoutWrapper>
    <Header />
    <MainContent>
      <Container maxWidth={maxWidth}>
        {title && <PageTitle>{title}</PageTitle>}
        {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
        
        {showCard ? (
          <ContentCard>
            {children}
          </ContentCard>
        ) : (
          children
        )}
      </Container>
    </MainContent>
    <Footer />
  </LayoutWrapper>
));

Layout.displayName = 'Layout';

export default Layout;