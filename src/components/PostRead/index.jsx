import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPosts } from '../../api/posts';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button } from '../UI';
import LoadingSpinner from '../LoadingSpinner';
import styled from 'styled-components';

const NavigationButtons = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

const PostHeader = styled.div`
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
`;

const PostTitle = styled.h1`
    color: #2d3748;
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.3;
`;

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #718096;
    font-size: 1.1rem;
    
    strong {
        color: #4a5568;
    }
`;

const PostContent = styled.div`
    font-size: 1.1rem;
    line-height: 1.8;
    color: #2d3748;
    
    p {
        margin-bottom: 1.5rem;
    }
    
    h2, h3, h4 {
        margin: 2rem 0 1rem 0;
        color: #2d3748;
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    color: #e53e3e;
    
    h2 {
        margin-bottom: 1rem;
    }
`;

const PostRead = ({ postId }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { isAuthenticated } = useAuth();
    
    const actualPostId = postId || id;

    useEffect(() => {
        const loadPost = async () => {
            try {
                const posts = await fetchPosts();
                const foundPost = posts.find(p => p.id === parseInt(actualPostId));
                setPost(foundPost);
            } catch (error) {
                console.error('Erro ao carregar post:', error);
            } finally {
                setLoading(false);
            }
        };

        if (actualPostId) {
            loadPost();
        }
    }, [actualPostId]);

    const handleBackToPosts = () => {
        // Volta para a home e força a exibição dos posts
        history.push('/', { showPosts: true });
    };

    const handleBackToAdmin = () => {
        history.push('/admin');
    };

    if (loading) {
        return <LoadingSpinner message="Carregando post..." />;
    }

    if (!post) {
        return (
            <Card>
                <ErrorMessage>
                    <h2>📄 Post não encontrado</h2>
                    <p>O post que você está procurando não existe ou foi removido.</p>
                </ErrorMessage>
                <NavigationButtons>
                    <Button 
                        variant="secondary"
                        onClick={handleBackToPosts}
                    >
                        ← Voltar para Posts
                    </Button>
                </NavigationButtons>
            </Card>
        );
    }

    return (
        <>
            <NavigationButtons>
                <Button 
                    variant="secondary"
                    onClick={handleBackToPosts}
                >
                    ← Voltar para Posts
                </Button>
                {isAuthenticated && (
                    <Button 
                        variant="primary"
                        onClick={handleBackToAdmin}
                    >
                        🔧 Área Admin
                    </Button>
                )}
            </NavigationButtons>

            <Card>
                <PostHeader>
                    <PostTitle>{post.title}</PostTitle>
                    <AuthorInfo>
                        👨‍🏫 <strong>Autor:</strong> {post.author}
                    </AuthorInfo>
                </PostHeader>
                
                <PostContent>
                    {/* Renderiza o conteúdo completo ou a descrição se não houver conteúdo */}
                    {(post.content || post.description)
                        .split('\n')
                        .map((paragraph, index) => (
                            paragraph.trim() && (
                                <p key={index}>{paragraph}</p>
                            )
                        ))
                    }
                </PostContent>
            </Card>
        </>
    );
};

export default PostRead;