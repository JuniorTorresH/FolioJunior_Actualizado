document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-out-back",
    once: true,
    mirror: false,
  });

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Add Glitch Effect to Hero Title on Hover (Optional fun extra)
  const heroTitle = document.querySelector(".glitch-effect");
  if (heroTitle) {
    heroTitle.addEventListener("mouseover", () => {
      heroTitle.style.textShadow = "2px 2px 0px #ff00ff, -2px -2px 0px #39ff14";
    });
    heroTitle.addEventListener("mouseout", () => {
      heroTitle.style.textShadow = "none";
    });
  }

  const projectCards = Array.from(document.querySelectorAll(".project-card"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox
    ? lightbox.querySelector(".lightbox-image")
    : null;
  const prevBtn = lightbox
    ? lightbox.querySelector(".lightbox-arrow.left")
    : null;
  const nextBtn = lightbox
    ? lightbox.querySelector(".lightbox-arrow.right")
    : null;
  const closeBtn = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  let currentImageIndex = 0;
  let currentProjectImages = [];

  function showImage(index) {
    if (!lightbox || !lightboxImg || currentProjectImages.length === 0) return;
    currentImageIndex =
      (index + currentProjectImages.length) % currentProjectImages.length;
    const src = currentProjectImages[currentImageIndex];
    const alt = "";
    lightboxImg.setAttribute("src", src);
    lightboxImg.setAttribute("alt", alt);
  }

  function openLightbox(index) {
    if (!lightbox) return;
    showImage(index);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  }

  function nextImage() {
    showImage(currentImageIndex + 1);
  }

  function prevImage() {
    showImage(currentImageIndex - 1);
  }

  projectCards.forEach((card) => {
    const imgEl = card.querySelector(".project-image");
    const imgsAttr = card.getAttribute("data-images") || "";
    const imgs = imgsAttr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    imgEl.addEventListener("click", () => {
      currentProjectImages = imgs.length ? imgs : [imgEl.getAttribute("src")];
      openLightbox(0);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", prevImage);
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", nextImage);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("show")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
});
