/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('nav-hamburger');
const navLinksList = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
  document.body.style.overflow = navLinksList.classList.contains('open') ? 'hidden' : '';
});
// Close menu on link click
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SKILL CARD TILT ── */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

/* ── TYPING EFFECT on hero tag ── */
const tag = document.querySelector('.hero-tag');
const original = tag.textContent;
tag.textContent = '';
let idx = 0;
function typeNext() {
  if (idx < original.length) {
    tag.textContent += original[idx++];
    setTimeout(typeNext, 40);
  }
}
setTimeout(typeNext, 400);

/* ── LIGHTBOX ── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

// Hero image
const heroImg = document.querySelector('.hero-image img');
if (heroImg) {
  heroImg.addEventListener('click', () => openLightbox(heroImg.src, heroImg.alt));
}

// Project cards (entire card clickable)
document.querySelectorAll('.project-card[data-img]').forEach(card => {
  card.addEventListener('click', () => openLightbox(card.dataset.img, card.dataset.alt));
});

// Project images (keep for direct img click too)
document.querySelectorAll('.project-thumb img').forEach(img => {
  img.addEventListener('click', e => {
    e.stopPropagation(); // prevent double-fire since card already handles it
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
