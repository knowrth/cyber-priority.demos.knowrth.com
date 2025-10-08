// Handle mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// ===============================
// Hero Carousel Logic (with Controls)
// ===============================
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-dot");
const rootStyles = getComputedStyle(document.documentElement);
const intervalTime = parseInt(rootStyles.getPropertyValue("--carousel-interval")) || 5000;
let currentSlide = 0;
let autoSlideTimer;

// Show slide by index
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
  });
  dots.forEach((dot, i) => {
    dot.style.backgroundColor = i === index ? "var(--color-accent)" : "rgba(255,255,255,0.4)";
  });
}

// Move to next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Move to previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Dot click events
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentSlide = i;
    showSlide(currentSlide);
    resetAutoSlide();
  });
});

// Auto slide setup
function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, intervalTime);
}
function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

// Buttons
document.getElementById("nextSlide").addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});
document.getElementById("prevSlide").addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

// Initialize
showSlide(currentSlide);
startAutoSlide();


