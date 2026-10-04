import React, { useState, useEffect } from 'react';
import { postService } from '../services/postService';
import { PostCard } from '../components/PostCard';
import { CreatePostModal } from '../components/CreatePost';
import { PlusCircle, RefreshCw } from 'lucide-react';
import { apiErrorMessage } from '../../services/api';

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = async () => {
    setLoading(true);
    setError('');
    try {
      const p = await postService.getPosts(selectedCat);
      setPosts(p);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, 'Posts could not be loaded.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      setCategories(['All', ...(await postService.getCategories())]);
      await refresh();
    }
    loadData();
  }, [selectedCat]);

  const handleCreatePost = async (postData) => {
    await postService.createPost(postData);
    await refresh();
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Campus Social Feed</h1>
          <p>Campus-wide discussions, posts, voting, and student interactions</p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
          <PlusCircle size={18} /> Create Post
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn ${selectedCat === cat ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
            onClick={() => setSelectedCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div>
        {loading && <p role="status" className="student-card">Loading campus posts…</p>}
        {error && <div className="student-card" role="alert" style={{ color: 'var(--error)' }}>{error} <button className="btn btn-outline" onClick={refresh}><RefreshCw size={15} /> Retry</button></div>}
        {!loading && !error && posts.length === 0 && <div className="student-card">No posts in this category yet. Start a campus conversation.</div>}
        {posts.map(post => (
          <PostCard key={post.id} post={post} onDelete={(id) => setPosts((items) => items.filter((item) => item.id !== id))} />
        ))}
      </div>

      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreatePost}
      />
    </div>
  );
};
