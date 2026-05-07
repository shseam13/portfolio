import { useState } from 'react';

export default function AvatarImg({ size = 90, style = {}, iconSize = 28 }) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <span style={{ fontSize: iconSize, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        👤
      </span>
    );
  }

  return (
    <img
      src="/avatar.jpg"
      alt="Shajjad Hossain Seam"
      onError={() => setErr(true)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top center',
        display: 'block',
        ...style,
      }}
    />
  );
}
