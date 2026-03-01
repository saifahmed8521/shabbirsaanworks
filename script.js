// Mobile navigation toggle
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav on link click (mobile)
  if (mainNav) {
    mainNav.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.tagName === "A") {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

// Simple smooth scroll for in-page links (fallback for older browsers)
document.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target instanceof HTMLAnchorElement &&
    target.getAttribute("href") &&
    target.getAttribute("href").startsWith("#")
  ) {
    const id = target.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

// Reveal-on-scroll animation
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: show all
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}