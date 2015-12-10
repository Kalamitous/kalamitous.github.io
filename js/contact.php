header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

<?php

$name = $_POST["name"];
$email = $_POST["email"];

mail($email, $name, "Test.");

?>
