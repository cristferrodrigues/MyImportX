<?php

require_once('inc.autoload.php');

require_once('inc.connect.php');

class MenuDAO{



	private $dba;

	

	public function MenuDAO(){

		

		$dba = new DbAdmin('mysql');

		$dba->connect(HOST,USER,SENHA,BD);

		$this->dba = $dba;

		

	}

	

	

	public function listamenuusuario(){

		

		$dba = $this->dba;

		

		$vet = array();

		

		$sql = 'SELECT

				`menu`.`id`,

				`menu`.`Nome`,

				`menu`.`idusuario`,

				`menu`.`link`,

				`menu`.`icone`

				FROM `menu`';

				

		$res = $dba->query($sql);

		$num = $dba->rows($res);



		for($i=0; $i < $num; $i++){

			

			$cod        = $dba->result($res,$i,'id');	

			$nome       = $dba->result($res,$i,'Nome');	

			$idusuario  = $dba->result($res,$i,'idusuario');

			$link       = $dba->result($res,$i,'link');

			$icone      = $dba->result($res,$i,'icone');

			

			$men = new Menu();

			

			$men->setCodigo($cod);

			$men->setNome($nome);

			$men->setIdusuario($idusuario);

			$men->setLink($link);

			$men->setIcone($icone);

			

			$vet[$i] = $men;

			

		}

		

		return $vet;

	}	

	public function listamemupousuario($iduser){

		$dba = $this->dba;

		

		$vet = array();

		

		$sql = 'select m.* from menu m

				inner join permissoes p on (p.idmenu = m.id)

				where p.idusuario = '.$iduser.' group by m.id';

				

		$res = $dba->query($sql);

		$num = $dba->rows($res);



		for($i=0; $i < $num; $i++){

			

			$cod        = $dba->result($res,$i,'id');	

			$nome       = $dba->result($res,$i,'Nome');	

			$idusuario  = $dba->result($res,$i,'idusuario');

			$link       = $dba->result($res,$i,'link');

			$icone      = $dba->result($res,$i,'icone');

			

			$men = new Menu();

			

			$men->setCodigo($cod);

			$men->setNome($nome);

			$men->setIdusuario($idusuario);

			$men->setLink($link);

			$men->setIcone($icone);

			

			$vet[$i] = $men;

			

		}

		

		return $vet;

		

	}

	public function verificasetemmenu($idu){

	

		$dba = $this->dba;

		

		$vet = array();

		

		$sql = 'SELECT * FROM menu s

				inner join permissoes p on (p.idmenu = s.id)

				where p.idusuario ='.$idu;

		echo $sql; 		

		$res = $dba->query($sql);

		$num = $dba->rows($res);



		for($i=0; $i < $num; $i++){

			

			$cod           = $dba->result($res,$i,'id');	

			$nome          = $dba->result($res,$i,'Nome');	

			$idusuario     = $dba->result($res,$i,'idusuario');

			$link          = $dba->result($res,$i,'link');

			$icone         = $dba->result($res,$i,'icone');

			$idpermissoes  = $dba->result($res,$i,'idpermissoes');

			

			$men = new Menu();

			

			$men->setCodigo($cod);

			$men->setNome($nome);

			$men->setIdusuario($idusuario);

			$men->setLink($link);

			$men->setIcone($icone);

			$men->setIdpermissoes($idpermissoes);

			

			$vet[$i] = $men;

			

		}

		

		return $vet;

	

	}

	

	public function listamenuUm($id){

		$dba = $this->dba;

		

		$vet = array();

		

		$sql = 'SELECT

				`menu`.`id`,

				`menu`.`Nome`,

				`menu`.`idusuario`,

				`menu`.`link`,

				`menu`.`icone`

				FROM `menu`

				WHERE `menu`.`id`='.$id;

				

		$res = $dba->query($sql);

		$num = $dba->rows($res);



		for($i=0; $i < $num; $i++){

			

			$cod        = $dba->result($res,$i,'id');	

			$nome       = $dba->result($res,$i,'Nome');	

			$idusuario  = $dba->result($res,$i,'idusuario');

			$link       = $dba->result($res,$i,'link');

			$icone      = $dba->result($res,$i,'icone');

	

			$men = new Menu();

			

			$men->setCodigo($cod);

			$men->setNome($nome);

			$men->setIdusuario($idusuario);

			$men->setLink($link);

			$men->setIcone($icone);

			

			$vet[$i] = $men;

			

		}

		

		return $vet;

	}

	public function listamenuporpermissao($id){

		

		$dba = $this->dba;

		

		$vet = array();

		

		$sql = '(select distinct u.*, (CASE p.idusuario 

				WHEN '.$id.' THEN ("checked") 

				END) as selected from menu u

				LEFT JOIN permissoes p on (p.idmenu = u.id) and p.idusuario = '.$id.')

				UNION ALL

				(select distinct MEN.*, (CASE p.idusuario 

				WHEN '.$id.' THEN ("checked") 

				END) as selected from menu MEN

				left JOIN permissoes p on (p.idmenu = MEN.id)

				WHERE not exists(select distinct id from menu u

				where u.id = MEN.id) and p.idusuario = '.$id.')';

				

		$res = $dba->query($sql);

		$num = $dba->rows($res);



		for($i=0; $i < $num; $i++){

			

			$cod        = $dba->result($res,$i,'id');	

			$nome       = $dba->result($res,$i,'Nome');	

			$idusuario  = $dba->result($res,$i,'idusuario');

			$link       = $dba->result($res,$i,'link');

			$icone      = $dba->result($res,$i,'icone');

			$checked    = $dba->result($res,$i,'selected');

	

			$men = new Menu();

			

			$men->setCodigo($cod);

			$men->setNome($nome);

			$men->setIdusuario($idusuario);

			$men->setLink($link);

			$men->setIcone($icone);

			$men->setChecked($checked);

			

			$vet[$i] = $men;

			

		}

		

		return $vet;

		

	}

	public function inserir($user){

		$dba = $this->dba;

		

		$nom    = $user->getNome();

		$link   = $user->getLink();

		$icone  = $user->getIcone();

		

		$sql = 'INSERT INTO `menu`

				(

				`Nome`,

				`link`,

				`icone`)

				VALUES

				(

				"'.$nom.'",

				"'.$link.'",

				"'.$icone.'"

				)';

		

		$res = $dba->query($sql);

	}

	

	public function update($user){

		$dba = $this->dba;

		$cod    = $user->getCodigo();

		$nom    = $user->getNome();

		$link   = $user->getLink();

		$icone  = $user->getIcone();

		

		$sql = 'UPDATE `menu`

				SET

				`Nome` = "'.$nom.'",

				`link` = "'.$link.'",

				`icone` = "'.$icone.'"

				WHERE `id` ='.$cod;

		$res = $dba->query($sql);

	}

	public function delete($user){

		$dba = $this->dba;

		$cod    = $user->getCodigo();

		$sql = 'DELETE FROM `menu`

				WHERE `id` ='.$cod;

		$res = $dba->query($sql);

	}

}

?>