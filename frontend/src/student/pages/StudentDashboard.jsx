import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, MessageSquareText, Megaphone } from 'lucide-react';
import { useStudent } from '../hooks/useStudent';
import { postService } from '../services/postService';
import { eventService } from '../services/eventService';
import { noticeService } from '../services/noticeService';
import { PostCard } from '../components/PostCard';
import { EventCard } from '../components/EventCard';
import { NoticeCard } from '../components/NoticeCard';
import { apiErrorMessage } from '../../services/api';

export const StudentDashboard = () => {
  const { profile } = useStudent();
  const navigate = useNavigate();
  const [data, setData] = useState({ posts: [], events: [], notices: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([postService.getPosts(), eventService.getEvents(), noticeService.getNotices()])
      .then(([posts, events, notices]) => {
        if (active) setData({ posts: posts.slice(0, 2), events: events.slice(0, 2), notices: notices.slice(0, 2) });
      })
      .catch((requestError) => { if (active) setError(apiErrorMessage(requestError, 'Campus information could not be loaded.')); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div>
      <section className="student-card" style={{ background: 'linear-gradient(135deg, #1e3a8a, #0f172a)', color: 'white', marginBottom: '1.5rem' }}>
        <p style={{ color: '#bfdbfe', marginBottom: '0.4rem', fontWeight: 600 }}>CAMPUS CONNECT</p>
        <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.4rem' }}>Welcome, {profile?.name || 'Student'}</h1>
        <p style={{ color: '#cbd5e1', margin: 0 }}>
          {[profile?.year, profile?.department, profile?.division && `Division ${profile.division}`].filter(Boolean).join(' · ') || 'Your college community, in one place.'}
        </p>
      </section>

      {error && <div className="student-card" role="alert" style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}
      {loading ? <div className="student-card" role="status">Loading your campus…</div> : (
        <>
          <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
            <div className="student-card"><MessageSquareText color="var(--primary-light)" /><div className="dashboard-stat-value">{data.posts.length}</div><div>Recent discussions</div></div>
            <div className="student-card"><CalendarDays color="var(--primary-light)" /><div className="dashboard-stat-value">{data.events.length}</div><div>Upcoming events</div></div>
            <div className="student-card"><Megaphone color="var(--primary-light)" /><div className="dashboard-stat-value">{data.notices.length}</div><div>Official notices</div></div>
          </div>

          <div className="student-dashboard-main-grid">
            <section aria-label="Campus discussions">
              <div className="student-section-heading"><h2>Campus discussions</h2><button className="btn btn-outline" onClick={() => navigate('/student/feed')}>Open feed <ArrowRight size={15} /></button></div>
              {data.posts.map((post) => <PostCard key={post.id} post={post} onDelete={(id) => setData((current) => ({ ...current, posts: current.posts.filter((item) => item.id !== id) }))} />)}
              {data.posts.length === 0 && <div className="student-card">No posts yet. <button className="text-link-button" onClick={() => navigate('/student/feed')}>Start a discussion</button></div>}
            </section>
            <section aria-label="Campus updates">
              <div className="student-section-heading"><h2>Events</h2><button className="btn btn-outline" onClick={() => navigate('/student/events')}>See all</button></div>
              {data.events.map((event) => <EventCard key={event.id} event={event} />)}
              {!data.events.length && <div className="student-card">No events have been posted.</div>}
              <div className="student-section-heading" style={{ marginTop: '1.5rem' }}><h2>Official notices</h2><button className="btn btn-outline" onClick={() => navigate('/student/notices')}>See all</button></div>
              {data.notices.map((notice) => <NoticeCard key={notice.id} notice={notice} />)}
              {!data.notices.length && <div className="student-card">No notices have been posted.</div>}
            </section>
          </div>
        </>
      )}
    </div>
  );
};
