import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  decay: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

export const EmberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const maxParticles = window.innerWidth < 768 ? 35 : 75;
    const colors = [
      'rgba(255, 69, 0, ',    // Red-orange
      'rgba(255, 140, 0, ',   // Dark orange
      'rgba(255, 215, 0, ',   // Gold
      'rgba(239, 68, 68, ',   // Crimson
      'rgba(251, 146, 60, ',  // Bright ember
    ];

    const createParticle = (spawnAnywhere = false): Particle => {
      const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: spawnAnywhere ? Math.random() * height : height + Math.random() * 20,
        size: Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 1.5 + 0.5),
        speedX: (Math.random() - 0.45) * 0.8, // slight rightward bias like the apocalyptic storm
        opacity: Math.random() * 0.7 + 0.3,
        decay: Math.random() * 0.003 + 0.0015,
        color: colorPrefix,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
      };
    };

    // Initial pool
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    // Optional mouse repulsion / turbulence
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.4;
        p.y += p.speedY;
        p.opacity -= p.decay;

        // Subtle reaction to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 1.2;
          p.y -= (dy / dist) * 1.2;
        }

        // Draw ember with soft glow
        if (p.opacity > 0 && p.y > -10 && p.x >= -20 && p.x <= width + 20) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.shadowBlur = p.size * 4;
          ctx.shadowColor = 'rgba(255, 69, 0, 0.8)';
          ctx.fill();
        } else {
          // Recycle
          particles[i] = createParticle(false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full mix-blend-screen"
    />
  );
};
