<?php

require_once('inc.autoload.php');

require_once('inc.connect.php');

class UsuarioDAO{



	

	private $dba;



	public function UsuarioDAO(){

		

		$dba = new DbAdmin('mysql');

		$dba->connect(HOST,USER,SENHA,BD);

		$this->dba = $dba;

	

	}

	

	public function listaLogin($ema,$sen){

		

		$dba = $this->dba;

		$vet = array();

		

		$idsys = 1;

		

		$sql ='SELECT *

			  FROM usuario

			  WHERE email = "'.$ema.'"

			  AND	senha = "'.$sen.'"

			  AND   idsys = '.$idsys.'';

			  

		$res = $dba->query($sql);

		$num = $dba->rows($res); 

		

		for($i = 0; $i<$num; $i++){

		

			$cod = $dba->result($res,$i,'id');

			$nom = $dba->result($res,$i,'nome');

			$ema = $dba->result($res,$i,'email');

			$log = $dba->result($res,$i,'login');

			$sen = $dba->result($res,$i,'senha');

			$idr = $dba->result($res,$i,'idrota');

			$ids = $dba->result($res,$i,'idsys');

			

			$usu = new Usuario();

			

			$usu->setCodigo($cod);

			$usu->setNome($nom);

			$usu->setEmail($ema);

			$usu->setLogin($log);

			$usu->setSenha($sen);

			$usu->setIdRota($idr);

			$usu->setIdsys($ids);

			

			$vet[$i] = $usu;

		

		}

		return $vet;

	}

	public function listausuario(){

		

		

		$dba = $this->dba;

		$vet = array();

		

		$sql ='SELECT * FROM usuario where nome <> "cacio" and nome <> "demo"';

			  

		$res = $dba->query($sql);

		$num = $dba->rows($res); 

		

		for($i = 0; $i<$num; $i++){

		

			$cod = $dba->result($res,$i,'id');

			$nom = $dba->result($res,$i,'nome');

			$ema = $dba->result($res,$i,'email');

			$log = $dba->result($res,$i,'login');

			$sen = $dba->result($res,$i,'senha');

			$idr = $dba->result($res,$i,'idrota');

			$ids = $dba->result($res,$i,'idsys');

			

			$usu = new Usuario();

			

			$usu->setCodigo($cod);

			$usu->setNome($nom);

			$usu->setEmail($ema);

			$usu->setLogin($log);

			$usu->setSenha($sen);

			$usu->setIdRota($idr);

			$usu->setIdsys($ids);

			

			$vet[$i] = $usu;

		

		}

		return $vet;

	

	

	}

	public function listausuarioum($idu){

		

		

		$dba = $this->dba;

		$vet = array();

		

		$sql ='SELECT *

			  FROM usuario where id='.$idu;

			  

		$res = $dba->query($sql);

		$num = $dba->rows($res); 

		

		for($i = 0; $i<$num; $i++){

		

			$cod = $dba->result($res,$i,'id');

			$nom = $dba->result($res,$i,'nome');

			$ema = $dba->result($res,$i,'email');

			$log = $dba->result($res,$i,'login');

			$sen = $dba->result($res,$i,'senha');

			$idr = $dba->result($res,$i,'idrota');

			$ids = $dba->result($res,$i,'idsys');

			

			$usu = new Usuario();

			

			$usu->setCodigo($cod);

			$usu->setNome($nom);

			$usu->setEmail($ema);

			$usu->setLogin($log);

			$usu->setSenha($sen);

			$usu->setIdRota($idr);

			$usu->setIdsys($ids);

			

			$vet[$i] = $usu;

		

		}

		return $vet;

	

	}

	public function inserir($usu){

	

	

		$dba = $this->dba;

		

		$nom = $usu->getNome();

		$ema = $usu->getEmail();

		$log = $usu->getLogin();

		$idr = $usu->getIdRota();

		$ids = $usu->getIdsys();

		$sen = $usu->getSenha();

		

		$sql = 'INSERT INTO usuario

							(

							 nome,

							 email,

							 login,

							 senha,

							 idrota,

							 idsys)

							VALUES

							(

							"'.$nom.'",

							"'.$ema.'",

							"'.$log.'",

							"'.$sen.'",

							'.$idr.',

							'.$ids.'

							)';

										

		$dba->query($sql);	

			

			

	

	}

	

	public function update($usu){

		

		$dba = $this->dba;

		

		$idu = $usu->getCodigo();

		$nom = $usu->getNome();

		$ema = $usu->getEmail();

		$log = $usu->getLogin();

		$idr = $usu->getIdRota();

		$ids = $usu->getIdsys();

		$sen = $usu->getSenha();

		

		$sql = 'UPDATE  usuario

				SET

				nome = "'.$nom.'",

				email  = "'.$ema.'",

				login  = "'.$log.'",

				idrota = '.$idr.',

				idsys = '.$ids.',

				senha = "'.$sen.'"

				WHERE id='.$idu;

		

		$dba->query($sql);	

		

	

	}

	public function deletar($usu){

	

		$dba = $this->dba;

		$idu = $usu->getCodigo();

		

		$sql = 'DELETE FROM usuario WHERE id='.$idu;

		$dba->query($sql);	

		

	}

	

	public function proximoid(){

		

		$dba = $this->dba;

		$vet = array();

		

		$sql = 'SELECT max(id) + 1 as max_id from usuario';

		$res = $dba->query($sql);

		$i = 0;

		$prox_id = $dba->result($res,$i,'max_id');	 

		$usu = new Usuario();

		$usu->setProxid($prox_id);

		$vet[$i] = $usu;

		return $vet;

	

	}	

}

?>