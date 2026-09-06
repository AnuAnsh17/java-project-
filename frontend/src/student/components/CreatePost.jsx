import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { mockCategories } from '../mock/mockPosts';

export const CreatePostModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onCreate({ title, category, content });
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3>Create Campus Post</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="What's happening on campus?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              {mockCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Post Details</label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Share thoughts, event info, or question..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Publish Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};
