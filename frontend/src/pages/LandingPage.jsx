import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  BookOpen,
  Calendar,
  Bell,
  Vote,
  ShieldAlert,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle,
  UserCheck,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import '../styles/landing.css';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page" id="top">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-fade-in">
              <span className="badge badge-college">
                <GraduationCap size={16} />
                Thakur Shree DPS College of Engineering and Management
              </span>

              <h1 className="hero-heading">
                Your Campus. <span>Connected.</span>
              </h1>

              <p className="hero-lead">
                Campus Connect brings students, faculty, clubs, committees, events, academic collaboration and official college communication into one private digital ecosystem.
              </p>

              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/login')}
                >
                  Login to Campus Connect
                  <ArrowRight size={18} />
                </button>
                <a href="#features" className="btn btn-outline">
                  Explore the Platform
                </a>
              </div>
            </div>

            <div className="hero-graphic d-none d-lg-block">
              <div className="hero-graphic-card">
                <div className="graphic-header">
                  <div className="graphic-dots">
                    <div className="dot dot-red"></div>
                    <div className="dot dot-yellow"></div>
                    <div className="dot dot-green"></div>
                  </div>
                  <span className="badge badge-trust">
                    <ShieldCheck size={14} /> Official TSDCEM Portal
                  </span>
                </div>

                <div className="graphic-mock-items">
                  <div className="mock-item">
                    <div className="mock-icon mock-icon-blue">
                      <MessageSquare size={20} />
                    </div>
                    <div className="mock-text">
                      <h4>Campus Social Feed</h4>
                      <p>Category discussions, upvotes & student forums</p>
                    </div>
                  </div>

                  <div className="mock-item">
                    <div className="mock-icon mock-icon-cyan">
                      <BookOpen size={20} />
                    </div>
                    <div className="mock-text">
                      <h4>Academic Workspace</h4>
                      <p>Faculty teams, assignments & attendance</p>
                    </div>
                  </div>

                  <div className="mock-item">
                    <div className="mock-icon mock-icon-gold">
                      <Vote size={20} />
                    </div>
                    <div className="mock-text">
                      <h4>Digital Campus Elections</h4>
                      <p>Student Council & organizational voting</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Privacy Section */}
      <section className="trust-section" id="about">
        <div className="container">
          <div className="trust-banner">
            <div className="trust-content">
              <span className="badge badge-trust" style={{ marginBottom: '0.8rem', background: 'rgba(255,255,255,0.15)', color: '#38bdf8' }}>
                <Lock size={14} /> Private College Ecosystem
              </span>
              <h3>Built exclusively for the TSDCEM community</h3>
              <p>
                Campus Connect is a closed, secure digital platform. Access is strictly restricted to verified students, faculty members, and college administrators. No external public account creation is permitted.
              </p>
            </div>
            <div className="domain-pill">
              <ShieldCheck size={22} />
              @tsdcem.ac.in
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Platform Capabilities</span>
            <h2 className="section-title">Everything your campus needs in one place</h2>
            <p className="section-subtitle">
              Designed specifically around the operational flow of Thakur Shree DPS College of Engineering and Management.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MessageSquare size={26} />
              </div>
              <h3>Campus Community</h3>
              <p>
                Discuss campus life, academics, technology, placements and everything happening around college in category-specific forums.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Users size={26} />
              </div>
              <h3>Clubs & Committees</h3>
              <p>
                Discover student organizations, follow activities, request membership, participate in events and stay connected with campus leadership.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <BookOpen size={26} />
              </div>
              <h3>Academic Workspace</h3>
              <p>
                Access course assignments, submission feedback, subject attendance percentages, and faculty-created academic groups.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Calendar size={26} />
              </div>
              <h3>Campus Events</h3>
              <p>
                Discover and register for college fests, hackathons, sports tournaments, technical workshops, and club activities.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Bell size={26} />
              </div>
              <h3>Official Notices</h3>
              <p>
                Receive verified administrative announcements, circulars, examination timetables, and form deadlines without clutter.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Vote size={26} />
              </div>
              <h3>Student Elections</h3>
              <p>
                Participate in transparent digital elections for Student Council, club executive boards, and committee positions.
              </p>
            </div>

            <div className="feature-card" style={{ gridColumn: 'span 1' }}>
              <div className="feature-icon-wrapper" style={{ background: '#fef2f2', color: '#ef4444' }}>
                <ShieldAlert size={26} />
              </div>
              <h3>Complaints & Reports</h3>
              <p>
                Report grievances or content concerns through a dedicated portal with optional anonymous reporting features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Campus Connect Works */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Access Protocol</span>
            <h2 className="section-title">How Campus Connect Works</h2>
            <p className="section-subtitle">
              Simple 4-step access reserved strictly for authorized college members.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h4>College Email</h4>
              <p>Authenticate using your official issued <strong>@tsdcem.ac.in</strong> institutional email address.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h4>Role Selection</h4>
              <p>Identify your primary account category: Student, Faculty Member, or College Administrator.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h4>Enter Campus</h4>
              <p>Access your personalized dashboard with features scoped specifically to your roles and permissions.</p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <h4>Collaborate & Engage</h4>
              <p>Participate in campus discussions, submit coursework, join events, and vote in campus elections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section" id="community">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Campus Ecosystem</span>
            <h2 className="section-title">One Connected Community</h2>
            <p className="section-subtitle">
              Bringing together all key stakeholders of Thakur Shree DPS College of Engineering and Management.
            </p>
          </div>

          <div className="community-grid">
            <div className="community-card">
              <div className="community-avatar">
                <GraduationCap size={28} />
              </div>
              <h3>Students</h3>
              <p className="small text-muted" style={{ marginTop: '0.5rem' }}>
                Engage in forums, track academics, join clubs, and participate in campus elections.
              </p>
            </div>

            <div className="community-card">
              <div className="community-avatar" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <Briefcase size={28} />
              </div>
              <h3>Faculty</h3>
              <p className="small text-muted" style={{ marginTop: '0.5rem' }}>
                Manage classes, assign coursework, track attendance, and publish course announcements.
              </p>
            </div>

            <div className="community-card">
              <div className="community-avatar" style={{ background: '#fef3c7', color: '#d97706' }}>
                <Users size={28} />
              </div>
              <h3>Clubs</h3>
              <p className="small text-muted" style={{ marginTop: '0.5rem' }}>
                Student-driven organizations hosting technical, cultural, and sports events.
              </p>
            </div>

            <div className="community-card">
              <div className="community-avatar" style={{ background: '#ecfdf5', color: '#10b981' }}>
                <UserCheck size={28} />
              </div>
              <h3>Committees</h3>
              <p className="small text-muted" style={{ marginTop: '0.5rem' }}>
                Formal college bodies including Student Council, Technical & Cultural Committees.
              </p>
            </div>

            <div className="community-card">
              <div className="community-avatar" style={{ background: '#f3e8ff', color: '#9333ea' }}>
                <ShieldCheck size={28} />
              </div>
              <h3>Administration</h3>
              <p className="small text-muted" style={{ marginTop: '0.5rem' }}>
                Oversee campus operations, publish notices, manage elections, and resolve reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Complaints & Privacy Section */}
      <section className="complaints-section" id="complaints">
        <div className="container">
          <div className="complaints-card">
            <span className="badge badge-trust" style={{ marginBottom: '1rem', background: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>
              <ShieldAlert size={14} /> Student Grievance Portal
            </span>
            <h2>Speak up when it matters</h2>
            <p>
              Students can report concerns through a dedicated complaint portal, with the choice to disclose their identity to authorized administrators or submit anonymously.
            </p>

            <div className="options-row">
              <div className="option-box">
                <h4>1. Identified Report</h4>
                <p>
                  Your identity is shared securely with designated college administrators for direct follow-up, investigation updates, and formal resolution.
                </p>
              </div>

              <div className="option-box">
                <h4>2. Anonymous Submission</h4>
                <p>
                  Submitted anonymously to protect student privacy while allowing administration to investigate campus or organizational grievances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Access Matrix */}
      <section className="roles-section" id="roles">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Access Architecture</span>
            <h2 className="section-title">Role-Based Permission System</h2>
            <p className="section-subtitle">
              Campus Connect dynamically adjusts permissions based on account category, membership, and appointed positions.
            </p>
          </div>

          <div className="roles-grid">
            <div className="role-column">
              <div className="role-badge-header">
                <GraduationCap size={24} color="#2563eb" />
                <h3>STUDENT</h3>
              </div>
              <ul className="role-features-list">
                <li><CheckCircle size={16} /> Campus Community Feed</li>
                <li><CheckCircle size={16} /> Clubs & Committees Access</li>
                <li><CheckCircle size={16} /> Event Registration</li>
                <li><CheckCircle size={16} /> Student Council Voting</li>
                <li><CheckCircle size={16} /> Academic Workspace & Teams</li>
                <li><CheckCircle size={16} /> Subject Attendance View</li>
                <li><CheckCircle size={16} /> Assignment Submission</li>
                <li><CheckCircle size={16} /> Grievance Reporting</li>
              </ul>
            </div>

            <div className="role-column">
              <div className="role-badge-header">
                <Briefcase size={24} color="#0284c7" />
                <h3>FACULTY</h3>
              </div>
              <ul className="role-features-list">
                <li><CheckCircle size={16} /> Class & Course Management</li>
                <li><CheckCircle size={16} /> Create & Grade Assignments</li>
                <li><CheckCircle size={16} /> Record Student Attendance</li>
                <li><CheckCircle size={16} /> Create Academic Teams/Groups</li>
                <li><CheckCircle size={16} /> Course Announcements</li>
                <li><CheckCircle size={16} /> Share Study Resources</li>
                <li><CheckCircle size={16} /> Student Submission Feedback</li>
              </ul>
            </div>

            <div className="role-column">
              <div className="role-badge-header">
                <ShieldCheck size={24} color="#059669" />
                <h3>ADMIN</h3>
              </div>
              <ul className="role-features-list">
                <li><CheckCircle size={16} /> Student & Faculty Management</li>
                <li><CheckCircle size={16} /> Club & Committee Oversight</li>
                <li><CheckCircle size={16} /> Official Notice Board Publishing</li>
                <li><CheckCircle size={16} /> Election Start / Stop & Results</li>
                <li><CheckCircle size={16} /> Report & Complaint Resolution</li>
                <li><CheckCircle size={16} /> Organizational Appointments</li>
                <li><CheckCircle size={16} /> Platform Moderation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-box">
            <h2>Welcome to your campus, connected.</h2>
            <p>Access Campus Connect using your official TSDCEM college account.</p>
            <button
              className="btn btn-primary"
              style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
              onClick={() => navigate('/login')}
            >
              Login to Campus Connect
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
