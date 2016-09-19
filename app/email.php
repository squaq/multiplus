<?php

$nome = $_GET["nome"];
$email = $_GET["email"];
$msg = $_GET["msg"];
//$to = "contato@multiplosinvestimentos.com.br";
$to = "evertonsquaq@gmail.com";
$subject = "Contato Múltiplus";

$message = "
<html>
<head>
<title>Contato Site</title>
</head>
<body>
<p>This email contains HTML Tags!</p>

<p><span><b>Nome : </b></span>" . $nome . "</p>
<p><span><b>Email : </b></span>" . $email . "</p>
<p>" . $msg . "</p>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <contato@multiplosinvestimentos.com.br>' . "\r\n";
//$headers .= 'Cc: myboss@example.com' . "\r\n";

mail($to,$subject,$message,$headers);
?>