import { useState, useEffect } from 'react';
import { SiApple } from 'react-icons/si';

// Variable-speed progress keyframes simulated via JS steps
// Feels like a real macOS boot: quick start, long pause in middle, fast finish
const STEPS = [
  { pct: 0,   delay: 0    },
  { pct: 18,  delay: 300  },
  { pct: 32,  delay: 600  },
  { pct: 41,  delay: 500  }, // hesitate
  { pct: 43,  delay: 900  }, // long stall
  { pct: 55,  delay: 400  },
  { pct: 60,  delay: 700  }, // another pause
  { pct: 72,  delay: 350  },
  { pct: 81,  delay: 300  },
  { pct: 89,  delay: 250  },
  { pct: 95,  delay: 200  },
  { pct: 100, delay: 180  }, // snap to finish
];

export default function BootScreen({ onDone }) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Stage 1: fade in Apple logo
    const t1 = setTimeout(() => setLogoVisible(true), 200);

    // Stage 2: show progress bar
    const t2 = setTimeout(() => setBarVisible(true), 900);

    // Stage 3: step through variable-speed progress
    let accumulated = 900;
    const timers = STEPS.map(({ pct, delay }) => {
      accumulated += delay;
      return setTimeout(() => setProgress(pct), accumulated);
    });

    // Stage 4: fade out after progress hits 100
    const totalTime = accumulated + 500;
    const t3 = setTimeout(() => setFadeOut(true), totalTime);
    const t4 = setTimeout(() => onDone(), totalTime + 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  return (
    <div style={{ ...overlay, opacity: fadeOut ? 0 : 1 }}>
      {/* Apple logo */}
      <div style={{ ...logo, opacity: logoVisible ? 1 : 0 }}>
        <SiApple />
      </div>

      {/* Progress bar */}
      <div style={{ ...barTrack, opacity: barVisible ? 1 : 0 }}>
        <div
          style={{
            ...barFill,
            width: `${progress}%`,
            transition: progress === 0
              ? 'none'
              : 'width 0.38s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        />
      </div>
    </div>
  );
}

const overlay = {
  position: 'fixed',
  inset: 0,
  background: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 48,
  zIndex: 999999,
  transition: 'opacity 0.6s ease',
};

const logo = {
  fontSize: 80,
  color: '#fff',
  lineHeight: 1,
  transition: 'opacity 0.7s ease',
};

const barTrack = {
  width: 200,
  height: 4,
  background: 'rgba(255,255,255,0.2)',
  borderRadius: 2,
  overflow: 'hidden',
  transition: 'opacity 0.4s ease',
};

const barFill = {
  height: '100%',
  background: '#fff',
  borderRadius: 2,
};
