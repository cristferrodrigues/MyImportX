<?php

	

	require_once('../inc/inc.autoload.php');

	

	$tpl = new TemplatePower('../tpl/_master.htm');

	$tpl->assignInclude('conteudo','../tpl/atualizar-usuario.htm');

	$tpl->prepare();

	

	/**************************************************************/

		

		

		require_once('../inc/inc.session.php');

		require_once('../inc/inc.menu.php');

		$tpl->assign('log',$_SESSION['login']);

		($_REQUEST['id'])  ? $id  = $_REQUEST['id']  :false;

		

		$dao = new UsuarioDAO();

		$vet = $dao->listausuarioum($id);

		

		$num = count($vet);

		

		if($num > 0){

		

			$user = $vet[0];

			

			$cod = $user->getCodigo();

			$nom = $user->getNome();

			$ema = $user->getEmail();

			$use = $user->getLogin();

			

			

			$tpl->assign('cod',$cod);

			$tpl->assign('nom',$nom);

			$tpl->assign('ema',$ema);

			$tpl->assign('login',$use);	

			

		

		

		}

		

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

			

			$checked = '';

			

			for($x = 0; $x < $nums; $x++){

				

				$sub = $vets[$x];

				

				$cods    = $sub->getCodigo();

				$noms    = $sub->getNome();

				$links   = $sub->getLink();

				$icones  = $sub->getIcone();

				$idmenu  = $sub->getIdmenu();

				

				$daop = new PermissoesDAO();

				$vetp = $daop->listapermissaoporusuario($id,$cods);

				$nump = count($vetp);

				

				if($nump > 0){



					$per = $vetp[0];

					$idsubmenu = $per->getIdsubmenu();		

					echo $idsubmenu;					

					$checked = 'checked';

					

				}else{

					$checked = "";	

				}
				$tpl->newBlock('submenus');

				$tpl->assign('checked',$checked);

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