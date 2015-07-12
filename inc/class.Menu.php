<?php



class Menu{



	private $codigo;

	private $nome;

	private $idusuario;

	private $link;

	private $icone;

	private $checked;

	private $idpermissoes;	

		

	public function Menu(){

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

}

?>