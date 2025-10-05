import React, { memo } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem 2rem 0;
  border-bottom: ${props => props.noBorder ? 'none' : '1px solid #e2e8f0'};
  margin-bottom: ${props => props.noBorder ? '0' : '1.5rem'};
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 1.4rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  margin: 0;
  color: #718096;
  font-size: 0.95rem;
  padding-bottom: ${props => props.noBorder ? '0' : '1.5rem'};
`;

const CardBody = styled.div`
  padding: ${props => props.noPadding ? '0' : '0 2rem 2rem'};
`;

const CardFooter = styled.div`
  padding: 1rem 2rem;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = memo(({ 
  title, 
  description, 
  children, 
  footer, 
  noBorder = false,
  noPadding = false,
  className 
}) => (
  <CardContainer className={className}>
    {(title || description) && (
      <CardHeader noBorder={noBorder}>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription noBorder={noBorder}>{description}</CardDescription>}
      </CardHeader>
    )}
    
    <CardBody noPadding={noPadding}>
      {children}
    </CardBody>
    
    {footer && (
      <CardFooter>
        {footer}
      </CardFooter>
    )}
  </CardContainer>
));

Card.displayName = 'Card';

export default Card;