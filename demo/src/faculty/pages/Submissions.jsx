import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submissionService } from '../services/submissionService';
import { Eye, FileCheck, CheckCircle2 } from 'lucide-react';

export const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gradedMsg, setGradedMsg] = useState('');

  useEffect(() => {
    async function load() {
      const subs = await submissionService.getSubmissions();
      setSubmissions(subs);
    }
    load();
  }, []);

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSub || !marks) return;
    await submissionService.gradeSubmission(selectedSub.id, marks, feedback);
    const updated = await submissionService.getSubmissions();
    setSubmissions(updated);
    setGradedMsg(`Graded ${selectedSub.studentName} with ${marks}/${selectedSub.totalMarks} marks.`);
    setSelectedSub(null);
    setMarks('');
    setFeedback('');
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Student Submissions & Grading</h1>
          <p>Review submitted coursework and assign marks & feedback</p>
        </div>
      </div>

      {gradedMsg && (
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#15803d', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {gradedMsg}
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Assignment</th>
              <th>Submission Date</th>
              <th>Attached Archive</th>
              <th>Status</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{sub.rollNo}</td>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{sub.studentName}</td>
                <td>{sub.assignmentTitle}</td>
                <td>{sub.submissionDate}</td>
                <td style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--primary-light)' }}>{sub.fileName}</td>
                <td><span className={`status-badge ${sub.status === 'Graded' ? 'status-active' : 'status-pending'}`}>{sub.status}</span></td>
                <td style={{ fontWeight: '700' }}>{sub.marks !== null ? `${sub.marks}/${sub.totalMarks}` : '—'}</td>
                <td>
                  <button className="btn btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }} onClick={() => { setSelectedSub(sub); setMarks(sub.marks || ''); setFeedback(sub.feedback || ''); }}>
                    <FileCheck size={14} /> {sub.status === 'Graded' ? 'Edit Grade' : 'Grade Work'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSub && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Grade Submission: {selectedSub.studentName}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {selectedSub.assignmentTitle} • File: <code>{selectedSub.fileName}</code>
            </p>

            <form onSubmit={handleGradeSubmit}>
              <div className="form-group">
                <label className="form-label">Marks (Out of {selectedSub.totalMarks})</label>
                <input type="number" className="form-input" min={0} max={selectedSub.totalMarks} value={marks} onChange={(e) => setMarks(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Faculty Feedback</label>
                <textarea className="form-input" rows={3} placeholder="Feedback on implementation, code quality..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setSelectedSub(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Grade & Feedback</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
