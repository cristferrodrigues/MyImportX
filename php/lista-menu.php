<?php
	
	require_once('../inc/inc.autoload.php');
	
	$tpl = new TemplatePower('../tpl/_master.htm');
	$tpl->assignInclude('conteudo','../tpl/lista-menu.htm');
	$tpl->prepare();
	
	/**************************************************************/
		
		require_once('../inc/inc.session.php');
		require_once('../inc/inc.menu.php');
		$tpl->assign('log',$_SESSION['login']);
		
		
		$dao = new MenuDAO();
	
		$vet = $dao->listamenuusuario();

		$num = count($vet);
		
		for($i=0; $i < $num; $i++){
			
			$user = $vet[$i];
			
			$cod    = $user->getCodigo();
			$nom    = $user->getNome();
			$iduser = $user->getIdusuario();
			$link   = $user->getLink();
			$icone  = $user->getIcone();
			
			$tpl->newBlock('menus');
			
			$tpl->assign('cod',$cod);
			$tpl->assign('menu',$nom);
			$tpl->assign('id',$cod);
			$tpl->assign('link',$link);
			$tpl->assign('icone',$icone);
			
			
		}			
		
	
	/**************************************************************/
	$tpl->printToScreen();

?>