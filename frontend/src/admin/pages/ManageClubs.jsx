import React, { useState, useEffect } from 'react';
import { clubManagementService } from '../services/clubManagementService';
import { PlusCircle, Briefcase } from 'lucide-react';

export const ManageClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [leader, setLeader] = useState('');

  useEffect(() => {
    async function load() {
      const c = await clubManagementService.getClubs();
      setClubs(c);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) return;
    await clubManagementService.createClub({ name, category, leader });
    const updated = await clubManagementService.getClubs();
    setClubs(updated);
    setName('');
    setLeader('');
    setShowModal(false);
  };

  const handleToggleStatus = async (id) => {
    const updated = await clubManagementService.toggleStatus(id);
    setClubs(updated);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Club Management</h1>
          <p>Create and govern student clubs across technical, cultural, and sports domains</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} /> Create New Club
        </button>
      </div>

      <div className="grid-3">
        {clubs.map(club => (
          <div key={club.id} className="student-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span className="badge badge-trust">{club.category}</span>
              <span className={`status-badge ${club.status === 'Active' ? 'status-active' : 'status-suspended'}`}>{club.status}</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{club.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: '600', marginBottom: '0.85rem' }}>Leadership: {club.leader}</p>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Members: {club.membersCount} • Created: {club.createdDate}</div>

            <button
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.82rem', color: club.status === 'Active' ? 'var(--error)' : 'var(--success)' }}
              onClick={() => handleToggleStatus(club.id)}
            >
              {club.status === 'Active' ? 'Deactivate Club' : 'Activate Club'}
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Create New Student Club</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Club Name</label>
                <input type="text" className="form-input" placeholder="e.g. Artificial Intelligence Club" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Social">Social</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Designated Leader / President</label>
                <input type="text" className="form-input" placeholder="Student name or leave for appointment" value={leader} onChange={(e) => setLeader(e.target.value)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Club</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
