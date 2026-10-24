/* ========== FIREFLIES ========== */
(function createFireflies() {
  const container = document.getElementById('fireflies');
  if (!container) return;

  const colors = ['pink', 'purple', 'mint'];
  const count = window.innerWidth < 768 ? 14 : 24;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    const color = colors[Math.floor(Math.random() * colors.length)];
    dot.className = `firefly ${color}`;

    const size = 3 + Math.random() * 5;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.setProperty('--dur', `${28 + Math.random() * 42}s`);
    dot.style.setProperty('--delay', `${Math.random() * 5}s`);

    for (let n = 1; n <= 5; n++) {
      dot.style.setProperty(`--x${n}`, `${Math.random() * 100}vw`);
      dot.style.setProperty(`--y${n}`, `${Math.random() * 100}vh`);
    }

    container.appendChild(dot);
  }
})();

/* ========== THEME ========== */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ========== MOBILE MENU ========== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ========== ACTIVE NAV ========== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ========== SCROLL REVEAL ========== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(s => observer.observe(s));

/* ========== DEVICE SCENE PARALLAX ========== */
const scene = document.getElementById('deviceScene');
if (scene && window.matchMedia('(pointer: fine)').matches) {
  let rafId = null;

  scene.addEventListener('mousemove', e => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      scene.style.setProperty('--rot-x', `${y * 10}deg`);
      scene.style.setProperty('--rot-y', `${x * 14}deg`);
      rafId = null;
    });
  });

  scene.addEventListener('mouseleave', () => {
    scene.style.setProperty('--rot-x', '0deg');
    scene.style.setProperty('--rot-y', '0deg');
  });
}

/* ========== TOAST ========== */
const toast = document.getElementById('toast');
const toastClose = document.getElementById('toastClose');

setTimeout(() => toast.classList.add('show'), 1400);
setTimeout(() => toast.classList.remove('show'), 9000);

toastClose.addEventListener('click', () => {
  toast.classList.remove('show');
});

/* ========== SMOOTH SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});