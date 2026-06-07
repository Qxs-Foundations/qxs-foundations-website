document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle with outside click detection
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      siteNav.classList.toggle('open');
      menuToggle.textContent = siteNav.classList.contains('open') ? '✕' : '☰';
    });

    document.addEventListener('click', (e) => {
      if (siteNav.classList.contains('open') && !siteNav.contains(e.target) && e.target !== menuToggle) {
        siteNav.classList.remove('open');
        menuToggle.textContent = '☰';
      }
    });
  }

  // Showcase Slideshow
  const slides = document.querySelectorAll('.slide');
  const slideDots = document.querySelectorAll('.slide-dot');
  let currentSlide = 0;
  let slideTimer = null;

  function showSlide(index) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
    slideDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    if (slides.length > 0) {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }
  }

  if (slides.length > 0 && slideDots.length > 0) {
    slideDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.slide);
        showSlide(index);
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 7000);
      });
    });
    // Start automated cycle
    slideTimer = setInterval(nextSlide, 7000);
  }

  // Scroll Reveal Observer (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, we don't need to track it anymore
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.1, // trigger when 10% visible
      rootMargin: '0px 0px -40px 0px' // offset slightly for better feel
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }
});
