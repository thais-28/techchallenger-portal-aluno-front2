import React, { memo } from 'react';
import styled, { css } from 'styled-components';

const buttonVariants = {
  primary: css`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
      transform: translateY(-1px);
    }
  `,
  secondary: css`
    background: #f7fafc;
    color: #4a5568;
    border: 1px solid #e2e8f0;
    
    &:hover:not(:disabled) {
      background: #edf2f7;
      color: #2d3748;
    }
  `,
  success: css`
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
      transform: translateY(-1px);
    }
  `,
  danger: css`
    background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
      transform: translateY(-1px);
    }
  `,
  outline: css`
    background: transparent;
    color: #667eea;
    border: 2px solid #667eea;
    
    &:hover:not(:disabled) {
      background: #667eea;
      color: white;
    }
  `
};

const buttonSizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `
};

const StyledButton = styled.button`
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  ${props => buttonVariants[props.variant || 'primary']}
  ${props => buttonSizes[props.size || 'medium']}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => props.loading && css`
    pointer-events: none;
    opacity: 0.8;
  `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Button = memo(({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className,
  ...props 
}) => (
  <StyledButton
    variant={variant}
    size={size}
    fullWidth={fullWidth}
    loading={loading}
    disabled={disabled || loading}
    onClick={onClick}
    type={type}
    className={className}
    {...props}
  >
    {loading && <LoadingSpinner />}
    {children}
  </StyledButton>
));

Button.displayName = 'Button';

export default Button;