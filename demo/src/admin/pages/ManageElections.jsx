import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { electionManagementService } from '../services/electionManagementService';
import { PlusCircle, Vote, CheckCircle2, UserCheck } from 'lucide-react';

export const ManageElections = () => {
  const [elections, setElections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const el = await electionManagementService.getElections();
      setElections(el);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !position) return;
    await electionManagementService.createElection({ title, position });
    const updated = await electionManagementService.getElections();
    setElections(updated);
    setTitle('');
    setPosition('');
    setShowModal(false);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Election Management</h1>
          <p>Configure digital elections, approve candidates, and publish results</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={() => navigate('/admin/elections/candidates')}>
            <UserCheck size={16} /> Candidate Review
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/admin/elections/results')}>
            <Vote size={16} /> Results Panel
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <PlusCircle size={18} /> Configure New Election
          </button>
        </div>
      </div>

      <div className="grid-2">
        {elections.map(el => (
          <div key={el.id} className="student-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-trust">{el.status}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{el.eligibleBranch}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{el.title}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--primary-light)', fontWeight: '600', marginBottom: '0.85rem' }}>Position: {el.position}</p>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Votes Cast: {el.totalVotesCast} • Candidates: {el.candidatesCount}</div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Configure Campus Election</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Election Title</label>
                <input type="text" className="form-input" placeholder="e.g. Student Council Election 2026" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Position Title</label>
                <input type="text" className="form-input" placeholder="e.g. General Secretary / Cultural Secretary" value={position} onChange={(e) => setPosition(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Start Election</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
