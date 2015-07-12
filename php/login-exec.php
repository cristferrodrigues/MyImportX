<?php
	require_once('../inc/inc.autoload.php');

	session_start();

	if(isset($_REQUEST['act']) and !empty($_REQUEST['act'])){

		$act = $_REQUEST['act'];	
		switch($act){

			case 'login':
				$ma  = addslashes($_REQUEST['ema']);

				$sen = addslashes($_REQUEST['sen']);
				$sen = sha1($sen);
				$dao = new UsuarioDAO();
				$vet = $dao->listaLogin($ma,$sen);

				$num = count($vet);

				if($num > 0){

					$usu = $vet[0];

					$_SESSION['login']   = $usu->getNome();

					$_SESSION['coduser'] = $usu->getCodigo();


					$destino = 'admin.php';

					
				}else{				

					$destino = 'login.php';			

				}				

			break;

			case 'logout':

				session_destroy();

				$destino = 'login.php';

			break;		

		}
	}
	header('Location:'.$destino);

?>