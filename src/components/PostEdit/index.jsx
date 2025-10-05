import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PostForm from '../PostForm';

const PostEdit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/${id}`);
            const data = await response.json();
            setPost(data);
            setLoading(false);
        };

        fetchPost();
    }, [id]);

    const handleUpdate = async (updatedPost) => {
        await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        });
        history.push(`/posts/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Post</h1>
            {post && (
                <PostForm
                    initialData={post}
                    onSubmit={handleUpdate}
                />
            )}
        </div>
    );
};

export default PostEdit;