// HTML structure to add
const htmlContentofsigninsignup = `<div id="fatherofsignin">
        <div id="signin-signup" onclick="removeSigninSignupFromBody()">
            
            <div id="signInModal" class="modal" onclick="(event => event.stopPropagation())(event)">
                <div class="modal-content">
                    <button class="close-btn" onclick="removeSigninSignupFromBody()">&times;</button>
                    <h2>Sign in</h2>
                    <label>Enter your Rollno./emp id</label>
                    <input type="text" id="signin-username" placeholder="Enter your Rollno./emp id">
                    <label>Enter Password</label>
                    <input type="password" id="signin-password" placeholder="Enter Password">
                    <div class="button-container">
                        <button onclick="signIn()">Sign In</button>
                        <button onclick="openModal('signUpModal'); closeModal('signInModal')">Sign up</button>
                    </div>
                    <p onclick="forgetPassword()" class="link">Forget Password?</p>
                </div>
            </div>

            
            <div id="signUpModal" class="modal" onclick="(event => event.stopPropagation())(event)">
                <div class="modal-content">
                    <button class="close-btn" onclick="removeSigninSignupFromBody()">&times;</button>
                    <h2>Enter Details</h2>
                    <label>Enter your First Name</label>
                    <input type="text" id="signup-name-first" placeholder="Enter your First Name">
                    <label>Enter your Last Name</label>
                    <input type="text" id="signup-name-last" placeholder="Enter your Last Name">
                    <label>Select Your Role</label>
                    <select name="Role" id="signup-role">
                        <option value="Student">Student</option>
                        <option value="faculty">faculty</option>
                    </select>
                    <label>Enter your Rollno./emp id</label>
                    <input type="number" id="signup-username" placeholder="Enter your Rollno./emp id">
                    <label>Contact no.</label>
                    <input type="number" id="signup-mobile" placeholder="Contact no.">
                    <label>Select Profile picture</label>
                    <input type="file" id="signup-profile-pic" accept="image/*" />
                    <label>Enter Password</label>
                    <input type="password" id="signup-password" placeholder="Enter Password">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password">
                    <button onclick="signUp()">Sign up</button>
                    <p class="link" onclick="openModal('signInModal'); closeModal('signUpModal')">Already have an A/c?
                    </p>
                </div>
            </div>
        </div>
       
    </div>
`;

// Function to add the HTML to the body
function addSigninSignupToBody() {

    // Check if the element already exists
    if (!document.getElementById('fatherofsignin')) {
        document.body.insertAdjacentHTML('beforeend', htmlContentofsigninsignup);
        console.log('HTML added to the body');
    } else {
        console.log('HTML already exists in the body');
    }
    openerSignIn();
}

function openerSignIn() {
    document.getElementById('fatherofsignin').style.display = 'block';
    openModal('signInModal');
    scrollToTop();
}
// Function to remove the HTML from the body
function removeSigninSignupFromBody() {
    closeModal('fatherofsignin');
    setTimeout(() => {
        const elementToRemove = document.getElementById('fatherofsignin');
        if (elementToRemove) {
            elementToRemove.remove();
            console.log('HTML removed from the body');
        } else {
            console.log('HTML does not exist in the body');
        }
    }, 2000);
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


function scrollToTop() {
    // Scroll to top logic
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}




function signUp() {
    const firstName = document.getElementById("signup-name-first").value.trim();
    const lastName = document.getElementById("signup-name-last").value.trim();
    const role = document.getElementById("signup-role").value.trim();
    const username = document.getElementById("signup-username").value.trim();
    const mobile = document.getElementById("signup-mobile").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const profilePic = document.getElementById("signup-profile-pic").files[0];

    if (!firstName || !lastName || !role || !username || !mobile || !password || !profilePic) {
        alert("All fields are required!");
        return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("role", role);
    formData.append("username", username);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("profile_pic", profilePic);

    fetch("signup.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                alert("Signup successful!");
                // Redirect or perform other actions
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        });
}


function signIn() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    fetch('./php/signin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                // Store login status and username in localStorage
                localStorage.setItem("loggedin", true);
                localStorage.setItem("username", username);


                // Update the button to show "Signout"
                const button = document.getElementById("header-signinsignout-button");
                button.textContent = "Sign out";
                location.reload();

                // Attach the signout functionality
                button.onclick = () => {
                    localStorage.clear(); // Clear localStorage
                    button.textContent = "Sign in"; // Reset button content
                    button.onclick = () => {
                        addSigninSignupToBody(); // Open signin popup
                    };
                    alert("You have successfully signed out.");
                    location.reload();
                };

                alert(data.message); // Notify user
                removeSigninSignupFromBody();
            } else {
                alert(data.message); // Show error message
            }
        })
        .catch(error => console.error("Error:", error));
}
// Initialize the header button functionality
function initializeHeaderButton() {
    const button = document.getElementById("header-signinsignout-button");

    if (!button) {
        console.error("Button with ID 'header-signinsignout-button' not found in the DOM.");
        return; // Exit if the button doesn't exist
    }

    if (localStorage.getItem("loggedin")) {
        // If logged in, show "Signout" and attach functionality
        button.textContent = "Sign out";
        button.onclick = () => {
            localStorage.clear();
            button.textContent = "Sign in";
            button.onclick = () => {
                addSigninSignupToBody(); // Open signin popup
            };
            alert("You have successfully signed out.");
            location.reload();
        };
    } else {
        // If not logged in, show "Sign in" and attach functionality
        button.textContent = "Sign in";
        button.onclick = () => {
            addSigninSignupToBody(); // Open signin popup
        };
    }
}

// Ensure this function runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeHeaderButton);

function forgetPassword() {
    // Your code to handle password reset goes here.
    // Example using an alert:
    alert("Password reset functionality will be implemented soon.");

    // Or, using console.log for debugging:
    console.log("Forget Password button clicked!");
}

