import React, { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../UI';
import styled from 'styled-components';

const PostGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
`;

const PostCard = styled(Card)`
    height: fit-content;
    transition: transform 0.2s ease;
    
    &:hover {
        transform: translateY(-4px);
    }
`;

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #718096;
    font-size: 0.9rem;
`;

const PostDescription = styled.p`
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    flex: 1;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 3rem 1rem;
    color: #718096;
    
    h3 {
        color: #4a5568;
        margin-bottom: 1rem;
    }
`;

const ResultsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #e2e8f0;
    
    h3 {
        color: #2d3748;
        margin: 0;
        font-size: 1.25rem;
    }
    
    span {
        color: #718096;
        font-size: 0.9rem;
    }
`;

const PostList = memo(({ posts = [], searchTerm = '' }) => {
    const filteredPosts = useMemo(() => {
        if (!searchTerm) return posts;
        
        const searchLower = searchTerm.toLowerCase();
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchLower) ||
            post.author.toLowerCase().includes(searchLower) ||
            post.description.toLowerCase().includes(searchLower)
        );
    }, [posts, searchTerm]);

    if (filteredPosts.length === 0) {
        return (
            <EmptyState>
                {searchTerm ? (
                    <>
                        <h3>🔍 Nenhum post encontrado</h3>
                        <p>Não encontramos posts que correspondam ao termo "{searchTerm}".</p>
                        <p>Tente usar palavras-chave diferentes ou verifique a ortografia.</p>
                    </>
                ) : (
                    <>
                        <h3>📚 Nenhum post disponível</h3>
                        <p>Ainda não há posts publicados na plataforma.</p>
                        <p>Aguarde novos conteúdos educacionais serem adicionados!</p>
                    </>
                )}
            </EmptyState>
        );
    }

    return (
        <>
            <ResultsHeader>
                <h3>
                    {searchTerm 
                        ? `Resultados da busca "${searchTerm}"` 
                        : 'Posts Educacionais'
                    }
                </h3>
                <span>
                    {filteredPosts.length === 1 
                        ? '1 post encontrado' 
                        : `${filteredPosts.length} posts encontrados`
                    }
                </span>
            </ResultsHeader>
            
            <PostGrid>
                {filteredPosts.map(post => (
                <PostCard key={post.id}>
                    <div>
                        <h3 style={{ 
                            color: '#2d3748', 
                            marginBottom: '0.75rem',
                            fontSize: '1.25rem',
                            fontWeight: '600'
                        }}>
                            {post.title}
                        </h3>
                        
                        <AuthorInfo>
                            👨‍🏫 <strong>Autor:</strong> {post.author}
                        </AuthorInfo>
                        
                        <PostDescription>
                            {post.description}
                        </PostDescription>
                        
                        <ActionButtons>
                            <StyledLink to={`/post/${post.id}`}>
                                <Button 
                                    variant="primary" 
                                    size="medium"
                                    fullWidth
                                >
                                    📖 Ler Post Completo
                                </Button>
                            </StyledLink>
                        </ActionButtons>
                    </div>
                </PostCard>
            ))}
            </PostGrid>
        </>
    );
});

PostList.displayName = 'PostList';

export default PostList;