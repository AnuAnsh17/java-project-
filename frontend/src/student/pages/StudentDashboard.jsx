import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, MessageSquareText, Megaphone, Plus, RefreshCw, Sparkles } from 'lucide-react';
import { useStudent } from '../hooks/useStudent';
import { postService } from '../services/postService';
import { eventService } from '../services/eventService';
import { noticeService } from '../services/noticeService';
import { PostCard } from '../components/PostCard';
import { EventCard } from '../components/EventCard';
import { NoticeCard } from '../components/NoticeCard';
import { apiErrorMessage } from '../../services/api';

const initialData = { posts: [], events: [], notices: [], totals: { posts: 0, events: 0, notices: 0 } };

export const StudentDashboard = () => {
  const { profile } = useStudent();
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [posts, events, notices] = await Promise.all([
        postService.getPosts(), eventService.getEvents(), noticeService.getNotices()
      ]);
      setData({
        posts: posts.slice(0, 3),
        events: events.slice(0, 2),
        notices: notices.slice(0, 2),
        totals: { posts: posts.length, events: events.length, notices: notices.length }
      });
    } catch (requestError) {
      setError(apiErrorMessage(requestError, 'Campus information could not be loaded.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  return (
    <div className="workspace-page">
      <section className="dashboard-hero student-hero">
        <div className="dashboard-hero-copy">
          <div className="dashboard-eyebrow"><Sparkles size={15} /> YOUR CAMPUS, CONNECTED</div>
          <h1>Welcome back, {profile?.name?.split(' ')[0] || 'Student'}.</h1>
          <p>{[profile?.year, profile?.department, profile?.division && `Division ${profile.division}`].filter(Boolean).join(' · ') || 'Find your people, follow campus updates, and join the conversation.'}</p>
        </div>
        <div className="dashboard-hero-actions">
          <button className="btn btn-hero-primary" onClick={() => navigate('/student/feed')}><Plus size={17} /> Start a post</button>
          <button className="btn btn-hero-secondary" onClick={() => navigate('/student/events')}>Explore events <ArrowRight size={16} /></button>
        </div>
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      </section>

      {error && <div className="student-card api-error-state" role="alert"><span>{error}</span><button className="btn btn-outline" onClick={loadDashboard}><RefreshCw size={15} /> Retry</button></div>}

      {loading ? <div className="dashboard-loading-grid" role="status" aria-label="Loading campus dashboard">
        <div /><div /><div /><div className="dashboard-loading-wide" />
      </div> : !error && <>
        <div className="dashboard-stats-grid" aria-label="Campus activity">
          <div className="dashboard-stat-card"><span className="dashboard-stat-icon stat-icon-teal"><MessageSquareText size={20} /></span><span className="dashboard-stat-value">{data.totals.posts}</span><span className="dashboard-stat-label">Campus discussions</span><span className="dashboard-stat-note">Shared with your community</span></div>
          <div className="dashboard-stat-card"><span className="dashboard-stat-icon stat-icon-orange"><CalendarDays size={20} /></span><span className="dashboard-stat-value">{data.totals.events}</span><span className="dashboard-stat-label">Campus events</span><span className="dashboard-stat-note">Published opportunities</span></div>
          <div className="dashboard-stat-card"><span className="dashboard-stat-icon stat-icon-blue"><Megaphone size={20} /></span><span className="dashboard-stat-value">{data.totals.notices}</span><span className="dashboard-stat-label">Official notices</span><span className="dashboard-stat-note">Updates from your college</span></div>
        </div>

        <div className="student-dashboard-main-grid dashboard-content-grid">
          <section aria-label="Campus discussions">
            <div className="student-section-heading"><div><span className="section-kicker">COMMUNITY</span><h2>Campus discussions</h2></div><button className="btn btn-outline" onClick={() => navigate('/student/feed')}>Open feed <ArrowRight size={15} /></button></div>
            {data.posts.map((post) => <PostCard key={post.id} post={post} onDelete={(id) => setData((current) => ({ ...current, posts: current.posts.filter((item) => item.id !== id), totals: { ...current.totals, posts: Math.max(current.totals.posts - 1, 0) } }))} />)}
            {!data.posts.length && <div className="student-card dashboard-empty"><span className="empty-icon"><MessageSquareText size={20} /></span><h3>The conversation starts here</h3><p>Ask a question or share something happening around campus.</p><button className="btn btn-primary" onClick={() => navigate('/student/feed')}><Plus size={16} /> Visit the feed</button></div>}
          </section>
          <section className="dashboard-updates-column" aria-label="Campus updates">
            <div className="student-section-heading"><div><span className="section-kicker">WHAT'S HAPPENING</span><h2>Events</h2></div><button className="btn btn-quiet" onClick={() => navigate('/student/events')}>See all <ArrowRight size={15} /></button></div>
            {data.events.map((event) => <EventCard key={event.id} event={event} />)}
            {!data.events.length && <div className="student-card compact-empty">No events have been posted yet.</div>}
            <div className="student-section-heading dashboard-subsection-heading"><div><span className="section-kicker">FROM THE COLLEGE</span><h2>Official notices</h2></div><button className="btn btn-quiet" onClick={() => navigate('/student/notices')}>See all <ArrowRight size={15} /></button></div>
            {data.notices.map((notice) => <NoticeCard key={notice.id} notice={notice} />)}
            {!data.notices.length && <div className="student-card compact-empty">There are no new notices.</div>}
          </section>
        </div>
      </>}
    </div>
  );
};
