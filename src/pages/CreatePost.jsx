import React, { useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { usePosts } from '../contexts/PostContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Layout from '../components/Layout';
import { Card, Button } from '../components/UI';
import styled from 'styled-components';

const BackButtonContainer = styled.div`
    margin-bottom: 2rem;
`;

const CreatePost = memo(() => {
    const { createNewPost, loading } = usePosts();
    const history = useHistory();

    const handleSubmit = useCallback(async (postData) => {
        try {
            await createNewPost(postData);
            alert('Post criado com sucesso!');
            history.push('/admin');
        } catch (error) {
            console.error('Erro ao criar post:', error);
            alert('Erro ao criar o post. Tente novamente.');
        }
    }, [createNewPost, history]);

    const handleBackToAdmin = useCallback(() => {
        history.push('/admin');
    }, [history]);

    return (
        <Layout 
            title="Criar Novo Post"
            subtitle="Adicione conteúdo educacional à plataforma"
        >
            <BackButtonContainer>
                <Button 
                    variant="secondary"
                    onClick={handleBackToAdmin}
                >
                    ← Voltar para Admin
                </Button>
            </BackButtonContainer>

            <Card title="Formulário de Novo Post">
                {loading ? (
                    <LoadingSpinner message="Criando post..." />
                ) : (
                    <PostForm onSubmit={handleSubmit} />
                )}
            </Card>
        </Layout>
    );
});

CreatePost.displayName = 'CreatePost';

export default CreatePost;