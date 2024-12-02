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
    const formData = new FormData();
    formData.append("first_name", document.getElementById("signup-name-first").value);
    formData.append("last_name", document.getElementById("signup-name-last").value);
    formData.append("role", document.getElementById("signup-role").value);
    formData.append("username", document.getElementById("signup-username").value);
    formData.append("mobile", document.getElementById("signup-mobile").value);
    formData.append("password", document.getElementById("signup-password").value);
    formData.append("profile_pic", document.getElementById("signup-profile-pic").files[0]); // File input

    fetch('./php/signup.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert(data.message);
                openModal('signInModal');
                closeModal('signUpModal');
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error:", error));
}


function signIn() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    fetch('./php/signin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            if (data.status === "success") {
                localStorage.setItem("loggedin", true);
                alert(data.message);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error:", error));

}

function forgetPassword() {
    // Your code to handle password reset goes here.
    // Example using an alert:
    alert("Password reset functionality will be implemented soon.");

    // Or, using console.log for debugging:
    console.log("Forget Password button clicked!");
}

