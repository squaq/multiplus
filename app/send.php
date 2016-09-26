<?php
//    Devemos alterar a linha abaixo e colocar uma conta de email v·lida da hospedagem,
$emailsender = "joao@multiplosinvestimentos.com.br";
        
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$nome  = trim($request->nome);
$email  = trim($request->email);
$msg  = trim($request->msg);
 
/* Verifica qual È o sistema operacional do servidor para ajustar o cabeÁalho de forma correta. N„o alterar */
if(PHP_OS == "Linux") $quebra_linha = "\n"; //Se for Linux
elseif(PHP_OS == "WINNT") $quebra_linha = "\r\n"; // Se for Windows
else die("Este script nao esta preparado para funcionar com o sistema operacional de seu servidor");
 
// Passando os dados obtidos pelo formul·rio para as vari·veis abaixo
$nomeremetente     = $_POST['nomeremetente'];
$emailremetente    = trim($_POST['emailremetente']);
$emaildestinatario = "joao@multiplosinvestimentos.com.br";
$comcopia          = trim($_POST['comcopia']);
$comcopiaoculta    = trim($_POST['comcopiaoculta']);
$assunto           = $_POST['assunto'];
$mensagem          = $_POST['mensagem'];
 
 
/* Montando a mensagem a ser enviada no corpo do e-mail. */
$mensagemHTML = '<p><span><b>Nome : </b></span>'.$nome .'</p><p><span><b>Email : </b></span>'.$email . '</p><p><b>Mensagem:</b></span><p>'.$msg.'</p>';
 
 
/* Montando o cabeÁalho da mensagem */
$headers = "MIME-Version: 1.1".$quebra_linha;
$headers .= "Content-type: text/html; charset=iso-8859-1".$quebra_linha;
// Perceba que a linha acima contÈm "text/html", sem essa linha, a mensagem n„o chegar· formatada.
$headers .= "From: ".$emailsender.$quebra_linha;
$headers .= "Return-Path: " . $emailsender . $quebra_linha;
// Esses dois "if's" abaixo s„o porque o Postfix obriga que se um cabeÁalho for especificado, dever· haver um valor.
// Se n„o houver um valor, o item n„o dever· ser especificado.
if(strlen($comcopia) > 0) $headers .= "Cc: ".$comcopia.$quebra_linha;
if(strlen($comcopiaoculta) > 0) $headers .= "Bcc: ".$comcopiaoculta.$quebra_linha;
// Note que o e-mail do remetente ser· usado no campo Reply-To (Responder Para)
 
/* Enviando a mensagem */
mail($emaildestinatario, $assunto, $mensagemHTML, $headers, "-r". $emailsender);


/* Mostrando na tela as informaÁıes enviadas por e-mail */
print "Mensagem enviada com sucesso!";
?>