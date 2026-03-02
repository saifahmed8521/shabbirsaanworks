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

// FAQ accordion (one open at a time)
const faqItems = Array.from(document.querySelectorAll(".faq-item"));

if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const toggle = item.querySelector(".faq-toggle");
    const answer = item.querySelector(".faq-answer");

    if (!toggle || !answer) return;

    toggle.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all items
      faqItems.forEach((otherItem) => {
        const otherToggle = otherItem.querySelector(".faq-toggle");
        if (!otherToggle) return;

        otherItem.classList.remove("is-open");
        otherToggle.setAttribute("aria-expanded", "false");
      });

      // If the clicked one was not open, open it
      if (!isOpen) {
        item.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });
}
