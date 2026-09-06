import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const forumCategories = [
  { name: "General Discussions", desc: "General discussions related to campus life, queries, and student announcements." },
  { name: "Academics & Study", desc: "Curriculum discussions, exam preparation, notes sharing, and subject queries." },
  { name: "Placements & Internships", desc: "Interview experiences, coding practice resources, and placement drive alerts." },
  { name: "Technology & Coding", desc: "Software projects, AI developments, open-source discussions, and tech news." },
  { name: "Campus Life & Culture", desc: "Hostel life, canteen reviews, music, arts, and informal college events." },
  { name: "Sports & Fitness", desc: "Inter-college sports tournaments, fitness advice, and sports club updates." }
];

export const Forums = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Category Forums</h1>
          <p>Explore organized campus discussions by interest area</p>
        </div>
      </div>

      <div className="grid-3">
        {forumCategories.map((forum, i) => (
          <div
            key={i}
            className="student-card student-card-hover"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/student/feed')}
          >
            <MessageSquare size={24} color="var(--primary-light)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{forum.name}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{forum.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
