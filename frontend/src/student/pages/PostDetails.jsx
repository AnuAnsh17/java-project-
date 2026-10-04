import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import { PostCard } from '../components/PostCard';
import { ArrowLeft } from 'lucide-react';
import { apiErrorMessage } from '../../services/api';

export const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function loadPost() {
      setLoading(true);
      setError('');
      try {
        const result = await postService.getPostById(id);
        if (active) setPost(result);
      } catch (requestError) {
        if (active) setError(apiErrorMessage(requestError, 'This post could not be loaded.'));
      } finally {
        if (active) setLoading(false);
      }
    }
    loadPost();
    return () => { active = false; };
  }, [id]);

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      {loading && <div className="student-card" role="status">Loading post details…</div>}
      {error && <div className="student-card api-error-state" role="alert">{error}</div>}
      {!loading && !error && post && <PostCard post={post} />}
    </div>
  );
};
