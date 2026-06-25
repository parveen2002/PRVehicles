/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

/* ===== THEME TOGGLE ===== */
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const icon = themeToggle ? themeToggle.querySelector('i') : null;

  // Check saved theme
  const savedTheme = localStorage.getItem('pr-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  if (icon) {
    icon.className = savedTheme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('pr-theme', next);
      if (icon) {
        icon.className = next === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
      }
    });
  }
});

/* ===== NAVBAR SCROLL EFFECT ===== */
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

/* ===== MOBILE NAV ===== */
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function openMobile() {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle) navToggle.addEventListener('click', openMobile);
  if (overlay) overlay.addEventListener('click', closeMobile);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobile));
});

/* ===== ANIMATED COUNTERS ===== */
document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const value = parseInt(text.replace(/[,+]/g, ''));
        if (!isNaN(value)) {
          animateCounter(target, value);
        }
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  function animateCounter(el, target) {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      el.textContent = current.toLocaleString() + '+';
      if (step >= steps) {
        el.textContent = target.toLocaleString() + '+';
        clearInterval(timer);
      }
    }, duration / steps);
  }
});

/* ===== SCROLL ANIMATIONS ===== */
document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(el => observer.observe(el));
});

/* ===== PRICE RANGE FILTER ===== */
document.addEventListener('DOMContentLoaded', function () {
  const priceRange = document.getElementById('priceRange');
  const priceDisplay = document.getElementById('priceDisplay');
  if (priceRange && priceDisplay) {
    priceDisplay.textContent = '₹' + parseInt(priceRange.value).toLocaleString();
    priceRange.addEventListener('input', () => {
      priceDisplay.textContent = '₹' + parseInt(priceRange.value).toLocaleString();
    });
  }
});

/* ===== RENTAL CALCULATOR ===== */
document.addEventListener('DOMContentLoaded', function () {
  const calcDays = document.getElementById('calcDays');
  const calcType = document.getElementById('calcType');
  const calcResult = document.getElementById('calcResult');

  function updateCalc() {
    if (!calcDays || !calcType || !calcResult) return;
    const days = parseInt(calcDays.value) || 1;
    const type = calcType.value;
    const rates = { bike: 499, scooter: 399, car: 2499, suv: 3499, ev: 2999, luxury: 5999 };
    const daily = rates[type] || 499;
    let total = daily * days;

    if (days >= 30) total *= 0.75;
    else if (days >= 7) total *= 0.85;

    calcResult.textContent = '₹' + total.toLocaleString();
  }

  if (calcDays) calcDays.addEventListener('input', updateCalc);
  if (calcType) calcType.addEventListener('change', updateCalc);
  updateCalc();
});

/* ===== BOOKING FORM ===== */
document.addEventListener('DOMContentLoaded', function () {
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Booking...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        showToast('Booking Successful!', 'We will contact you shortly to confirm your rental. Thank you for choosing PR Vehicle Rentals.');
        this.reset();
      }, 2000);
    });
  }
});

/* ===== NEWSLETTER ===== */
document.addEventListener('DOMContentLoaded', function () {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input');
      if (input && input.value.trim()) {
        showToast('Subscribed!', 'Thank you for subscribing to our newsletter.');
        input.value = '';
      }
    });
  }
});

