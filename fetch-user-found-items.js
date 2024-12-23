document.addEventListener("DOMContentLoaded", () => {
    fetchUserFoundItems();
});
function fetchUserFoundItems() {
    const username = localStorage.getItem("username");
    if (!username) {
        alert("No logged-in user found. Please log in first.");
        return;
    }

    const formData = new FormData();
    formData.append("username", username);

    fetch("./php/fetch_user_found_items.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                const itemsContainer = document.getElementById("found-items-container");
                itemsContainer.innerHTML = ""; // Clear existing items

                data.items.forEach((item) => {
                    const itemCard = document.createElement("div");
                    itemCard.className = "item-card";

                    const itemImage = document.createElement("img");
                    itemImage.src = item.image1
                        ? `data:image/jpeg;base64,${item.image1}`
                        : "placeholder.jpg";
                    itemImage.alt = item.item_name;
                    itemImage.className = "item-img";

                    const itemDetails = document.createElement("div");
                    itemDetails.className = "item-details";

                    itemDetails.innerHTML = `
                        <h3>${item.item_name}</h3>
                        <p>${item.description || "No description available."}</p>
                        <p>From ${item.location}</p>
                        <p>${new Date(item.date_found).toDateString()}</p>
                        <p><strong>Found ID:</strong> ${item.found_id}</p>
                    `;

                    const deleteIcon = document.createElement("span");
                    deleteIcon.innerHTML = "🗑️ Delete This Item"; // Unicode trash icon
                    deleteIcon.className = "delete-icon";
                    deleteIcon.title = "Delete this item";
                    deleteIcon.onclick = () => deleteFoundItem(item.found_id);

                    itemDetails.appendChild(deleteIcon);

                    itemCard.appendChild(itemImage);
                    itemCard.appendChild(itemDetails);

                    itemsContainer.appendChild(itemCard);
                });
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("A network or server error occurred. Please try again later.");
        });
}



function deleteFoundItem(foundId) {
    if (!confirm("Are you sure you want to delete this item?")) {
        return;
    }

    const formData = new FormData();
    formData.append("found_id", foundId);

    fetch("./php/delete_found_item.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                alert(data.message);
                fetchUserFoundItems(); // Refresh the item list after deletion
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("A network or server error occurred. Please try again later.");
        });
}
