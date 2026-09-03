import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const PARTICLE_COUNT = 80;
const MOUSE_RADIUS = 231;
const PARTICLE_COLOR = `#ffffff`;

function ParticleBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    const particles = [];
    const mouse = { x: -1000, y: -1000 };
    let animationFrame;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastTime = 0;

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();
      const previousWidth = width;
      const previousHeight = height;
      width = bounds.width;
      height = bounds.height;

      if (previousWidth && previousHeight) {
        const widthScale = width / previousWidth;
        const heightScale = height / previousHeight;

        particles.forEach((particle) => {
          particle.x *= widthScale;
          particle.y *= heightScale;
        });
      }

      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 2 + Math.random() * 1.2,
      velocityX: (Math.random() - 0.5) * 0.22,
      velocityY: (Math.random() - 0.5) * 0.22,
    });

    const updateMouse = (event) => {
      const bounds = container.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
    };

    const resetMouse = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = (time) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 32) : 16;
      const movementScale = elapsed / 16;
      lastTime = time;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.velocityX * movementScale;
        particle.y += particle.velocityY * movementScale;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;
      });

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = PARTICLE_COLOR;
        context.globalAlpha = 0.4;
        context.fill();

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const otherParticle = particles[nextIndex];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 145) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(otherParticle.x, otherParticle.y);
            context.strokeStyle = PARTICLE_COLOR;
            context.globalAlpha = 0.09 * (1 - distance / 145);
            context.lineWidth = 1;
            context.stroke();
          }
        }

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const opacity = 1 - distance / MOUSE_RADIUS;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(mouse.x, mouse.y);
          context.strokeStyle = PARTICLE_COLOR;
          context.globalAlpha = 0.55 * opacity;
          context.lineWidth = 1.2;
          context.stroke();
        }
      }

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      particles.push(createParticle());
    }

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('mousemove', updateMouse);
    container.addEventListener('mouseleave', resetMouse);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', updateMouse);
      container.removeEventListener('mouseleave', resetMouse);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="particle-background-wrapper">
      <canvas ref={canvasRef} className="particle-background" aria-hidden="true" />
    </div>
  );
}

export default ParticleBackground;
