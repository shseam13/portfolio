import { useState, useCallback, useEffect } from 'react';
import { FiLock } from 'react-icons/fi';
import AvatarImg from './components/AvatarImg';
import BootScreen from './components/BootScreen';
import MenuBar from './components/MenuBar';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Window from './components/Window';
import AboutWindow from './components/AboutWindow';
import ProjectsWindow from './components/ProjectsWindow';
import SkillsWindow from './components/SkillsWindow';
import ResumeWindow from './components/ResumeWindow';
import ContactWindow from './components/ContactWindow';

const WINDOWS = [
  {
    id: 'about',
    title: 'About Me',
    defaultPos: { x: 80, y: 60 },
    defaultSize: { width: 520, height: 480 },
    content: <AboutWindow />,
  },
  {
    id: 'projects',
    title: 'Projects',
    defaultPos: { x: 200, y: 80 },
    defaultSize: { width: 680, height: 520 },
    content: <ProjectsWindow />,
  },
  {
    id: 'skills',
    title: 'Skills',
    defaultPos: { x: 140, y: 100 },
    defaultSize: { width: 560, height: 500 },
    content: <SkillsWindow />,
  },
  {
    id: 'resume',
    title: 'Resume',
    defaultPos: { x: 160, y: 70 },
    defaultSize: { width: 620, height: 580 },
    content: <ResumeWindow />,
  },
  {
    id: 'contact',
    title: 'Contact',
    defaultPos: { x: 180, y: 90 },
    defaultSize: { width: 560, height: 540 },
    content: <ContactWindow />,
  },
];

const MOBILE_SECTIONS = [
  { id: 'about', label: 'About', content: <AboutWindow /> },
  { id: 'projects', label: 'Projects', content: <ProjectsWindow /> },
  { id: 'skills', label: 'Skills', content: <SkillsWindow /> },
  { id: 'resume', label: 'Resume', content: <ResumeWindow /> },
  { id: 'contact', label: 'Contact', content: <ContactWindow /> },
];

export default function App() {
  const [booting, setBooting] = useState(true);
  const [locked, setLocked] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [zOrders, setZOrders] = useState({});
  const [zCounter, setZCounter] = useState(10);
  const [mobileTab, setMobileTab] = useState('about');

  const openWindow = useCallback((id) => {
    setOpenWindows((prev) => prev.includes(id) ? prev : [...prev, id]);
    setMinimizedWindows((prev) => prev.filter((w) => w !== id));
    setZCounter((z) => {
      setZOrders((o) => ({ ...o, [id]: z + 1 }));
      return z + 1;
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setMinimizedWindows((prev) => prev.filter((w) => w !== id));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setMinimizedWindows((prev) => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const focusWindow = useCallback((id) => {
    setZCounter((z) => {
      setZOrders((o) => ({ ...o, [id]: z + 1 }));
      return z + 1;
    });
  }, []);

  // Let child components (e.g. AboutWindow's "Start a Project") open windows
  useEffect(() => {
    const handler = (e) => openWindow(e.detail);
    window.addEventListener('openWindow', handler);
    return () => window.removeEventListener('openWindow', handler);
  }, [openWindow]);

  const activeSection = MOBILE_SECTIONS.find(s => s.id === mobileTab);

  return (
    <>
      {booting && <BootScreen onDone={() => setBooting(false)} />}

      {/* ── Desktop UI (≥769px) ── */}
      <div className="desktop">
        <MenuBar onLock={() => setLocked(true)} />
        <Desktop onOpenWindow={openWindow} />

        {WINDOWS.map((w) => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            defaultPos={w.defaultPos}
            defaultSize={w.defaultSize}
            zIndex={zOrders[w.id] ?? 10}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            isOpen={openWindows.includes(w.id)}
            isMinimized={minimizedWindows.includes(w.id)}
          >
            {w.content}
          </Window>
        ))}

        {locked && <LockScreen onUnlock={() => setLocked(false)} />}

        <Dock
          openWindows={openWindows.filter(id => !minimizedWindows.includes(id))}
          minimizedWindows={minimizedWindows}
          onOpen={openWindow}
        />
      </div>

      {/* ── Mobile UI (≤768px) ── */}
      <div className="mobile-layout">
        {locked && <LockScreen onUnlock={() => setLocked(false)} />}

        {/* Sticky header + nav wrapper */}
        <div className="mobile-sticky-top">
        <div className="mobile-header" style={{ position: 'relative' }}>
          {/* Subtle lock button — top-right corner */}
          <button
            onClick={() => setLocked(true)}
            className="lock-btn-glow"
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 8,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
            }}
            title="Lock screen"
          >
            <FiLock size={15} />
          </button>

          <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AvatarImg size={80} iconSize={36} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Shajjad Hossain Seam</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Jr. Software Engineer · Full-Stack Developer</div>
        </div>
        <nav className="mobile-nav">
          {MOBILE_SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`mobile-nav-btn${mobileTab === s.id ? ' active' : ''}`}
              onClick={() => setMobileTab(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
        </div>{/* end mobile-sticky-top */}

        <div className="mobile-section">
          {activeSection?.content}
        </div>
      </div>
    </>
  );
}
