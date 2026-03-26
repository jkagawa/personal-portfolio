// Modern JavaScript with ES6+ features
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
    this.handleFormSubmission();
    this.setupScrollEffects();
    this.setupTypedEffect();
  }

  setupEventListeners() {
    const form = document.getElementById("form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Stagger project containers on entry
    document.querySelectorAll('.project-container').forEach((el, index) => {
      el.style.transitionDelay = `${index * 80}ms`;
      observer.observe(el);
    });

    // Contact container without stagger delay
    document.querySelectorAll('.contact-container').forEach(el => {
      observer.observe(el);
    });
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  handleFormSubmission() {
    const messageSent = localStorage.getItem("message_sent");
    if (messageSent === 'true') {
      this.showToast();
    }
  }

  async handleFormSubmit(_e) {
    localStorage.setItem("message_sent", "true");
    this.showToast();
  }

  showToast() {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.style.display = "flex";
      toast.style.opacity = "1";
      this.hideToast(toast);
    }
  }

  hideToast(toast) {
    setTimeout(() => {
      localStorage.setItem("message_sent", "false");
      toast.style.opacity = "0";
      toast.style.display = "none";
    }, 30000);
  }

  setupScrollEffects() {
    let ticking = false;

    const updateScrollEffects = () => {
      const upIcon = document.getElementById('UpIcon');
      if (upIcon) {
        upIcon.style.display = window.pageYOffset > 0 ? 'block' : 'none';
      }

      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.pageYOffset > 80) {
          navbar.style.background = 'rgba(10, 15, 30, 0.92)';
          navbar.style.borderBottom = '1px solid rgba(129, 140, 248, 0.2)';
        } else {
          navbar.style.background = 'rgba(10, 15, 30, 0.75)';
          navbar.style.borderBottom = '1px solid rgba(129, 140, 248, 0.08)';
        }
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });
  }

  setupTypedEffect() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const strings = [
      'Full Stack Developer',
      'React & Python Engineer',
      'Problem Solver'
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseFrames = 0;

    const PAUSE_AFTER_TYPE   = 55;
    const PAUSE_AFTER_DELETE = 12;
    const TYPE_SPEED_MS      = 65;
    const DELETE_SPEED_MS    = 35;

    const tick = () => {
      const current = strings[stringIndex];

      if (pauseFrames > 0) {
        pauseFrames--;
        setTimeout(tick, 60);
        return;
      }

      if (!isDeleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          pauseFrames = PAUSE_AFTER_TYPE;
        }
        setTimeout(tick, TYPE_SPEED_MS);
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          stringIndex = (stringIndex + 1) % strings.length;
          pauseFrames = PAUSE_AFTER_DELETE;
        }
        setTimeout(tick, DELETE_SPEED_MS);
      }
    };

    // Initial delay so page load doesn't feel rushed
    setTimeout(tick, 800);
  }

  // Utility methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToPortfolio() {
  const offSetPortfolio = document.getElementById('portfolio').offsetTop - document.getElementById('about').offsetTop;
  window.scrollTo({ top: offSetPortfolio, behavior: 'smooth' });
}

function scrollToBottom() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function collapseNav() {
  const menu = document.getElementById('navMenu');
  if (menu && menu.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getInstance(menu);
    if (bsCollapse) bsCollapse.hide();
  }
}

function closeToast() {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.style.display = "none";
    localStorage.setItem("message_sent", "false");
  }
}

// Up Icon visibility
const upIcon = document.getElementById('UpIcon');
addEventListener("scroll", () => {
  if (upIcon) {
    upIcon.style.display = window.pageYOffset > 0 ? 'block' : 'none';
  }
});
