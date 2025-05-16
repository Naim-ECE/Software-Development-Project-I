const menuBar = document.querySelector(".burger");
const sideBar = document.querySelector(".sidebar");
const close = document.querySelector(".close");

menuBar.addEventListener("click", (e) => {
  e.preventDefault();
  showSideBar();
});

const showSideBar = () => {
  sideBar.classList.remove("show");
  sideBar.style.display = "flex";
  void sideBar.offsetWidth;
  sideBar.classList.add("show");
};

close.addEventListener("click", (e) => {
  e.preventDefault();
  closeSideBar();
});

const closeSideBar = () => {
  sideBar.classList.remove("show");
  sideBar.style.display = "none";
  void sideBar.offsetWidth;
  sideBar.classList.add("show");
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".content").forEach((card) => {
    card.addEventListener("click", () => {
      const animalName = card.dataset.animal;
      window.location.href = `../Content_Page/content.html?category=reptiles&animal=${encodeURIComponent(
        animalName
      )}`;
    });
  });
});
