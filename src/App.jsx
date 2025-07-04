import React, { useState, useEffect } from "react";
import { Sparkles, Star } from "lucide-react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: ((touch.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((touch.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // เช็ค viewport กว้างกว่า 640px หรือไม่ (เพื่อแสดงอนุภาคจำนวนเยอะหรือไม่)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* อนุภาคลอยเบื้องหลัง */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/20 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 30}s`,
            }}
          />
        ))}
      </div>

      {/* กล่องการ์ด */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="absolute -inset-20 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 blur-3xl animate-pulse-slow" />

        <div
          className={`card relative transition-all duration-1000 preserve-3d cursor-pointer ${
            isOpen ? "rotate-y-180" : ""
          }`}
          onClick={handleClick}
          style={{
            transform:
              isHovered && !isOpen
                ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${
                    mousePosition.x
                  }deg)`
                : isOpen
                ? "rotateY(180deg)"
                : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          }}
        >
          {/* ด้านหน้า */}
          <div className="absolute inset-0 backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent" />
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-10"
                    style={{
                      left: `${20 + i * 15}%`,
                      animation: `float ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    <Star
                      className="w-4 h-4 text-amber-300/30"
                      fill="currentColor"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400/20 to-rose-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-12 h-12 text-amber-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-rose-400/20 rounded-full blur-xl animate-pulse" />
                </div>
                <h1 className="text-4xl font-light text-white/90 mb-2 tracking-wider">
                  FOR YOU,
                </h1>
                <h2 className="text-5xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-200 tracking-widest">
                  MY LOVE
                </h2>
                <div className="mt-8 w-32 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                <p className="absolute bottom-8 text-xs text-white/30 tracking-widest uppercase">
                  Click to open
                </p>
              </div>

              {/* อนุภาคประกายแสงเล็ก ๆ ลอยขึ้น (Front) */}
              {[...Array(isMobile ? 5 : 10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-amber-400 opacity-70 filter drop-shadow-[0_0_6px_rgba(255,175,60,0.8)] animate-pulse-up"
                  style={{
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    left: `${10 + Math.random() * 80}%`,
                    bottom: `${-5 - Math.random() * 10}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ด้านหลัง */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8 relative">
              {/* เส้นขูดพื้นหลังแบบหมึกพิมพ์ */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_0)] bg-[length:2px_2px] mix-blend-overlay opacity-5 pointer-events-none" />

              <div className="relative h-full flex flex-col text-left text-white/80 font-light leading-relaxed space-y-5 px-2 py-6 tracking-wide">
                <h3 className="text-lg text-amber-200 font-medium">
                  ถึงคุณที่อาจกำลังเหนื่อย,
                </h3>
                <p>
                  ไม่เป็นไรเลย หากวันนี้ยังไม่ใช่วันที่ดี แค่คุณยังอยู่
                  ก็เพียงพอแล้วสำหรับการเริ่มต้นใหม่
                </p>
                <p>
                  พักได้นะ — โลกจะรอคุณเสมอ
                  ด้วยความเชื่อใจว่าคุณจะลุกขึ้นอีกครั้ง
                </p>
                <div className="pt-4 border-t border-white/10 text-right">
                  <p className="text-sm text-white/40 italic">
                    จากใครบางคนที่ห่วงใยคุณ 💛
                  </p>
                </div>
              </div>

              {/* ตราแสตมป์ */}
              <div className="absolute bottom-20 right-6 w-24 h-24 bg-gradient-to-br from-amber-300/20 to-rose-300/20 border-2 border-amber-200 rounded-full flex items-center justify-center rotate-[-8deg] hover:scale-105 transition duration-500 glowing-stamp">
                <p className="text-[10px] uppercase tracking-wider text-amber-100 font-bold leading-tight text-center">
                  WITH
                  <br />
                  LOVE
                  <br />& HOPE
                </p>
              </div>

              {/* อนุภาคลอย (เดิม) */}
              {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${4 + Math.random() * 4}s`,
                  }}
                >
                  <div className="w-1 h-1 bg-amber-300/20 rounded-full" />
                </div>
              ))}

              {/* อนุภาคประกายแสงเล็ก ๆ ลอยขึ้น (Back) */}
              {[...Array(isMobile ? 4 : 8)].map((_, i) => (
                <div
                  key={`back-${i}`}
                  className="absolute rounded-full bg-amber-400 opacity-70 filter drop-shadow-[0_0_6px_rgba(255,175,60,0.8)] animate-pulse-up"
                  style={{
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    left: `${10 + Math.random() * 80}%`,
                    bottom: `${-5 - Math.random() * 10}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .card {
          width: 400px;
          height: 600px;
        }
        @media (max-width: 640px) {
          .card {
            width: 300px;
            height: 450px;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.6;
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -30px);
          }
          50% {
            transform: translate(-10px, -50px);
          }
          75% {
            transform: translate(5px, -20px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes pulse-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
          }
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .animate-float-slow {
          animation-name: float-slow;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-duration: 20s;
        }
        .animate-pulse-slow {
          animation-name: pulse-slow;
          animation-iteration-count: infinite;
          animation-duration: 6s;
        }
        .animate-pulse-up {
          animation-name: pulse-up;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .cursor-grab {
          cursor: grab;
        }
        .cursor-grabbing {
          cursor: grabbing;
        }
        .glowing-stamp {
          box-shadow: 0 0 6px 2px rgba(255, 195, 75, 0.7);
          animation: glowPulseSmall 2.5s ease-in-out infinite alternate;
        }

        @keyframes glowPulseSmall {
          0% {
            box-shadow: 0 0 3px 1px rgba(255, 195, 75, 0.4);
          }
          100% {
            box-shadow: 0 0 6px 2px rgba(255, 195, 75, 0.7);
          }
        }
        @media (max-width: 640px) {
          .card .backface-hidden > div > .relative > .flex > h3 {
            font-size: 1rem; /* จาก text-lg (ประมาณ 1.125rem) ลดลง */
          }

          .card .backface-hidden > div > .relative > .flex > p {
            font-size: 0.85rem; /* ลดขนาดพารากราฟ */
          }

          .card .backface-hidden > div > .relative > .flex > div p {
            font-size: 0.7rem; /* ข้อความท้าย */
          }
        }
      `}</style>
    </div>
  );
};

export default App;
