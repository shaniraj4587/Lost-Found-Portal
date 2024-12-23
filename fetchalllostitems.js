function fetchAllLostItems() {
    fetch("./php/fetch_all_lost_items.php")
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                const container = document.getElementById("lost-items-container");
                container.innerHTML = ""; // Clear any existing content

                data.items.forEach((item) => {
                    const card = document.createElement("div");
                    card.className = "item-card";

                    const itemImage = document.createElement("img");
                    itemImage.src = item.image1
                        ? `data:image/jpeg;base64,${item.image1}`
                        : "placeholder.jpg"; // Fallback if no image
                    itemImage.alt = item.item_name;
                    itemImage.className = "item-img";

                    const details = document.createElement("div");
                    details.className = "item-details";
                    details.innerHTML = `
                        <h3>${item.item_name}</h3>
                        <p><b>Reporter Id:</b> ${item.username}</p>
                        <p><b>Description:</b> ${item.description || "No description provided."}</p>
                        <p><b>Location:</b> ${item.location}</p>
                        <p><b>Date Lost:</b> ${new Date(item.date_lost).toDateString()}</p>
                        <p><b>Contact:</b> ${item.contact_number}</p>
                    `;

                    // Add images if more than one exists
                    const moreImages = document.createElement("div");
                    moreImages.className = "more-images";
                    [item.image2, item.image3].forEach((img, index) => {
                        if (img) {
                            const extraImage = document.createElement("img");
                            extraImage.src = `data:image/jpeg;base64,${img}`;
                            extraImage.alt = `${item.item_name} - Additional Image ${index + 2}`;
                            extraImage.className = "item-image-small";
                            moreImages.appendChild(extraImage);
                        }
                    });

                    card.appendChild(itemImage);
                    card.appendChild(details);
                    card.appendChild(moreImages);
                    container.appendChild(card);
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
