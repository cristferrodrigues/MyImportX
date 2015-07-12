<?php
	require_once('../inc/inc.autoload.php');
	
	$tpl = new TemplatePower('../tpl/_master.htm');

	$tpl->assignInclude('conteudo','../tpl/Listar-usuario.htm');

	$tpl->prepare();

	/**************************************************************/

	require_once('../inc/inc.session.php');

	require_once('../inc/inc.menu.php');

	$tpl->assign('log',$_SESSION['login']);		

	$dao = new UsuarioDAO();

	$vet = $dao->listausuario();

	$num = count($vet);	

	for($i = 0; $i < $num; $i++){
		$user = $vet[$i];
		
		$cod  = $user->getCodigo();
		
		$nom  = $user->getNome();
		
		$ema  = $user->getEmail();

		$use  = $user->getLogin();

		$tpl->newBlock('usuario');

		$tpl->assign('cod',$cod);

		$tpl->assign('nom',$nom);

		$tpl->assign('ema',$ema);

		$tpl->assign('login',$use);		

	}
	/**************************************************************/

	$tpl->printToScreen();



?>