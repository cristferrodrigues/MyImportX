<?php

	require_once('../inc/inc.autoload.php');

	

	if(isset($_REQUEST['act']) and !empty($_REQUEST['act'])){

	

		

		$act = $_REQUEST['act'];

		

		switch($act){

			

		case 'inserir':

			

			($_REQUEST['nome'])          ? $nome          = $_REQUEST['nome']             :false;

			($_REQUEST['email'])         ? $email         = $_REQUEST['email']            :false;	

			($_REQUEST['login'])         ? $login         = $_REQUEST['login']            :false;

			($_REQUEST['senha'])         ? $senha         = $_REQUEST['senha']            :false;

			

			

			 echo '<pre>';

			 //print_r($_REQUEST);

			 

			 $user = new Usuario();

			 $dao  = new UsuarioDAO();

			

			

			 $vetu      = $dao->proximoid();

			 $prox      = $vetu[0];	

			 $proximoid = $prox->getProxid();					

			

			

			foreach($_REQUEST['perusers'] as $key=>$value){

				

					

					$per = explode(',',$value);

					

					$idmenu    = $per[0];

					$idsubmenu = $per[1];

					 

					$per = new Permissoes();

					

					$per->setIdmenu($idmenu);

					$per->setIdsubmenu($idsubmenu);

					$per->setIdusuario($proximoid);

					

					

					$daop = new PermissoesDAO();

					$daop->inserirpermissao($per);

			}

			

			

			$user->setNome($nome);

			$user->setEmail($email);

			$user->setLogin($login);

			$user->setSenha(sha1($senha));

			$user->setIdRota(1);

			$user->setIdsys(1);

			

			

			$dao->inserir($user);

			

		    echo 'Adicionado com sucesso !';

			

			header('Location:Listar-usuario.php');	

							

		break;

		case 'alterar':

		

			($_REQUEST['id'])            ? $id            = $_REQUEST['id']               :false;

			($_REQUEST['nome'])          ? $nome          = $_REQUEST['nome']             :false;

			($_REQUEST['email'])         ? $email         = $_REQUEST['email']            :false;	

			($_REQUEST['login'])         ? $login         = $_REQUEST['login']            :false;

			($_REQUEST['senha'])         ? $senha         = $_REQUEST['senha']            :false;

			($_REQUEST['id'])            ? $codigos        = $_REQUEST['id']               :false;



			

			//deletar todos as permissoes desse usuario

			

			$daoper = new PermissoesDAO();

			$vetper = $daoper->listapermissaousuario($id);

			$numper = count($vetper);

			

			for($i =0; $i < $numper; $i++){

				

				$pers =	$vetper[$i];

				

				$idpermi   = $pers->getCodigo();

				$iduser    = $pers->getIdusuario();

				

				$per = new Permissoes();

				$per->setCodigo($idpermi);

				$per->setIdusuario($id);

				

				

				$daoper->deleteporuser($per);

			}

			

			

			

			foreach($_REQUEST['perusers'] as $key=>$value){

				

					

					$per = explode(',',$value);

					

					$idmenu    = $per[0];

					$idsubmenu = $per[1];

					 

					$per = new Permissoes();

					

					$per->setIdmenu($idmenu);

					$per->setIdsubmenu($idsubmenu);

					$per->setIdusuario($id);

					

					

					$daop = new PermissoesDAO();

					$daop->inserirpermissao($per);

			}

			

	

			

			$user = new Usuario();

			

			$user->setCodigo($id);

			$user->setNome($nome);

			$user->setEmail($email);

			$user->setLogin($login);

			$user->setSenha(sha1($senha));

			$user->setIdRota(1);

			$user->setIdsys(1);

			

			$dao = new UsuarioDAO();

			$dao->update($user);



		echo 'Alterado com sucesso !';	

		header('Location:Listar-usuario.php');

		

		break;

		

		case 'delete':

	

			($_REQUEST['id'])            ? $id            = $_REQUEST['id']               :false;

	

	

			$user = new Usuario();

			

			$user->setCodigo($id);

			

			$dao = new UsuarioDAO();

			$dao->deletar($user);

				

		echo 'Removido com sucesso !';

		

		break;

		

		}

	

	

	}

	

?>