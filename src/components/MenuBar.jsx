import { useState, useEffect, useRef } from 'react';
import { FiWifi, FiBatteryCharging, FiLock, FiLogOut } from 'react-icons/fi';
import { SiApple } from 'react-icons/si';

const MENUS = ['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'];

const APPLE_MENU = [
  { label: 'About This Portfolio', disabled: true },
  { divider: true },
  { label: 'System Preferences…', disabled: true },
  { label: 'App Store…', disabled: true },
  { divider: true },
  { label: 'Sleep', disabled: true },
  { label: 'Restart…', disabled: true },
  { label: 'Shut Down…', disabled: true },
  { divider: true },
  { label: 'Lock Screen', action: 'lock' },
  { label: 'Log Out Shajjad…', action: 'lock', danger: true },
];

export default function MenuBar({ onLock }) {
  const [time, setTime] = useState(new Date());
  const [appleOpen, setAppleOpen] = useState(false);
  const appleRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!appleOpen) return;
    const handler = (e) => {
      if (appleRef.current && !appleRef.current.contains(e.target)) {
        setAppleOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [appleOpen]);

  const handleAppleItem = (item) => {
    if (item.disabled || item.divider) return;
    setAppleOpen(false);
    if (item.action === 'lock') onLock();
  };

  const fmtDate = (d) =>
    d.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const fmtTime = (d) =>
    d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <div className="menubar">
      <div className="menubar-left">

        {/* Apple icon + dropdown */}
        <div ref={appleRef} style={{ position: 'relative' }}>
          <span
            className="menubar-menu menubar-apple"
            onClick={() => setAppleOpen(o => !o)}
            style={{ cursor: 'default', fontWeight: 700, background: appleOpen ? 'rgba(0,0,0,0.08)' : undefined }}
          >
            <SiApple size={15} />
          </span>

          {appleOpen && (
            <div style={dropdown}>
              {APPLE_MENU.map((item, i) => {
                if (item.divider) return <div key={i} style={divider} />;
                return (
                  <div
                    key={item.label}
                    style={{
                      ...menuItem,
                      opacity: item.disabled ? 0.38 : 1,
                      cursor: item.disabled ? 'default' : 'pointer',
                      color: item.danger ? '#ff3b30' : '#1c1c1e',
                      fontWeight: item.danger ? 500 : 400,
                    }}
                    onClick={() => handleAppleItem(item)}
                    onMouseEnter={e => { if (!item.disabled) e.currentTarget.style.background = '#007AFF'; e.currentTarget.style.color = item.disabled ? '' : '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = item.danger ? '#ff3b30' : '#1c1c1e'; }}
                  >
                    {item.action === 'lock' && item.danger && <FiLogOut size={12} style={{ marginRight: 6, flexShrink: 0 }} />}
                    {item.action === 'lock' && !item.danger && <FiLock size={12} style={{ marginRight: 6, flexShrink: 0 }} />}
                    {item.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {MENUS.map((m, i) => (
          <span
            key={m}
            className="menubar-menu"
            style={{ fontWeight: i === 0 ? 700 : 400 }}
          >
            {m}
          </span>
        ))}
      </div>

      <div className="menubar-right">
        <FiLock
          size={13}
          className="lock-icon-glow"
          title="Lock screen"
          onClick={onLock}
        />
        <FiWifi size={13} />
        <FiBatteryCharging size={14} />
        <span>{fmtDate(time)}</span>
        <span style={{ fontWeight: 600 }}>{fmtTime(time)}</span>
      </div>
    </div>
  );
}

const dropdown = {
  position: 'absolute',
  top: 28,
  left: 0,
  width: 220,
  background: 'rgba(248,248,250,0.96)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: 8,
  border: '1px solid rgba(0,0,0,0.12)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)',
  padding: '4px 0',
  zIndex: 99998,
};

const menuItem = {
  padding: '5px 16px',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 4,
  margin: '0 4px',
  transition: 'background 0.1s',
};

const divider = {
  height: 1,
  background: 'rgba(0,0,0,0.1)',
  margin: '4px 0',
};
