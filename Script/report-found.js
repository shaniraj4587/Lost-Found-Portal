// functoinality to open form
function opener() {
    document.getElementById('fatherofoverlay').style.display = 'block';
}
// Close button functionality
document.getElementById('closeBtnoverlay').addEventListener('click', () => {
    document.getElementById('fatherofoverlay').style.display = 'none';
});
document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('fatherofoverlay').style.display = 'none';
});

function reportFoundItem() {
    const formData = new FormData();
    formData.append("username", localStorage.getItem("username")); // Link to logged-in user
    formData.append("item_name", document.getElementById("found-item-name").value.trim());
    formData.append("description", document.getElementById("found-description").value.trim());
    formData.append("location", document.getElementById("found-location").value.trim());
    formData.append("date_found", document.getElementById("found-date").value.trim());
    formData.append("contact_number", document.getElementById("found-contact-number").value.trim());

    const itemImage1 = document.getElementById("found-item-image1").files[0];
    const itemImage2 = document.getElementById("found-item-image2").files[0];
    const itemImage3 = document.getElementById("found-item-image3").files[0];
    if (itemImage1) formData.append("image1", itemImage1);
    if (itemImage2) formData.append("image2", itemImage2);
    if (itemImage3) formData.append("image3", itemImage3);

    fetch("./php/report_found_item.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                alert(`Found item reported successfully! Your Found ID is ${data.found_id}`);
                document.getElementById('fatherofoverlay').style.display = 'none';
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("A network or server error occurred. Please try again later.");
        });
}
