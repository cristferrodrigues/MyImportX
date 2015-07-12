<?php

	

	require_once('../inc/inc.autoload.php');

	

	$tpl = new TemplatePower('../tpl/ajax-submenu.htm');

	//$tpl->assignInclude('conteudo','../tpl/ajax-remetente.htm');

	$tpl->prepare();

	

	/**************************************************************/

		require_once('../inc/inc.session.php');

		$tpl->assign('log',$_SESSION['login']);

		

		if(isset($_REQUEST['id'])){

		

			

			($_REQUEST['id'])  ? $id  = $_REQUEST['id'] :false;

		

			$dao = new SubmenuDAO();

			$vet = $dao->listasubmenuUm($id);

			$num = count($vet);	

			

			$sub = array();				

			

			for($i = 0; $i < $num; $i++){	

				

				$submen = $vet[$i];

				

				$cod    = $submen->getCodigo();

				$nom    = $submen->getNome();

				$idmenu = $submen->getIdmenu();		

				$link   = $submen->getLink();

				$icone  = $submen->getIcone();

				

				

				$tpl->newBlock('menu');

				

				$tpl->assign('cod',$cod);

				$tpl->assign('nom',$nom);

				$tpl->assign('link',$link);

				$tpl->assign('icone',$icone);

				

			}

		

		

			

		

		} 

	

	/**************************************************************/

	$tpl->printToScreen();



?>