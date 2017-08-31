<?php
  header("Access-Control-Allow-Origin: *");
  ini_set('default_charset','UTF-8');

  $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

  $usuario = $angular_http_params["usuario"];
  $senha= $angular_http_params["senha"];
  $banco= $angular_http_params["banco"];
  $receita= json_decode($angular_http_params["receita"], TRUE);

  $conexao = new mysqli('localhost',$usuario, $senha, $banco);
  $conexao->autocommit(FALSE);
  $conexao->query("SET NAMES 'utf8'");
  $conexao->query('SET character_set_connection=utf8');
  $conexao->query('SET character_set_client=utf8');
  $conexao->query('SET character_set_results=utf8');

  try{
    $erro_query = 0;
    
    $sql1="insert into tb_anamineses 
    (sintomas, antecedentes, rx, fk_paciente)
    values ('".$receita['sintomas']."', '".$receita['antecedentes']."', 
    '".$receita['rx']."', '".$receita['dataDeNascimentoBanco']."')";
    if (!mysqli_query($conexao, $sql1)) $erro_query++;

    $fk_anaminese = mysqli_insert_id($conexao); 

    $sql2="insert into tb_receitas 
    (data_da_consulta, od_esf, od_cil, od_eixo, od_av, oe_esf, oe_cil, oe_eixo,
    oe_av, adicao, tipo_de_lente, cor, fk_anaminese)
    values ('".$receita['dataConsulta']."', '".$receita['odEsf']."', '".$receita['odCil']."', 
    '".$receita['odEixo']."', '".$receita['odAv']."', '".$receita['oeEsf']."', 
    '".$receita['oeCil']."', '".$receita['oeEixo']."', '".$receita['oeAv']."', 
    '".$receita['adicao']."', '".$receita['tipo_de_lente']."', '".$receita['cor']."', 
    '$fk_anaminese')";
    if (!mysqli_query($conexao, $sql2)) $erro_query++;
    
    if ($erro_query == 0){
      mysqli_commit($conexao);
      echo "A receita foi salva!";
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
