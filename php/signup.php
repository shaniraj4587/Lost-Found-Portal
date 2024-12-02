<?php
header('Content-Type: application/json'); // Ensure JSON response
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Extract user details from the form
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $role = $_POST['role'];
    $username = $_POST['username'];
    $mobile = $_POST['mobile'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // Handle profile picture upload
    $profile_pic = null;
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] == UPLOAD_ERR_OK) {
        $upload_dir = "../uploadsprofilepics/"; // Directory to save profile pictures
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true); // Create the directory if it doesn't exist
        }

        // Rename the file using the username
        $file_extension = pathinfo($_FILES['profile_pic']['name'], PATHINFO_EXTENSION); // Get file extension
        $new_file_name = $username . "." . $file_extension; // Rename to username.extension
        $file_path = $upload_dir . $new_file_name;

        if (move_uploaded_file($_FILES['profile_pic']['tmp_name'], $file_path)) {
            $profile_pic = $file_path; // Save the renamed file path in the database
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to upload profile picture"]);
            exit;
        }
    }

    // SQL to insert user data
    $stmt = $conn->prepare("INSERT INTO userdata (first_name, last_name, role, username, password, mobile, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $first_name, $last_name, $role, $username, $password, $mobile, $profile_pic);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Signup successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
