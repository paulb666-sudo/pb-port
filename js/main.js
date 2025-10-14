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
