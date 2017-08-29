<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha= $angular_http_params["senha"];
  $banco= $angular_http_params["banco"];
  $idPaciente= $angular_http_params["idPaciente"];
 
  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;
    $sql="select p.id, p.nome, p.sobrenome, 
    p.telefone, p.data_de_nascimento, p.email, e.rua, e.bairro,
    e.numero, e.complemento, e.cep, e.cidade, e.estado 
    from tb_pacientes as p
    left join tb_enderecos as e on e.fk_paciente = p.id
    where p.id = $idPaciente";
    
    $return_array_json = array();
    $result = $conexao->query($sql);
    while($dados = $result->fetch_assoc())
    {
      $row_array['id'] = $dados['id'];
      $row_array['nome'] = $dados['nome'];
      $row_array['sobrenome'] = $dados['sobrenome'];
      $row_array['telefone'] = $dados['telefone'];    
      $row_array['data_de_nascimento'] = $dados['data_de_nascimento'];
      $row_array['email'] = $dados['email'];

      $row_array['rua'] = $dados['rua'];
      $row_array['bairro'] = $dados['bairro'];
      $row_array['numero'] = $dados['numero'];
      $row_array['complemento'] = $dados['complemento'];    
      $row_array['cep'] = $dados['cep'];
      $row_array['cidade'] = $dados['cidade'];    
      $row_array['estado'] = $dados['estado'];
  
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
