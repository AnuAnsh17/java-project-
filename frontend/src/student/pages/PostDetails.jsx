import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import { PostCard } from '../components/PostCard';
import { ArrowLeft } from 'lucide-react';

export const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      const p = await postService.getPostById(id || 'post-1');
      setPost(p);
    }
    loadPost();
  }, [id]);

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      {post ? <PostCard post={post} /> : <div>Loading post details...</div>}
    </div>
  );
};
