(function () {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  const HALF = 240; // half of 480px base size

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX  = mouseX;
  let glowY  = mouseY;
  let visible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!visible) {
      glowX = mouseX;
      glowY = mouseY;
      visible = true;
      glow.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    visible = false;
    glow.style.opacity = '0';
  });

  function animate(ts) {
    // Smooth delayed follow
    glowX += (mouseX - glowX) * 0.06;
    glowY += (mouseY - glowY) * 0.06;

    // Organic size pulsation — two overlapping sines, never the same rhythm
    const pulse = 1 + 0.22 * Math.sin(ts / 1600) + 0.10 * Math.sin(ts / 900 + 1.3);

    // Intensity pulsation — shifts brightness in accent blue range only
    // Slightly out of phase with size so they feel independent
    const intensity = 0.78 + 0.28 * Math.sin(ts / 1200 + 0.8);

    glow.style.transform =
      `translate(${glowX - HALF}px, ${glowY - HALF}px) scale(${pulse})`;
    glow.style.filter = `brightness(${intensity})`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
