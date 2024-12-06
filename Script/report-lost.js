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



function reportLostItem() {
    const formData = new FormData();
    formData.append("username", localStorage.getItem("username")); // Link to logged-in user
    formData.append("item_name", document.getElementById("item-name").value.trim());
    formData.append("description", document.getElementById("description").value.trim());
    formData.append("location", document.getElementById("location").value.trim());
    formData.append("date_lost", document.getElementById("date-lost").value.trim());
    formData.append("contact_number", document.getElementById("contact-number").value.trim());

    const itemImage1 = document.getElementById("item-image1").files[0];
    const itemImage2 = document.getElementById("item-image2").files[0];
    const itemImage3 = document.getElementById("item-image3").files[0];
    if (itemImage1) formData.append("image1", itemImage1);
    if (itemImage2) formData.append("image2", itemImage2);
    if (itemImage3) formData.append("image3", itemImage3);

    fetch("./php/report_lost_item.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                alert(`Lost item reported successfully! Your Lost ID is ${data.lost_id}`);
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
