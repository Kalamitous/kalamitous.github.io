<?php
header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);

 $to = "xkalamitous@gmail.com";
 $subject = "http://kalamitous.github.io/"
 $email = $_REQUEST['email'];
 $message = $_REQUEST['message'];
 $headers = "From: $email";
 $sent = mail($to, $subject, $message, $headers);
?>
