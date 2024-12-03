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
    const userfirstnameInput = document.getElementById("first-name-input");
    const userlastnameInput = document.getElementById("last-name-input");
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
        addSigninSignupToBody(); // Redirect to sign-in page
        document.getElementById('fatherofeditprofile').style.display = 'none'
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
                userfirstnameInput.placeholder = user.first_name;
                userlastnameInput.placeholder = user.last_name;
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
}

function saveUserDetails() {
    const newPassword = document.getElementById("new-password-input").value.trim();
    const confirmPassword = document.getElementById("confirm-password-input").value.trim();
    const formData = new FormData();
    formData.append("username", localStorage.getItem("username"));
    formData.append("new_first_name", document.getElementById("first-name-input").value.trim());
    formData.append("new_last_name", document.getElementById("last-name-input").value.trim());
    formData.append("new_role", document.getElementById("role-input").value.trim());
    formData.append("new_contact", document.getElementById("contact-input").value.trim());
    formData.append("old_password", document.getElementById("old-password-input").value.trim());
    formData.append("new_password", document.getElementById("new-password-input").value.trim());
    const profilePicInput = document.getElementById("profile-pic-input");
    if (profilePicInput.files[0]) {
        formData.append("profile_pic", profilePicInput.files[0]);
    }
    if (newPassword && newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
    }

    fetch("./php/update_user_details.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                alert("Details updated successfully!");

                // Refresh profile picture
                const profilePic = document.getElementById("profile-pic");
                profilePic.src = `${profilePic.src.split("?")[0]}?t=${new Date().getTime()}`;
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Fetch Error:", error);
            alert("A network or server error occurred. Please try again later.");
        });
}
