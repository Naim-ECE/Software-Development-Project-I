const parallex_el = document.querySelectorAll(".parallax");
const bg = document.querySelector(".bg-img");
const main = document.querySelector("main");
const menuBar = document.querySelector(".burger");
const sideBar = document.querySelector(".sidebar");
const close = document.querySelector(".close");
const modals = document.querySelector(".modals");
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const overlay = document.querySelector("#overlay");

let popSign = () => {
  login.addEventListener("click", () => {
    modals.add.classList("hide");
  });
};

let xValue = 0,
  yValue = 0,
  rotateDegree = 0;

window.addEventListener("mousemove", (event) => {
  if (timeline.isActive()) return;

  xValue = event.clientX - window.innerWidth / 2;
  yValue = event.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  parallex_el.forEach((el) => {
    let speedLayersx = el.dataset.speedx;
    let speedLayersy = el.dataset.speedy;
    let speedLayersz = el.dataset.speedz;
    let roatateSpeed = el.dataset.rotate;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

    let zValue1 =
      (event.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `translateX(calc(-50% + ${
      -xValue * speedLayersx
    }px)) translateY(calc(-50% + ${yValue * speedLayersy}px)) rotateY(${
      rotateDegree * roatateSpeed
    }deg) perspective(2000px) translateZ(${zValue1 * speedLayersz}px)`;
  });
  let speedBgx = bg.dataset.speedx;
  let speedBgy = bg.dataset.speedy;

  let zValue2 = 100;
  bg.style.transform = `translateX(calc(${
    -xValue * speedBgx
  }px)) translateY(calc(${
    yValue * speedBgy
  }px)) perspective(2000px) translateZ(${zValue2}px)`;
});

// if (window.innerWidth >= 725) {
//   main.style.maxHeight = `${window.innerWidth * 0.6}px`;
// } else {
//   main.style.maxHeight = `${window.innerWidth * 1.6}px`;
// }

let timeline = gsap.timeline();

timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top,
      duration: 0.9,
    },
    "1"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 0.7,
    },
    "1.5"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "1.5"
  );

menuBar.addEventListener("click", (e) => {
  e.stopPropagation();
  showSideBar();
});

const showSideBar = () => {
  sideBar.classList.add("show");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeSideBar = () => {
  sideBar.classList.remove("show");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
};

close.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  closeSideBar();
});
overlay.addEventListener("click", closeSideBar);

sideBar.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Keyboard support (ESC key)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sideBar.classList.contains("show")) {
    closeSideBar();
  }
});

// Array.from(parallex_el)
//   .filter((el) => !el.classList.contains("text"))
//   .forEach((el) => {
//     timeline.from(
//       el,
//       {
//         top: `${el.offsetHeight / 2 + el.dataset.distance}px`,
//         duration: 1,
//         ease: "power3.out",
//       },
//       "1"
//     );
//   });

// timeline.from(
//   ".bg-img",
//   {
//     top: `${0}px`,
//     duration: 1,
//   },
//   "1"
// );

// Auth Modal Functionality
const authModalOverlay = document.getElementById("authModalOverlay");
const authCloseBtn = document.getElementById("authCloseBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignupBtn = document.getElementById("showSignup");
const showLoginBtn = document.getElementById("showLogin");
const loginLink = document.querySelector(".login");
const signupLink = document.querySelector(".signup");

// Show modal functions
const showAuthModal = () => {
  authModalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

const hideAuthModal = () => {
  authModalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
};

// Switch between login and signup
const showLogin = () => {
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
};

const showSignup = () => {
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
};

// Event listeners
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  showAuthModal();
  showLogin(); // activates login form
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
});

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  showAuthModal();
  showSignup(); // activates signup form
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
});

authCloseBtn.addEventListener("click", hideAuthModal);

showSignupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  switchForms(loginForm, signupForm);
});

showLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  switchForms(signupForm, loginForm);
});

// Close modal when clicking outside
authModalOverlay.addEventListener("click", (e) => {
  if (e.target === authModalOverlay) {
    hideAuthModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && authModalOverlay.classList.contains("active")) {
    hideAuthModal();
  }
});

// Form submission handlers
document
  .querySelector("#loginForm .auth-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Add your login logic here
    console.log("Login attempt:", { email, password });

    // Show success message or handle login
    alert("Login functionality would be implemented here");
  });

document
  .querySelector("#signupForm .auth-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Add your signup logic here
    console.log("Signup attempt:", { name, email, password });

    // Show success message or handle signup
    alert("Signup functionality would be implemented here");
  });

// Social login handlers
document.querySelectorAll(".social-btn.google").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

document.querySelectorAll(".social-btn.facebook").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// Initialize login form as active by default
showLogin();

// Enhanced form interactions
document.querySelectorAll(".form-group input").forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });

  // Real-time validation
  input.addEventListener("input", () => {
    const formGroup = input.parentElement;

    if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(input.value)) {
        formGroup.classList.add("valid");
        formGroup.classList.remove("invalid");
      } else {
        formGroup.classList.add("invalid");
        formGroup.classList.remove("valid");
      }
    }

    if (input.type === "password") {
      if (input.value.length >= 6) {
        formGroup.classList.add("valid");
        formGroup.classList.remove("invalid");
      } else {
        formGroup.classList.add("invalid");
        formGroup.classList.remove("valid");
      }
    }
  });
});

// Password confirmation validation
document.getElementById("confirmPassword").addEventListener("input", (e) => {
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = e.target.value;
  const formGroup = e.target.parentElement;

  if (password === confirmPassword && confirmPassword.length > 0) {
    formGroup.classList.add("valid");
    formGroup.classList.remove("invalid");
  } else {
    formGroup.classList.add("invalid");
    formGroup.classList.remove("valid");
  }
});

// Smooth transitions for form switching
const switchForms = (hideForm, showForm) => {
  hideForm.style.transform = "translateX(-30px)";
  hideForm.style.opacity = "0";

  setTimeout(() => {
    hideForm.classList.remove("active");
    showForm.classList.add("active");

    setTimeout(() => {
      showForm.style.transform = "translateX(0)";
      showForm.style.opacity = "1";
    }, 50);
  }, 300);
};

// Update switch handlers with smooth transitions
showSignupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  switchForms(loginForm, signupForm);
});

showLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  switchForms(signupForm, loginForm);
});
