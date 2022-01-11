<?php

header("Access-Control-Allow-Origin: *");
$mysqli = new mysqli("localhost","root","","wire_game");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
?>