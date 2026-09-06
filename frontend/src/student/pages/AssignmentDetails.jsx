import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assignmentService } from '../services/assignmentService';
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';

export const AssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [fileName, setFileName] = useState('');
  const [submittedMsg, setSubmittedMsg] = useState('');

  useEffect(() => {
    async function load() {
      const asgn = await assignmentService.getAssignmentById(id || 'asgn-1');
      setAssignment(asgn);
    }
    load();
  }, [id]);

  const handleSubmitWork = async (e) => {
    e.preventDefault();
    if (!fileName) return;
    const updated = await assignmentService.submitAssignment(assignment.id, fileName);
    setAssignment(updated);
    setSubmittedMsg('Assignment submitted successfully! Ready for faculty review.');
  };

  if (!assignment) return <div>Loading assignment details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/student/assignments')}>
        <ArrowLeft size={16} /> Back to Assignments
      </button>

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge-trust" style={{ marginBottom: '0.5rem' }}>{assignment.subject}</span>
        <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{assignment.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Faculty: {assignment.facultyName} • Due: {assignment.deadline}</p>

        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>Instructions</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{assignment.instructions}</p>
        </div>

        {assignment.feedback && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', color: '#166534' }}>
            <strong>Faculty Feedback:</strong> {assignment.feedback} (Marks: {assignment.marks}/{assignment.totalMarks})
          </div>
        )}
      </div>

      {submittedMsg && (
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#15803d', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {submittedMsg}
        </div>
      )}

      <div className="student-card">
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Submission Interface</h3>

        {assignment.status === 'Pending' ? (
          <form onSubmit={handleSubmitWork}>
            <div className="form-group">
              <label className="form-label">Attach Project Archive / Document (.pdf, .zip)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Java_Assignment3_AnshSharma.zip"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <Upload size={18} /> Submit Work
            </button>
          </form>
        ) : (
          <div style={{ color: 'var(--success)', fontWeight: '600' }}>
            <CheckCircle2 size={18} style={{ display: 'inline', marginRight: '6px' }} />
            Submitted on {assignment.submissionDate}
          </div>
        )}
      </div>
    </div>
  );
};
