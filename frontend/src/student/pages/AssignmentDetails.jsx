import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarClock } from 'lucide-react';
import { assignmentService } from '../services/assignmentService';
import { apiErrorMessage } from '../../services/api';

export const AssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    assignmentService.getAssignmentById(id)
      .then(setAssignment)
      .catch((requestError) => setError(apiErrorMessage(requestError, 'Assignment could not be loaded.')));
  }, [id]);

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/student/assignments')}><ArrowLeft size={16} /> Back to assignments</button>
      {error && <div className="student-card" role="alert">{error}</div>}
      {!assignment && !error && <div className="student-card" role="status">Loading assignment…</div>}
      {assignment && <section className="student-card">
        <span className="badge badge-trust">{assignment.subject}</span>
        <h1 style={{ color: 'var(--primary-dark)', margin: '.6rem 0' }}>{assignment.title}</h1>
        <p><CalendarClock size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />Due {assignment.deadline || 'date not set'}</p>
        <p>Posted by {assignment.facultyName || 'Faculty'}</p>
        <h3>Instructions</h3><p style={{ whiteSpace: 'pre-wrap' }}>{assignment.instructions || 'No instructions provided.'}</p>
        <div className="auth-restriction-notice" style={{ marginTop: '1rem' }}>The assignment record is live. File upload and grading are not available in this prototype.</div>
      </section>}
    </div>
  );
};
