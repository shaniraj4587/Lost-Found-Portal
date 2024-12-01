// Example data for search (could be replaced with dynamic data)
const items = [
    "Lost Wallet",
    "Black Umbrella",
    "Blue Water Bottle",
    "Red Notebook",
    "Smartphone Charger",
    "Earphones",
    "Grey Jacket"
];

function searchSuggestions() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("results");

    // Filter matching results
    const filteredItems = items.filter(item => item.toLowerCase().includes(input));

    // Display results
    if (input.length > 0 && filteredItems.length > 0) {
        resultsContainer.innerHTML = `<ul>${filteredItems
            .map(item => `<li>${item}</li>`)
            .join("")}</ul>`;
        resultsContainer.style.display = "block";
    } else if (input.length > 0) {
        resultsContainer.innerHTML = "<p>No suggestions found.</p>";
        resultsContainer.style.display = "block";
    } else {
        resultsContainer.style.display = "none"; // Hide suggestions when input is empty
    }
}

function clearSearch() {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = ""; // Clear the input
    document.getElementById("results").style.display = "none"; // Hide results
}
