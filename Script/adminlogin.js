function signInOfAdmin() {
    const username = document.getElementById("adminusername").value.trim();
    const password = document.getElementById("adminpassword").value.trim();

    if (username === "admin" && password === "admin") {
        alert("Login successful!");
        // Logic to close the modal or redirect the user
    } else {
        alert("Invalid username or password!");
    }
}
