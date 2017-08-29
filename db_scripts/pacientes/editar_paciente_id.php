<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha= $angular_http_params["senha"];
  $banco= $angular_http_params["banco"];
  $paciente= json_decode($angular_http_params["paciente"], TRUE);
 
  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;

   
    $sql1="update tb_pacientes
    set nome= '".$paciente['nome']."', sobrenome= '".$paciente['sobrenome']."',
    telefone= '".$paciente['telefone']."', 
    data_de_nascimento= '".$paciente['dataDeNascimentoBanco']."',
    email= '".$paciente['email']."'
    where id= ".$paciente['id'];
    if (!mysqli_query($conexao, $sql1)) $erro_query++;

    $sql2="update tb_enderecos
    set rua= '".$paciente['rua']."', bairro= '".$paciente['bairro']."',
    numero= '".$paciente['numero']."', 
    complemento= '".$paciente['complemento']."',
    cep= '".$paciente['cep']."', cidade= '".$paciente['cidade']."',
    estado= '".$paciente['estado']."'
    where fk_paciente= ".$paciente['id'];
    if (!mysqli_query($conexao, $sql2)) $erro_query++;

    if ($erro_query == 0){
      mysqli_commit($conexao);
      echo 'Paciente editado com sucesso!';
    } else {
      echo mysqli_error($conexao);
      mysqli_rollback($conexao);
    }
    mysqli_close($conexao);
  } catch (Exception $e) {
     echo $e->getMessaage();
     mysqli_close($conexao);
  } catch (InvalidArgumentException $e) {
     echo $e->getMessage();
     mysqli_close($conexao);
  } catch (RangeException $e) {
     echo $e->getMessage();
     mysqli_close($conexao);
  } catch (Exception $e) {
     echo $e->getMessage();
     mysqli_close($conexao);
  }
?>
