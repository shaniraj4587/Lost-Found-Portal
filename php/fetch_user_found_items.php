<?php
header("Content-Type: application/json");
include "config.php";

$response = ["status" => "error", "message" => "An error occurred."];

try {
    $username = $_POST['username'] ?? null;

    if (!$username) {
        $response['message'] = "Username is required.";
        echo json_encode($response);
        exit;
    }

    $query = $conn->prepare("SELECT * FROM found_items WHERE username = ? ORDER BY date_found DESC");
    $query->bind_param("s", $username);
    $query->execute();
    $result = $query->get_result();

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = [
            "found_id" => $row["found_id"],
            "item_name" => $row["item_name"],
            "description" => $row["description"],
            "location" => $row["location"],
            "date_found" => $row["date_found"],
            "contact_number" => $row["contact_number"],
            "image1" => $row["image1"] ? base64_encode($row["image1"]) : null,
        ];
    }

    $response = ["status" => "success", "items" => $items];
} catch (Exception $e) {
    $response['message'] = "Server error: " . $e->getMessage();
}

echo json_encode($response);
?>
