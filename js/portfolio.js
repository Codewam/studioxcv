// ============================================
// STUDIOXCV — PORTFOLIO SCRIPT
// ============================================

const projects = [
  {
    title: 'Nova Tech — Brand Mark',
    category: 'Logo Design',
    desc: 'A modern geometric wordmark for a technology startup. The mark balances precision and innovation with sharp angles and strong negative space.',
    tags: ['Logo Design', 'Vector', 'Brand Mark', 'Tech'],
    bgColor: 'linear-gradient(135deg, #0f0f1e, #1a1a35)',
    preview: '◈ NOVA'
  },
  {
    title: 'Lucid Studio — Full Brand System',
    category: 'Brand Identity',
    desc: 'Complete brand identity system including primary and secondary logos, color palette, typography system, stationery, and brand guidelines document.',
    tags: ['Branding', 'Identity', 'Guidelines', 'Stationery'],
    bgColor: 'linear-gradient(135deg, #100a14, #1e0f1e)',
    preview: '✦ LUCID'
  },
  {
    title: 'BrandPost — Campaign Set',
    category: 'Social Media Design',
    desc: 'A series of 30+ social media templates for an e-commerce campaign. Includes posts, stories, reels covers and highlight icons.',
    tags: ['Social Media', 'Templates', 'Campaign', 'Instagram'],
    bgColor: 'linear-gradient(135deg, #0a1a14, #0f2d1e)',
    preview: '◉ SOCIAL'
  },
  {
    title: 'FreshBrew — Product Packaging',
    category: 'Packaging Design',
    desc: 'Premium coffee packaging for FreshBrew's speciality range. The design uses earthy tones and bold typography to convey quality and origin.',
    tags: ['Packaging', 'Print', 'Retail', 'Coffee'],
    bgColor: 'linear-gradient(135deg, #1a1200, #2d2000)',
    preview: '⬡ BREW'
  },
  {
    title: 'Apex Ventures — Wordmark',
    category: 'Logo Design',
    desc: 'A confident wordmark designed for a venture capital firm. Clean, bold letterforms communicate authority and ambition.',
    tags: ['Logo Design', 'Wordmark', 'Finance', 'Corporate'],
    bgColor: 'linear-gradient(135deg, #1a0f0f, #2d1515)',
    preview: '⊞ APEX'
  },
  {
    title: 'Meridian Corp — Annual Report',
    category: 'Print Design',
    desc: 'A 64-page annual report for a multinational corporation. Designed with clarity and visual hierarchy to communicate complex data beautifully.',
    tags: ['Print', 'Report', 'Editorial', 'Corporate'],
    bgColor: 'linear-gradient(135deg, #1a1400, #2d2400)',
    preview: '▣ REPORT'
  },
  {
    title: 'Luxe Beauty — Premium Packaging Line',
    category: 'Packaging Design',
    desc: 'An entire packaging system for a luxury cosmetics brand — boxes, bottles, tubes, and bags with a consistent premium aesthetic.',
    tags: ['Packaging', 'Luxury', 'Beauty', 'Print'],
    bgColor: 'linear-gradient(135deg, #14001a, #200028)',
    preview: '◇ LUXE'
  },
  {
    title: 'Zephyr Agency — Launch Campaign',
    category: 'Marketing Materials',
    desc: 'Grand opening campaign including flyers, posters, banners, and digital ads for a creative agency launch event.',
    tags: ['Marketing', 'Flyers', 'Posters', 'Campaign'],
    bgColor: 'linear-gradient(135deg, #0a001a, #100028)',
    preview: '✧ ZEPHYR'
  },
  {
    title: 'Crest Finance — Corporate Identity',
    category: 'Branding',
    desc: 'Complete corporate identity for a financial services company including logo, stationery, signage, and digital brand guidelines.',
    tags: ['Corporate', 'Branding', 'Identity', 'Finance'],
    bgColor: 'linear-gradient(135deg, #0a0f1a, #0f1e2d)',
    preview: '◇ CREST'
  }
];

let currentLb = 0;

function openLightbox(idx) {
  currentLb = idx;
  renderLightbox(idx);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightbox(idx) {
  const p = projects[idx];
  document.getElementById('lbBody').innerHTML = `
    <div class="lb-preview" style="background:${p.bgColor}">
      <span style="font-family:'Bebas Neue',sans-serif;color:#FF3D00;letter-spacing:4px;">${p.preview}</span>
    </div>
    <span class="lb-cat">${p.category}</span>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <div class="lb-tags">${p.tags.map(t => `<span class="lb-tag">${t}</span>`).join('')}</div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  // Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portItems   = document.querySelectorAll('.port-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      portItems.forEach(item => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  // Lightbox nav
  document.getElementById('lbPrev').addEventListener('click', () => {
    currentLb = (currentLb - 1 + projects.length) % projects.length;
    renderLightbox(currentLb);
  });
  document.getElementById('lbNext').addEventListener('click', () => {
    currentLb = (currentLb + 1) % projects.length;
    renderLightbox(currentLb);
  });

  // ESC close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  { currentLb = (currentLb - 1 + projects.length) % projects.length; renderLightbox(currentLb); }
    if (e.key === 'ArrowRight') { currentLb = (currentLb + 1) % projects.length; renderLightbox(currentLb); }
  });
});
