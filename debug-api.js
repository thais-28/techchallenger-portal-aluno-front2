// Teste simples para verificar se a API está funcionando
// Execute este código no console do navegador em http://localhost:3000

console.log("🧪 Testando conexão com a API...");

// Teste simples de fetch
fetch("http://localhost:3333/api/posts")
  .then((response) => {
    console.log("✅ Resposta recebida:", response.status);
    return response.json();
  })
  .then((data) => {
    console.log("📄 Dados recebidos:", data);
    console.log(
      "📊 Número de posts:",
      Array.isArray(data) ? data.length : "Não é array"
    );
  })
  .catch((error) => {
    console.error("❌ Erro na requisição:", error);
    console.error("💡 Verifique se a API está rodando em localhost:3333");
  });

// Teste com a função do próprio frontend
if (window.fetch) {
  console.log("🌐 Fetch disponível no navegador");
} else {
  console.error("❌ Fetch não disponível");
}

// Verificar se há problemas de CORS
console.log("🔍 Verificando configurações de CORS...");
fetch("http://localhost:3333/api/posts", {
  method: "OPTIONS",
})
  .then((response) => {
    console.log("✅ OPTIONS response:", response.status);
    console.log("🎯 Headers CORS:", {
      "Access-Control-Allow-Origin": response.headers.get(
        "Access-Control-Allow-Origin"
      ),
      "Access-Control-Allow-Methods": response.headers.get(
        "Access-Control-Allow-Methods"
      ),
      "Access-Control-Allow-Headers": response.headers.get(
        "Access-Control-Allow-Headers"
      ),
    });
  })
  .catch((error) => {
    console.error("❌ Erro no OPTIONS:", error);
  });
