import {
  SiPython, SiJavascript, SiHtml5, SiCss,
  SiPostgresql, SiMysql, SiReact, SiGit,
  SiGithub, SiLinux, SiZoho, SiDjango, SiCisco,
} from 'react-icons/si';
import { FiCode, FiDatabase, FiLayers, FiCpu, FiWifi, FiUsers, FiTool, FiGlobe } from 'react-icons/fi';

const sections = [
  {
    title: 'Languages & Web',
    icon: <FiCode />,
    skills: [
      { label: 'Python', icon: <SiPython style={{ color: '#3776AB' }} /> },
      { label: 'JavaScript', icon: <SiJavascript style={{ color: '#F7DF1E' }} /> },
      { label: 'HTML5', icon: <SiHtml5 style={{ color: '#E34F26' }} /> },
      { label: 'CSS3', icon: <SiCss style={{ color: '#1572B6' }} /> },
      { label: 'Zoho Deluge', icon: <SiZoho style={{ color: '#E42527' }} /> },
      { label: 'SQL', icon: <FiDatabase style={{ color: '#007AFF' }} /> },
    ],
  },
  {
    title: 'Frameworks & Platforms',
    icon: <FiLayers />,
    skills: [
      { label: 'React', icon: <SiReact style={{ color: '#61DAFB' }} /> },
      { label: 'Django', icon: <SiDjango style={{ color: '#092E20' }} /> },
      { label: 'Zoho CRM / ERP', icon: <SiZoho style={{ color: '#E42527' }} /> },
      { label: 'REST API', icon: <FiGlobe style={{ color: '#007AFF' }} /> },
    ],
  },
  {
    title: 'Databases',
    icon: <FiDatabase />,
    skills: [
      { label: 'PostgreSQL', icon: <SiPostgresql style={{ color: '#336791' }} /> },
      { label: 'MySQL', icon: <SiMysql style={{ color: '#4479A1' }} /> },
    ],
  },
  {
    title: 'AI & Machine Learning',
    icon: <FiCpu />,
    skills: [
      { label: 'Artificial Intelligence', icon: <FiCpu style={{ color: '#AF52DE' }} /> },
      { label: 'Machine Learning', icon: <FiCpu style={{ color: '#FF9F0A' }} /> },
      { label: 'Deep Learning', icon: <FiCpu style={{ color: '#FF2D55' }} /> },
      { label: 'AI Automation', icon: <FiCpu style={{ color: '#30D158' }} /> },
      { label: 'Chatbot Integration', icon: <FiCpu style={{ color: '#5AC8FA' }} /> },
    ],
  },
  {
    title: 'Networking & Infrastructure',
    icon: <FiWifi />,
    skills: [
      { label: 'MikroTik', icon: <FiWifi style={{ color: '#FF6B00' }} /> },
      { label: 'CISCO', icon: <SiCisco style={{ color: '#1BA0D7' }} /> },
      { label: 'Packet Tracer', icon: <FiWifi style={{ color: '#1BA0D7' }} /> },
      { label: 'CCTV Networking', icon: <FiWifi style={{ color: '#9999b3' }} /> },
      { label: 'Linux', icon: <SiLinux style={{ color: '#FCC624' }} /> },
    ],
  },
  {
    title: 'Tools & Office',
    icon: <FiTool />,
    skills: [
      { label: 'Microsoft Excel', icon: <FiTool style={{ color: '#217346' }} /> },
      { label: 'Microsoft Word', icon: <FiTool style={{ color: '#2B579A' }} /> },
      { label: 'VLookup / Macros', icon: <FiTool style={{ color: '#217346' }} /> },
      { label: 'Git', icon: <SiGit style={{ color: '#F05032' }} /> },
      { label: 'GitHub', icon: <SiGithub style={{ color: '#f0f0f5' }} /> },
    ],
  },
  {
    title: 'Soft Skills',
    icon: <FiUsers />,
    skills: [
      { label: 'Team Management', icon: <FiUsers style={{ color: '#007AFF' }} /> },
      { label: 'Leadership', icon: <FiUsers style={{ color: '#FF9F0A' }} /> },
      { label: 'Project Presentation', icon: <FiUsers style={{ color: '#30D158' }} /> },
      { label: 'Problem Solving', icon: <FiUsers style={{ color: '#AF52DE' }} /> },
      { label: 'Volunteering', icon: <FiUsers style={{ color: '#FF2D55' }} /> },
    ],
  },
];

const TRAINING = [
  {
    title: 'AI & Machine Learning with Python',
    topics: 'AI, ML, Deep Learning',
    institute: 'ITBI — CUET',
    year: '2024',
    duration: '1.5 Years',
  },
  {
    title: 'Web Development — JavaScript, Django & Python',
    topics: 'HTML, CSS, JavaScript, Python, OOP, REST API, SQL, Django',
    institute: 'BOHUBRIHI (Online)',
    year: '2023',
    duration: '6 Months',
  },
];

export default function SkillsWindow() {
  return (
    <div>
      <h2 className="section-heading">
        <span className="section-heading-icon">⚡</span>
        Skills
      </h2>

      {sections.map((s) => (
        <div key={s.title} className="skills-section">
          <div className="skills-section-title">
            {s.icon} {s.title}
          </div>
          <div className="skill-badges">
            {s.skills.map((sk) => (
              <div key={sk.label} className="skill-badge">
                {sk.icon}
                {sk.label}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Training */}
      <div className="skills-section" style={{ marginTop: 8 }}>
        <div className="skills-section-title">🎓 Training & Certifications</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TRAINING.map((t) => (
            <div key={t.title} style={trainingCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.year} · {t.duration}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>{t.institute}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 3 }}>{t.topics}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const trainingCard = {
  background: 'var(--card-bg)',
  border: '1px solid var(--card-border)',
  borderRadius: 8,
  padding: '12px 14px',
  color: 'var(--text-primary)',
};
