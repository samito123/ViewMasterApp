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
    
    $sql1="select id
    from tb_pacientes
    where nome = '".$paciente['nome']."' and sobrenome = '".$paciente['sobrenome']."'";

    $result = $conexao->query($sql1);
    if($result->num_rows >= 1){
      mysqli_free_result($result);
      echo "Paciente com nome e sobrenome informado já está cadastrado!";
    }else{
      mysqli_free_result($result);
      if(!$foto === 'perfil'){
        $nomeFoto = 'http://br400.teste.website/~appot240/view_master_app/pacientesImg/'.
        $paciente['nome'].date('Y-m-d H:i:s');
      }else{
        $nomeFoto = 'http://br400.teste.website/~appot240/view_master_app/pacientesImg/perfil.png';
      }
      $sql2="insert into tb_pacientes 
      (imagem_paciente, nome, sobrenome, telefone, data_de_nascimento, email)
      values ('".$nomeFoto."', '".$paciente['nome']."', '".$paciente['sobrenome']."', 
      '".$paciente['telefone']."', '".$paciente['dataDeNascimento']."', 
      '".$paciente['email']."')";
      if (!mysqli_query($conexao, $sql2)) $erro_query++;

      $fk_paciente = mysqli_insert_id($conexao); 

      $sql3="insert into tb_enderecos 
      (rua, bairro, numero, complemento, cep, cidade, estado, fk_paciente)
      values ('".$paciente['rua']."', '".$paciente['bairro']."', '".$paciente['numero']."', 
      '".$paciente['complemento']."', '".$paciente['cep']."', '".$paciente['cidade']."', 
      '".$paciente['estado']."', '$fk_paciente')";
      if (!mysqli_query($conexao, $sql3)) $erro_query++;

      if ($erro_query == 0){
        try{
          if(!$foto === 'perfil'){
            $foto = substr(explode(";",$foto)[1], 7);
            file_put_contents('../pacientesImg/'.$nomeFoto.'.png', base64_decode($foto));
          }
          mysqli_commit($conexao);
          echo "Paciente inserido com sucesso!";
        } catch (Exception $e){
          echo mysqli_error($conexao);
          mysqli_rollback($conexao);
        }
      } else {
        echo mysqli_error($conexao);
        mysqli_rollback($conexao);
      }
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
