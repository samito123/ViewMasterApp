<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha= $angular_http_params["senha"];
  $banco= $angular_http_params["banco"];
  $foto= $angular_http_params["foto"];
  $paciente= json_decode($angular_http_params["paciente"], TRUE);
 
  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;

    $caminhoFotoFinal = $paciente['caminhoFoto'].$paciente['nomeFotoFinal'];

    $sql1="update tb_pacientes
    set imagem_paciente= '".$caminhoFotoFinal."', 
    nome= '".$paciente['nome']."', sobrenome= '".$paciente['sobrenome']."',
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
      try{
        if($paciente['imagemPacienteBase64'] !== "0" && $paciente['nomeFotoFinal'] !== "perfil.png"){
          $paciente['imagemPacienteBase64'] = 
          substr(explode(";",$paciente['imagemPacienteBase64'])[1], 7);
          file_put_contents('../pacientesImg/'.$paciente['nomeFotoFinal'], 
          base64_decode($paciente['imagemPacienteBase64'])); 
        }

        try{
          if($paciente['nomeFoto'] !== "perfil.png"){
            unlink("../pacientesImg/".$paciente['nomeFoto']);
          }
        } catch (Exception $e){
          
        }

        mysqli_commit($conexao);
        echo 'Paciente editado com sucesso!';
      } catch (Exception $e){
        echo mysqli_error($conexao);
        mysqli_rollback($conexao);
      }
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
