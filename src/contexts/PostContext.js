import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { fetchPosts, createPost, updatePost, deletePost } from '../api/posts';

// Initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Action types
export const POST_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const postReducer = (state, action) => {
  switch (action.type) {
    case POST_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case POST_ACTIONS.SET_POSTS:
      return { ...state, posts: action.payload, loading: false, error: null };
    
    case POST_ACTIONS.ADD_POST:
      return { ...state, posts: [...state.posts, action.payload], loading: false };
    
    case POST_ACTIONS.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
        loading: false,
      };
    
    case POST_ACTIONS.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        loading: false,
      };
    
    case POST_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case POST_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Context
const PostContext = createContext();

// Provider component
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const loadPosts = useCallback(async () => {
    try {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      const posts = await fetchPosts();
      dispatch({ type: POST_ACTIONS.SET_POSTS, payload: posts });
    } catch (error) {
      dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
    }
  }, []);

  const createNewPost = useCallback(async (postData) => {
    try {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      const newPost = await createPost(postData);
      dispatch({ type: POST_ACTIONS.ADD_POST, payload: newPost });
      return newPost;
    } catch (error) {
      dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateExistingPost = useCallback(async (id, postData) => {
    try {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      const updatedPost = await updatePost(id, postData);
      dispatch({ type: POST_ACTIONS.UPDATE_POST, payload: updatedPost });
      return updatedPost;
    } catch (error) {
      dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const deleteExistingPost = useCallback(async (id) => {
    try {
      dispatch({ type: POST_ACTIONS.SET_LOADING, payload: true });
      await deletePost(id);
      dispatch({ type: POST_ACTIONS.DELETE_POST, payload: id });
    } catch (error) {
      dispatch({ type: POST_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: POST_ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    ...state,
    loadPosts,
    createNewPost,
    updateExistingPost,
    deleteExistingPost,
    clearError,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

// Custom hook
export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};