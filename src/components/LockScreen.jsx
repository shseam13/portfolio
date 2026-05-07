import { useState, useEffect, useRef } from 'react';
import AvatarImg from './AvatarImg';

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const attempt = () => {
    if (password === 'anything') {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') attempt();
    if (error) setError(false);
  };

  return (
    <div style={overlay}>
      {/* Blurred desktop backdrop */}
      <div style={blurPane} />

      {/* Lock card */}
      <div style={card}>
        {/* Avatar */}
        <div style={avatarWrap}>
          <AvatarImg size={96} iconSize={44} />
        </div>

        <div style={name}>Shajjad Hossain Seam</div>

        {/* Password input */}
        <div style={{ ...inputWrap, animation: shake ? 'lockShake 0.45s ease' : 'none' }}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            onKeyDown={handleKey}
            placeholder="Password"
            style={{
              ...input,
              borderColor: error ? '#ff3b30' : 'rgba(0,0,0,0.18)',
              boxShadow: error ? '0 0 0 3px rgba(255,59,48,0.18)' : 'none',
            }}
            autoComplete="off"
          />
          {password.length > 0 && (
            <button style={arrowBtn} onClick={attempt} tabIndex={-1}>→</button>
          )}
        </div>

        {/* Hint / error */}
        <div style={{ ...hint, color: error ? '#ff3b30' : 'rgba(0,0,0,0.45)' }}>
          {error
            ? 'Wrong password — type anything to unlock'
            : 'Type anything to unlock'}
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: 'fixed',
  inset: 0,
  zIndex: 99999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const blurPane = {
  position: 'absolute',
  inset: 0,
  backdropFilter: 'blur(28px) saturate(1.2)',
  WebkitBackdropFilter: 'blur(28px) saturate(1.2)',
};

const card = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 14,
  padding: '40px 48px 36px',
};

const avatarWrap = {
  width: 96,
  height: 96,
  borderRadius: '50%',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #1a73e8, #5856D6)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 4,
};

const name = {
  fontSize: 20,
  fontWeight: 600,
  color: '#fff',
  textShadow: '0 1px 6px rgba(0,0,0,0.5)',
  letterSpacing: '-0.3px',
};

const inputWrap = {
  position: 'relative',
  width: 220,
};

const input = {
  width: '100%',
  padding: '10px 40px 10px 16px',
  borderRadius: 10,
  border: '1px solid rgba(0,0,0,0.18)',
  background: 'rgba(255,255,255,0.88)',
  fontSize: 15,
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  color: '#1c1c1e',
  backdropFilter: 'blur(8px)',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  boxSizing: 'border-box',
  textAlign: 'center',
  letterSpacing: '0.1em',
};

const arrowBtn = {
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  background: '#007AFF',
  border: 'none',
  borderRadius: '50%',
  width: 24,
  height: 24,
  color: '#fff',
  fontSize: 13,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
};

const hint = {
  fontSize: 12,
  fontWeight: 500,
  transition: 'color 0.2s ease',
  textShadow: '0 1px 4px rgba(0,0,0,0.3)',
  textAlign: 'center',
};
