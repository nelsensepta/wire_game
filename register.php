<?php 
require 'connection.php';
$username = ($_POST["username"]);
$password = ($_POST["password"]);
$email = ($_POST["email"]);
 // cek username sudah pernah ada atau belum
$cek_username = mysqli_query($mysqli, "SELECT * FROM user WHERE username = '$username'");
if( mysqli_num_rows($cek_username) === 1 ) {
  $cek_email = mysqli_query($mysqli, "SELECT * FROM user WHERE email = '$email'");
  if( mysqli_num_rows($cek_email) === 1 ) {
    $password = password_hash($password, PASSWORD_DEFAULT);
    $score = 0;
    // insert ke DB
    $sql = "INSERT INTO user VALUES ('', '$username', '$password', '$score', '$email')";
    mysqli_query($mysqli, $sql);
    $row = mysqli_fetch_assoc($cek_username);
      if($row) {
        echo json_encode(["status"=>true,"id"=>$row['id']]);
      } else {
        echo json_encode(["status"=>false, "message" => "Gagal Membuat akun"]);
      }
    } else {
    echo json_encode(["status"=>false, "message" => "Email Sudah Ada, Silahkan Ganti Yang Lain"]); 
    }
} else {
echo json_encode(["status"=>false, "message" => "Username Sudah Ada, Silahkan Ganti Yang Lain"]);
}

  
 

 
 
  
?>