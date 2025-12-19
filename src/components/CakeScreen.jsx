import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Sparkles from './Sparkles.jsx';

const CAKE_CUT_DURATION_MS = 1100;

export default function CakeScreen({ onNext, onCakeCut }) {
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleCandleClick = (event) => {
    event.stopPropagation();
    setIsCandleLit((previous) => !previous);
  };

  const handleCakeClick = () => {
    // Keep the little ritual: you have to blow the candle out before you can cut the cake.
    if (isCandleLit) {
      return;
    }

    if (isCakeCut) {
      if (typeof onNext === 'function') {
        onNext();
      }
      return;
    }

    setIsCakeCut(true);
    setShowSparkles(true);

    // Fire confetti bursts when cake is cut
    let bursts = 0;
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF4444', '#FF6B6B', '#CC0000', '#FF8888', '#8B0000'],
      });
      
      // Additional bursts from sides
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.6 },
        colors: ['#FF4444', '#FF6B6B', '#CC0000'],
      });
      
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.6 },
        colors: ['#FF4444', '#FF6B6B', '#CC0000'],
      });

      bursts += 1;
      if (bursts >= 4) {
        clearInterval(confettiInterval);
      }
    }, 300);

    // Call parent callback if provided
    if (typeof onCakeCut === 'function') {
      onCakeCut();
    }

    if (typeof onNext === 'function') {
      window.setTimeout(() => {
        onNext();
      }, CAKE_CUT_DURATION_MS + 500); // Add a bit more time to enjoy the effects
    }
  };

  const subtitle = isCandleLit
    ? 'Tap the candle to blow it out ✨ then tap the cake.'
    : isCakeCut
      ? 'The cake is cut! Taking you to the next surprise…'
      : 'Now tap the cake — a knife will cut a slice and your surprise will continue.';

  return (
    <section className="screen screen--centered cake-screen">
      {showSparkles && (
        <div className="cake-screen__sparkles-overlay">
          <Sparkles active={true} count={40} />
        </div>
      )}
      <div className="screen-content">
        <p className="eyebrow">A little birthday ritual 🎂</p>
        <h1 className="title">To my WIFE</h1>
        <p className="subtitle">A birthday cake just for you 🎂</p>
        <p className="subtitle">{subtitle}</p>

        {/* Cake Container */}
        <div className="cake-screen__visual" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '320px', marginTop: '2rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '300px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* Knife Animation */}
            {isCakeCut && (
              <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }} className="animate-cut-cake">
                <div className="relative w-32 h-40">
                  {/* Knife blade */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-24 bg-gradient-to-b from-gray-300 to-gray-400 rounded-sm shadow-lg" />
                  {/* Knife edge */}
                  <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-400" />
                  {/* Knife handle */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-3 h-10 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full" />
                </div>
              </div>
            )}

            {/* Cake plate - positioned at the very bottom */}
            <div className="w-72 h-4 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full shadow-2xl" style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }} />

            {/* The Cake - stacked on the plate */}
            <div
              className="cursor-pointer hover:scale-105 transition-transform"
              style={{ position: 'relative', width: '280px', height: '200px', marginBottom: '4px' }}
              role="button"
              tabIndex={0}
              onClick={handleCakeClick}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleCakeClick();
                }
              }}
            >

              {/* Cake layers - positioned from bottom */}
                {/* Bottom layer */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-64 h-24 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-lg shadow-xl overflow-hidden"
                  style={{ bottom: '0' }}
                >
                  {/* Cake texture */}
                  <div className="absolute inset-0 opacity-20">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)',
                      }}
                    />
                  </div>
                  {/* Frosting drip */}
                  <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-lg" />
                </div>

                {/* Middle layer */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-56 h-20 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-lg shadow-lg overflow-hidden" style={{ bottom: '96px' }}>
                  {/* Frosting texture */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-300 opacity-30" />
                  {/* Decorative cream */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-3 bg-white rounded-t-full shadow-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Top layer */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-48 h-16 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 rounded-lg shadow-lg overflow-hidden" style={{ bottom: '176px' }}>
                  {/* Frosting texture */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-300 opacity-30" />
                  {/* Decorative elements */}
                  <div className="absolute inset-0 flex items-center justify-around px-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-pink-400 rounded-full shadow-sm"
                      />
                    ))}
                  </div>

                </div>

                {/* Candle on top of cake */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 z-40 cursor-pointer hover:scale-110 transition-transform"
                  style={{ bottom: '192px' }}
                  onClick={handleCandleClick}
                >
                    {/* Flame */}
                    {isCandleLit && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <div className="relative w-6 h-10 animate-flicker">
                          {/* Outer flame */}
                          <div className="absolute inset-0 rounded-full blur-sm opacity-80" style={{ background: 'radial-gradient(circle at 30% 0%, #ffffff, #ff6b6b 45%, #cc0000 80%)' }} />
                          {/* Inner flame */}
                          <div className="absolute inset-2 rounded-full" style={{ background: 'radial-gradient(circle at 30% 0%, #ffffff, #ff8888 60%, #ff4444)' }} />
                          {/* Flame glow */}
                          <div className="absolute -inset-4 rounded-full blur-xl opacity-50 animate-pulse" style={{ backgroundColor: '#ff6b6b' }} />
                        </div>
                      </div>
                    )}

                    {/* Smoke effect when blown out */}
                    {!isCandleLit && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <div className="animate-smoke-rise">
                          <div className="w-4 h-8 bg-gray-400 rounded-full blur-md opacity-60" />
                        </div>
                      </div>
                    )}

                    {/* Candle body */}
                    <div className="w-4 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-sm shadow-lg relative" style={{ background: 'linear-gradient(to bottom, #ff8888, #ff4444)' }}>
                      {/* Candle stripes */}
                      <div className="absolute top-2 left-0 right-0 h-1 opacity-50" style={{ backgroundColor: '#cc0000' }} />
                      <div className="absolute top-6 left-0 right-0 h-1 opacity-50" style={{ backgroundColor: '#cc0000' }} />
                      <div className="absolute top-10 left-0 right-0 h-1 opacity-50" style={{ backgroundColor: '#cc0000' }} />
                    </div>

                  {/* Candle wick */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0.5 h-3 bg-gray-800" />
                </div>

              {/* Cut line animation */}
              {isCakeCut && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-700 z-30 animate-slice-appear" />
              )}

              {/* Cake piece that gets cut out */}
              {isCakeCut && (
                <>
                  {/* Cut piece - Bottom layer */}
                  <div className="absolute left-1/2 w-20 h-24 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-r-lg shadow-xl overflow-hidden z-20 animate-piece-separate origin-left" style={{ bottom: '0' }}>
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)',
                        }}
                      />
                    </div>
                    <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-b from-pink-200 to-pink-300" />
                    {/* Inner cake texture */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-800" />
                  </div>

                  {/* Cut piece - Middle layer */}
                  <div
                    className="absolute left-1/2 w-20 h-20 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-r-lg shadow-lg overflow-hidden z-20 animate-piece-separate origin-left"
                    style={{ bottom: '96px', animationDelay: '0.05s' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-300 opacity-30" />
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-3 bg-white rounded-t-full shadow-sm"
                        />
                      ))}
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-300" />
                  </div>

                  {/* Cut piece - Top layer */}
                  <div
                    className="absolute left-1/2 w-20 h-16 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 rounded-r-lg shadow-lg overflow-hidden z-20 animate-piece-separate origin-left"
                    style={{ bottom: '176px', animationDelay: '0.1s' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-300 opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-around px-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-pink-400 rounded-full shadow-sm"
                        />
                      ))}
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-300" />
                  </div>
                </>
              )}

              {/* Sparkles around cake */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-sparkle"
                    style={{
                      backgroundColor: '#ff6b6b',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flicker {
          0%,
          100% {
            transform: scaleY(1) scaleX(1);
            opacity: 1;
          }
          50% {
            transform: scaleY(1.1) scaleX(0.95);
            opacity: 0.9;
          }
        }

        @keyframes smoke-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-30px) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes cut-cake {
          0% {
            transform: translateY(-100px) rotate(-10deg);
            opacity: 0;
          }
          30% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          70% {
            transform: translateY(150px) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: translateY(200px) rotate(10deg);
            opacity: 0;
          }
        }

        @keyframes slice-appear {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes piece-separate {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateX(60px) translateY(-10px) rotate(15deg);
            opacity: 1;
          }
          100% {
            transform: translateX(80px) translateY(30px) rotate(25deg);
            opacity: 0.8;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-flicker {
          animation: flicker 1.5s ease-in-out infinite;
        }

        .animate-smoke-rise {
          animation: smoke-rise 1.5s ease-out forwards;
        }

        .animate-cut-cake {
          animation: cut-cake 1.1s ease-in-out forwards;
        }

        .animate-slice-appear {
          animation: slice-appear 0.3s ease-out forwards;
        }

        .animate-piece-separate {
          animation: piece-separate 1s ease-out 0.3s forwards;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}