
  $(document).ready(function () {
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

    // Auto-play once every 15 seconds
    playAnimation(); // Play immediately on load
    setInterval(playAnimation, 18000);

    // Click event
    $('#lottie-container').on('click', function () {
      playAnimation();
    });

    // Hover events
    $('#lottie-container').on('mouseenter', function () {
      animation.play();
		
    });
    $('#lottie-container').on('mouseleave', function () {
    animation.stop();
    });
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

	
	
	


// ─── LOTTIE LOGO ─── */
lottie.loadAnimation({
  container: document.getElementById('lottie-logo'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://paulb666-sudo.github.io/pb-port/images/bouncing-circles.svg'
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

/* ─── CASE STUDY DATA ─── */
const cases = [
  {
    tag: 'Mobile App · 2026',
    title: 'DARG Shelter Hub',
    subtitle: 'Dog Active Rescue Group — Cape Town',
    meta: [
      { label: 'Role', value: 'UX/UI Designer' },
      { label: 'Platform', value: 'Mobile Web (PWA)' },
      { label: 'Stack', value: 'React · TypeScript' },
      { label: 'Deployed', value: 'Google Cloud Run' }
    ],
    imgClass: ['mi-photo mi-darg-1','mi-photo mi-darg-2','mi-photo mi-darg-3','mi-photo mi-darg-4'],
    imgSrcs: ['images/Case_Study_main.png','images/Case_Study_main.png','images/Case_Study_main2.png','Case_Study_main.png'],
    imgLabels: ['Login & Liability Waiver Flow','Volunteer Dashboard — Dog Grid','Dog Profile Modal — Six Tabs','Schedule Walk Wizard'],
    links: [
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } }
    ],
    paras: [
      '<strong>The problem.</strong> DARG — the Dog Active Rescue Group — is a Cape Town-based animal shelter running on goodwill and spreadsheets. Volunteer coordinators were spending hours each week manually matching available walkers to dogs in need of exercise, cross-referencing paper rosters, WhatsApp threads, and a shared Google Sheet that was perpetually out of date. Dogs with the most urgent behavioural needs were frequently overlooked, while popular, easy-going dogs received disproportionate attention. The ask was clear: design and build a purpose-built scheduling portal that would bring order to the chaos — one that volunteers could pick up on their phones without any training, and that shelter administrators could use to maintain full visibility and control over the kennel roster.',
      '<strong>Designing for two users.</strong> Early discovery revealed a sharp divide between two user types. Volunteers — often students, retirees, or working professionals giving up a few hours on weekends — needed a system that was frictionless, warm and confidence-inspiring. Shelter administrators, by contrast, needed control: adding dogs, editing medical and behavioural flags, overriding bookings, monitoring activity. Rather than build two separate interfaces, the decision was made to design a single adaptive UI gated behind an explicit role selector at login — the role toggle revealing or hiding administrative affordances as appropriate. A mandatory liability waiver was woven directly into the login flow, and a "Remember Me" option cached credentials locally to eliminate re-entry friction for regular volunteers.',
      '<strong>Designing for urgency.</strong> The central challenge of the dashboard was surfacing priority without creating anxiety. The solution was a multi-layered sorting system anchored in three modes: Urgency (a qualitative status badge set by administrators), Days (time in the shelter), and Fewest Walks (weekly exercise count). Each dog card was a compact but information-dense unit — breed, age, energy level, shelter duration, a circular progress dial showing walks against the weekly goal, and a colour-coded status badge (Urgent in red, On-Site Only in amber, Well Walked in green). A weather widget docked above the grid surfaced real-time safety warnings, alerting volunteers to avoid walking high-energy or flat-faced breeds during peak heat.',
      '<strong>The scheduling experience.</strong> Walk scheduling needed to be achievable in under thirty seconds on a phone. Two entry points were designed: a "Book Walk" button on each dog card for volunteers who already knew which dog they wanted, and a Schedule Walk wizard in the bottom nav for multi-dog group bookings. Three fixed daily time slots replaced a freeform picker to constrain complexity. A recurrence engine allowed walks to be booked up to twelve weeks ahead. The My Walks section gave each volunteer a personal history — hours volunteered, completed walks, upcoming sessions — serving both as motivation and as an administrative audit trail. The platform was built  within Google AI Studio using a Gemini-powered workflow, compressed into days rather than weeks, and deployed to Google Cloud Run as a containerised static build, or a progressive web app.   '
    ]
  },
  {
    tag: 'Fintech · 2012–2015',
    title: 'Insurance App — Go Cover',
    subtitle: 'Sanlam · Full Stack Dev House',
    meta: [
      { label: 'Role', value: 'Head of UX' },
      { label: 'Platform', value: 'iOS & Android' },
      { label: 'Client', value: 'Sanlam' },
      { label: 'Scope', value: 'End-to-end UX/UI' }
    ],
    imgClass: ['mi-photo mi-fin-1','mi-photo mi-fin-2','mi-photo mi-fin-3','mi-photo mi-fin-4'],
    imgSrcs: ['https://placehold.co/1200x675/0f1a2e/4a7fa8?text=Research+%26+Personas','https://placehold.co/1200x675/0f1a2e/4a7fa8?text=User+Flow+Architecture','https://placehold.co/1200x675/0f1a2e/4a7fa8?text=Wireframe+Prototypes','https://placehold.co/1200x675/0f1a2e/4a7fa8?text=Final+UI+Policy+Mgmt'],
    imgLabels: ['Research & Persona Development','User Flow Architecture','Wireframe Prototypes','Final UI — Policy Management'],
    links: [
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } }
    ],
    paras: [
      '<strong>Go Cover</strong> was Sanlam\'s entry into direct-to-consumer insurance via mobile — a first for the brand and a significant UX challenge. Users needed to be able to get a quote, understand their cover and manage their policy in a domain that is typically perceived as complex, intimidating and opaque.',
      'The project required deep stakeholder engagement across Sanlam\'s insurance, compliance and digital teams. I facilitated workshops to align on user goals versus business constraints, built detailed user personas from qualitative research, and mapped end-to-end journeys to identify where the existing quoting and onboarding process created friction and drop-off.',
      'Interaction design focused on <strong>progressive disclosure</strong> — surfacing only what the user needed at each stage, rather than presenting the full complexity of the product upfront. Wireframes were prototyped in InVision and validated through multiple rounds of moderated user testing, with findings fed back directly into design iterations.',
      'The final UI balanced Sanlam\'s established brand system with a more approachable, conversational visual tone appropriate for a mobile-first, direct-to-consumer product. The app successfully reduced the quote-to-purchase journey time and formed the template for subsequent Sanlam digital product launches.'
    ]
  },
  {
    tag: 'E-Learning · 2023–2026',
    title: 'Motion-Driven Learning Modules',
    subtitle: 'Laragh Courseware — Freelance',
    meta: [
      { label: 'Role', value: 'UX & Motion Designer' },
      { label: 'Tools', value: 'After Effects, AI' },
      { label: 'Output', value: 'Video Modules' },
      { label: 'Team', value: '4 Motion Designers' }
    ],
    imgClass: ['mi-photo mi-el-1','mi-photo mi-el-2','mi-photo mi-el-3','mi-photo mi-el-4'],
    imgSrcs: ['https://placehold.co/1200x675/1a0a2e/7a3fb0?text=Storyboard+%26+Script','https://placehold.co/1200x675/1a0a2e/7a3fb0?text=Vector+Asset+Library','https://placehold.co/1200x675/1a0a2e/7a3fb0?text=Animation+Timing','https://placehold.co/1200x675/1a0a2e/7a3fb0?text=Rendered+Output'],
    imgLabels: ['Storyboard & Script Review','Vector Asset Library','Animation — Timing & Easing','Final Module — Rendered Output'],
    links: [
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } },
      { before: { url: 'http://www.google.com', label: 'Link placeholder' }, after: { url: 'http://www.google.com', label: 'Link placeholder' } }
    ],
    paras: [
      'The brief was to translate technically authored scripts and <strong>AI-generated voiceovers</strong> into clear, visually engaging short-form explainer video modules covering a wide variety of subject matter. The challenge was establishing a shared visual language that could be used consistently across a team of four motion designers working in parallel on different modules within the same course.',
      'My process started with storyboarding — translating the written script into a visual narrative structure before any assets were created. This forced decisions about <strong>pacing, visual hierarchy and information chunking</strong> early, avoiding costly animation rework downstream. A shared vector-based asset library in Illustrator was built to ensure consistency and production efficiency across the team.',
      'Animation in After Effects focused on using motion purposefully — not decoratively. Timing and easing were tuned to guide attention rather than distract, with motion used to reveal information progressively and reinforce the spoken narrative. This work deepened my understanding of how motion affects comprehension and where it adds versus subtracts value.',
      'The process also became an exploration of <strong>AI-assisted creative workflows</strong> — using generative tools to accelerate asset creation, voice production and script iteration. This has fed directly into my thinking around how AI tooling will reshape UX and product workflows more broadly, particularly in prototyping and specification generation.'
    ]
  }
];



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
const themeToggle = document.getElementById('theme-toggle');

// Restore saved preference on load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.remove('light');
  document.documentElement.classList.remove('light');
} else if (!localStorage.getItem('theme')) {
  document.body.classList.add('light');
  document.documentElement.classList.add('light');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});









