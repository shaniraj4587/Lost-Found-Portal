<?php
header('Content-Type: application/json');
include 'config.php';

// Debugging: Log incoming data
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("POST Data: " . print_r($_POST, true));
error_log("FILES Data: " . print_r($_FILES, true));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($_POST['first_name'], $_POST['last_name'], $_POST['role'], 
              $_POST['username'], $_POST['mobile'], $_POST['password']) && 
        isset($_FILES['profile_pic'])
    ) {
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $role = $_POST['role'];
        $username = $_POST['username'];
        $mobile = $_POST['mobile'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

        // Check if the username already exists
        $check_stmt = $conn->prepare("SELECT username FROM userdata WHERE username = ?");
        $check_stmt->bind_param("s", $username);
        $check_stmt->execute();
        $check_stmt->store_result();

        if ($check_stmt->num_rows > 0) {
            echo json_encode(["status" => "error", "message" => "User with this username already exists."]);
            $check_stmt->close();
            $conn->close();
            exit;
        }
        $check_stmt->close();

        // Read profile picture as binary
        $profile_pic = file_get_contents($_FILES['profile_pic']['tmp_name']);

        // Insert data into the database
        $stmt = $conn->prepare("INSERT INTO userdata (first_name, last_name, role, username, mobile, password, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $first_name, $last_name, $role, $username, $mobile, $password, $profile_pic);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "User registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to register user"]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
