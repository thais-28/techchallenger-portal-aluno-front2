import React, { useState, useCallback, memo } from "react";
import { Button, Input } from "../UI";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const PostForm = memo(({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [subject, setSubject] = useState(initialData?.subject || "Geral");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit({ title, description, content, author, subject });
    },
    [title, description, content, author, subject, onSubmit]
  );

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        label="Título"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite o título do post"
        required
        helpText="Título principal que aparecerá na lista de posts"
      />

      <Input
        label="Descrição Resumida"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Breve descrição que aparece na lista"
        required
        helpText="Resumo que será exibido na lista de posts para atrair leitores"
      />

      <Input
        label="Conteúdo Completo"
        multiline
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Conteúdo completo do post"
        required
        helpText="Conteúdo educacional completo que será exibido na página do post"
      />

      <Input
        label="Autor"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Nome do autor"
        required
        helpText="Nome do professor ou responsável pelo conteúdo"
      />

      <Input
        label="Matéria/Disciplina"
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Ex: Matemática, História, Português..."
        required
        helpText="Disciplina ou área de conhecimento do conteúdo"
      />

      <ButtonContainer>
        <Button type="submit" variant="primary" size="large">
          💾 Salvar Post
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
});

PostForm.displayName = "PostForm";

export default PostForm;
