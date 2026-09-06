import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignmentService } from '../services/assignmentService';
import { ArrowLeft, PlusCircle } from 'lucide-react';

export const CreateAssignment = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Java Programming (IT302)');
  const [targetClass, setTargetClass] = useState('SE IT Division A');
  const [deadline, setDeadline] = useState('');
  const [totalMarks, setTotalMarks] = useState(20);
  const [instructions, setInstructions] = useState('');
  const [createdMsg, setCreatedMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !deadline || !instructions) return;
    await assignmentService.createAssignment({ title, subject, targetClass, deadline, totalMarks, instructions });
    setCreatedMsg('Assignment published successfully for SE IT Division A!');
    setTimeout(() => navigate('/faculty/assignments'), 1500);
  };

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/faculty/assignments')}>
        <ArrowLeft size={16} /> Back to Assignments
      </button>

      {createdMsg && (
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#15803d', marginBottom: '1.5rem' }}>
          {createdMsg}
        </div>
      )}

      <div className="student-card">
        <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '1.25rem' }}>Create New Course Assignment</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Assignment Title</label>
            <input type="text" className="form-input" placeholder="e.g. Java Assignment 4 — Spring Boot REST APIs" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <select className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="Java Programming (IT302)">Java Programming (IT302)</option>
                <option value="Distributed Systems (IT401)">Distributed Systems (IT401)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Class / Group</label>
              <select className="form-input" value={targetClass} onChange={(e) => setTargetClass(e.target.value)}>
                <option value="SE IT Division A">SE IT Division A</option>
                <option value="BE IT Division B">BE IT Division B</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Deadline Date & Time</label>
              <input type="datetime-local" className="form-input" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Maximum Marks</label>
              <input type="number" className="form-input" min={5} max={100} value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Instructions & Guidelines</label>
            <textarea className="form-input" rows={4} placeholder="Detailed instructions for students..." value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/faculty/assignments')}>Cancel</button>
            <button type="submit" className="btn btn-primary"><PlusCircle size={18} /> Publish Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
};
