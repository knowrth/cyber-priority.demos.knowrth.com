// main.js (defensive + ordering-safe)
document.addEventListener("DOMContentLoaded", () => {
  // ========== Mobile menu ==========
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // ========== Hero Carousel ==========
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  const rootStyles = getComputedStyle(document.documentElement);
  const intervalTime = parseInt(rootStyles.getPropertyValue("--carousel-interval")) || 5000;
  let currentSlide = 0;
  let autoSlideTimer;

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? "1" : "0";
      // Optional: block clicks on hidden slide
      slide.style.pointerEvents = i === index ? "auto" : "none";
    });
    dots.forEach((dot, i) => {
      dot.style.backgroundColor = i === index ? "var(--color-accent)" : "rgba(255,255,255,0.4)";
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });
  }

  function nextSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  function prevSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentSlide = i;
        showSlide(currentSlide);
        resetAutoSlide();
      });
    });
  }

  function startAutoSlide() {
    if (slides.length > 1) {
      stopAutoSlide();
      autoSlideTimer = setInterval(nextSlide, intervalTime);
    }
  }
  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }
  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  const nextBtn = document.getElementById("nextSlide");
  const prevBtn = document.getElementById("prevSlide");
  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetAutoSlide(); });

  if (slides.length) {
    showSlide(currentSlide);
    startAutoSlide();
  }

  // ========== Services dropdown ==========
  const servicesBtn = document.getElementById("services-link");
  const servicesMenu = document.getElementById("services-dropdown-menu");

  if (servicesBtn && servicesMenu) {
    servicesBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // keep outside-click handler from immediately closing it
      servicesMenu.classList.toggle("hidden");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!servicesMenu.classList.contains("hidden")
          && !servicesMenu.contains(e.target)
          && e.target !== servicesBtn) {
        servicesMenu.classList.add("hidden");
      }
    });
  }

    // ========== Services dropdown (desktop) ==========
  const servicesDesktopBtn = document.getElementById("services-desktop-btn");
  const servicesDesktopMenu = document.getElementById("services-desktop-dropdown");

  function openMenu(menu) {
    menu.classList.remove("opacity-0", "invisible", "-translate-y-2", "pointer-events-none");
    menu.classList.add("opacity-100", "visible", "translate-y-0");
  }
  function closeMenu(menu) {
    menu.classList.add("opacity-0", "invisible", "-translate-y-2", "pointer-events-none");
    menu.classList.remove("opacity-100", "visible", "translate-y-0");
  }
  function isOpen(menu) {
    return !menu.classList.contains("invisible");
  }

  if (servicesDesktopBtn && servicesDesktopMenu) {
    servicesDesktopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      isOpen(servicesDesktopMenu) ? closeMenu(servicesDesktopMenu) : openMenu(servicesDesktopMenu);
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (isOpen(servicesDesktopMenu)
          && !servicesDesktopMenu.contains(e.target)
          && !servicesDesktopBtn.contains(e.target)) {
        closeMenu(servicesDesktopMenu);
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen(servicesDesktopMenu)) closeMenu(servicesDesktopMenu);
    });
  }
});
