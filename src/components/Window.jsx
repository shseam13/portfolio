import { useRef, useState, useCallback } from 'react';
import Draggable from 'react-draggable';

export default function Window({ id, title, children, defaultPos, defaultSize, zIndex, onFocus, onClose, onMinimize, isOpen, isMinimized }) {
  const nodeRef = useRef(null);
  const [maximized, setMaximized] = useState(false);
  const [pos, setPos] = useState(defaultPos ?? { x: 100, y: 60 });

  const handleFocus = useCallback(() => onFocus(id), [id, onFocus]);

  if (!isOpen || isMinimized) return null;

  // When maximized: force draggable transform to (0,0) so CSS top/left take effect cleanly
  const draggablePos = maximized ? { x: 0, y: 0 } : pos;

  const windowStyle = maximized
    ? {
        position: 'fixed',
        top: 28,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 28px - 90px)',
        borderRadius: 0,
        zIndex,
      }
    : {
        width: defaultSize?.width ?? 640,
        height: defaultSize?.height ?? 480,
        zIndex,
      };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".titlebar"
      position={draggablePos}
      onDrag={(_, data) => {
        if (!maximized) setPos({ x: data.x, y: data.y });
      }}
      disabled={maximized}
      bounds="parent"
      onStart={handleFocus}
    >
      <div
        ref={nodeRef}
        className="window focused"
        style={windowStyle}
        onMouseDown={handleFocus}
      >
        <div className="titlebar">
          <div className="traffic-lights">
            <button
              className="traffic-light tl-red"
              onClick={(e) => { e.stopPropagation(); onClose(id); }}
              title="Close"
            >✕</button>
            <button
              className="traffic-light tl-yellow"
              onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
              title="Minimize"
            >−</button>
            <button
              className="traffic-light tl-green"
              onClick={(e) => { e.stopPropagation(); setMaximized(m => !m); }}
              title={maximized ? 'Restore' : 'Maximise'}
            >{maximized ? '⤡' : '⤢'}</button>
          </div>
          <span className="titlebar-title">{title}</span>
        </div>
        <div className="window-content">
          {children}
        </div>
      </div>
    </Draggable>
  );
}
