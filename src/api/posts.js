import { API_CONFIG, ERROR_MESSAGES } from '../constants';

// Dados iniciais dos posts
const INITIAL_POSTS = [
    { 
        id: 1, 
        title: "Introdução ao React", 
        author: "Prof. João Silva", 
        description: "Conceitos fundamentais do React e componentização", 
        content: "React é uma biblioteca JavaScript para construção de interfaces de usuário. Neste post, vamos explorar os conceitos fundamentais como componentes, props, state e o ciclo de vida dos componentes.",
        createdAt: '2024-01-15T10:00:00.000Z',
        updatedAt: '2024-01-15T10:00:00.000Z'
    },
    { 
        id: 2, 
        title: "JavaScript ES6+", 
        author: "Prof. Maria Santos", 
        description: "Principais features do JavaScript moderno", 
        content: "O JavaScript evoluiu muito nos últimos anos. Vamos abordar arrow functions, destructuring, template literals, promises, async/await e muito mais.",
        createdAt: '2024-01-16T14:30:00.000Z',
        updatedAt: '2024-01-16T14:30:00.000Z'
    }
];

const { STORAGE_KEYS, DELAY } = API_CONFIG;

// Utility functions for localStorage operations
const getStoredPosts = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
        if (stored) {
            return JSON.parse(stored);
        }
        // Se não há dados armazenados, salva os dados iniciais
        savePostsToStorage(INITIAL_POSTS);
        return INITIAL_POSTS;
    } catch (error) {
        console.error('Error reading posts from localStorage:', error);
        return INITIAL_POSTS;
    }
};

const savePostsToStorage = (posts) => {
    try {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (error) {
        console.error('Error saving posts to localStorage:', error);
        throw new Error('Erro ao salvar dados');
    }
};

// Simulate network delay
const simulateDelay = (ms = DELAY) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPosts = async () => {
    await simulateDelay();
    return getStoredPosts();
};

export const updatePost = async (id, updatedPost) => {
    await simulateDelay();
    
    const posts = getStoredPosts();
    const postId = parseInt(id);
    const index = posts.findIndex(p => p.id === postId);
    
    if (index === -1) {
        throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
    }
    
    const updatedPostData = { 
        ...posts[index], 
        ...updatedPost, 
        id: postId,
        updatedAt: new Date().toISOString()
    };
    
    posts[index] = updatedPostData;
    savePostsToStorage(posts);
    
    return updatedPostData;
};

export const createPost = async (newPost) => {
    await simulateDelay();
    
    if (!newPost.title || !newPost.content || !newPost.author) {
        throw new Error(ERROR_MESSAGES.REQUIRED_FIELDS);
    }
    
    const posts = getStoredPosts();
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    
    const post = { 
        ...newPost, 
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    posts.push(post);
    savePostsToStorage(posts);
    
    return post;
};

export const deletePost = async (id) => {
    await simulateDelay();
    
    const posts = getStoredPosts();
    const postId = parseInt(id);
    const postExists = posts.some(p => p.id === postId);
    
    if (!postExists) {
        throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
    }
    
    const filteredPosts = posts.filter(p => p.id !== postId);
    savePostsToStorage(filteredPosts);
    
    return true;
};