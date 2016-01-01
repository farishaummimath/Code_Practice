<?php

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
//$name = $_POST['name'];



//Print output
//echo "Hello $firstName $lastName.  </b>";
header('Content-Type: application/json');
header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
echo json_encode($_POST);
?>
