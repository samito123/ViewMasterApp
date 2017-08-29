<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha= $angular_http_params["senha"];
  $banco= $angular_http_params["banco"];
  $foto= $angular_http_params["foto"];
 
  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;
    $sql;
    
    $foto = substr(explode(";",$foto)[1], 7);

    $nomeFoto = 'oi'.date('Y-m-d H:i:s');

    file_put_contents('../pacientesImg/'.$nomeFoto.'.png', base64_decode($foto));
    

    

  } catch (Exception $e) {
     echo $e->getMessaage();
     
  } catch (InvalidArgumentException $e) {
     echo $e->getMessage();
     
  } catch (RangeException $e) {
     echo $e->getMessage();
    
  } catch (Exception $e) {
     echo $e->getMessage();
     
  }
?>
