# 📚 Portal do Aluno - Tech Challenge Fase 3

Aplicação web educacional desenvolvida em React para professores e professoras da rede pública, com o objetivo de facilitar a gestão e visualização de conteúdo educacional. Este frontend foi construído utilizando React, styled-components e integração com API REST, oferecendo uma interface moderna e responsiva.

---

## 🚀 Tecnologias Utilizadas

- **React** `v17.0.2`
- **React Router DOM** `v5.3.0`
- **Styled Components** `v5.3.0`
- **Context API** (Gerenciamento de estado)
- **React Scripts** `v5.0.1`
- **JavaScript ES6+**
- **CSS3** e **Flexbox/Grid**
- **Fetch API** (Requisições HTTP)
- **LocalStorage** (Persistência local)

---

## 🏠 Arquitetura da Aplicação

```
src/
├── components/            # Componentes reutilizáveis
│   ├── AdminPanel/       # Painel administrativo
│   ├── ErrorBoundary/    # Tratamento de erros
│   ├── Layout/           # Layout base da aplicação
│   ├── LoadingSpinner/   # Indicador de carregamento
│   ├── PostEdit/         # Edição de posts
│   ├── PostForm/         # Formulário de posts
│   ├── PostList/         # Listagem de posts
│   ├── PostRead/         # Visualização de posts
│   ├── PostSearch/       # Busca de posts
│   └── UI/               # Componentes de interface
├── contexts/             # Context API para estado global
│   ├── AuthContext.js    # Contexto de autenticação
│   └── PostContext.js    # Contexto de posts
├── hooks/                # Custom hooks
│   ├── useAuth.js        # Hook de autenticação
│   └── useLocalStorage.js # Hook de localStorage
├── pages/                # Páginas da aplicação
│   ├── Admin.jsx         # Área administrativa
│   ├── CreatePost.jsx    # Criação de posts
│   ├── EditPost.jsx      # Edição de posts
│   ├── Home.jsx          # Página inicial
│   ├── Login.jsx         # Login do professor
│   └── Post.jsx          # Visualização de post
├── api/                  # Camada de integração com API
│   └── posts.js          # Requisições para API
├── constants/            # Constantes da aplicação
│   └── index.js          # Configurações e mensagens
├── styles/               # Estilos globais
│   └── GlobalStyles.js   # Reset CSS e estilos base
└── utils/                # Utilitários e helpers
    └── index.js          # Funções auxiliares
```

---

## ✨ Funcionalidades Implementadas

### 🔐 **Autenticação**

- Login seguro para professores
- Controle de acesso às áreas administrativas
- Persistência de sessão
- Logout com limpeza de dados

### 📝 **Gestão de Posts**

- ✅ Criação de posts educacionais
- ✅ Edição de posts existentes
- ✅ Exclusão de posts
- ✅ Visualização completa de posts
- ✅ Listagem com paginação

### 🔍 **Busca e Filtros**

- Busca por título, autor ou matéria
- Filtros em tempo real
- Resultados destacados

### 📱 **Interface Responsiva**

- Design adaptativo para desktop e mobile
- Componentes estilizados com styled-components
- Navegação intuitiva
- Feedback visual para ações

### 🔗 **Integração com API**

- Comunicação com backend via REST API
- Tratamento robusto de erros
- Loading states em todas as operações
- Fallback para dados offline

---

## 🛠️ Scripts Disponíveis

| Comando         | Descrição                               |
| --------------- | --------------------------------------- |
| `npm start`     | Inicia o servidor de desenvolvimento    |
| `npm run build` | Gera build de produção                  |
| `npm test`      | Executa testes unitários                |
| `npm run eject` | Ejeta configurações do Create React App |

---

## 🚦 Como Executar o Projeto

### 1. **Pré-requisitos**

```bash
# Node.js v14 ou superior
node --version

# npm ou yarn
npm --version
```

### 2. **Instalação**

```bash
# Clone o repositório
git clone <repository-url>

# Entre no diretório
cd techchallenger-portal-aluno-front2

# Instale as dependências
npm install
```

### 3. **Configuração da API**

Certifique-se de que a API backend está rodando em `http://localhost:3333`

### 4. **Execução**

```bash
# Modo desenvolvimento
npm start

# Acesse http://localhost:3000
```

---

## 🔗 Integração com Backend

### **Endpoints Utilizados**

| Método | Endpoint         | Descrição            |
| ------ | ---------------- | -------------------- |
| GET    | `/api/posts`     | Lista todos os posts |
| GET    | `/api/posts/:id` | Busca post por ID    |
| POST   | `/api/posts`     | Cria novo post       |
| PATCH  | `/api/posts/:id` | Atualiza post        |
| DELETE | `/api/posts/:id` | Remove post          |

