
// Logo animate using lottie and bodymovin, 
//   $(document).ready(function () {
    var animation = bodymovin.loadAnimation({
      container: $('#lottie-container')[0],
      path: 'data.json',
      renderer: 'svg',
      loop: false,
      autoplay: false,
      name: "Hover Animation",
    });

    // Function to trigger the animation
    function playAnimation() {
      animation.stop();
      animation.play();
    }

    // Auto-play once every 25 seconds
    playAnimation(); // Play immediately on load
    setInterval(playAnimation, 25000);

    // Click event
    $('#lottie-container').on('click', function () {
      playAnimation();
    });

    // Hover events
    // $('#lottie-container').on('mouseenter', function () {
    //   animation.play();
		
    // });
    $('#lottie-container').on('mouseleave', function () {
    animation.play();
   
  });


	
	
//scroll to top — show when hero name scrolls out of view -->

$(document).ready(function () {
  const heroName = document.querySelector('.hero-name');
  const scrollBtn = $('#scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollBtn.fadeOut(200);
      } else {
        scrollBtn.fadeIn(300);
      }
    });
  }, { threshold: 0 });
  if (heroName) {
    observer.observe(heroName);
  }
});

	
	
	


/* ─── HAMBURGER ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const idx = Array.from(revealEls).indexOf(entry.target) % 4;
      setTimeout(() => entry.target.classList.add('visible'), idx * 90);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px 0px 0px' });
revealEls.forEach(el => revealObs.observe(el));





/* ─── SMOOTH NAV ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu on link click
      document.getElementById('mobile-menu').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
      setActiveNav(a.getAttribute('href'));
    }
  });
});

/* ─── SCROLL SPY — active nav highlight ─── */
const navSections = [
  { id: '#hero'         },
  { id: '#about'        },
  { id: '#cv'           },
  { id: '#case-studies' },
  { id: '#showreel'     },
  { id: '#education'    },
  { id: '#contact'      },
];

function setActiveNav(hash) {
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => a.classList.remove('active'));
  document.querySelectorAll(`.nav-links a[href="${hash}"], .mobile-menu a[href="${hash}"]`).forEach(a => a.classList.add('active'));
}

const spyObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveNav('#' + entry.target.id);
    }
  });
}, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

navSections.forEach(({ id }) => {
  const el = document.querySelector(id);
  if (el) spyObs.observe(el);
});

// Set initial active state so nav id is set when the page loads
setActiveNav('#hero');

/* ─── THEME TOGGLE ─── */
// const themeToggle = document.getElementById('theme-toggle');

// // Restore saved preference on load
// if (localStorage.getItem('theme') === 'dark') {
//   document.body.classList.remove('light');
//   document.documentElement.classList.remove('light');
// } else if (!localStorage.getItem('theme')) {
//   document.body.classList.add('light');
//   document.documentElement.classList.add('light');
// }

// themeToggle.addEventListener('click', () => {
//   document.body.classList.toggle('light');
//   document.documentElement.classList.toggle('light');
//   localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
// });









