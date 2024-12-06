<?php
header("Content-Type: application/json");
include "config.php";

$response = ["status" => "error", "message" => "An error occurred."];

try {
    $username = $_POST['username'] ?? null;
    $item_name = $_POST['item_name'] ?? null;
    $description = $_POST['description'] ?? null;
    $location = $_POST['location'] ?? null;
    $date_lost = $_POST['date_lost'] ?? null;
    $contact_number = $_POST['contact_number'] ?? null;
    $image1 = isset($_FILES['image1']['tmp_name']) ? file_get_contents($_FILES['image1']['tmp_name']) : null;
    $image2 = isset($_FILES['image2']['tmp_name']) ? file_get_contents($_FILES['image2']['tmp_name']) : null;
    $image3 = isset($_FILES['image3']['tmp_name']) ? file_get_contents($_FILES['image3']['tmp_name']) : null;

    if (!$username || !$item_name || !$location || !$date_lost || !$contact_number) {
        $response['message'] = "All required fields must be filled.";
        echo json_encode($response);
        exit;
    }

    $query = $conn->prepare(
        "INSERT INTO lost_items (username, item_name, description, location, date_lost, contact_number, image1, image2, image3) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $query->bind_param(
        "sssssssss",
        $username,
        $item_name,
        $description,
        $location,
        $date_lost,
        $contact_number,
        $image1,
        $image2,
        $image3
    );

    if ($query->execute()) {
        $response = ["status" => "success", "message" => "Lost item reported successfully.", "lost_id" => $conn->insert_id];
    } else {
        $response['message'] = "Failed to report the lost item.";
    }
} catch (Exception $e) {
    $response['message'] = "Server error: " . $e->getMessage();
}

echo json_encode($response);
?>
