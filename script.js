// Custom cursor
const cursor = document.querySelector(".cursor");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const speed = 0.15; // smoothness (lower = smoother & slower)

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animate);
}
animate();

// Optional: subtle grow on click
document.addEventListener("mousedown", () => {
  cursor.style.width = "22px";
  cursor.style.height = "22px";
});
document.addEventListener("mouseup", () => {
  cursor.style.width = "14px";
  cursor.style.height = "14px";
});

// Optional: enlarge on hover over links/buttons
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "24px";
    cursor.style.height = "24px";
    cursor.style.background = "transparent";
    cursor.style.border = "2px solid var(--cursor-color)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "14px";
    cursor.style.height = "14px";
    cursor.style.background = "var(--cursor-color)";
    cursor.style.border = "none";
  });
});

// Hover effect on links or buttons
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "25px";
    cursor.style.height = "25px";
    cursor.style.background = "transparent";
    outline.style.width = "60px";
    outline.style.height = "60px";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "10px";
    cursor.style.height = "10px";
    cursor.style.background = "var(--cursor-color)";
    outline.style.width = "40px";
    outline.style.height = "40px";
  });
});

// Initialize VanillaTilt for project cards
VanillaTilt.init(document.querySelectorAll('.project-card'), {
  max: 15,
  speed: 400,
  glare: false
});

// GSAP ScrollTrigger animations
gsap.registerPlugin(ScrollTrigger);

// Animate hero name
gsap.from('.hero-name', {
  opacity: 0,
  y: 100,
  duration: 1.2,
  ease: 'power4.out'
});

// Animate sections on scroll
gsap.utils.toArray('.section').forEach((section) => {
  gsap.from(section.querySelectorAll('h2, p'), {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });
});

// Animate project cards
gsap.from('.project-card', {
  scrollTrigger: {
    trigger: '.projects-wrapper',
    start: 'top 70%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 100,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out'
});

// Animate tech stack tags
gsap.to('.tech-stack span', {
  scrollTrigger: {
    trigger: '.projects-wrapper',
    start: 'top 60%'
  },
  opacity: 1,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power2.out'
});

// Smooth scroll with Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Magnetic button effect
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      lenis.scrollTo(targetSection, {
        offset: -100,
        duration: 1.5
      });
    }
  });
});