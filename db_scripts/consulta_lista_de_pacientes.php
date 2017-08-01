<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha= $angular_http_params["senha"];
  $banco= $angular_http_params["banco"];
  $offset= $angular_http_params["offset"];
  $limit= $angular_http_params["limit"];

  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;
    $sql;
    if($limit == false){
      $sql="select id, imagem_paciente, nome, 
      telefone, TIMESTAMPDIFF(YEAR, data_de_nascimento, CURDATE()) as idade
      from tb_pacientes
      order by nome asc
      limit 20 offset $offset";
    }else{
      $sql="select id, imagem_paciente, nome, 
      telefone, TIMESTAMPDIFF(YEAR, data_de_nascimento, CURDATE()) as idade
      from tb_pacientes
      order by nome asc
      limit 0, $offset";
    }
    

    $return_array_json = array();
    $result = $conexao->query($sql);
    while($dados = $result->fetch_assoc())
    {
      $row_array['id'] = $dados['id'];
      $row_array['imagem_paciente'] = $dados['imagem_paciente'];
      $row_array['nome'] = $dados['nome'];
      $row_array['telefone'] = $dados['telefone'];    
      $row_array['idade'] = $dados['idade'];
  
      array_push($return_array_json,$row_array);
    }
    mysqli_free_result($result);
    if ($erro_query == 0){
      mysqli_commit($conexao);
      echo json_encode($return_array_json);
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
