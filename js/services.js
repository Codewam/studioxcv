// Services page JS — scroll and hover interactions
document.addEventListener('DOMContentLoaded', () => {
  // Process steps: staggered entrance
  const steps = document.querySelectorAll('.process-step');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 150);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  steps.forEach(s => { s.classList.add('reveal'); obs.observe(s); });
});
