import React, { useState } from 'react';
import { MessageSquare, Share2, ShieldAlert } from 'lucide-react';
import { VoteButton } from './VoteButton';
import { CommentSection } from './CommentSection';
import { postService } from '../services/postService';

export const PostCard = ({ post }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [showComments, setShowComments] = useState(false);

  const handleVote = async (dir) => {
    const updated = await postService.votePost(currentPost.id, dir);
    setCurrentPost(updated);
  };

  const handleAddComment = async (commentText) => {
    await postService.addComment(currentPost.id, commentText);
    const refreshed = await postService.getPostById(currentPost.id);
    setCurrentPost(refreshed);
  };

  return (
    <div className="student-card student-card-hover" style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src={currentPost.authorAvatar}
            alt={currentPost.authorName}
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: '600', fontSize: '0.92rem' }}>{currentPost.authorName}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{currentPost.authorRole} • {currentPost.timeAgo}</div>
          </div>
        </div>
        <span className="badge badge-trust" style={{ background: '#f1f5f9', color: 'var(--primary-dark)' }}>
          {currentPost.category}
        </span>
      </div>

      <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>{currentPost.title}</h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>{currentPost.content}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
        <VoteButton votes={currentPost.votes} userVoted={currentPost.userVoted} onVote={handleVote} />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setShowComments(!showComments)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}
          >
            <MessageSquare size={16} /> {currentPost.commentsCount} Comments
          </button>
        </div>
      </div>

      {showComments && (
        <CommentSection comments={currentPost.comments} onAddComment={handleAddComment} />
      )}
    </div>
  );
};
