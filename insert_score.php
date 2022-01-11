<?php
include 'connection.php';
if(!isset($_GET['id']) || !isset($_POST['score'])){
    echo json_encode(["status"=>false]);
    die;
}


$id = $_GET['id'];
$score = $_POST['score'];

$sql = "SELECT id,username,score FROM user WHERE id = '$id'";
$result = $mysqli->query($sql);

$row = $result->fetch_assoc();
if($row){
    if($row["score"]<$score){
        $updateScore = "UPDATE user SET score = '$score' WHERE id='$id'";
        $mysqli->query($updateScore);
    }
    echo json_encode(["status"=>true,"data"=>$row]);
}else{
    echo json_encode(["status"=>false,"data"=>null]);
    
}