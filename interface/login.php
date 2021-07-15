<?php
    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $password=$_REQUEST['password'];
   
    $sql = "select password from user where username='$username' and password='$password'";

    $res = $mysqli->query($sql);

    //   echo $res ;
    $mysqli->close();

   if($res->num_rows > 0){
       echo "1";
    
   }else{
    echo "0";
   }
    
 if($row)

?>