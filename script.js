
// ==============================
// ZACHEUS MBUGUA PORTFOLIO
// ==============================

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");

    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// DARK AND LIGHT MODE
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  themeIcon.classList.toggle("fa-moon", !isLight);
  themeIcon.classList.toggle("fa-sun", isLight);

  localStorage.setItem(
    "portfolio-theme",
    isLight ? "light" : "dark"
  );
});

// TYPING ANIMATION
const typingText = document.getElementById("typing-text");

const roles = [
  "Software Developer",
  "Web Developer",
  "Tech Enthusiast",
  "Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typingText.textContent =
    currentRole.substring(0, characterIndex);

  let speed = deleting ? 45 : 90;

  if (!deleting && characterIndex === currentRole.length) {
    deleting = true;
    speed = 1400;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// BACK TO TOP BUTTON
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// CONTACT FORM
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const senderEmail = document.getElementById("sender-email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !senderEmail || !subject || !message) {
    formNote.textContent = "Please fill in all fields.";
    return;
  }

  const emailAddress = "karanjazacheus85@gmail.com";

  const emailSubject = encodeURIComponent(subject);
  const emailBody = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${senderEmail}\n\n` +
    `Message:\n${message}`
  );

  formNote.textContent =
    "Opening your email application...";

  window.location.href =
    `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;
});

// AUTOMATIC FOOTER YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();
