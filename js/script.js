// ============================================
// STUDIOXCV — MAIN SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ──────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── HAMBURGER MENU ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── SCROLL REVEAL ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  // ── COUNTER ANIMATION ──────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stats-section, .hero-stats').forEach(el => {
    counterObs.observe(el);
  });
  const lines = [
    { text: "Transforming Ideas", className: "line1" },
    { text: "Into Powerful", className: "line2" },
    { text: "Visual Designs", className: "line3" }
];

const typingElement = document.getElementById("typing-text");

let lineIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (lineIndex < lines.length) {

        let currentSpan = document.getElementById(`line-${lineIndex}`);

        if (!currentSpan) {
            currentSpan = document.createElement("span");
            currentSpan.id = `line-${lineIndex}`;
            currentSpan.className = lines[lineIndex].className;
            typingElement.appendChild(currentSpan);
        }

        if (charIndex < lines[lineIndex].text.length) {
            currentSpan.textContent += lines[lineIndex].text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 80);
        } else {
            typingElement.appendChild(document.createElement("br"));
            lineIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 300);
        }
    }
}

window.addEventListener("load", typeWriter);

  // ── TESTIMONIAL SLIDER ─────────────────────
  const track  = document.getElementById('testiTrack');
  const dotsC  = document.getElementById('testiDots');
  const btnPrev = document.getElementById('testPrev');
  const btnNext = document.getElementById('testNext');

  if (track) {
    const cards = track.querySelectorAll('.testi-card');
    const total = cards.length;
    let current = 0;
    let autoTimer;
    let visibleCount = window.innerWidth < 768 ? 1 : 2;

    // build dots
    const maxDot = total - visibleCount;
    for (let i = 0; i <= maxDot; i++) {
      const d = document.createElement('span');
      d.className = 'testi-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsC.appendChild(d);
    }

    function goTo(idx) {
      const clampMax = total - visibleCount;
      current = Math.max(0, Math.min(idx, clampMax));
      const cardW = cards[0].offsetWidth + 32; // gap = 2rem = 32px
      track.style.transform = `translateX(-${current * cardW}px)`;
      dotsC.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    btnPrev && btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    btnNext && btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    function autoPlay() { autoTimer = setInterval(() => goTo(current + 1 > total - visibleCount ? 0 : current + 1), 5000); }
    function resetAuto() { clearInterval(autoTimer); autoPlay(); }
    autoPlay();

    window.addEventListener('resize', () => {
      visibleCount = window.innerWidth < 768 ? 1 : 2;
      goTo(0);
    });
  }

  // ── CURSOR GLOW (desktop only) ─────────────
  if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:fixed;pointer-events:none;z-index:9999;
      width:300px;height:300px;border-radius:50%;
      background:radial-gradient(circle,rgba(255,61,0,0.06),transparent 70%);
      transform:translate(-50%,-50%);transition:left .15s,top .15s;
    `;
    document.body.appendChild(glow);
    window.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

});