### **Estrutura de Dados**

```javascript
// Post enviado para API
{
  "title": "Título do Post",
  "content": "Conteúdo educacional completo...",
  "author": "Nome do Professor",
  "subject": "Matemática"
}

// Post recebido da API
{
  "_id": "objectId",
  "title": "Título do Post",
  "content": "Conteúdo educacional completo...",
  "author": "Nome do Professor",
  "subject": "Matemática",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

---

## 👥 Fluxo de Usuário

### **Área Pública**

1. **Home** → Visualização de posts publicados
2. **Busca** → Filtrar posts por critérios
3. **Leitura** → Visualizar conteúdo completo

### **Área Administrativa**

1. **Login** → Autenticação com credenciais
2. **Dashboard** → Gerenciar todos os posts
3. **CRUD** → Criar, editar e excluir posts
4. **Formulários** → Interface amigável para gestão

### **Credenciais de Teste**

```
Email: teacher@example.com
Senha: password
```

---

## 🎨 Design System

### **Paleta de Cores**

- **Primária**: #007bff (Azul)
- **Secundária**: #6c757d (Cinza)
- **Sucesso**: #28a745 (Verde)
- **Alerta**: #ffc107 (Amarelo)
- **Erro**: #dc3545 (Vermelho)

### **Componentes UI**

- **Card**: Container base para conteúdo
- **Button**: Botões com variações de estilo
- **Input**: Campos de formulário padronizados
- **LoadingSpinner**: Indicadores de carregamento

---

## 🔧 Gerenciamento de Estado

### **Context API**

- **AuthContext**: Autenticação e autorização
- **PostContext**: Gestão de posts e operações CRUD

### **Custom Hooks**

- **useAuth**: Lógica de autenticação
- **useLocalStorage**: Persistência local de dados
- **usePosts**: Operações com posts

---

## 🚨 Tratamento de Erros

### **Estratégias Implementadas**

- **ErrorBoundary**: Captura erros de renderização
- **Try/Catch**: Tratamento de erros de API
- **Fallbacks**: Estados alternativos para falhas
- **Mensagens**: Feedback claro para usuário

### **Logs de Debug**

- Console logs para requisições de API
- Rastreamento de estado da aplicação
- Monitoramento de performance

---

## 📱 Responsividade

### **Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Técnicas Utilizadas**

- CSS Grid e Flexbox
- Media queries nos styled-components
- Navegação adaptativa
- Componentes que se adaptam ao tamanho da tela

---

## 🎯 Desafios e Soluções

### **Integração Frontend-Backend**

- **Desafio**: Adaptar dados entre frontend e API
- **Solução**: Funções de transformação de dados

### **Gerenciamento de Estado**

- **Desafio**: Compartilhar estado entre componentes
- **Solução**: Context API com reducers

### **Autenticação**

- **Desafio**: Controle de acesso seguro
- **Solução**: Sistema de contexto de autenticação

### **Performance**

- **Desafio**: Carregamento rápido da aplicação
- **Solução**: Lazy loading e memo para componentes

---

## 👥 Equipe de Desenvolvimento

- **Gabriel Silvio** – Desenvolvedor Full Stack
- **Thais Santos** – Desenvolvedor Full Stack
- **Caio Manhães** – Desenvolvedor Full Stack

---

## 📦 Requisitos Atendidos

- ✅ **Interface React** responsiva e moderna
- ✅ **Integração com API REST** do backend
- ✅ **Autenticação** de professores
- ✅ **CRUD completo** de posts educacionais
- ✅ **Busca e filtros** de conteúdo
- ✅ **Design responsivo** para múltiplos dispositivos
- ✅ **Tratamento de erros** robusto
- ✅ **Estado global** gerenciado com Context API
- ✅ **Roteamento** com React Router
- ✅ **Componentização** reutilizável

---

## 🔄 Integração Contínua

### **Deploy e Build**

- Build otimizado para produção
- Compressão de assets
- Otimização de bundle

### **Qualidade de Código**

- Componentes funcionais com hooks
- Padrões de código consistentes
- Documentação inline

---

## 📄 Apresentação em Vídeo

[🔗 Link para vídeo de apresentação e demonstração do projeto] <!-- Substitua com o link do vídeo gravado -->

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

## 🔗 Links Úteis

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3333
- **Documentação da API**: http://localhost:3333/api-docs

---

> "Desenvolvido como parte do Tech Challenge da Pós Tech FIAP + Alura – Fase 3"
>
> "Frontend React integrado com API REST para gestão de conteúdo educacional"
