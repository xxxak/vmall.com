<?php
include('./library/conn.php');
// 注册的逻辑
// 1. 接收用户传递的信息
// 2. 连接数据库
// 3. 查询数据库中的数据
//    用户名是否存在 如果存在 注册失败 返回注册页面
//    用户名不存在  注册成功 将数据写入数据库 返回首页

// 1. 接收数据
$username = $_REQUEST['username'];
$password = $_REQUEST['password'];
$email = $_REQUEST['email'];
$phone = $_REQUEST['phone'];
// echo $username;
// 3.查询用户名是否存在
$sql = "select * from user where username='$username'";

// 执行查询操作
$res = $mysqli->query($sql);

// 判断用户名存在的情况
if($res->num_rows>0){
    echo 'false';
  
   // echo '<script>location.href="../eg02.reg.html";</script>';
    $mysqli->close(); // 断开连接
    die();
}


// 用户名不存在的情况 

// 插入数据
$insert = "insert into `user` (`username`,`password`,`email`,`phone`) values ('$username','$password','$email','$phone')";

// 执行插入操作
$result = $mysqli->query($insert); // 返回布尔值

$mysqli->close();

if($result){
   echo 'ture';
}

?>