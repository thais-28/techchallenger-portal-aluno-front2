import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import PostForm from "../components/PostForm";
import { fetchPostById, updatePost } from "../api/posts";
import Layout from "../components/Layout";
import { Card, Button } from "../components/UI";
import LoadingSpinner from "../components/LoadingSpinner";
import styled from "styled-components";

const BackButtonContainer = styled.div`
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e53e3e;
  margin: 2rem 0;
`;

const EditPost = () => {
  const { id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const foundPost = await fetchPostById(id);
        setPost(foundPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        history.push("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, history]);

  const handleUpdate = async (updatedPost) => {
    try {
      setUpdating(true);
      await updatePost(id, updatedPost);
      alert("Post atualizado com sucesso!");
      history.push("/admin");
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      alert("Erro ao atualizar o post. Tente novamente.");
    } finally {
      setUpdating(false);
    }
  };

  const handleBackToAdmin = () => {
    history.push("/admin");
  };

  if (loading) {
    return (
      <Layout title="Editar Post" subtitle="Carregando informações do post...">
        <LoadingSpinner message="Carregando post..." />
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title="Editar Post" subtitle="Post não encontrado">
        <Card>
          <ErrorMessage>Post não encontrado.</ErrorMessage>
          <BackButtonContainer>
            <Button variant="secondary" onClick={handleBackToAdmin}>
              ← Voltar para Admin
            </Button>
          </BackButtonContainer>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout title="Editar Post" subtitle={`Editando: ${post.title}`}>
      <BackButtonContainer>
        <Button variant="secondary" onClick={handleBackToAdmin}>
          ← Voltar para Admin
        </Button>
      </BackButtonContainer>

      <Card title="Formulário de Edição">
        {updating ? (
          <LoadingSpinner message="Atualizando post..." />
        ) : (
          <PostForm initialData={post} onSubmit={handleUpdate} />
        )}
      </Card>
    </Layout>
  );
};

export default EditPost;
