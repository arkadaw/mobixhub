document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MENU (همبرگر + بستن + overlay)
  ========================= */
  const menuBtn = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".close-menu");
  const menu = document.querySelector(".nav-links");
  const overlay = document.querySelector(".overlay");

  function openMenu() {
    menu.classList.add("active");
    overlay.classList.add("active");

    // برای اینکه دکمه بک گوشی هم کار کنه
    history.pushState({ menuOpen: true }, "");
  }

  function closeMenu() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
  }

  if (menuBtn) menuBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);

  // دکمه back گوشی
  window.addEventListener("popstate", () => {
    if (menu.classList.contains("active")) {
      closeMenu();
    }
  });

  /* =========================
     SLIDER (بنرها + اتو + نقطه‌ها)
  ========================= */

  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (!track || slides.length === 0) return;

  let index = 0;

  function goToSlide(i) {
    slides[i].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest"
    });

    dots.forEach(d => d.classList.remove("active"));
    if (dots[i]) dots[i].classList.add("active");

    index = i;
  }

  // اسکرول خودکار هر 3 ثانیه
  setInterval(() => {
    index++;
    if (index >= slides.length) index = 0;
    goToSlide(index);
  }, 3000);

  // هماهنگی با اسکرول دستی
  track.addEventListener("scroll", () => {
    let newIndex = Math.round(track.scrollLeft / track.offsetWidth);

    dots.forEach(d => d.classList.remove("active"));

    if (dots[newIndex]) {
      dots[newIndex].classList.add("active");
    }

    index = newIndex;
  });

});