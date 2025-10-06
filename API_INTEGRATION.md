# Integração com API - Portal do Aluno

## ✅ Configuração Realizada

O frontend foi modificado para se conectar com a API real em `localhost:3333` ao invés de usar dados mockados.

### 🔧 Mudanças Implementadas

#### 1. **Arquivo de API (`src/api/posts.js`)**

- ✅ Substituído sistema mock por chamadas HTTP reais
- ✅ Adicionada URL base: `http://localhost:3333/api`
- ✅ Implementadas funções para todos os endpoints:
  - `fetchPosts()` - GET /api/posts
  - `fetchPostById(id)` - GET /api/posts/:id
  - `createPost(post)` - POST /api/posts
  - `updatePost(id, post)` - PATCH /api/posts/:id
  - `deletePost(id)` - DELETE /api/posts/:id

#### 2. **Tratamento de Dados**

- ✅ Transformação de dados da API para formato esperado pelo frontend
- ✅ Mapeamento de `_id` (MongoDB) para `id`
- ✅ Geração automática de `description` baseada no `content`
- ✅ Suporte ao campo `subject` (matéria/disciplina)

#### 3. **Formulário de Post**

- ✅ Adicionado campo "Matéria/Disciplina" no formulário
- ✅ Validação de campos obrigatórios
- ✅ Compatibilidade com estrutura da API

#### 4. **Lista de Posts**

- ✅ Exibição do campo `subject`
- ✅ Filtro de busca inclui matéria
- ✅ Layout responsivo mantido

#### 5. **Tratamento de Erros**

- ✅ Mensagens específicas para problemas de conexão
- ✅ Fallback para quando API não está disponível
- ✅ Logs detalhados para debugging

## 🚀 Como Usar

### 1. **Iniciar a API Backend**

```bash
# No diretório da API
docker-compose up --build
# OU
npm run start:dev
```

A API deve estar rodando em `http://localhost:3333`

### 2. **Iniciar o Frontend**

```bash
# No diretório do frontend
npm start
```

O frontend rodará em `http://localhost:3000`

### 3. **Testar Conexão**

- Acesse `http://localhost:3000`
- Clique em "Ver Posts" para carregar da API
- Login: `teacher@example.com` / `password`
- Teste criar, editar e deletar posts

## 📋 Estrutura de Dados

### Post (API → Frontend)

```javascript
// Dados recebidos da API
{
  "_id": "ObjectId",
  "title": "Título do Post",
  "content": "Conteúdo completo...",
  "author": "Nome do Autor",
  "subject": "Matemática",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}

// Transformados para o frontend
{
  "id": "ObjectId",
  "title": "Título do Post",
  "content": "Conteúdo completo...",
  "description": "Conteúdo completo... (primeiros 150 chars)",
  "author": "Nome do Autor",
  "subject": "Matemática",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

### Post (Frontend → API)

```javascript
// Enviado para a API
{
  "title": "Título do Post",
  "content": "Conteúdo completo...",
  "author": "Nome do Autor",
  "subject": "Matemática"
}
```

## 🛠️ Endpoints Utilizados

| Método | Endpoint         | Descrição             |
| ------ | ---------------- | --------------------- |
| GET    | `/api/posts`     | Lista todos os posts  |
| GET    | `/api/posts/:id` | Busca post específico |
| POST   | `/api/posts`     | Cria novo post        |
| PATCH  | `/api/posts/:id` | Atualiza post         |
| DELETE | `/api/posts/:id` | Remove post           |

## 🐛 Troubleshooting

### Erro de Conexão

Se aparecer "Erro de conexão com o servidor":

1. Verifique se a API está rodando em `localhost:3333`
2. Teste: `curl http://localhost:3333/api/posts`
3. Verifique logs do Docker/API

### CORS Issues

Se houver problemas de CORS, certifique-se que a API permite origem `http://localhost:3000`

### Dados não aparecem

1. Verifique se há posts no banco de dados
2. Abra DevTools → Network → veja as requisições
3. Verifique console para erros de JavaScript

## 📝 Próximos Passos

- [ ] Implementar autenticação real na API
- [ ] Adicionar paginação na listagem
- [ ] Implementar cache de dados
- [ ] Adicionar loading states mais específicos
- [ ] Implementar retry automático em falhas
