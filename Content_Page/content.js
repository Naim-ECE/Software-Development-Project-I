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
  const animalKey = urlParams.get('animal').toLowerCase();

  console.log('Searching for:', { category, animalKey });

  try {
    // 1. Construct category folder path
    const categoryFolder = category.charAt(0).toUpperCase() + category.slice(1);
    const jsonPath = `../${categoryFolder}/animals.json`;
    
    // 2. Fetch data with error handling
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${jsonPath} (Status: ${response.status})`);
    }

    // 3. Parse JSON
    const animals = await response.json();
    console.log('Available animals:', Object.keys(animals));

    // 4. Validate animal exists
    if (!animals[animalKey]) {
      throw new Error(`${animalKey} not found. Available: ${Object.keys(animals).join(', ')}`);
    }

    // 5. Update DOM elements
    const animalData = animals[animalKey];
    
    // Update Image
    const img = document.getElementById('obj1-image');
    img.src = animalData.image;
    img.alt = animalData.information["Animal Name"];

    // Update Information
    document.querySelector('.info-container').innerHTML = `
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

    // Update Description
    document.querySelector('.description-container').innerHTML = `
      <h2>Description</h2>
      <p class="description">${animalData.description}</p>
    `;

  } catch (error) {
    console.error('Error:', error);
    showError(error.message);
  }
});
