<?php

$fname= $_POST['firstname'];
$lname= $_POST['lastname'];

$email= $_POST['email'];

//echo "Hello $fname $lname email id received is: $email";

$errors = array();  // array to hold validation errors
$data = array();        // array to pass back data

// validate the variables
if (empty($_POST['firstname']))
  $errors['firstname'] = 'firstName is required.';

if (empty($_POST['lastname']))
  $errors['lastname'] = 'lastname is required.';

if (empty($_POST['email']))
  $errors['email'] = 'Email is required.';

// return a response ==============

// response if there are errors
if ( ! empty($errors)) {
header($_SERVER['SERVER_PROTOCOL'] . ' 422 SOme error', true, 422);
  // if there are items in our errors array, return those errors
  $data['success'] = false;
  $data['errors']  = $errors;
} else {

  // if there are no errors, return a message
  $data['success'] = true;
  $data['message'] = 'Successfully received!';
  $data['firstname'] = $fname;
  $data['lastname'] = $lname;
  $data['email'] = $email;
}

// return all our data to an AJAX ca
//var_dump($data);

echo json_encode($data);

?>
