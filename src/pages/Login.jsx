import React, { useState, useCallback, memo } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import { Card, Button, Input } from "../components/UI";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
  min-height: 60vh;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoBox = styled.div`
  background: #e6f3ff;
  border: 1px solid #b3d9ff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #1a365d;
  }

  div {
    font-size: 0.9rem;
    color: #2c5282;
    line-height: 1.4;
  }
`;

const Login = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, clearError } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      clearError();

      try {
        await login(email, password);
        history.push("/admin");
      } catch (error) {
        // Error is handled by context
      }
    },
    [email, password, login, history, clearError]
  );

  return (
    <Layout
      title="Área do Professor"
      subtitle="Faça login para acessar o painel administrativo"
    >
      <LoginContainer>
        <LoginCard
          title="Login"
          description="Entre com suas credenciais para acessar o sistema"
        >
          <LoginForm onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={error && error.includes("email") ? error : ""}
            />

            <Input
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={error && !error.includes("email") ? error : ""}
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </LoginForm>
        </LoginCard>
      </LoginContainer>
    </Layout>
  );
});

Login.displayName = "Login";

export default Login;
