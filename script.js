/* ---------- PARTICLES ---------- */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: -(Math.random() * 0.4 + 0.1),
    a: Math.random()
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201, 169, 110, ${p.a * 0.6})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ---------- NAV SCROLL ---------- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- REVEAL ON SCROLL ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- PRICING TABS ---------- */
function switchTab(id, btn) {
  document.querySelectorAll('.pricing-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

/* ---------- SELECT PACKAGE → scroll to booking ---------- */
function selectPackage(pkg) {
  const typeEl = document.getElementById('f-type');
  const pkgEl = document.getElementById('f-package');
  const lower = pkg.toLowerCase();
  if (lower.includes('same')) typeEl.value = 'Same Day Graduation';
  else if (lower.includes('pre')) typeEl.value = 'Pre Graduation';
  else if (lower.includes('post')) typeEl.value = 'Post Graduation';
  if (lower.includes('bronze')) pkgEl.value = 'Bronze';
  else if (lower.includes('silver')) pkgEl.value = 'Silver';
  else if (lower.includes('gold')) pkgEl.value = 'Gold';
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

/* ---------- LIGHTBOX ---------- */
function openLightbox(item) {
  const img = item.querySelector('img');
  if (!img || !img.src || img.style.display === 'none') return;
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('active');
}
document.getElementById('lightbox-close').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('active');
});
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('active');
});

/* ---------- BOOKING FORM → WhatsApp ---------- */
/*
  PENTING: Ganti nomor WhatsApp di bawah ini dengan nomor HP kamu.
  Format: 628xxxxxxxxxx (tanpa + dan tanpa spasi)
*/
const WA_NUMBER = '628976493274'; // ← GANTI NOMOR WA KAMU DI SINI

function submitBooking(e) {
  e.preventDefault();
  const name    = document.getElementById('f-name').value;
  const phone   = document.getElementById('f-phone').value;
  const univ    = document.getElementById('f-univ').value;
  const date    = document.getElementById('f-date').value;
  const type    = document.getElementById('f-type').value;
  const pkg     = document.getElementById('f-package').value;
  const session = document.getElementById('f-session').value || '-';
  const pax     = document.getElementById('f-pax').value;
  const note    = document.getElementById('f-note').value || '-';

  const msg = `*BOOKING HEARTFELT DOKUMENTASI*\n\n` +
    `Nama: ${name}\n` +
    `No. WA: ${phone}\n` +
    `Universitas: ${univ}\n` +
    `Tanggal Wisuda: ${date}\n` +
    `Jenis Sesi: ${type}\n` +
    `Paket: ${pkg}\n` +
    `Preferensi Sesi: ${session}\n` +
    `Jumlah Orang: ${pax}\n` +
    `Catatan: ${note}\n\n` +
    `_Pesan ini dikirim dari website Heartfelt_`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');

  document.getElementById('booking-form').style.display = 'none';
  document.getElementById('booking-success').style.display = 'block';
  setTimeout(() => {
    document.getElementById('booking-success').style.display = 'none';
    document.getElementById('booking-form').style.display = 'grid';
    document.getElementById('booking-form').reset();
  }, 5000);
}