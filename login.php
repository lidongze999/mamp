//
<?php
//登录
if(!isset($_POST['submit'])){
    exit('非法访问!');
}
$username = htmlspecialchars($_POST['username']);
$password = MD5($_POST['password']);

//包含数据库连接文件
include('conn.php');
//检测用户名及密码是否正确
$check_query = mysql_query("select uid from user where username='$username' and password='$password' limit 1");
if($result = mysql_fetch_array($check_query)){
    //登录成功
    $_SESSION['username'] = $username;
    $_SESSION['userid'] = $result['uid'];
    $url='首页.html';
	echo "登录成功,浏览器将自动跳转到首页<meta http-equiv=\"refresh\" content=\"2;url=$url\">"; 
	echo $username;
		
    exit;
} else {
	echo mysql_error();
    exit('登录失败！点击此处 <a href="javascript:history.back(-1);">返回</a> 重试');
}
?>
	