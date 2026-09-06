import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamService } from '../services/teamService';
import { ArrowLeft, PlusCircle } from 'lucide-react';

export const CreateTeamFaculty = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Java Programming (IT302)');
  const [targetClass, setTargetClass] = useState('SE IT Division A');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) return;
    await teamService.createTeam({ name, subject, targetClass, description });
    navigate('/faculty/teams');
  };

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/faculty/teams')}>
        <ArrowLeft size={16} /> Back to Teams
      </button>

      <div className="student-card">
        <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '1.25rem' }}>Create Academic Team / Project Group</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Team / Group Name</label>
            <input type="text" className="form-input" placeholder="e.g. Java Mini Project — Group 5" value={name} onChange={(e) => setName(e.target.value)} required />
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
              <label className="form-label">Target Class</label>
              <select className="form-input" value={targetClass} onChange={(e) => setTargetClass(e.target.value)}>
                <option value="SE IT Division A">SE IT Division A</option>
                <option value="BE IT Division B">BE IT Division B</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Objectives</label>
            <textarea className="form-input" rows={4} placeholder="Purpose of team, project domain..." value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/faculty/teams')}>Cancel</button>
            <button type="submit" className="btn btn-primary"><PlusCircle size={18} /> Create Academic Team</button>
          </div>
        </form>
      </div>
    </div>
  );
};
