import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedSignature — An SVG handwritten signature that draws itself on first load.
 * Uses stroke-dasharray/dashoffset animation to simulate a pen writing the text.
 */
const AnimatedSignature = ({ className = '', color = '#5f7470' }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    // Only animate once per session
    const key = 'signature-animated';
    if (sessionStorage.getItem(key)) {
      setHasAnimated(true);
      return;
    }
    
    const paths = svgRef.current?.querySelectorAll('.sig-path');
    if (!paths) return;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    // Staggered animation for each path
    const timer = setTimeout(() => {
      paths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset ${1.2 + i * 0.3}s cubic-bezier(0.65, 0, 0.35, 1) ${i * 0.15}s`;
        path.style.strokeDashoffset = '0';
      });
      
      setTimeout(() => {
        setHasAnimated(true);
        sessionStorage.setItem(key, 'true');
      }, 3000);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`animated-signature ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ maxWidth: '280px' }}
      >
        {/* "Snippets" — flowing cursive paths */}
        <path
          className="sig-path"
          d="M20 55 C25 55, 28 40, 32 35 C36 30, 30 25, 26 30 C22 35, 26 45, 32 48 C38 51, 42 42, 44 38"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="sig-path"
          d="M44 38 C46 34, 50 30, 52 35 C54 40, 50 48, 56 45 C62 42, 58 32, 64 35 C70 38, 66 48, 72 45"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="sig-path"
          d="M72 45 C76 42, 78 32, 82 35 C86 38, 84 46, 90 44 C96 42, 92 30, 96 28 C100 26, 102 32, 100 38"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="sig-path"
          d="M100 38 C98 44, 102 50, 108 48 C114 46, 110 36, 114 32 C118 28, 122 34, 120 40 C118 46, 122 52, 128 48"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="sig-path"
          d="M128 48 C134 44, 130 34, 136 32 C142 30, 138 42, 144 44 C148 46, 150 38, 150 34"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* "by" — connector */}
        <path
          className="sig-path"
          d="M158 48 C162 44, 164 36, 168 32 C172 28, 170 38, 166 44 C162 50, 170 54, 174 48 C178 42, 180 32, 184 36"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* "Tanvi" — bold, elegant */}
        <path
          className="sig-path"
          d="M196 28 L220 28 M208 28 L208 55"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="sig-path"
          d="M226 55 C226 38, 232 30, 240 30 C248 30, 248 38, 248 55 M226 42 L248 42"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="sig-path"
          d="M256 30 L256 55 M256 30 C256 30, 268 30, 272 38 C276 46, 272 55, 272 55"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="sig-path"
          d="M282 28 L294 55 L306 28"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="sig-path"
          d="M316 30 L316 55 M316 24 L316 26"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Decorative flourish underline */}
        <path
          className="sig-path"
          d="M20 62 C80 68, 200 58, 320 64"
          stroke={color}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>

      {/* Fill-reveal text that fades in after drawing */}
      <div
        className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
          hasAnimated ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ pointerEvents: 'none' }}
      >
      </div>
    </div>
  );
};

export default AnimatedSignature;
