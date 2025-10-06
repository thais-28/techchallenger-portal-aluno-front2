import { API_CONFIG, ERROR_MESSAGES } from "../constants";

const { BASE_URL } = API_CONFIG;

// Utility function to handle API responses
const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || `Erro HTTP: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
};

// Utility function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`Making API request to: ${url}`);
    const response = await fetch(url, config);
    console.log(`API response status: ${response.status}`);
    return await handleApiResponse(response);
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);

    if (error instanceof Error) {
      // Verificar se é erro de conexão
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(
          "Erro de conexão com o servidor. Verifique se a API está rodando em localhost:3333"
        );
      }

      // Verificar se é erro de rede
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("Failed to fetch")
      ) {
        throw new Error(
          "Erro de rede. Verifique sua conexão e se a API está acessível."
        );
      }
    }

    throw error;
  }
};

// Transform API data to match frontend expectations
const transformPostFromApi = (post) => {
  return {
    id: post._id || post.id,
    title: post.title,
    author: post.author,
    description: post.content ? post.content.substring(0, 150) + "..." : "",
    content: post.content,
    subject: post.subject,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};

// Transform frontend data to match API expectations
const transformPostForApi = (post) => {
  return {
    title: post.title,
    content: post.content,
    author: post.author,
    subject: post.subject || "Geral",
  };
};

export const fetchPosts = async (page = 1, limit = 50) => {
  try {
    console.log(
      `Fazendo requisição para: ${BASE_URL}/posts?page=${page}&limit=${limit}`
    );
    const data = await apiRequest(`/posts?page=${page}&limit=${limit}`);
    console.log("Dados recebidos da API:", data);

    // A API pode retornar um array diretamente ou { posts: [...] }
    let posts = [];
    if (Array.isArray(data)) {
      posts = data;
    } else if (data && data.posts && Array.isArray(data.posts)) {
      posts = data.posts;
    } else if (data && typeof data === "object") {
      // Se recebemos um objeto mas não tem posts, pode ser uma resposta vazia válida
      posts = [];
    } else {
      posts = [];
    }

    console.log(`Processando ${posts.length} posts`);
    return posts.map(transformPostFromApi);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    const message =
      error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR;
    throw new Error(message);
  }
};

export const fetchPostById = async (id) => {
  try {
    const post = await apiRequest(`/posts/${id}`);
    return transformPostFromApi(post);
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    const message =
      error instanceof Error ? error.message : ERROR_MESSAGES.POST_NOT_FOUND;
    throw new Error(message);
  }
};

export const createPost = async (newPost) => {
  try {
    if (!newPost.title || !newPost.content || !newPost.author) {
      throw new Error(ERROR_MESSAGES.REQUIRED_FIELDS);
    }

    const postData = transformPostForApi(newPost);
    const createdPost = await apiRequest("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    });

    return transformPostFromApi(createdPost);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    const message =
      error instanceof Error ? error.message : "Erro ao criar o post";
    throw new Error(message);
  }
};

export const updatePost = async (id, updatedPost) => {
  try {
    const postData = transformPostForApi(updatedPost);
    const updated = await apiRequest(`/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(postData),
    });

    return transformPostFromApi(updated);
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    const message =
      error instanceof Error ? error.message : "Erro ao atualizar o post";
    throw new Error(message);
  }
};

export const deletePost = async (id) => {
  try {
    await apiRequest(`/posts/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    const message =
      error instanceof Error ? error.message : "Erro ao deletar o post";
    throw new Error(message);
  }
};
