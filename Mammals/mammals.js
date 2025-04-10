const menuBar = document.querySelector(".burger");
const sideBar = document.querySelector(".sidebar");
const close = document.querySelector(".close");
const objElements = [];
for(let i = 1; i <= 12; ++i) {
  objElements.push(document.querySelector(`.obj${i}`));
}

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

// document.addEventListener('DOMContentLoaded', function() {
//   const animalsContainer = document.querySelector('.animals');
  
//   // Event delegation for all animal cards
//   animalsContainer.addEventListener('click', function(e) {
//     // Find the closest animal card element
//     const card = e.target.closest('.content');
//     if (!card) return;
    
//     // Get the details page URL
//     const detailsPage = card.dataset.detailsPage;
//     if (!detailsPage) {
//       console.error('No details page specified for this card');
//       return;
//     }
    
//     // Safely navigate to the page
//     try {
//       window.location.href = detailsPage;
//     } catch (error) {
//       console.error('Navigation failed:', error);
//       // Fallback: Open in new tab
//       window.open(detailsPage, '_blank');
//     }
//   });
// });