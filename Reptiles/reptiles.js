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

const animals = [
  { name: "Agama Lizard", element: document.querySelector(".obj1") },
  { name: "Chameleon", element: document.querySelector(".obj2") },
  { name: "Crocodile", element: document.querySelector(".obj3") },
  { name: "Gecko", element: document.querySelector(".obj4") },
  { name: "Gharial", element: document.querySelector(".obj5") },
  { name: "Komodo Dragon", element: document.querySelector(".obj6") },
  { name: "Lizard", element: document.querySelector(".obj7") },
  { name: "Snake", element: document.querySelector(".obj8") },
];

// Search functionality
const searchBar = document.getElementById("searchBar");
const searchSuggestions = document.getElementById("searchSuggestions");

searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (query.length === 0) {
    searchSuggestions.classList.remove("show");
    showAllAnimals();
    return;
  }

  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(query)
  );

  showSuggestions(filteredAnimals, query);
  filterAnimals(filteredAnimals);
});

function showSuggestions(filteredAnimals, query) {
  if (filteredAnimals.length === 0) {
    searchSuggestions.innerHTML =
      '<div class="suggestion-item">No animals found</div>';
    searchSuggestions.classList.add("show");
    return;
  }

  searchSuggestions.innerHTML = filteredAnimals
    .map((animal) => {
      const highlightedName = animal.name.replace(
        new RegExp(query, "gi"),
        (match) => `<strong>${match}</strong>`
      );
      return `<div class="suggestion-item" data-animal="${animal.name}">${highlightedName}</div>`;
    })
    .join("");

  searchSuggestions.classList.add("show");
}

// Handle suggestion clicks
searchSuggestions.addEventListener("click", (e) => {
  if (e.target.classList.contains("suggestion-item")) {
    const animalName = e.target.dataset.animal;
    searchBar.value = animalName;
    searchSuggestions.classList.remove("show");

    const selectedAnimal = animals.find((animal) => animal.name === animalName);
    if (selectedAnimal) {
      filterAnimals([selectedAnimal]);
    }
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!searchBar.contains(e.target) && !searchSuggestions.contains(e.target)) {
    searchSuggestions.classList.remove("show");
  }
});

// Filter animals display
function filterAnimals(filteredAnimals) {
  animals.forEach((animal) => {
    const isVisible = filteredAnimals.some(
      (filtered) => filtered.name === animal.name
    );
    animal.element.classList.toggle("hidden", !isVisible);
  });
}

function showAllAnimals() {
  animals.forEach((animal) => {
    animal.element.classList.remove("hidden");
  });
}

// A-Z functionality
const alphabetContainer = document.getElementById("alphabetContainer");

function generateAlphabet() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const availableLetters = new Set();

  // Find which letters are available
  animals.forEach((animal) => {
    availableLetters.add(animal.name.charAt(0).toUpperCase());
  });

  alphabetContainer.innerHTML = "";

  // Add "All" button first
  const allButton = document.createElement("button");
  allButton.className = "alphabet-btn";
  allButton.textContent = "All";
  allButton.style.width = "50px";
  allButton.addEventListener("click", () => {
    showAllAnimals();
    searchBar.value = "";
    searchSuggestions.classList.remove("show");
    document
      .querySelectorAll(".alphabet-btn")
      .forEach((btn) => btn.classList.remove("active"));
  });
  alphabetContainer.appendChild(allButton);

  // Generate A-Z buttons
  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.className = "alphabet-btn";
    button.textContent = letter;
    button.disabled = !availableLetters.has(letter);

    if (availableLetters.has(letter)) {
      button.addEventListener("click", () => filterByLetter(letter));
    }

    alphabetContainer.appendChild(button);
  }
}

function filterByLetter(letter) {
  // Update active button
  document.querySelectorAll(".alphabet-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // Filter animals
  animals.forEach((animal) => {
    const isVisible = animal.name.charAt(0).toUpperCase() === letter;
    animal.element.classList.toggle("hidden", !isVisible);
  });

  // Clear search
  searchBar.value = "";
  searchSuggestions.classList.remove("show");
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  generateAlphabet();
});
