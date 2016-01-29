<?php

$firstname = $_GET['firstname'];

sleep(3);
header('Content-Type: application/json');
// header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);

echo json_encode(array(
    array('name' => $firstname, 'lastnem' => "lasname", 'email' => 'some@email.com'),
    array(0,2,3,4),
    array('name3' => 'some user'),
    array('name' => 'user3'),
    array('name' => 'user4'),
    array('name' => 'user5'),
    array('name' => 'user2'),
));

 ?>
