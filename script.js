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
  }

  setupEventListeners() {
    // Form submission
    const form = document.getElementById("form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    // Navigation
    document.querySelectorAll('[onclick*="scrollTo"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('onclick').match(/scrollTo(\w+)/)[1];
        this.scrollToSection(target);
      });
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all project containers and sections
    document.querySelectorAll('.project-container, .portfolio-section, .contact-container').forEach(el => {
      observer.observe(el);
    });
  }

  setupSmoothScrolling() {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
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

  async handleFormSubmit(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = e.target.querySelector('input[type="submit"]');
    const originalText = submitBtn.value;
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual form handling)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("message_sent", "true");
      this.showToast();
      e.target.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      submitBtn.value = originalText;
      submitBtn.disabled = false;
    }
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
      setTimeout(() => {
        toast.style.display = "none";
      }, 300);
    }, 7000);
  }

  closeToast() {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.style.display = "none";
      localStorage.setItem("message_sent", "false");
    }
  }

  setupScrollEffects() {
    let ticking = false;
    
    const updateScrollEffects = () => {
      // Update up icon visibility
      const upIcon = document.getElementById('UpIcon');
      if (upIcon) {
        upIcon.style.display = window.pageYOffset > 0 ? 'block' : 'none';
      }

      // Update navbar background
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.pageYOffset > 50) {
          navbar.style.background = 'rgba(30, 30, 30, 0.6)';
          navbar.style.backdropFilter = 'blur(20px)';
        } else {
          navbar.style.background = 'rgba(30, 30, 30, 0.6)';
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

  scrollToSection(section) {
    const offSetPortfolio = document.getElementById('portfolio').offsetTop - document.getElementById('about').offsetTop;
    const sections = {
      'Top': 0,
      'Portfolio': offSetPortfolio,
      'Bottom': document.body.scrollHeight
    };

    const targetY = sections[section] || 0;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
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

// Global functions for backward compatibility
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

function closeToast() {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.style.display = "none";
    localStorage.setItem("message_sent", "false");
  }
}

// Scroll to top
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Scroll to bottom
function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

// Up Icon
const upIcon = document.getElementById('UpIcon');

addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
        upIcon.style.display = 'block';
    }
    else {
        upIcon.style.display = 'none';
    }
});