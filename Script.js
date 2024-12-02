document.addEventListener("DOMContentLoaded", () => {
    const userDetailsContainer = document.querySelector(".userdetail"); // Existing container for user details
    const profilePicture = document.getElementById("profile-picture-display"); // Existing img element

    if (!userDetailsContainer || !profilePicture) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    const username = localStorage.getItem("username");

    if (!username) {
        // User not logged in
        userDetailsContainer.innerHTML = "<p>Please Sign in first</p>";
        profilePicture.src = "Contents/profile.png";
        return;
    }

    // Fetch user details if logged in
    fetch("php/fetch_user_details.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                // Populate user details
                const userDetailsHTML = `
                    <span>
                        <label>Name: </label>
                        <label id="signin-name">${data.user.first_name} ${data.user.last_name}</label>
                    </span><span>
                        <label>Role: </label>
                        <label id="signin-role">${data.user.role}</label>
                    </span><span>
                        <label>Roll no./Emp id: </label>
                        <label id="signin-username">${data.user.username}</label>
                    </span><span>
                        <label>Contact: </label>
                        <label id="signin-mobile">${data.user.mobile}</label>
                    </span>
                `;
                userDetailsContainer.innerHTML = userDetailsHTML;

                // Set profile picture
                profilePicture.src = data.user.profile_pic || "Contents/profile.png";
            } else {
                alert(data.message);
                userDetailsContainer.innerHTML = "<p>Please Sign in first</p>";
                profilePicture.src = "Contents/profile.png";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            userDetailsContainer.innerHTML = "<p>Error fetching user details</p>";
            profilePicture.src = "Contents/profile.png";
        });
});
