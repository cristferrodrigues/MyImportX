<?php
	require_once('../inc/inc.autoload.php');

	$tpl = new TemplatePower('../tpl/_master.htm');

	$tpl->assignInclude('conteudo','../tpl/cadastro-usuario.htm');

	$tpl->prepare();

	

	/**************************************************************/

			

		require_once('../inc/inc.session.php');

		require_once('../inc/inc.menu.php');

		$tpl->assign('log',$_SESSION['login']);

		$tpl->assign('coduser',$_SESSION['coduser']);

		

		$dao = new MenuDAO();

		$vet = $dao->listamenuusuario();

		$num = count($vet);

		

		for($i = 0; $i < $num; $i++){

			

			$user = $vet[$i];

			

			$cod    = $user->getCodigo();

			$nom    = $user->getNome();

			$link   = $user->getLink();

			$icone  = $user->getIcone();

			

			$tpl->newBlock('menus');

				

			$tpl->assign('cod',$cod);

			$tpl->assign('nom',$nom);

			$tpl->assign('link',$link);

			$tpl->assign('icone',$icone);

			

			

			$daos = new SubmenuDAO();

			$vets = $daos->listasubmenuUm($cod);

			$nums = count($vets);

			

			for($x = 0; $x < $nums; $x++){

				

				$sub = $vets[$x];

				

				$cods    = $sub->getCodigo();

				$noms    = $sub->getNome();

				$links   = $sub->getLink();

				$icones  = $sub->getIcone();

				$idmenu  = $sub->getIdmenu();

				

				$tpl->newBlock('submenus');

				

				

					

				$tpl->assign('cods',$cods);

				$tpl->assign('noms',$noms);

				$tpl->assign('links',$links);

				$tpl->assign('idmenu',$idmenu);

				$tpl->assign('icones',$icones);

					

			}

			

			

		}

		

		

	/**************************************************************/

	$tpl->printToScreen();



?>