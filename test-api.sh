#!/bin/bash

echo "🧪 Testando conexão com a API..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

API_URL="http://localhost:3333/api"

# Teste 1: Verificar se API está rodando
echo -e "${BLUE}1. Verificando se API está rodando...${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/posts" 2>/dev/null)

if [ "$response" = "200" ]; then
    echo -e "${GREEN}✅ API está rodando e respondendo${NC}"
else
    echo -e "${RED}❌ API não está respondendo (código: $response)${NC}"
    echo -e "${YELLOW}💡 Verifique se a API está rodando em localhost:3333${NC}"
    echo -e "${YELLOW}   Comando: docker-compose up --build${NC}"
    exit 1
fi

# Teste 2: Listar posts
echo ""
echo -e "${BLUE}2. Testando listagem de posts...${NC}"
posts_response=$(curl -s "$API_URL/posts")
posts_count=$(echo "$posts_response" | jq -r '.posts | length' 2>/dev/null)

if [ "$posts_count" != "null" ] && [ "$posts_count" != "" ]; then
    echo -e "${GREEN}✅ Listagem funcionando - $posts_count posts encontrados${NC}"
else
    echo -e "${YELLOW}⚠️  Listagem funcionando, mas estrutura de resposta diferente${NC}"
    echo "Resposta da API:"
    echo "$posts_response" | jq . 2>/dev/null || echo "$posts_response"
fi

# Teste 3: Criar um post de teste
echo ""
echo -e "${BLUE}3. Testando criação de post...${NC}"
test_post='{
    "title": "Post de Teste - API Integration",
    "content": "Este é um post criado automaticamente para testar a integração entre frontend e API.",
    "author": "Sistema de Teste", 
    "subject": "Teste"
}'

create_response=$(curl -s -X POST "$API_URL/posts" \
    -H "Content-Type: application/json" \
    -d "$test_post")

created_id=$(echo "$create_response" | jq -r '._id // .id' 2>/dev/null)

if [ "$created_id" != "null" ] && [ "$created_id" != "" ]; then
    echo -e "${GREEN}✅ Criação funcionando - Post criado com ID: $created_id${NC}"
    
    # Teste 4: Buscar o post criado
    echo ""
    echo -e "${BLUE}4. Testando busca por ID...${NC}"
    get_response=$(curl -s "$API_URL/posts/$created_id")
    get_title=$(echo "$get_response" | jq -r '.title' 2>/dev/null)
    
    if [ "$get_title" = "Post de Teste - API Integration" ]; then
        echo -e "${GREEN}✅ Busca por ID funcionando${NC}"
    else
        echo -e "${YELLOW}⚠️  Busca por ID com problema - título retornado: $get_title${NC}"
    fi
    
    # Teste 5: Atualizar o post
    echo ""
    echo -e "${BLUE}5. Testando atualização de post...${NC}"
    update_data='{"title": "Post de Teste - ATUALIZADO"}'
    update_response=$(curl -s -X PATCH "$API_URL/posts/$created_id" \
        -H "Content-Type: application/json" \
        -d "$update_data")
    
    updated_title=$(echo "$update_response" | jq -r '.title' 2>/dev/null)
    
    if [ "$updated_title" = "Post de Teste - ATUALIZADO" ]; then
        echo -e "${GREEN}✅ Atualização funcionando${NC}"
    else
        echo -e "${YELLOW}⚠️  Atualização com problema${NC}"
    fi
    
    # Teste 6: Deletar o post de teste
    echo ""
    echo -e "${BLUE}6. Testando exclusão de post...${NC}"
    delete_response=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$API_URL/posts/$created_id")
    
    if [ "$delete_response" = "200" ] || [ "$delete_response" = "204" ]; then
        echo -e "${GREEN}✅ Exclusão funcionando${NC}"
    else
        echo -e "${YELLOW}⚠️  Exclusão com problema (código: $delete_response)${NC}"
    fi
    
else
    echo -e "${RED}❌ Criação com problema${NC}"
    echo "Resposta da API:"
    echo "$create_response" | jq . 2>/dev/null || echo "$create_response"
fi

echo ""
echo -e "${GREEN}🎉 Testes da API concluídos!${NC}"
echo ""
echo -e "${BLUE}📝 Como usar no frontend:${NC}"
echo -e "${YELLOW}1. Certifique-se que a API está rodando em localhost:3333${NC}"
echo -e "${YELLOW}2. Inicie o frontend: npm start${NC}"
echo -e "${YELLOW}3. Acesse http://localhost:3000${NC}"
echo -e "${YELLOW}4. Clique em 'Ver Posts' para carregar da API${NC}"