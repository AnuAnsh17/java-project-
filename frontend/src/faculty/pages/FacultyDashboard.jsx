import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, Megaphone, Plus, RefreshCw, Sparkles } from 'lucide-react';
import { useFaculty } from '../hooks/useFaculty';
import { assignmentService } from '../services/assignmentService';
import { facultyAnnouncementService } from '../services/facultyAnnouncementService';
import { AssignmentCardFaculty } from '../components/AssignmentCard';
import { apiErrorMessage } from '../../services/api';

export const FacultyDashboard = () => {
  const { facultyProfile } = useFaculty();
  const navigate = useNavigate();
  const [data, setData] = useState({ assignments: [], notices: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [assignments, notices] = await Promise.all([
        assignmentService.getAssignments(), facultyAnnouncementService.getAnnouncements()
      ]);
      setData({ assignments, notices });
    } catch (requestError) {
      setError(apiErrorMessage(requestError, 'Faculty workspace could not be loaded.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  return (
    <div className="workspace-page">
      <section className="dashboard-hero faculty-hero">
        <div className="dashboard-hero-copy">
          <div className="dashboard-eyebrow"><Sparkles size={15} /> FACULTY WORKSPACE</div>
          <h1>Welcome back, {facultyProfile?.name?.split(' ')[0] || 'Faculty'}.</h1>
          <p>{facultyProfile?.department || 'Your academic workspace'} · Stay on top of teaching and campus updates.</p>
        </div>
        <div className="dashboard-hero-actions">
          <button className="btn btn-hero-primary" onClick={() => navigate('/faculty/assignments/create')}><Plus size={17} /> New assignment</button>
          <button className="btn btn-hero-secondary" onClick={() => navigate('/faculty/announcements')}>Publish an update <ArrowRight size={16} /></button>
        </div>
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      </section>

      {error && <div className="student-card api-error-state" role="alert"><span>{error}</span><button className="btn btn-outline" onClick={loadDashboard}><RefreshCw size={15} /> Retry</button></div>}
      {loading && <div className="dashboard-loading-grid" role="status" aria-label="Loading faculty dashboard"><div /><div /><div className="dashboard-loading-wide" /></div>}
      {!loading && !error && <div className="grid-2 faculty-dashboard-grid">
        <section>
          <div className="student-section-heading"><div><span className="section-kicker">TEACHING</span><h2><BookOpenCheck size={18} /> Assignments <span className="heading-count">{data.assignments.length}</span></h2></div><button className="btn btn-quiet" onClick={() => navigate('/faculty/assignments')}>See all <ArrowRight size={14} /></button></div>
          {data.assignments.slice(0, 4).map((item) => <AssignmentCardFaculty key={item.id} assignment={item} />)}
          {!data.assignments.length && <div className="student-card dashboard-empty"><span className="empty-icon"><BookOpenCheck size={20} /></span><h3>No assignments yet</h3><p>Create an assignment when you’re ready to share work with students.</p><button className="btn btn-primary" onClick={() => navigate('/faculty/assignments/create')}><Plus size={16} /> Create assignment</button></div>}
        </section>
        <section>
          <div className="student-section-heading"><div><span className="section-kicker">CAMPUS UPDATES</span><h2><Megaphone size={18} /> Notices <span className="heading-count">{data.notices.length}</span></h2></div><button className="btn btn-quiet" onClick={() => navigate('/faculty/announcements')}>See all <ArrowRight size={14} /></button></div>
          {data.notices.slice(0, 4).map((notice) => <div className="student-card notice-dashboard-card" key={notice.id}>
            <span className="badge badge-trust">{notice.target || 'Campus notice'}</span><h3>{notice.title}</h3><p>{notice.message || notice.content}</p>
          </div>)}
          {!data.notices.length && <div className="student-card compact-empty">No notices have been published.</div>}
        </section>
      </div>}
    </div>
  );
};