/* ===== TOAST NOTIFICATION ===== */
function showToast(title, message) {
  const existing = document.querySelector('.pr-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'pr-toast';
  toast.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
  toast.style.cssText = `
    position: fixed; bottom: 180px; right: 24px; z-index: 99999;
    background: #1E293B; border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px; padding: 20px 24px; max-width: 360px;
    backdrop-filter: blur(20px); box-shadow: 0 16px 64px rgba(0,0,0,0.5);
    animation: slideInRight 0.4s ease; color: #F1F5F9;
  `;
  toast.querySelector('strong').style.cssText = 'color: #F59E0B; font-size: 15px; display: block; margin-bottom: 4px;';
  toast.querySelector('p').style.cssText = 'color: #94A3B8; font-size: 13px; margin: 0;';

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);

  // Inject keyframes if not present
  if (!document.getElementById('toast-keyframes')) {
    const style = document.createElement('style');
    style.id = 'toast-keyframes';
    style.textContent = `
      @keyframes slideInRight { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }
}

/* ===== CHAT WIDGET ===== */
document.addEventListener('DOMContentLoaded', function () {
  const chatBtn = document.getElementById('chatBtn');
  const chatBox = document.getElementById('chatBox');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');

  if (chatBtn && chatBox) {
    chatBtn.addEventListener('click', () => {
      chatBox.classList.toggle('active');
      if (chatBox.classList.contains('active') && chatMessages) {
        if (chatMessages.children.length === 0) {
          addChatMsg('Hello! How can we help you today?', 'bot');
        }
      }
    });
  }

  if (chatClose && chatBox) {
    chatClose.addEventListener('click', () => chatBox.classList.remove('active'));
  }

  function addChatMsg(text, sender) {
    if (!chatMessages) return;
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleChatSend() {
    if (!chatInput || !chatInput.value.trim()) return;
    addChatMsg(chatInput.value.trim(), 'user');
    const userMsg = chatInput.value.trim();
    chatInput.value = '';

    setTimeout(() => {
      const responses = {
        'hello': 'Hi there! Welcome to PR Vehicle Rentals. How can I assist you?',
        'hi': 'Hello! Looking to rent a vehicle? We have bikes, cars, and more!',
        'price': 'Our rentals start from ₹399/day for scooters to ₹5,999/day for luxury cars.',
        'contact': 'You can reach us at +91 9592765428 or visit us in Ludhiana, Punjab.',
        'book': 'To book, please use our booking form above or call us directly!'
      };

      const lower = userMsg.toLowerCase();
      let reply = 'Thank you for your message. Our team will get back to you shortly.';
      for (const [key, val] of Object.entries(responses)) {
        if (lower.includes(key)) { reply = val; break; }
      }
      addChatMsg(reply, 'bot');
    }, 800);
  }

  if (chatSend) chatSend.addEventListener('click', handleChatSend);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleChatSend();
    });
  }
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});

/* ===== VEHICLE FILTER SYSTEM ===== */
document.addEventListener('DOMContentLoaded', function () {
  const vehicleTypeFilter = document.getElementById('vehicleType');
  const brandFilter = document.getElementById('brandFilter');
  const fuelFilter = document.getElementById('fuelFilter');
  const searchBtn = document.getElementById('searchBtn');
  const vehicleCards = document.querySelectorAll('.vehicle-card');

  function filterVehicles() {
    const type = vehicleTypeFilter ? vehicleTypeFilter.value : '';
    const brand = brandFilter ? brandFilter.value : '';
    const fuel = fuelFilter ? fuelFilter.value : '';

    vehicleCards.forEach(card => {
      const cardType = card.dataset.type || '';
      const cardBrand = card.dataset.brand || '';
      const cardFuel = card.dataset.fuel || '';

      const typeMatch = !type || cardType === type;
      const brandMatch = !brand || cardBrand === brand;
      const fuelMatch = !fuel || cardFuel === fuel;

      if (typeMatch && brandMatch && fuelMatch) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', filterVehicles);
  if (vehicleTypeFilter) vehicleTypeFilter.addEventListener('change', filterVehicles);
  if (brandFilter) brandFilter.addEventListener('change', filterVehicles);
  if (fuelFilter) fuelFilter.addEventListener('change', filterVehicles);
});

/* ===== 3D TILT EFFECT ===== */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });
});

/* ===== WISHLIST TOGGLE ===== */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.vehicle-wishlist').forEach(btn => {
    btn.addEventListener('click', function () {
      const icon = this.querySelector('i');
      if (icon.classList.contains('bi-heart')) {
        icon.classList.replace('bi-heart', 'bi-heart-fill');
        this.style.background = '#F59E0B';
        this.style.color = '#1a1a1a';
        showToast('Added to Wishlist', 'Vehicle has been added to your wishlist.');
      } else {
        icon.classList.replace('bi-heart-fill', 'bi-heart');
        this.style.background = 'rgba(0,0,0,0.5)';
        this.style.color = '#fff';
        showToast('Removed from Wishlist', 'Vehicle has been removed from your wishlist.');
      }
    });
  });
});

/* ===== CURRENT YEAR IN FOOTER ===== */
document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
