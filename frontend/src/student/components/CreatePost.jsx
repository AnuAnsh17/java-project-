import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { postCategories } from '../services/postService';
import { apiErrorMessage } from '../../services/api';

export const CreatePostModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    setSubmitting(true);
    setError('');
    try {
      await onCreate({ title, category, content });
      setTitle('');
      setContent('');
      onClose();
    } catch (requestError) {
      setError(apiErrorMessage(requestError, 'Your post could not be published.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) onClose(); }}>
      <div className="modal-content-box" role="dialog" aria-modal="true" aria-labelledby="create-post-heading">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 id="create-post-heading">Create a campus post</h3>
          <button type="button" onClick={onClose} disabled={submitting} aria-label="Close dialog"><X size={20} /></button>
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
              maxLength={180}
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
              {postCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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
              maxLength={10000}
              required
            />
          </div>

          {error && <p className="validation-error" role="alert">{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={submitting}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Publishing…' : 'Publish Post'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
