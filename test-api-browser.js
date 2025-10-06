// 🧪 Script de Teste da API - Execute no Console do Navegador
// Abra o DevTools (F12) e cole este código no console

console.log("🧪 Iniciando testes da API...");

const API_BASE_URL = "http://localhost:3333/api";

// Função utilitária para fazer requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return { success: response.ok, data, status: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Teste 1: Listar posts
async function testListPosts() {
  console.log("📋 Teste 1: Listando posts...");
  const result = await apiRequest("/posts");

  if (result.success) {
    console.log(
      "✅ Listagem OK -",
      result.data.posts?.length || "N/A",
      "posts encontrados"
    );
    console.table(result.data.posts || []);
    return result.data.posts || [];
  } else {
    console.error("❌ Erro na listagem:", result.error || result.data);
    return [];
  }
}

// Teste 2: Criar post
async function testCreatePost() {
  console.log("📝 Teste 2: Criando post de teste...");

  const testPost = {
    title: "Post de Teste Frontend",
    content:
      "Este post foi criado pelo teste de integração do frontend com a API.",
    author: "Sistema de Teste",
    subject: "Teste de Integração",
  };

  const result = await apiRequest("/posts", {
    method: "POST",
    body: JSON.stringify(testPost),
  });

  if (result.success) {
    console.log("✅ Criação OK - ID:", result.data._id || result.data.id);
    console.log("📄 Post criado:", result.data);
    return result.data._id || result.data.id;
  } else {
    console.error("❌ Erro na criação:", result.error || result.data);
    return null;
  }
}

// Teste 3: Buscar post por ID
async function testGetPost(id) {
  if (!id) return;

  console.log("🔍 Teste 3: Buscando post por ID...");
  const result = await apiRequest(`/posts/${id}`);

  if (result.success) {
    console.log("✅ Busca OK");
    console.log("📄 Post encontrado:", result.data);
    return result.data;
  } else {
    console.error("❌ Erro na busca:", result.error || result.data);
    return null;
  }
}

// Teste 4: Atualizar post
async function testUpdatePost(id) {
  if (!id) return;

  console.log("✏️ Teste 4: Atualizando post...");

  const updateData = {
    title: "Post de Teste Frontend - ATUALIZADO",
  };

  const result = await apiRequest(`/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });

  if (result.success) {
    console.log("✅ Atualização OK");
    console.log("📄 Post atualizado:", result.data);
    return result.data;
  } else {
    console.error("❌ Erro na atualização:", result.error || result.data);
    return null;
  }
}

// Teste 5: Deletar post
async function testDeletePost(id) {
  if (!id) return;

  console.log("🗑️ Teste 5: Deletando post de teste...");
  const result = await apiRequest(`/posts/${id}`, {
    method: "DELETE",
  });

  if (result.success || result.status === 204) {
    console.log("✅ Exclusão OK");
    return true;
  } else {
    console.error("❌ Erro na exclusão:", result.error || result.data);
    return false;
  }
}

// Executar todos os testes
async function runAllTests() {
  console.log("🚀 Executando todos os testes da API...\n");

  try {
    // Listar posts existentes
    const existingPosts = await testListPosts();
    console.log("\n");

    // Criar post de teste
    const newPostId = await testCreatePost();
    console.log("\n");

    if (newPostId) {
      // Buscar o post criado
      await testGetPost(newPostId);
      console.log("\n");

      // Atualizar o post
      await testUpdatePost(newPostId);
      console.log("\n");

      // Deletar o post de teste
      await testDeletePost(newPostId);
      console.log("\n");
    }

    console.log("🎉 Testes concluídos!");
    console.log("\n📝 Como usar no frontend:");
    console.log("1. A API deve estar rodando em localhost:3333");
    console.log("2. O frontend está em localhost:3000");
    console.log('3. Clique em "Ver Posts" para carregar da API');
    console.log("4. Use login: teacher@example.com / password");
  } catch (error) {
    console.error("💥 Erro durante os testes:", error);
  }
}

// Iniciar testes automaticamente
runAllTests();
