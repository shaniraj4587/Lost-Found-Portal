<?php
header("Content-Type: application/json");
include "config.php";

$response = ["status" => "error", "message" => "An error occurred."];

try {
    $query = $conn->prepare("SELECT * FROM found_items ORDER BY date_found DESC");
    $query->execute();
    $result = $query->get_result();

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = [
            "id" => $row["found_id"],
            "username" => $row["username"],
            "item_name" => $row["item_name"],
            "description" => $row["description"],
            "location" => $row["location"],
            "date_lost" => $row["date_found"],
            "contact_number" => $row["contact_number"],
            "image1" => $row["image1"] ? base64_encode($row["image1"]) : null,
            "image2" => $row["image2"] ? base64_encode($row["image2"]) : null,
            "image3" => $row["image3"] ? base64_encode($row["image3"]) : null,
        ];
    }

    $response = ["status" => "success", "items" => $items];
} catch (Exception $e) {
    $response['message'] = "Server error: " . $e->getMessage();
}

echo json_encode($response);
?>
