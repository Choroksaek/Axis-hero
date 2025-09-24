'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Prism from './components/background';
import GlassSurface from './components/glass';

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // Refs for GSAP animations
  const prismRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h4Ref = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Split text into animated spans with line breaks
  const createAnimatedText = () => {
    // Split into two lines: "A New Center of" and "Financial Gravity"
    const line1 = "A New Center of";
    const line2 = "Financial Gravity";
    
    const createLineChars = (lineText: string, startIndex: number) => {
      return lineText.split('').map((char, charIndex) => (
        <span
          key={startIndex + charIndex}
          className={`gsap-char inline-block ${char === ' ' ? 'w-[0.25em]' : ''}`}
          style={{ 
            opacity: 0, 
            transform: 'translateY(40px)', 
            filter: 'blur(4px)'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    };

    return (
      <>
        <div className="block">
          {createLineChars(line1, 0)}
        </div>
        <div className="block">
          {createLineChars(line2, line1.length)}
        </div>
      </>
    );
  };

  // GSAP animations for all elements
  useGSAP(() => {
    // Set initial states
    gsap.set([h4Ref.current, buttonsRef.current], {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)'
    });

    // Create timeline
    const tl = gsap.timeline();
    
    // Animate prism background fade-in first
    tl.to(prismRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, 0);
    
    // Animate h1 characters first
    if (h1Ref.current) {
      const chars = h1Ref.current.querySelectorAll('.gsap-char');
      tl.to(chars, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power3.out',
        stagger: 0.02
      }, 0);
    }
    
    // Animate h4 after h1 characters (1.5s delay)
    tl.to(h4Ref.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power3.out'
    }, 0.8);
    
    // Animate buttons after h4 (additional 0.8s delay)
    tl.to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out'
    }, 1);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false);
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isVideoModalOpen]);
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black to-gray-700 text-white">
      <div ref={prismRef} className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0 }}>
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={1}
          />
        </div>
      </div>

      <header className="container mx-auto px-6 pt-8 relative z-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="94" height="36" viewBox="0 0 94 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="38.1539" width="8.02096" height="35.4611" fill="white"/>
              <path d="M25.9113 35.4611L32.0144 0H39.8424L33.7392 35.4611H25.9113Z" fill="white"/>
              <rect x="33.9324" y="23.6407" width="7.59881" height="6.33234" fill="white"/>
              <path d="M12.1062 14.3402L24.2123 35.5791H-2.28882e-05L12.1062 14.3402Z" fill="white"/>
              <path d="M58.6285 14.259H66.5228L63.3989 24.1797L66.7339 35.3668H58.7129L57.4887 27.0503H56.8977L55.6734 35.3668H47.6524L50.9875 24.1797L47.8635 14.259H55.7578L57.0243 22.3644H57.362L58.6285 14.259Z" fill="white"/>
              <path d="M67.596 35.3668V14.259H75.1948V35.3668H67.596ZM71.3532 4.97156C73.8439 4.97156 75.3215 5.98473 75.3215 8.01108V9.74192C75.3215 11.7683 73.8439 12.7814 71.3532 12.7814C68.9469 12.7814 67.4694 11.7683 67.4694 9.74192V8.01108C67.4694 5.98473 68.9469 4.97156 71.3532 4.97156Z" fill="white"/>
              <path d="M83.8589 20.6335C83.8589 22.7443 93.3152 22.7443 93.3152 29.7521V30.0898C93.3152 33.8048 90.0646 36 84.7877 36C79.7218 36 76.4712 33.8048 76.4712 29.2455V27.7258H83.8589V29.2455C83.8589 30.1321 83.9011 30.512 84.7877 30.512C85.6742 30.512 85.7164 30.1321 85.7164 29.4988V29.1611C85.7164 25.6572 76.2601 26.5437 76.2601 20.0425V19.5359C76.2601 15.821 79.5107 13.6258 84.7877 13.6258C89.8535 13.6258 93.1041 15.821 93.1041 20.3803V21.4779H85.7164V20.3803C85.7164 19.4937 85.6742 19.1138 84.7877 19.1138C83.9011 19.1138 83.8589 19.4937 83.8589 20.127V20.6335Z" fill="white"/>
            </svg>
          </div>
          <button 
            onClick={() => setIsVideoModalOpen(true)}
            className="group rounded-full bg-white px-8 py-4 font-regular text-gray-900 cursor-pointer hover:bg-white/90 transition flex items-center gap-2"
          >
            Watch Video
            <div className="w-6 h-6 overflow-hidden">
              <div className="relative w-12 h-12 -ml-6 group-hover:transition-transform group-hover:duration-300 group-hover:translate-x-6 group-hover:-translate-y-6">
                <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0">
                  <mask id="mask0_34_309_2" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                    <rect x="0.232544" y="0.5177" width="24" height="24" fill="#ffffff"/>
                  </mask>
                  <g mask="url(#mask0_34_309_2)">
                    <path d="M6.42104 17.8062L5.73254 17.1177L15.8133 7.0177H6.52104V6.0177H17.521V17.0177H16.521V7.72545L6.42104 17.8062Z" fill="currentColor"/>
                  </g>
                </svg>
                <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0">
                  <mask id="mask0_34_309_2_copy" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                    <rect x="0.232544" y="0.5177" width="24" height="24" fill="#ffffff"/>
                  </mask>
                  <g mask="url(#mask0_34_309_2_copy)">
                    <path d="M6.42104 17.8062L5.73254 17.1177L15.8133 7.0177H6.52104V6.0177H17.521V17.0177H16.521V7.72545L6.42104 17.8062Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
            </div>
          </button>
        </nav>
      </header>

      <section className="container mx-auto px-6 pt-30 pb-24 text-center relative z-10">
        <GlassSurface
          borderRadius={999}
          width={176}
          height={44}
          backgroundOpacity={0.1}
          saturation={1}
          brightness={50}
          opacity={0.93}
          blur={12}
          displace={0.8}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          className="inline-flex items-center gap-2 px-2 py-1 text-sm text-white/90"
          mixBlendMode="screen"
        >
          Finance Made Easy
        </GlassSurface>

        <h1 
          ref={h1Ref}
          className="mx-auto mt-8 max-w-6xl font-medium tracking-tight leading-tight text-[clamp(2.2rem,5vw,5rem)] text-center"
        >
          {createAnimatedText()}
        </h1>

        <h4 
          ref={h4Ref}
          className="mx-auto mt-6 max-w-4xl text-base font-light leading-relaxed md:text-2xl text-white/70"
        >
          Axis is the decentralized force pulling the future of investing into focus.
        </h4>

        <div 
          ref={buttonsRef}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button className="group rounded-full border border-white/30 bg-white/10 px-8 py-4 font-regular text-white backdrop-blur hover:bg-white/15 transition flex items-center gap-2">
            Learn More
             <div className="w-6 h-6 overflow-hidden">
               <div className="relative w-12 h-12 -ml-6 group-hover:transition-transform group-hover:duration-300 group-hover:translate-x-6 group-hover:-translate-y-6">
                 <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0">
                   <mask id="mask0_34_309_1" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                     <rect x="0.232544" y="0.5177" width="24" height="24" fill="#ffffff"/>
                   </mask>
                   <g mask="url(#mask0_34_309_1)">
                     <path d="M6.42104 17.8062L5.73254 17.1177L15.8133 7.0177H6.52104V6.0177H17.521V17.0177H16.521V7.72545L6.42104 17.8062Z" fill="currentColor"/>
                   </g>
                 </svg>
                 <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0">
                   <mask id="mask0_34_309_1_copy" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                     <rect x="0.232544" y="0.5177" width="24" height="24" fill="#ffffff"/>
                   </mask>
                   <g mask="url(#mask0_34_309_1_copy)">
                     <path d="M6.42104 17.8062L5.73254 17.1177L15.8133 7.0177H6.52104V6.0177H17.521V17.0177H16.521V7.72545L6.42104 17.8062Z" fill="currentColor"/>
                   </g>
                 </svg>
               </div>
             </div>
          </button>
          <button className="group rounded-full bg-white px-8 py-4 font-regular text-gray-900 hover:bg-white/90 transition flex items-center gap-2">
            Get Started
            <div className="w-6 h-6 overflow-hidden">
              <div className="relative w-12 h-12 -ml-6 group-hover:transition-transform group-hover:duration-300 group-hover:translate-x-6 group-hover:-translate-y-6">
                <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0">
                  <mask id="mask0_34_309_2" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                    <rect x="0.232544" y="0.5177" width="24" height="24" fill="#ffffff"/>
                  </mask>
                  <g mask="url(#mask0_34_309_2)">
                    <path d="M6.42104 17.8062L5.73254 17.1177L15.8133 7.0177H6.52104V6.0177H17.521V17.0177H16.521V7.72545L6.42104 17.8062Z" fill="currentColor"/>
                  </g>
                </svg>
                <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0">
                  <mask id="mask0_34_309_2_copy" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                    <rect x="0.232544" y="0.5177" width="24" height="24" fill="#ffffff"/>
                  </mask>
                  <g mask="url(#mask0_34_309_2_copy)">
                    <path d="M6.42104 17.8062L5.73254 17.1177L15.8133 7.0177H6.52104V6.0177H17.521V17.0177H16.521V7.72545L6.42104 17.8062Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
            </div>
          </button>

        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <video 
              className="w-full h-full object-cover"
              controls 
              autoPlay
              playsInline
            >
              <source src="/video/Main.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </main>
  )
}
