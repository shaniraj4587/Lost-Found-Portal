<?php
header("Content-Type: application/json");
ini_set('display_errors', 0);
error_reporting(0);
include "config.php";

// Rest of the code...


$response = ["status" => "error", "message" => "An error occurred."];

try {
    $lost_id = $_POST['lost_id'] ?? null;

    if (!$lost_id) {
        $response['message'] = "Lost ID is required.";
        echo json_encode($response);
        exit;
    }

    $query = $conn->prepare("DELETE FROM lost_items WHERE lost_id = ?");
    $query->bind_param("i", $lost_id);

    if ($query->execute()) {
        $response = ["status" => "success", "message" => "Item deleted successfully."];
    } else {
        $response['message'] = "Failed to delete the item.";
    }
} catch (Exception $e) {
    $response['message'] = "Server error: " . $e->getMessage();
}

echo json_encode($response);
?>
