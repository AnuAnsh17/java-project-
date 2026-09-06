import React, { useState, useEffect } from 'react';
import { postService } from '../services/postService';
import { PostCard } from '../components/PostCard';
import { CreatePostModal } from '../components/CreatePost';
import { PlusCircle, Filter } from 'lucide-react';

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const cats = await postService.getCategories();
      setCategories(["All", ...cats]);
      const p = await postService.getPosts(selectedCat);
      setPosts(p);
    }
    loadData();
  }, [selectedCat]);

  const handleCreatePost = async (postData) => {
    await postService.createPost(postData);
    const updated = await postService.getPosts(selectedCat);
    setPosts(updated);
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
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
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
