<?php

class Permissoes{
	
	private $idpermissoes;
	private $idmenu;
	private $idsubmenu;
	private $idusuario;
	
	public function Permissoes(){
		//nada 
	}

	public function getCodigo(){
		return $this->idpermissoes;
	}
	public function setCodigo($codigo){
		$this->idpermissoes = $codigo;
	}
	
	public function getIdmenu(){
		return $this->idmenu;
	}
	public function setIdmenu($idmenu){
		$this->idmenu = $idmenu;
	}
	
	public function getIdsubmenu(){
		return $this->idsubmenu;
	}
	public function setIdsubmenu($submenu){
		$this->idsubmenu = $submenu;
	}
	
	public function getIdusuario(){
		return $this->idusuario;
	}
	public function setIdusuario($submenu){
		$this->idusuario = $submenu;
	}
	
}
?>