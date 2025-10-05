import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

const LoadingText = styled.p`
  color: #6c757d;
  margin: 0;
  font-size: 16px;
`;

const LoadingSpinner = memo(({ message = 'Carregando...' }) => (
  <LoadingContainer>
    <Spinner />
    <LoadingText>{message}</LoadingText>
  </LoadingContainer>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;