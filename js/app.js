/* ========================= */
/* NAVBAR SCROLL EFFECT */
/* ========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.85)";
    navbar.style.backdropFilter = "blur(14px)";
    navbar.style.padding = "18px 0";
    navbar.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
  } else {
    navbar.style.background = "rgba(0,0,0,0.2)";
    navbar.style.backdropFilter = "blur(12px)";
    navbar.style.padding = "24px 0";
    navbar.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
  }
});

/* ========================= */
/* SCROLL REVEAL ANIMATIONS */
/* ========================= */

const revealElements = document.querySelectorAll(
  ".service-card, .showcase-content, .showcase-image, .benefit-item, .contact-form, .contact-info",
);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active-reveal");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* ========================= */
/* PARALLAX EFFECT */
/* ========================= */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset;

  hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

/* ========================= */
/* SMOOTH BUTTON EFFECT */
/* ========================= */

const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-4px) scale(1.02)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0) scale(1)";
  });
});

/* ========================= */
/* MENU HAMBURGER */
/* ========================= */

const createMobileMenu = () => {
  const navContainer = document.querySelector(".nav-container");
  const navMenu = document.querySelector(".nav-menu");

  const mobileButton = document.createElement("button");

  mobileButton.classList.add("mobile-menu-btn");

  mobileButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

  navContainer.appendChild(mobileButton);

  mobileButton.addEventListener("click", () => {
    navMenu.classList.toggle("mobile-active");
    mobileButton.classList.toggle("active");
  });
};

createMobileMenu();

/* ========================= */
/* ACTIVE LINK ON SCROLL */
/* ========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active-link");
    }
  });
});

/* ========================= */
/* FAKE LOADING EFFECT */
/* ========================= */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


/* ========================= */
/* CURSOR GLOW EFFECT */
/* ========================= */

const glow = document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const states = document.querySelectorAll(".state");
const stateNames = document.querySelectorAll(".coverage-states li");

states.forEach((state) => {
  state.addEventListener("mouseenter", () => {
    const currentState = state.dataset.state;

    stateNames.forEach((item) => {
      if (item.dataset.state === currentState) {
        item.classList.add("active-state");
      }
    });
  });

  state.addEventListener("mouseleave", () => {
    stateNames.forEach((item) => {
      item.classList.remove("active-state");
    });
  });
});

/* ========================= */
/* CONSOLE SIGNATURE */
/* ========================= */

const form = document.getElementById("contactForm");
const button = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  button.innerHTML = "Enviando...";
  button.disabled = true;

  try {
    const formData = new FormData(form);

    const response = await fetch("/contact/process-contact.php", {
      method: "POST",
      body: formData,
    });

    const text = await response.text();

    console.log(text); // opcional debug

    // 🎯 SUCCESS UI (tu efecto verde)
    button.innerHTML = "Request Sent 🚀";
    button.style.background = "#22c55e";
    button.style.color = "#fff";

    form.reset();
  } catch (error) {
    console.error(error);

    button.innerHTML = "Error sending ❌";
    button.style.background = "#ef4444";
  }

  setTimeout(() => {
    button.disabled = false;
  }, 3000);
});

//Button

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector("button");

    const formData = new FormData(form);

    // UX loading state
    button.disabled = true;
    button.innerText = "Sending...";

    try {
      const res = await fetch("/contact/process-contact.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.status === "success") {
        // 🔥 CAMBIO VISUAL (GREEN STATE)
        button.innerText = "Request sent";
        button.style.background = "#22c55e"; // green

        form.reset();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      button.innerText = "Try again";
      button.style.background = "#ef4444"; // red

      console.error(err);
    } finally {
      setTimeout(() => {
        button.disabled = false;
        button.innerText = "Request Free Quote";
        button.style.background = "";
        button.style.color = "";
      }, 3000);
    }
  });
