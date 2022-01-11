<?php
include 'connection.php';

if(!isset($_POST['username']) || !isset($_POST['password'])){
    echo json_encode(["status"=>false]);
    die;
}


$username = $_POST['username'];
$password = $_POST['password'];

// cek username

$cek_username = mysqli_query($mysqli, "SELECT * FROM user WHERE username = '$username'");
if( mysqli_num_rows($cek_username) === 1 ) {
   
    // cek password
    $row = mysqli_fetch_assoc($cek_username);
    if( password_verify($password, $row["password"]) ) {
        // set session
        // $_SESSION["login"] = true;
        echo json_encode(["status"=>true,"id"=>$row['id']]);

        // header("Location: game.php"); 
    } else{
        echo json_encode(["status"=>false, "message"=> "Username / Password salah / Anda Belum Punya Akun ?"]);
    }
}else{
    echo json_encode(["status"=>false, "message"=> "Username / Password salah / Anda Belum Punya Akun ?"]);
}
// $sql = "SELECT id FROM user WHERE username = '$name' AND password = '$password'";
// $result = $mysqli->query($sql);

// $row = $result->fetch_assoc();


// include 'connection.php';

// if(!isset($_POST['name']) || !isset($_POST['password'])){
//     echo json_encode(["status"=>false]);
//     die;
// }

// $name = $_POST['name'];
// $password = $_POST['password'];

// $sql = "SELECT id FROM user WHERE name = '$name' AND password = '$password'";
// $result = $mysqli->query($sql);

// $row = $result->fetch_assoc();
// if($row){
//     echo json_encode(["status"=>true,"id"=>$row['id']]);
// }else{
//     $sql = "INSERT INTO user(name,password) VALUES('$name','$password')";
//     $result = $mysqli->query($sql);
//     if($result){
//         echo json_encode(["status"=>true,"id"=>$mysqli->insert_id]);
//     }
// }
// else {
//     $sql = "INSERT INTO user VALUES ('', '$username', '$password', '$score', '$email')";
//         $result = $mysqli->query($sql);
//         if($result){
//             echo json_encode(["status"=>true,"id"=>$mysqli->insert_id]);
//         }

// }