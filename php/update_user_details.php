<?php
header("Content-Type: application/json");
include "config.php";

$response = ["status" => "error", "message" => "An error occurred."];

try {
    $username = $_POST['username'] ?? null;
    $new_username = $_POST['new_username'] ?? null;
    $new_role = $_POST['new_role'] ?? null;
    $new_contact = $_POST['new_contact'] ?? null;
    $old_password = $_POST['old_password'] ?? null;
    $new_password = $_POST['new_password'] ?? null;
    $profile_pic = $_FILES['profile_pic']['tmp_name'] ?? null;

    if (!$username || !$new_username || !$new_role || !$new_contact || !$old_password) {
        $response['message'] = "Missing required fields.";
        echo json_encode($response);
        exit;
    }

    // Validate old password
    $query = $conn->prepare("SELECT password, profile_pic FROM userdata WHERE username = ?");
    $query->bind_param("s", $username);
    $query->execute();
    $result = $query->get_result();
    $user = $result->fetch_assoc();

    if (!$user || !password_verify($old_password, $user['password'])) {
        $response['message'] = "Old password is incorrect.";
        echo json_encode($response);
        exit;
    }

    // Prepare updated data
    $hashed_password = $new_password ? password_hash($new_password, PASSWORD_BCRYPT) : $user['password'];
    $profile_pic_content = $profile_pic ? file_get_contents($profile_pic) : $user['profile_pic'];

    // Update user details
    $update_query = $conn->prepare("UPDATE userdata SET first_name = ?, role = ?, mobile = ?, password = ?, profile_pic = ? WHERE username = ?");
    $update_query->bind_param("sssssb", $new_username, $new_role, $new_contact, $hashed_password, $profile_pic_content, $username);

    if ($update_query->execute()) {
        $response = ["status" => "success", "message" => "Details updated successfully."];
    } else {
        $response['message'] = "Failed to update details.";
    }
} catch (Exception $e) {
    $response['message'] = "Server error: " . $e->getMessage();
}

echo json_encode($response);
?>
