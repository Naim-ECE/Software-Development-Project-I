const menuBar = document.querySelector(".burger");
const sideBar = document.querySelector(".sidebar");
const close = document.querySelector(".close");

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

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const animalKey = urlParams.get('animal');

  // Debugging check
  console.log(`Category: ${category}, Animal: ${animalKey}`);

  if (!category || !animalKey) {
    showError('Missing animal information');
    return;
  }

  try {
    // 1. Fetch animal data
    const response = await fetch('../Mammals/animals.json');
    
    if (!response.ok) throw new Error('Failed to fetch data');
    
    // 2. Parse JSON
    const data = await response.json();
    console.log('Loaded data:', data);
    
    // 3. Get specific animal data
    const animalData = data[category]?.[animalKey.toLowerCase()];
    
    if (!animalData) {
      showError('Animal information not found');
      return;
    }

    // 4. Update DOM elements
    // Image
    const img = document.getElementById('obj1-image');
    img.src = animalData.image;
    img.alt = animalData.information["Animal Name"];
    
    // Information List
    const infoContainer = document.querySelector('.info-container');
    infoContainer.innerHTML = `
      <h2>Information</h2>
      <div class="info-list">
        ${Object.entries(animalData.information).map(([key, value]) => `
          <div class="info-item">
            <span class="info-label">${key}:</span>
            <span class="info-value">${value}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Description
    const descContainer = document.querySelector('.description-container');
    descContainer.innerHTML = `
      <h2>Description</h2>
      <p class="description">${animalData.description}</p>
    `;

  } catch (error) {
    showError('Failed to load animal data');
    console.error('Error details:', error);
  }
});

function showError(message) {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div class="error-message">
      <h2>⚠️ Error</h2>
      <p>${message}</p>
      <a href="../index.html" class="home-link">Return to Homepage</a>
    </div>
  `;
}