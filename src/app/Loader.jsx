// src/components/NeoLeafLoader.jsx
'use client';

import { useState, useEffect } from 'react';

export default function NeoLeafLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'NIGAPE';
  const tagline = 'Training the Future with AI';

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Show tagline earlier (or when the name finishes) so the subheading is visible promptly
  useEffect(() => {
    if ((!showTagline && progress >= 30) || isComplete) {
      setShowTagline(true);
    }
  }, [progress, showTagline, isComplete]);

  // Typewriter effect for tagline — smoother and guaranteed to type full string (including 'AI')
  useEffect(() => {
    if (!showTagline) return;

    let idx = 0;
    let timer = null;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      if (idx <= tagline.length) {
        setTypedText(tagline.slice(0, idx));
        idx++;
        // small delay for smooth typing; tuned for lag-free feel
        timer = setTimeout(step, 45);
      } else {
        setTypedText(tagline);
      }
    };

    // start slightly after tagline becomes visible for better UX
    timer = setTimeout(step, 60);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [showTagline, tagline]);

  // If the loader completes before typing finishes, reveal the full tagline immediately
  useEffect(() => {
    if (isComplete && typedText !== tagline) {
      setTypedText(tagline);
    }
  }, [isComplete, tagline, typedText]);

  // Smooth exit transition once complete
  useEffect(() => {
    if (isComplete) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 500);

      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 950);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [isComplete, onComplete]);

  return (
    <div className={`fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden transition-opacity duration-500 ease-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Subtle background glow in #FF40EB */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[300px] md:w-[400px] sm:h-[300px] md:h-[400px] rounded-full blur-[120px] opacity-10 glow"
          style={{ backgroundColor: '#FF40EB' }}
        />
      </div>

      {/* Main container with perspective */}
      <div 
        className="relative w-full max-w-4xl px-4 sm:px-6 lg:px-8"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Logo text with liquid fill effect */}
        <div className="mb-8 relative">
          {/* Background dark gray text (for depth) */}
          <div 
            className="loader-bg text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black tracking-tight absolute top-0 left-1/2 -translate-x-1/2 text-center"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#2a2a2a',
              letterSpacing: '-0.02em',
              WebkitTextStroke: '1px #1a1a1a'
            }}
          >
            {fullText}
          </div>
          
          {/* White text with liquid fill mask */}
          <div 
            className="relative overflow-hidden"
            style={{
              clipPath: `inset(${100 - progress}% 0 0 0)`,
              transition: 'clip-path 0.3s ease-out'
            }}
          >
            <div 
              className="loader-main text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black tracking-tight text-center"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                transformStyle: 'preserve-3d',
                transition: isComplete ? 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                transform: isComplete ? 'scale(1.05) translateZ(30px) rotateX(-3deg)' : 'scale(1) translateZ(0)',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
              }}
            >
              {fullText.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{
                    animation: isComplete 
                      ? `popForward 0.55s cubic-bezier(.2,.9,.3,1) ${index * 0.05}s both` 
                      : `fadeIn 0.45s ease-out ${index * 0.06}s both`,
                    display: 'inline-block',
                    willChange: 'transform, opacity',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline with typewriter effect */}
        {showTagline && (
          <div className="mt-4 mb-8 text-center">
            <span 
              className="tagline text-base sm:text-lg md:text-xl font-light tracking-wide block mx-auto max-w-3xl"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'rgba(255, 255, 255, 0.95)',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.3
              }}
            >
              {typedText || ' '}
              <span 
                className="animate-pulse ml-1 inline-block"
                style={{ color: '#FF40EB' }}
              >
                |
              </span>
            </span>
          </div>
        )}

        {/* Progress indicator (bottom right) */}
        <div className="loader-progress absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-xs sm:text-sm font-light tracking-wider"
             style={{
               fontFamily: 'Inter, system-ui, sans-serif',
               color: '#FF40EB', // ✅ Applied your brand color here
             }}>
          loading... {progress} %
        </div>
      </div>

      {/* Global animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popForward {
          0% {
            opacity: 0;
            transform: translateZ(-140px) scale(0.75) rotateX(12deg);
          }
          45% {
            opacity: 1;
            transform: translateZ(28px) scale(1.03) rotateX(6deg);
          }
          100% {
            opacity: 1;
            transform: translateZ(80px) scale(1.08) rotateX(-6deg);
          }
        }

        /* Mobile-specific overrides */
        @media (max-width: 640px) {
          .loader-bg {
            font-size: clamp(2.2rem, 22vw, 6.5rem) !important;
            top: -2vh;
          }
          .loader-main {
            font-size: clamp(2.2rem, 22vw, 6.5rem) !important;
          }
          .glow {
            width: 160px !important;
            height: 160px !important;
            filter: blur(60px);
            opacity: 0.08 !important;
          }
          .loader-progress {
            bottom: 1rem !important;
            right: 1rem !important;
            font-size: 0.75rem !important;
          }
          .tagline {
            font-size: 0.95rem !important;
            max-width: 92% !important;
            margin-left: auto;
            margin-right: auto;
          }

          /* Reduce the 3D depth for mobile so the effect feels natural */
          @keyframes popForward {
            0% { opacity: 0; transform: translateZ(-40px) scale(0.9) rotateX(8deg); }
            45% { opacity: 1; transform: translateZ(12px) scale(1.02) rotateX(4deg); }
            100% { opacity: 1; transform: translateZ(30px) scale(1.04) rotateX(-4deg); }
          }
        }
      `}</style>
    </div>
  );
}
