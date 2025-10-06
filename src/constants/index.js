// API Configuration
export const API_CONFIG = {
  BASE_URL: "http://localhost:3333/api",
  DELAY: 500, // Simulation delay in milliseconds
  STORAGE_KEYS: {
    POSTS: "app_posts",
    USER: "app_user",
  },
};

// Default User Credentials
export const DEFAULT_CREDENTIALS = {
  EMAIL: "teacher@example.com",
  PASSWORD: "password",
};

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ADMIN: "/admin",
  CREATE_POST: "/create",
  EDIT_POST: "/edit",
  VIEW_POST: "/post",
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Credenciais inválidas",
  POST_NOT_FOUND: "Post não encontrado",
  REQUIRED_FIELDS: "Título, conteúdo e autor são obrigatórios",
  GENERIC_ERROR: "Ocorreu um erro inesperado",
  NETWORK_ERROR: "Erro de conexão com o servidor",
  API_CONNECTION_ERROR:
    "Não foi possível conectar com a API. Verifique se o servidor está rodando em localhost:3333",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: "Post criado com sucesso!",
  POST_UPDATED: "Post atualizado com sucesso!",
  POST_DELETED: "Post excluído com sucesso!",
  LOGIN_SUCCESS: "Login realizado com sucesso!",
};
