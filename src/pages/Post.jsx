import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PostRead from '../components/PostRead';

const Post = () => {
    const { id } = useParams();

    return (
        <Layout 
            title="Visualizar Post"
            subtitle="Leia o conteúdo educacional completo"
        >
            <PostRead postId={id} />
        </Layout>
    );
};

export default Post;