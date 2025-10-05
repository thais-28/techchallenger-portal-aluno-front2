import React, { useState, useCallback, memo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PostList from '../components/PostList';
import PostSearch from '../components/PostSearch';
import { usePosts } from '../contexts/PostContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Layout from '../components/Layout';
import { Card, Button } from '../components/UI';
import styled from 'styled-components';

const WelcomeSection = styled.div`
    text-align: center;
    padding: 3rem 1rem;
`;

const WelcomeTitle = styled.h2`
    color: #2d3748;
    margin-bottom: 1rem;
    font-size: 2rem;
`;

const WelcomeDescription = styled.p`
    font-size: 1.125rem;
    color: #718096;
    margin-bottom: 2rem;
    line-height: 1.6;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
`;

const FeatureCards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
`;

const FeatureCard = styled(Card)`
    text-align: center;
    
    h3 {
        color: #2d3748;
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }
    
    p {
        color: #718096;
        line-height: 1.6;
    }
`;

const Home = memo(() => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showPosts, setShowPosts] = useState(false);
    const { posts, loading, loadPosts } = usePosts();
    const history = useHistory();
    const location = useLocation();

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    const handleLoginClick = useCallback(() => {
        history.push('/login');
    }, [history]);

    const handleShowPosts = useCallback(() => {
        if (posts.length === 0) {
            loadPosts();
        }
        setShowPosts(true);
    }, [posts.length, loadPosts]);

    // Detecta quando vem da navegação do PostRead e deve mostrar posts
    useEffect(() => {
        if (location.state?.showPosts) {
            handleShowPosts();
        }
    }, [location.state, handleShowPosts]);

    return (
        <Layout 
            title="Portal do Aluno"
            subtitle="Plataforma educacional para gestão de conteúdo"
        >
            {showPosts ? (
                <Card title="Posts Educacionais">
                    {loading ? (
                        <LoadingSpinner message="Carregando posts..." />
                    ) : (
                        <>
                            <PostSearch searchTerm={searchTerm} onSearch={handleSearch} />
                            <PostList posts={posts} searchTerm={searchTerm} />
                        </>
                    )}
                </Card>
            ) : (
                <WelcomeSection>
                    <WelcomeTitle>Bem-vindo ao Portal do Aluno</WelcomeTitle>
                    <WelcomeDescription>
                        Acesse a área do professor para gerenciar conteúdos ou visualize os posts educacionais disponíveis.
                    </WelcomeDescription>
                    
                    <ActionButtons>
                        <Button 
                            variant="primary"
                            size="large"
                            onClick={handleLoginClick}
                        >
                            🔐 Área do Professor
                        </Button>
                        <Button 
                            variant="success"
                            size="large"
                            onClick={handleShowPosts}
                        >
                            � Ver Posts
                        </Button>
                    </ActionButtons>

                    <FeatureCards>
                        <FeatureCard>
                            <h3>👨‍🏫 Área do Professor</h3>
                            <p>
                                Faça login para gerenciar posts, criar conteúdo educacional 
                                e administrar toda a plataforma de ensino.
                            </p>
                        </FeatureCard>
                        
                        <FeatureCard>
                            <h3>📖 Posts Educacionais</h3>
                            <p>
                                Explore todo o conteúdo educacional disponível na plataforma 
                                e tenha acesso a materiais de qualidade.
                            </p>
                        </FeatureCard>
                    </FeatureCards>
                </WelcomeSection>
            )}
        </Layout>
    );
});

Home.displayName = 'Home';

export default Home;