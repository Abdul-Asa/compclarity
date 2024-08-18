"use client";
import confetti from "canvas-confetti";

interface ConfettiOptions {
  duration: number;
  particleCount: number;
  angle: number;
  spread: number;
  startVelocity: number;
  origin: { x: number; y: number };
  colors: string[];
}
function triggerConfetti({
  particleCount = 2,
  spread = 65,
  startVelocity = 50,
  colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"],
  duration = 3000,
}: Partial<ConfettiOptions> = {}) {
  const end = Date.now() + duration;

  const frame = () => {
    if (Date.now() > end) return;
    confetti({
      disableForReducedMotion: true,
      particleCount,
      angle: 60,
      spread,
      startVelocity,
      origin: { x: 0, y: 0.5 },
      colors,
    });
    confetti({
      disableForReducedMotion: true,
      particleCount,
      angle: 120,
      spread,
      startVelocity,
      origin: { x: 1, y: 0.5 },
      colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
}

export { triggerConfetti };

// export default Confetti;
