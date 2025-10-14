// JavaScript Document
//Preloader and fade out of preloader background start

    $(window).on('load', function() {
      // Enforce a 2s minimum before hiding preloader
      setTimeout(function() {
        $('#preloader').fadeOut('slow', function() {
          $('body').css('overflow', 'auto').fadeIn('slow'); // Enable scroll + show body
        });
      }, 1000); // 2000ms = 2 seconds
    });
 
//Preloader and fade out of preloader background end

	  // footer date
  document.getElementById('year').textContent = new Date().getFullYear();
	
  // Enable swipe on ALL Bootstrap carousels
  document.querySelectorAll('.carousel').forEach((carouselElement) => {
    const carousel = new bootstrap.Carousel(carouselElement);
    let startX = 0;
    let endX = 0;

    carouselElement.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    carouselElement.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });

    carouselElement.addEventListener('touchend', () => {
      if (startX - endX > 50) {
        carousel.next();
      } else if (endX - startX > 50) {
        carousel.prev();
      }
    });
  });

// --- Smooth scroll navigation and active link tracking ---
// --- Enhanced smooth scroll + instant active nav ---
$(function () {
  const navbarHeight = $('.navbar').outerHeight() || 80;
  const sections = $('section');
  const navLinks = $('#navMenu .nav-link');

  // --- Smooth scroll on mouseup (instant response) ---
  navLinks.on('mouseup', function (e) {
    const target = $(this).attr('href');
    if (target.startsWith('#')) {
      e.preventDefault();
      const $el = $(target);
      if ($el.length) {
        const dest = $el.offset().top - navbarHeight + 2;
        // Stop any current scroll animation and go immediately
        $('html, body').stop().animate({ scrollTop: dest }, 100, 'swing');
      }

      // Close mobile nav instantly after click
      const $collapse = $('#navMenu');
      if ($collapse.hasClass('show')) $collapse.collapse('hide');
    }
  });

  // --- Intersection Observer for active nav tracking ---
  const observerOptions = {
    root: null,
    rootMargin: `-${navbarHeight}px 0px -10% 0px`,
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.removeClass('active');
        $(`#navMenu .nav-link[href="#${id}"]`).addClass('active');
      }
    });
  }, observerOptions);

  sections.each(function () {
    observer.observe(this);
  });
});