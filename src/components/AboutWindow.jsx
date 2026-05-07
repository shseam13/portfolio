import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiFacebook, FiBriefcase, FiBook, FiArrowRight, FiMonitor, FiSmartphone, FiTool, FiCpu, FiGlobe } from 'react-icons/fi';
import AvatarImg from './AvatarImg';

const EXPERIENCE = [
  {
    role: 'Jr. Software Engineer',
    company: 'Instawebworks Pty. Ltd.',
    period: 'Aug 2025 – Apr 2026 · 0.9 yrs',
    location: 'HQ: Broadmeadows VIC, Australia · BD: Khatungonj, Chattogram',
    points: [
      'Automation of Zoho CRM, Word, Excel & 3rd-party software integration',
      'Developing fully functional software, websites and CRM/ERP systems',
      'AI automation & chatbot integration',
      'Database management',
    ],
  },
  {
    role: 'Sr. Executive – Admin, HR & Compliance',
    company: 'Crown Group of Companies',
    period: 'Oct 2024 – Apr 2025 · 0.6 yrs',
    location: 'Chattogram, Bangladesh',
    points: [
      'HRM function analytics & payroll administration',
      'RMG compliance & international labour rules',
      'Compliance audit management',
    ],
  },
  {
    role: 'IT Officer',
    company: 'AL-ITTEFAQ TEXTILES LIMITED',
    period: 'Nov 2023 – Sep 2024 · 0.11 yrs',
    location: 'Chattogram, Bangladesh',
    points: [
      'IT network (MikroTik) management',
      'Payroll & salary sheet administration',
      'CCTV networking & peripheral setup',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'B.Sc. — Computer Science and Engineering (CSE)',
    institute: 'Port City International University',
    result: 'CGPA 3.47 / 4.00',
    year: '2023',
  },
  {
    degree: 'HSC — Science',
    institute: 'Bakalia Govt. College',
    result: 'GPA 4.25 / 5.00',
    year: '2018',
  },
  {
    degree: 'SSC — Science',
    institute: 'Hazi Chand Meah Showdagar High School',
    result: 'GPA 5.00 — Golden A+',
    year: '2016',
  },
];

export default function AboutWindow() {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
        <div className="about-avatar" style={{ flexShrink: 0, padding: 0, overflow: 'hidden' }}>
          <AvatarImg size={90} iconSize={40} />
        </div>
        <div>
          <div className="about-name">Shajjad Hossain Seam</div>
          <div className="about-role">Jr. Software Engineer · Full-Stack Developer</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            <FiMapPin size={12} /> Chandgaon, Chattogram, Bangladesh
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <span style={statChip}>3+ yrs experience</span>
            <span style={statChip}>B.Sc. CSE</span>
            <span style={statChip}>Full Time</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="about-quote" style={{ marginBottom: 20 }}>
        Full-Stack Developer with <strong>3+ years</strong> of professional experience delivering
        web applications, CRM/ERP systems, and AI-powered automation for clients in Australia and Bangladesh.
        I turn ideas into fast, scalable, production-ready software — whether it's a simple website,
        a complex business system, or an intelligent automation pipeline.
      </div>

      {/* ── Hire Me Card ── */}
      <div style={hireCard}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🚀</span> Available for Projects
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
              Web · Mobile · Desktop · Automation · AI
            </div>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openWindow', { detail: 'contact' }))}
            style={hireBtn}
            onMouseEnter={e => e.currentTarget.style.background = '#0062CC'}
            onMouseLeave={e => e.currentTarget.style.background = '#007AFF'}
          >
            Start a Project <FiArrowRight size={13} />
          </button>
        </div>

        <div style={servicesGrid}>
          {SERVICES.map(s => (
            <div key={s.label} style={serviceItem}>
              <span style={{ color: s.color, fontSize: 18 }}>{s.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="about-links" style={{ marginBottom: 28 }}>
        <a href="mailto:seam.cse.pciu@gmail.com" className="about-link"><FiMail size={14} /> seam.cse.pciu@gmail.com</a>
        <a href="tel:+8801626014236" className="about-link"><FiPhone size={14} /> +880 1626 014236</a>
        <a href="https://github.com/shseam13" target="_blank" rel="noreferrer" className="about-link"><FiGithub size={14} /> GitHub</a>
        <a href="https://www.linkedin.com/in/shseam13/" target="_blank" rel="noreferrer" className="about-link"><FiLinkedin size={14} /> LinkedIn</a>
        <a href="https://www.facebook.com/shseam13" target="_blank" rel="noreferrer" className="about-link"><FiFacebook size={14} /> Facebook</a>
      </div>

      {/* Employment */}
      <div style={{ marginBottom: 28 }}>
        <div className="skills-section-title"><FiBriefcase size={13} /> Employment History · 3+ Years</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {EXPERIENCE.map((e) => (
            <div key={e.role} style={expCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{e.role}</div>
                  <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>{e.company}</div>
                </div>
                <span style={periodBadge}>{e.period}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                <FiMapPin size={10} /> {e.location}
              </div>
              <ul style={{ margin: '8px 0 0 16px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {e.points.map((p) => (
                  <li key={p} style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="skills-section-title"><FiBook size={13} /> Academic Qualifications</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {EDUCATION.map((e) => (
            <div key={e.degree} style={eduRow}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{e.degree}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{e.institute}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{e.result}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{e.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  { label: 'Web App',       icon: '🌐', color: '#007AFF' },
  { label: 'Android App',   icon: '🤖', color: '#3DDC84' },
  { label: 'iOS App',       icon: '🍎', color: '#555' },
  { label: 'CRM / ERP',     icon: '🔧', color: '#FF9F0A' },
  { label: 'AI Automation', icon: '🧠', color: '#AF52DE' },
  { label: 'API & Backend', icon: '⚡', color: '#FF2D55' },
];

const hireCard = {
  background: 'linear-gradient(135deg, rgba(0,122,255,0.06) 0%, rgba(88,86,214,0.06) 100%)',
  border: '1.5px solid rgba(0,122,255,0.2)',
  borderRadius: 12,
  padding: '18px 20px',
  marginBottom: 20,
};

const hireBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '9px 18px',
  background: '#007AFF',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  transition: 'background 0.15s ease',
  flexShrink: 0,
};

const servicesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 8,
};

const serviceItem = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 10px',
  background: 'rgba(255,255,255,0.6)',
  border: '1px solid rgba(0,0,0,0.07)',
  borderRadius: 8,
};

const statChip = {
  fontSize: 11,
  fontWeight: 500,
  padding: '3px 9px',
  background: 'rgba(0,122,255,0.08)',
  border: '1px solid rgba(0,122,255,0.18)',
  borderRadius: 20,
  color: '#0051a8',
};

const expCard = {
  background: 'var(--card-bg)',
  border: '1px solid var(--card-border)',
  borderRadius: 10,
  padding: '14px 16px',
};

const periodBadge = {
  fontSize: 11,
  color: 'var(--text-secondary)',
  background: 'rgba(0,0,0,0.05)',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: 6,
  padding: '2px 8px',
  whiteSpace: 'nowrap',
};

const eduRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 12,
  padding: '12px 14px',
  background: 'var(--card-bg)',
  border: '1px solid var(--card-border)',
  borderRadius: 8,
};
