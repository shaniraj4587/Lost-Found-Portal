document.getElementById('closeBtnofeditprofile').addEventListener('click', function () {
    document.getElementById('fatherofeditprofile').style.display = 'none';
});
// functoinality to open form
function openereditprofile() {
    document.getElementById('fatherofeditprofile').style.display = 'block';
    loadAndEditUserProfile();
}


document.getElementById('editForm').addEventListener('click', () => {
    document.getElementById('fatherofeditprofile').style.display = 'none';
});



function loadAndEditUserProfile() {
    const profilePic = document.getElementById("profile-pic");
    const profilePicInput = document.getElementById("profile-pic-input");
    const usernameInput = document.getElementById("username-input");
    const roleInput = document.getElementById("role-input");
    const rollnoInput = document.getElementById("rollno-input");
    const contactInput = document.getElementById("contact-input");
    const oldPasswordInput = document.getElementById("old-password-input");
    const newPasswordInput = document.getElementById("new-password-input");
    const confirmPasswordInput = document.getElementById("confirm-password-input");
    const saveButton = document.getElementById("saveBtnofeditprofile");

    const username = localStorage.getItem("username");

    if (!username) {
        alert("Please sign in first.");
        window.location.href = "signin.html"; // Redirect to sign-in page
        return;
    }

    // Fetch user details from the server
    fetch("./php/fetch_user_details.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                const user = data.user;
                profilePic.src = `data:image/jpeg;base64,${user.profile_pic}`;
                usernameInput.placeholder = `${user.first_name} ${user.last_name}`;
                roleInput.placeholder = user.role;
                rollnoInput.placeholder = user.username; // RollNo./Emp ID is readonly
                contactInput.placeholder = user.mobile;
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to fetch user details. Please try again later.");
        });

    // Save updated details
    saveButton.addEventListener("click", () => {
        const newUsername = usernameInput.value.trim() || usernameInput.placeholder;
        const newRole = roleInput.value.trim() || roleInput.placeholder;
        const newContact = contactInput.value.trim() || contactInput.placeholder;
        const oldPassword = oldPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (newPassword && newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("new_username", newUsername);
        formData.append("new_role", newRole);
        formData.append("new_contact", newContact);
        formData.append("old_password", oldPassword);
        formData.append("new_password", newPassword);
        if (profilePicInput.files[0]) {
            formData.append("profile_pic", profilePicInput.files[0]); // Add profile picture file if changed
        }

        fetch("./php/update_user_details.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    alert("Details updated successfully!");
                    document.getElementById('fatherofeditprofile').style.display = 'none';
                    window.location.reload(); // Reload page to reflect changes
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to update details. Please try again later.");
                document.getElementById('fatherofeditprofile').style.display = 'none';
            });
    });
}

