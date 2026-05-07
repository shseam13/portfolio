import { FiGithub, FiLinkedin } from 'react-icons/fi';
import AvatarImg from './AvatarImg';

const APP_ITEMS = [
  { id: 'about',    emoji: null,  label: 'About Me' },
  { id: 'projects', emoji: '💼', label: 'Projects' },
  { id: 'skills',   emoji: '⚡', label: 'Skills' },
  { id: 'resume',   emoji: '📄', label: 'Resume' },
  { id: 'contact',  emoji: '📬', label: 'Contact' },
];

export default function Dock({ openWindows, onOpen }) {
  return (
    <div className="dock">
      {APP_ITEMS.map((item) => (
        <div
          key={item.id}
          className="dock-item"
          onClick={() => onOpen(item.id)}
          title={item.label}
        >
          <div
            className={`dock-icon ${item.id}`}
            style={item.id === 'about' ? { padding: 0, overflow: 'hidden' } : {}}
          >
            {item.id === 'about' ? <AvatarImg iconSize={26} /> : item.emoji}
          </div>
          <span className="dock-label">{item.label}</span>
          <div className={`dock-dot${openWindows.includes(item.id) ? '' : ' hidden'}`} />
        </div>
      ))}

      <div className="dock-separator" />

      <a href="https://github.com/shseam13" target="_blank" rel="noreferrer" className="dock-item" title="GitHub" style={{ textDecoration: 'none' }}>
        <div className="dock-icon github" style={{ color: '#fff' }}><FiGithub size={24} /></div>
        <span className="dock-label">GitHub</span>
        <div className="dock-dot hidden" />
      </a>

      <a href="https://www.linkedin.com/in/shseam13/" target="_blank" rel="noreferrer" className="dock-item" title="LinkedIn" style={{ textDecoration: 'none' }}>
        <div className="dock-icon linkedin" style={{ color: '#fff' }}><FiLinkedin size={24} /></div>
        <span className="dock-label">LinkedIn</span>
        <div className="dock-dot hidden" />
      </a>
    </div>
  );
}
