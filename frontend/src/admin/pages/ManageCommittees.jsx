import React, { useState, useEffect } from 'react';
import { committeeManagementService } from '../services/committeeManagementService';
import { PlusCircle, Building2 } from 'lucide-react';

export const ManageCommittees = () => {
  const [committees, setCommittees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Governance');

  useEffect(() => {
    async function load() {
      const comms = await committeeManagementService.getCommittees();
      setCommittees(comms);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) return;
    await committeeManagementService.createCommittee({ name, category });
    const updated = await committeeManagementService.getCommittees();
    setCommittees(updated);
    setName('');
    setShowModal(false);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Committee Management</h1>
          <p>Configure official college committees and institutional bodies</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} /> Create New Committee
        </button>
      </div>

      <div className="grid-2">
        {committees.map(c => (
          <div key={c.id} className="student-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <Building2 size={24} color="var(--primary-light)" />
              <h3 style={{ fontSize: '1.2rem' }}>{c.name}</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>Category: {c.category}</p>
            <div style={{ fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: '600', marginBottom: '0.5rem' }}>
              Office Bearers: {c.officeBearers.join(', ') || 'Unassigned'}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Create New College Committee</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Committee Name</label>
                <input type="text" className="form-input" placeholder="e.g. Anti-Ragging Committee" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Governance">Governance</option>
                  <option value="Academic / Technical">Academic / Technical</option>
                  <option value="Disciplinary">Disciplinary</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Committee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
