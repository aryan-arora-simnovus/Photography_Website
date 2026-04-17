import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * MagneticCursor — A custom cursor that magnetically attracts to images 
 * and leaves a ghostly trail of recent thumbnails on rapid movement.
 * Only active on desktop (pointer: fine).
 */
const MagneticCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const trailImages = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'click'
  const [isMobile, setIsMobile] = useState(true);
  const rafRef = useRef(null);

  // Check for fine pointer (desktop)
  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    setIsMobile(!mql.matches);
    const handler = (e) => setIsMobile(!e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Track mouse position
  const handleMouseMove = useCallback((e) => {
    targetRef.current = { x: e.clientX, y: e.clientY };

    // Calculate velocity for trail effect
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    velocityRef.current = { x: dx, y: dy };
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    setIsVisible(true);

    // Check if hovering over an image or clickable element
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el) {
      const isImage = el.tagName === 'IMG' || el.closest('.photo-item, .masonry-item, .organic-photo-card, .film-frame, .creative-card');
      const isClickable = el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a, button');
      
      if (isImage) {
        setCursorState('hover');
        // Capture image for trail
        const img = el.tagName === 'IMG' ? el : el.querySelector('img');
        if (img && img.src) {
          const speed = Math.sqrt(dx * dx + dy * dy);
          if (speed > 30) {
            trailImages.current = [
              { src: img.src, x: e.clientX, y: e.clientY, time: Date.now() },
              ...trailImages.current.slice(0, 3)
            ];
          }
        }
      } else if (isClickable) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    }
  }, []);

  // Mouse events
  useEffect(() => {
    if (isMobile) return;

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    const handleDown = () => setCursorState('click');
    const handleUp = () => setCursorState('default');

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isMobile, handleMouseMove]);

  // Smooth animation loop
  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      // Smooth lerp for cursor position
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }

      // Clean up old trail images
      const now = Date.now();
      trailImages.current = trailImages.current.filter(t => now - t.time < 800);

      // Update trail elements
      trailRefs.current.forEach((trailEl, i) => {
        if (trailEl && trailImages.current[i]) {
          const t = trailImages.current[i];
          const age = (now - t.time) / 800;
          trailEl.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%) scale(${1 - age * 0.3})`;
          trailEl.style.opacity = `${Math.max(0, 0.4 - age * 0.5)}`;
          trailEl.style.backgroundImage = `url(${t.src})`;
          trailEl.style.display = 'block';
        } else if (trailEl) {
          trailEl.style.display = 'none';
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  if (isMobile) return null;

  const cursorSize = cursorState === 'hover' ? 60 : cursorState === 'click' ? 20 : 32;
  const borderOpacity = cursorState === 'hover' ? 0.5 : 0.2;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Trail ghost images */}
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-lg"
          style={{
            width: '80px',
            height: '60px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'none',
            filter: 'blur(2px) saturate(0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          borderRadius: '50%',
          border: `1.5px solid rgba(255, 255, 255, ${borderOpacity})`,
          backgroundColor: cursorState === 'hover' ? 'rgba(255,255,255,0.05)' : 'transparent',
          backdropFilter: cursorState === 'hover' ? 'blur(4px)' : 'none',
          transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, background-color 0.3s, backdrop-filter 0.3s',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            width: cursorState === 'hover' ? '4px' : '3px',
            height: cursorState === 'hover' ? '4px' : '3px',
            transition: 'width 0.3s, height 0.3s',
          }}
        />
        
        {/* "View" text on image hover */}
        {cursorState === 'hover' && (
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] tracking-[0.3em] uppercase text-white font-bold mt-3"
            style={{ animation: 'fadeIn 0.3s ease' }}
          >
            View
          </span>
        )}
      </div>
    </>
  );
};

export default MagneticCursor;
