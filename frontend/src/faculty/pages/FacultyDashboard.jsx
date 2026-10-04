import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, Megaphone } from 'lucide-react';
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

  useEffect(() => {
    Promise.all([assignmentService.getAssignments(), facultyAnnouncementService.getAnnouncements()])
      .then(([assignments, notices]) => setData({ assignments: assignments.slice(0, 3), notices: notices.slice(0, 3) }))
      .catch((requestError) => setError(apiErrorMessage(requestError, 'Faculty workspace could not be loaded.')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="student-card" style={{ background: 'linear-gradient(135deg, #0369a1, #0f172a)', color: 'white', marginBottom: '1.5rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.35rem' }}>Welcome, {facultyProfile?.name || 'Faculty member'}</h1>
        <p style={{ color: '#cbd5e1', margin: 0 }}>{facultyProfile?.department || 'Faculty workspace'} · Campus Connect</p>
      </section>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button className="btn btn-primary" onClick={() => navigate('/faculty/assignments/create')}>Create assignment</button>
        <button className="btn btn-outline" onClick={() => navigate('/faculty/announcements')}>Post announcement</button>
      </div>
      {loading && <div className="student-card" role="status">Loading your classes and updates…</div>}
      {error && <div className="student-card" role="alert">{error}</div>}
      {!loading && !error && <div className="grid-2">
        <section>
          <div className="student-section-heading"><h2><BookOpenCheck size={18} /> Assignments</h2><button className="btn btn-outline" onClick={() => navigate('/faculty/assignments')}>See all <ArrowRight size={14} /></button></div>
          {data.assignments.map((item) => <AssignmentCardFaculty key={item.id} assignment={item} />)}
          {!data.assignments.length && <div className="student-card">No assignments have been published.</div>}
        </section>
        <section>
          <div className="student-section-heading"><h2><Megaphone size={18} /> Notices</h2><button className="btn btn-outline" onClick={() => navigate('/faculty/announcements')}>See all</button></div>
          {data.notices.map((notice) => <div className="student-card" key={notice.id}>
            <span className="badge badge-trust">{notice.target}</span><h3>{notice.title}</h3><p>{notice.message}</p>
          </div>)}
          {!data.notices.length && <div className="student-card">No notices have been published.</div>}
        </section>
      </div>}
    </div>
  );
};
