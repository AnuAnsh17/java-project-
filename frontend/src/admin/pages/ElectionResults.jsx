import React, { useState, useEffect } from 'react';
import { electionManagementService } from '../services/electionManagementService';
import { Award, Vote } from 'lucide-react';

export const ElectionResults = () => {
  const [results, setResults] = useState([]);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await electionManagementService.getResults();
      setResults(res);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Election Results Calculation & Publishing</h1>
          <p>Verified vote counts and election winner certification</p>
        </div>

        {!published && (
          <button className="btn btn-primary" onClick={() => setPublished(true)}>
            <Award size={18} /> Publish Official Results
          </button>
        )}
      </div>

      {published && (
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#15803d', marginBottom: '1.5rem', fontWeight: '600' }}>
          Official election results published to student portal! Winner automatically certified for General Secretary appointment.
        </div>
      )}

      <div className="student-card">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Student Council Election 2026 — General Secretary Results</h3>

        {results.map((res, i) => (
          <div key={i} style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div>
                <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>{res.candidateName}</span>
                {res.isWinner && <span className="badge badge-college" style={{ marginLeft: '0.5rem' }}><Award size={14} /> WINNER</span>}
              </div>
              <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{res.votes} Votes ({res.percentage}%)</span>
            </div>

            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${res.percentage}%`, height: '100%', background: res.isWinner ? 'var(--success)' : 'var(--primary-light)', borderRadius: '4px' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
