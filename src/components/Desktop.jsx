import AvatarImg from './AvatarImg';

const ICONS = [
  { id: 'about',    emoji: null,  label: 'About Me' },
  { id: 'projects', emoji: '💼', label: 'Projects' },
  { id: 'skills',   emoji: '⚡', label: 'Skills' },
  { id: 'resume',   emoji: '📄', label: 'Resume' },
  { id: 'contact',  emoji: '📬', label: 'Contact' },
];

export default function Desktop({ onOpenWindow }) {
  return (
    <div className="desktop-icons">
      {ICONS.map((icon) => (
        <div
          key={icon.id}
          className="desktop-icon"
          onClick={() => onOpenWindow(icon.id)}
        >
          <div className={`app-icon ${icon.id}`} style={icon.id === 'about' ? { padding: 0, overflow: 'hidden' } : {}}>
            {icon.id === 'about' ? <AvatarImg iconSize={28} /> : icon.emoji}
          </div>
          <span className="desktop-icon-label">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}
