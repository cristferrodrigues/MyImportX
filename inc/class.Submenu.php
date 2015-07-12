<?php



class Submenu{



	private $codigo;

	private $nome;

	private $idmenu;

	private $idusuario;

	private $link;

	private $icone;

	private $checked;

	private $idpermissoes;	

	private $sort;
	private $action_id;		

	public function Submenu(){

		//nada

	}

	

	

	public function getCodigo(){

		return $this->codigo;

	}

	public function setCodigo($codigo){

		$this->codigo = $codigo;

	}

	public function getNome(){

		return $this->nome;

	}

	public function setNome($nome){

		$this->nome = $nome;

	}

	public function getIdusuario(){

		return $this->idusuario;

	}

	public function setIdusuario($idusuario){

		$this->idusuario = $idusuario;

	}

	public function getIdmenu(){

		return $this->idmenu;

	}

	public function setIdmenu($Idmenu){

		$this->idmenu = $Idmenu;

	}

	

	public function getLink(){

		return $this->link;	

	}

	public function setLink($link){

		$this->link = $link;

	}

	

	public function getIcone(){

		return $this->icone;

	}

	public function setIcone($icone){

		$this->icone = $icone;

	}

	

	public function getChecked(){

		return $this->checked;

	}

	public function setChecked($checked){

		$this->checked = $checked;

	}

	

	public function getIdpermissoes(){

		return $this->idpermissoes;

	}

	public function setIdpermissoes($Idpermissoes){

		$this->idpermissoes = $Idpermissoes;

	}
	
	public function getSort(){

		return $this->sort;

	}

	public function setSort($sort){

		$this->sort = $sort;

	}
	
	public function getActionId(){

		return $this->action_id;

	}

	public function setActionId($actionid){

		$this->action_id = $actionid;

	}
	

}

?>