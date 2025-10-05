import React, { memo } from 'react';
import styled, { css } from 'styled-components';

const InputGroup = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
  
  ${props => props.error && css`
    border-color: #e53e3e;
    
    &:focus {
      border-color: #e53e3e;
      box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
  `}
  
  ${props => props.success && css`
    border-color: #38a169;
    
    &:focus {
      border-color: #38a169;
      box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.1);
    }
  `}
  
  ${props => props.disabled && css`
    background-color: #f7fafc;
    cursor: not-allowed;
    opacity: 0.7;
  `}
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
  
  ${props => props.error && css`
    border-color: #e53e3e;
    
    &:focus {
      border-color: #e53e3e;
      box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
  `}
  
  ${props => props.success && css`
    border-color: #38a169;
    
    &:focus {
      border-color: #38a169;
      box-shadow: 0 0 0 3px rgba(56, 161, 105, 0.1);
    }
  `}
  
  ${props => props.disabled && css`
    background-color: #f7fafc;
    cursor: not-allowed;
    opacity: 0.7;
  `}
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
`;

const SuccessMessage = styled.p`
  color: #38a169;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
`;

const HelpText = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
`;

const Input = memo(({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  helpText,
  disabled = false,
  required = false,
  multiline = false,
  rows = 4,
  className,
  id,
  name,
  ...props 
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <InputGroup className={className}>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required && <span style={{ color: '#e53e3e' }}> *</span>}
        </Label>
      )}
      
      <InputContainer>
        {multiline ? (
          <StyledTextarea
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={error}
            success={success}
            disabled={disabled}
            required={required}
            rows={rows}
            {...props}
          />
        ) : (
          <StyledInput
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={error}
            success={success}
            disabled={disabled}
            required={required}
            {...props}
          />
        )}
      </InputContainer>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      {helpText && !error && !success && <HelpText>{helpText}</HelpText>}
    </InputGroup>
  );
});

Input.displayName = 'Input';

export default Input;