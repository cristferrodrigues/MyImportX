<?php
	require_once('../php/geral_config.php');
	$tpl->assign('log',$_SESSION['login']);

	/*if(isset($_SESSION['coduser'])){*/

	$dao = new MenuDAO();

	$vet = $dao->listamemupousuario($_SESSION['coduser']);

	$num = count($vet);

	for($i=0; $i < $num; $i++){

		$user = $vet[$i];

		$cod    = $user->getCodigo();

		$nom    = $user->getNome();

		$iduser = $user->getIdusuario();

		$link   = $user->getLink();

		$icone  = $user->getIcone();

		$tpl->newBlock('menu');

		$tpl->assign('menu',$nom);

		$tpl->assign('id',$cod);

		$tpl->assign('link',$link);

		$tpl->assign('icone',$icone);

		$daosub = new SubmenuDAO();

		$vetsub = $daosub->listasubmenuporusuario($_SESSION['coduser'],$cod);

		$numsub = count($vetsub);

		for($y=0; $y < $numsub; $y++){

			$sub = $vetsub[$y];

			$cods    = $sub->getCodigo(); 	

			$noms    = $sub->getNome();

			$idusers = $sub->getIdusuario();

			$idmenus = $sub->getIdmenu();		

			$links   = $sub->getLink();

			$icones  = $sub->getIcone();
			
			$action_id = $sub->getActionId();
			$tpl->newBlock('submenu');

			if($cods == 26){

				$tpl->assign('ide','element');

			}

			$tpl->assign('submenu',$noms);
			$tpl->assign('idsub',$cods);
			$tpl->assign('links',$links);
			$tpl->assign('icones',$icones);
			$tpl->assign('action_id',$action_id);

		}	

	/*}*/

	$tpl->gotoBlock('_ROOT');

}

?>