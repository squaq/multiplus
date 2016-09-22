<?php

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $nome  = $request->nome;
    $email  = $request->email;
    $msg  = $request->msg;
    
    $quebra_linha = "\n";
    $emailsender = "joao@multiplosinvestimentos.com.br";
    $nomeremetente = "Múltiplos";
    $emaildestinarario = "joao@multiplosinvestimentos.com.br";
    $comcopia = "";
    $comcopiaoculta = "";
    $assunto = "Email contato Múltiplos";
    $mensagemHTML = "
    <html>
    <head>
    <title>Contato Site</title>
    </head>
    <body>

    <p><span><b>Nome : </b></span>" . $nome . "</p>
    <p><span><b>Email : </b></span>" . $email . "</p>

    <p><b>Mensagem:</b></span>
    <p>" . $msg . "</p>
    </body>
    </html>";


    $headers = "MIME-version 1.1" . $quebra_linha;
    $headers .= "Content-type: text/html; charset=utf-8" . $quebra_linha;
    $headers .= "From: " . $emailsender . $quebra_linha;
    $headers .= "Return-Path: ".$emailsender . $quebra_linha;
    $headers .= "Reply-To: " . $emailsender . $quebra_linha;


    if(mail($emaildestinatario, $assunto, $mensagemHTML, $headers ,"-r" . $emailsender)){
       echo "Mensagem enviada com sucesso!" .  $nome . "   " .  $email . "  lol";
    }else{echo "Merda deu! " .  $nome . "   " .  $email . "  lol";}


//    print "Mensagem enviada com sucesso!";

?>