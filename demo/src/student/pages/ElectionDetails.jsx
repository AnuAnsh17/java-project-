import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { electionService } from '../services/electionService';
import { ArrowLeft, Vote, CheckCircle2, AlertCircle } from 'lucide-react';

export const ElectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [votedMessage, setVotedMessage] = useState('');

  useEffect(() => {
    async function load() {
      const el = await electionService.getElectionById(id || 'elec-101');
      setElection(el);
    }
    load();
  }, [id]);

  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCandidate) return;
    const updated = await electionService.castVote(election.id, selectedCandidate);
    setElection(updated);
    setVotedMessage('Your vote has been cast successfully! One vote per eligible student recorded.');
  };

  if (!election) return <div>Loading election details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/student/elections')}>
        <ArrowLeft size={16} /> Back to Elections
      </button>

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge-trust" style={{ marginBottom: '0.5rem' }}>{election.status}</span>
        <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>{election.title}</h1>
        <p style={{ color: 'var(--primary-light)', fontWeight: '600', marginBottom: '0.85rem' }}>Position: {election.position}</p>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Eligibility: {election.eligibleBranch} • Start: {election.startDate} • End: {election.endDate}
        </div>
      </div>

      {votedMessage && (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#15803d', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {votedMessage}
        </div>
      )}

      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Candidates</h3>

      <form onSubmit={handleVoteSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {election.candidates.map(cand => (
            <div key={cand.id} className="student-card" style={{ border: selectedCandidate === cand.id ? '2px solid var(--primary-light)' : '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                {!election.userHasVoted && (
                  <input
                    type="radio"
                    name="candidate"
                    value={cand.id}
                    checked={selectedCandidate === cand.id}
                    onChange={() => setSelectedCandidate(cand.id)}
                    style={{ marginTop: '4px', cursor: 'pointer' }}
                  />
                )}
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{cand.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cand.branch}</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    <strong>Manifesto:</strong> {cand.manifesto}
                  </p>
                  {election.userHasVoted && (
                    <div style={{ marginTop: '0.5rem', fontWeight: '700', color: 'var(--primary-light)', fontSize: '0.88rem' }}>
                      Votes: {cand.votes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!election.userHasVoted ? (
          <button type="submit" className="btn btn-primary" disabled={!selectedCandidate}>
            <Vote size={18} /> Confirm & Cast Vote
          </button>
        ) : (
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '4px', color: 'var(--success)' }} />
            You have already participated in this election.
          </div>
        )}
      </form>
    </div>
  );
};
