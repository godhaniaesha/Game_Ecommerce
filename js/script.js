document.addEventListener('DOMContentLoaded', () => {
  // 3D tilt effect for game cards
  const cards = document.querySelectorAll('.d_game-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / 15;
      const rotateY = (rect.width / 2 - x) / 15;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });

  // Initialize BS tooltips if needed
  const ttEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  ttEls.forEach(el => new bootstrap.Tooltip(el));
});
