import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  &.primary {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
    
    &:hover {
      background: white;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
`;

const Header = memo(() => {
  const history = useHistory();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogoClick = () => {
    history.push('/');
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleAdmin = () => {
    history.push('/admin');
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={handleLogoClick}>
          📚 Portal do Aluno
        </Logo>
        
        <Nav>
          {isAuthenticated ? (
            <UserInfo>
              <span>Olá, {user?.email}</span>
              <NavButton onClick={handleAdmin}>
                📋 Área Admin
              </NavButton>
              <NavButton onClick={handleLogout}>
                🚪 Sair
              </NavButton>
            </UserInfo>
          ) : (
            <>
              <NavButton onClick={handleLogin}>
                🔐 Área do Professor
              </NavButton>
            </>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
});

Header.displayName = 'Header';

export default Header;