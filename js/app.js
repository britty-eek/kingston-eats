console.log("Kingston Eats loaded.");

const restaurants = [
  { id: 1, name: "Smokey Pit Jerk", category: "Jerk", area: "New Kingston",
    rating: 4.5, open: true, featured: true,
    image: "images/small food chicken.jpg",
   imageAlt: "A plate of Jerk chicken, rice and peas, and coleslaw.",
    description: "Pimento-wood jerk chicken and pork served with festival." },
  { id: 2, name: "Golden Crust Patties", category: "International", area: "Half Way Tree",
    rating: 4.0, open: false, featured: true,
    image: "images/patty.jpg",
   imageAlt: "Golden crusted patties in a brown paper bag.",
    description: "Fresh patties and coco bread baked every morning." },
  { id: 3, name: "Harbour Catch", category: "Seafood", area: "Port Royal",
    rating: 4.7, open: true, featured: true,
    image: "images/lots fish.jpg",
   imageAlt: "A table filled with steamed and fried fish alike.",
    description: "Fried fish, bammy and escovitch by the water." },
  { id: 4, name: "Roadside Jerk Stop", category: "Jerk", area: "Constant Spring",
    rating: 3.9, open: false, featured: false,
    image: "images/jerk.jpg",
   imageAlt: "Jerk chicken and festival on a plate",
    description: "Late-night jerk and roast yam." },
  { id: 5, name: "Sea Breeze Grill", category: "Seafood", area: "Palisadoes",
    rating: 4.4, open: true, featured: false,
    image: "images/fish and plantain.jpg",
    imageAlt: "Fish and plantain on a plate",
    description: "Grilled plantain and steamed fish plates." },
  { id: 6, name: "Coconut Grove Bistro", category: "International", area: "Liguanea",
    rating: 4.3, open: true, featured: false,
    image: "images/international.jpg",
  imageAlt: "A mix of Caribbean, Mediterranean and Asian dishes.",
    description: "Caribbean ingredients in Mediterranean and Asian dishes." },
  { id: 7, name: "Yard Style Jerk Centre", category: "Jerk", area: "Barbican",
    rating: 4.6, open: true, featured: false,
    image: "images/fancier chicken.jpg",
  imageAlt: "Jerk chicken, white rice, and potatoes on a plate",
    description: "Slow-smoked jerk chicken with rice and potatoes." },
  { id: 8, name: "Rockfort Fish Shack", category: "Seafood", area: "Rockfort",
    rating: 4.1, open: false, featured: false,
    image: "images/food platter.jpg",
  imageAlt: "A platter of assorted food including fish, plantain, lobster, and more.",
    description: "Steamed and fried fish with bammy and festival." }
];

// FUNCTION 1: a decision turned into a reusable function
function getStatusMessage(isOpen) {
  if (isOpen) {
    return "Open now";
  }
  return "Closed";
}

// FUNCTION 2: builds one card for one restaurant and returns it
function createRestaurantCard(restaurant) {
  const status = getStatusMessage(restaurant.open);
  const badgeClass = restaurant.open ? "text-bg-success" : "text-bg-secondary";

  const column = document.createElement("div");
  column.className = "col restaurant-item";
  column.dataset.category = restaurant.category;
  //Search Functionality
  column.dataset.search = `${restaurant.name} ${restaurant.category} ${restaurant.area}`.toLowerCase();

  column.innerHTML = `
    <article class="card h-100">
      <div class="card-body d-flex flex-column">
        <h3 class="h5 card-title">${restaurant.name}</h3>
        <p class="mb-1">${restaurant.category} &middot; ${restaurant.area}</p>
        <p><span class="badge ${badgeClass}">${status}</span></p>
        <p class="card-text">${restaurant.description}</p>
        <button class="btn btn-outline-primary mt-auto view-restaurant"
                data-restaurant-id="${restaurant.id}"
                data-bs-toggle="modal" data-bs-target="#restaurantModal">
          View details
        </button>
      </div>
    </article>`;

  return column;
}

// DOM SELECTION 
const featuredList = document.querySelector("#featured-list");
const restaurantList = document.querySelector("#restaurant-list");
const summary = document.querySelector("#featured-summary") || document.querySelector("#restaurant-summary");
const noResults = document.querySelector("#no-results");

// RENDER: home page shows only featured restaurants
if (featuredList) {
  for (const restaurant of restaurants) {
    if (restaurant.featured) {
      featuredList.appendChild(createRestaurantCard(restaurant));
    }
  }
}

// RENDER: restaurants page shows all of them
if (restaurantList) {
  for (const restaurant of restaurants) {
    restaurantList.appendChild(createRestaurantCard(restaurant));
  }
}

// Select the cards after they have been created
const restaurantItems = document.querySelectorAll(".restaurant-item");

let selectedCategory = "all";
let searchText = "";

// FUNCTION 3: shows only the cards that match both the category and the search text
function updateVisibleRestaurants() {
  let shown = 0;

  for (const item of restaurantItems) {
    const matchesCategory = selectedCategory === "all" || item.dataset.category === selectedCategory;
    const matchesSearch = item.dataset.search.includes(searchText);

    if (matchesCategory && matchesSearch) {
      item.classList.remove("d-none");
      shown++;
    } else {
      item.classList.add("d-none");
    }
  }

  if (summary) {
    summary.textContent = `${shown} ${shown === 1 ? "restaurant" : "restaurants"} shown.`;
  }
  if (noResults) {
    noResults.classList.toggle("d-none", shown > 0);
  }

  return shown;
}

updateVisibleRestaurants();

// EVENTS: category filter buttons 
const filterButtons = document.querySelectorAll(".filter-button");

for (const button of filterButtons) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.filter;

    for (const other of filterButtons) {
      other.classList.remove("active");
    }
    button.classList.add("active");

    updateVisibleRestaurants();
  });
}

// BOOTSTRAP MODAL: i filled it with the clicked restaurant's data
const detailButtons = document.querySelectorAll(".view-restaurant");

for (const button of detailButtons) {
  button.addEventListener("click", function () {
    const id = Number(button.dataset.restaurantId);
    const restaurant = restaurants.find(function (r) {
      return r.id === id;
    });

    document.querySelector("#restaurantModalLabel").textContent = restaurant.name;
    document.querySelector("#modal-description").textContent = restaurant.description;
    document.querySelector("#modal-area").textContent = `Area: ${restaurant.area}`;
    document.querySelector("#modal-rating").textContent = `Rating: ${restaurant.rating} out of 5`;
    document.querySelector("#modal-status").textContent = getStatusMessage(restaurant.open);
    document.querySelector("#reserve-link").href = `reserve.html?restaurant=${restaurant.id}`;
  });
}

// jQUERY: live search and clear button
if (window.jQuery) {
  $("#search").on("input", function () {
    searchText = $(this).val().trim().toLowerCase();
    updateVisibleRestaurants();
  });

  $("#clear-search").on("click", function () {
    $("#search").val("").trigger("input").trigger("focus");
  });
}