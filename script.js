const parallex_el = document.querySelectorAll(".parallax");
const bg = document.querySelector(".bg-img");
const main = document.querySelector("main");
const menuBar = document.querySelector(".burger");
const sideBar = document.querySelector(".sidebar");
const close = document.querySelector(".close");

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

if (window.innerWidth >= 725) {
  main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
  main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

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

menuBar.addEventListener("click", () => {
  showSideBar();
});

const showSideBar = () => {
  sideBar.classList.remove("show");
  sideBar.style.display = "flex";
  void sideBar.offsetWidth;
  sideBar.classList.add("show");
};

close.addEventListener("click", () => {
  closeSideBar();
});

const closeSideBar = () => {
  sideBar.classList.remove("show");
  sideBar.style.display = "none";
  void sideBar.offsetWidth;
  sideBar.classList.add("show");
};

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
