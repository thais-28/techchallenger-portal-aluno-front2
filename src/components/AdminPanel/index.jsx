import React, { useEffect, useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { usePosts } from '../../contexts/PostContext';
import LoadingSpinner from '../LoadingSpinner';
import styled from 'styled-components';

const AdminPanelContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
`;

const PostList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const PostItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #ccc;
    background-color: #f8f9fa;
    margin-bottom: 10px;
    border-radius: 5px;
`;

const PostTitle = styled.h3`
    color: #007bff;
    cursor: pointer;
    margin: 0 0 5px 0;
    
    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
`;

const PostMeta = styled.p`
    margin: 5px 0;
    color: #6c757d;
    font-size: 14px;
`;

const PostDescription = styled.p`
    margin: 10px 0 0 0;
    color: #495057;
`;

const Button = styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    
    &.view {
        background-color: #17a2b8;
        color: white;
        
        &:hover {
            background-color: #138496;
        }
    }
    
    &.edit {
        background-color: #ffc107;
        color: #212529;
        
        &:hover {
            background-color: #e0a800;
        }
    }
    
    &.delete {
        background-color: #dc3545;
        color: white;
        
        &:hover {
            background-color: #c82333;
        }
    }
`;

const CreatePostButton = styled.button`
    background-color: #28a745;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
        background-color: #218838;
    }
`;

const AdminPanel = memo(() => {
    const { posts, loading, error, loadPosts, deleteExistingPost } = usePosts();
    const history = useHistory();

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const handleEdit = useCallback((id) => {
        history.push(`/edit/${id}`);
    }, [history]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este post?')) {
            try {
                await deleteExistingPost(id);
                alert('Post excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir post:', error);
                alert('Erro ao excluir o post.');
            }
        }
    }, [deleteExistingPost]);

    const handleCreatePost = useCallback(() => {
        history.push('/create');
    }, [history]);

    const handleViewPost = useCallback((id) => {
        history.push(`/post/${id}`);
    }, [history]);

    if (loading) {
        return <LoadingSpinner message="Carregando posts..." />;
    }

    if (error) {
        return (
            <AdminPanelContainer>
                <h1>Admin Panel</h1>
                <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
                    Erro: {error}
                </div>
            </AdminPanelContainer>
        );
    }

    return (
        <AdminPanelContainer>
            <h1>Admin Panel</h1>
            <CreatePostButton onClick={handleCreatePost}>
                + Criar Novo Post
            </CreatePostButton>
            <PostList>
                {posts.map(post => (
                    <PostItem key={post.id}>
                        <div style={{ flex: 1 }}>
                            <PostTitle onClick={() => handleViewPost(post.id)}>
                                {post.title}
                            </PostTitle>
                            <PostMeta>Por: {post.author}</PostMeta>
                            <PostDescription>{post.description}</PostDescription>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '120px' }}>
                            <Button 
                                className="view" 
                                onClick={() => handleViewPost(post.id)}
                            >
                                👁️ Ver
                            </Button>
                            <Button 
                                className="edit" 
                                onClick={() => handleEdit(post.id)}
                            >
                                ✏️ Editar
                            </Button>
                            <Button 
                                className="delete" 
                                onClick={() => handleDelete(post.id)}
                            >
                                🗑️ Excluir
                            </Button>
                        </div>
                    </PostItem>
                ))}
            </PostList>
        </AdminPanelContainer>
    );
});

AdminPanel.displayName = 'AdminPanel';

export default AdminPanel;