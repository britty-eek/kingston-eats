console.log("Kingston Eats loaded.");

const restaurants = [
  { id: 1, name: "Smokey Pit Jerk", category: "Jerk", area: "New Kingston",
    rating: 4.5, open: true, featured: true,
    description: "Pimento-wood jerk chicken and pork served with festival." },
  { id: 2, name: "Golden Crust Patties", category: "International", area: "Half Way Tree",
    rating: 4.0, open: false, featured: true,
    description: "Fresh patties and coco bread baked every morning." },
  { id: 3, name: "Harbour Catch", category: "Seafood", area: "Port Royal",
    rating: 4.7, open: true, featured: true,
    description: "Fried fish, bammy and escovitch by the water." },
  { id: 4, name: "Roadside Jerk Stop", category: "Jerk", area: "Constant Spring",
    rating: 3.9, open: false, featured: false,
    description: "Late-night jerk and roast yam." },
  { id: 5, name: "Sea Breeze Grill", category: "Seafood", area: "Palisadoes",
    rating: 4.4, open: true, featured: false,
    description: "Grilled lobster and steamed fish plates." }
];

// FUNCTION 1: a condition turned into an if function
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
  column.className = "col featured-item";
  column.dataset.category = restaurant.category;

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
