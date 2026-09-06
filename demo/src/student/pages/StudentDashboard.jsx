import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../hooks/useStudent';
import { postService } from '../services/postService';
import { eventService } from '../services/eventService';
import { assignmentService } from '../services/assignmentService';
import { attendanceService } from '../services/attendanceService';
import { noticeService } from '../services/noticeService';
import { electionService } from '../services/electionService';
import { PostCard } from '../components/PostCard';
import { EventCard } from '../components/EventCard';
import { NoticeCard } from '../components/NoticeCard';

export const StudentDashboard = () => {
  const { profile } = useStudent();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [notices, setNotices] = useState([]);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      const p = await postService.getPosts();
      const e = await eventService.getEvents();
      const a = await assignmentService.getAssignments();
      const att = await attendanceService.getAttendance();
      const n = await noticeService.getNotices();
      const el = await electionService.getElections();
      setPosts(p.slice(0, 2));
      setEvents(e.slice(0, 2));
      setAssignments(a.slice(0, 2));
      setAttendance(att);
      setNotices(n.slice(0, 2));
      setElections(el.slice(0, 1));
    }
    loadDashboard();
  }, []);

  return (
    <div>
      <div className="student-card" style={{ background: 'linear-gradient(135deg, #1e3a8a, #0f172a)', color: 'white', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.4rem' }}>
          Welcome back, {profile?.name || "Student"} 👋
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: '500' }}>
          Second Year IT • Div C
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="student-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/student/attendance')}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Overall Attendance</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: (attendance?.overallPercentage || 84) >= 75 ? 'var(--success)' : 'var(--error)', margin: '0.2rem 0' }}>
            {attendance?.overallPercentage || 84.5}%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{attendance?.totalAttended} / {attendance?.totalClassesHeld} Classes Attended</div>
        </div>

        <div className="student-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/student/assignments')}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pending Assignments</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--warning)', margin: '0.2rem 0' }}>
            {assignments.filter(a => a.status === 'Pending').length}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Check upcoming deadlines</div>
        </div>

        <div className="student-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/student/elections')}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Elections</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-light)', margin: '0.2rem 0' }}>
            {elections.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cast your vote electronically</div>
        </div>
      </div>

      {/* Responsive Two-Column Layout: Feed on Left, Events & Notices on Right */}
      <div className="student-dashboard-main-grid">
        {/* Left Column: Campus Discussions Feed */}
        <section className="student-dashboard-feed-col" aria-label="Campus Discussions Feed">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>Campus Discussions Feed</h2>
            <button
              onClick={() => navigate('/student/feed')}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            >
              View Full Feed
            </button>
          </div>
          {posts.map(p => <PostCard key={p.id} post={p} />)}
        </section>

        {/* Right Column: Upcoming Events & Notices */}
        <section className="student-dashboard-events-col" aria-label="Upcoming Events and Notices">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>Upcoming Events</h2>
              <button
                onClick={() => navigate('/student/events')}
                className="btn btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                All Events
              </button>
            </div>
            {events.map(ev => <EventCard key={ev.id} event={ev} onRegister={() => navigate('/student/events')} />)}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>Recent Official Notices</h2>
              <button
                onClick={() => navigate('/student/notices')}
                className="btn btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              >
                All Notices
              </button>
            </div>
            {notices.map(n => <NoticeCard key={n.id} notice={n} />)}
          </div>
        </section>
      </div>
    </div>
  );
};
