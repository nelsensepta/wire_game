<?php
include 'connection.php';

$sql = "SELECT id,username,score FROM user ORDER BY score DESC LIMIT 10";
$result = $mysqli->query($sql);
$data = [];
while($row = $result->fetch_assoc()){
    array_push($data,$row);
}
if(count($data)>0){
    echo json_encode(["status"=>true,"data"=>$data]);
}else{
    echo json_encode(["status"=>false,"data"=>null]);
    
}