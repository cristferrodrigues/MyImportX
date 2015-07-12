<?php
require_once('inc.autoload.php');
require_once('inc.connect.php');
class PermissoesDAO{
	
	private $dba;
	
	public function PermissoesDAO(){

		$dba = new DbAdmin('mysql');
		$dba->connect(HOST,USER,SENHA,BD);
		$this->dba = $dba;

	}
	
	public function inserirmenu($per){
		$dba = $this->dba;
		
		$idmenu    = $per->getIdmenu();
		$iduser    = $per->getIdusuario();
		
		$sql = 'INSERT INTO `permissoes`
				(
				`idmenu`,
				`idusuario`)
				VALUES
				(				
				'.$idmenu.',
				'.$iduser.'
				)';
		$res = $dba->query($sql);
	}
	
	public function listapermissaoporusuario($idu,$idsb){
		$dba = $this->dba;
		$vet = array();
		
		$sql = "select * from permissoes
				 where permissoes.idusuario = ".$idu." and 
				 permissoes.idsubmenu = ".$idsb."";
	
		$res = $dba->query($sql);
		$num = $dba->rows($res);
		
		for($i=0; $i < $num; $i++){
				
			$idpermissoes  = $dba->result($res,$i,'idpermissoes');	
			$idmenu        = $dba->result($res,$i,'idmenu');	  
			$idsubmenu     = $dba->result($res,$i,'idsubmenu');	   
			$idusuario     = $dba->result($res,$i,'idusuario');	   
			     
			$per  = new Permissoes();
			
			$per->setCodigo($idpermissoes);
			$per->setIdmenu($idmenu);
			$per->setIdsubmenu($idsubmenu);
			$per->setIdusuario($idusuario);
			
			$vet[$i] = $per;
			
		}
		return $vet;
		
	
	}
	public function listapermissaousuario($idu){
		$dba = $this->dba;
		$vet = array();
		
		$sql = "select * from permissoes
				 where permissoes.idusuario = ".$idu."";
				
		$res = $dba->query($sql);
		$num = $dba->rows($res);
		
		for($i=0; $i < $num; $i++){
				
			$idpermissoes  = $dba->result($res,$i,'idpermissoes');	
			$idmenu        = $dba->result($res,$i,'idmenu');	  
			$idsubmenu     = $dba->result($res,$i,'idsubmenu');	   
			$idusuario     = $dba->result($res,$i,'idusuario');	   
			     
			$per  = new Permissoes();
			
			$per->setCodigo($idpermissoes);
			$per->setIdmenu($idmenu);
			$per->setIdsubmenu($idsubmenu);
			$per->setIdusuario($idusuario);
			
			$vet[$i] = $per;
			
		}
		return $vet;
		
	
	}
	public function inserirsubmenu($per){
		$dba = $this->dba;
		
		$idsubmenu = $per->getIdsubmenu();	
		$iduser    = $per->getIdusuario();
		$idmenu    = $per->getIdmenu();
		
		$sql = 'INSERT INTO `permissoes`
				(				
				`idsubmenu`,
				`idusuario`)
				VALUES
				(				
				'.$idsubmenu.',
				'.$iduser.'
				)';		
		$res = $dba->query($sql);
	}
	
	public function inserirpermissao($per){
		$dba = $this->dba;
		
		$idsubmenu = $per->getIdsubmenu();	
		$iduser    = $per->getIdusuario();
		$idmenu    = $per->getIdmenu();
		

		$sql = 'INSERT INTO `permissoes`
				(
				`idmenu`,				
				`idsubmenu`,
				`idusuario`)
				VALUES
				(	
				'.$idmenu.',			
				'.$idsubmenu.',
				'.$iduser.'
				)';	
		//echo $sql; 
		$res = $dba->query($sql);
	}
	
	public function verificaper($idu,$idp){
		$dba = $this->dba;
		$vet = array();
		
		$sql = "select * from permissoes p
				where 	p.idusuario = ".$idu." and p.idsubmenu = '".$idp."' or p.idmenu = '".$idp."'";
				
		$res = $dba->query($sql);
		$num = $dba->rows($res);
		
		for($i=0; $i < $num; $i++){
				
			$idpermissoes  = $dba->result($res,$i,'idpermissoes');	
			$idmenu        = $dba->result($res,$i,'idmenu');	  
			$idsubmenu     = $dba->result($res,$i,'idsubmenu');	   
			$idusuario     = $dba->result($res,$i,'idusuario');	   
			     
			$per  = new Permissoes();
			
			$per->setCodigo($idpermissoes);
			$per->setIdmenu($idmenu);
			$per->setIdsubmenu($idsubmenu);
			$per->setIdusuario($idusuario);
			
			$vet[$i] = $per;
			
		}
		return $vet;
	}
	
	public function update($per){
		$dba = $this->dba;
		
		$idpermi   = $per->getCodigo();
		$idmenu    = $per->getIdmenu();
		$idsubmenu = $per->getIdsubmenu();	
		$iduser    = $per->getIdusuario();
		
		$sql = 'UPDATE `permissoes`
				SET
				`idmenu` = '.$idmenu.',
				`idsubmenu` = '.$idsubmenu.',
				`idusuario` = '.$iduser.'
				WHERE `idpermissoes` ='.$idpermi;
		$res = $dba->query($sql);
		
	} 
	public function delete($per){
		$dba = $this->dba;
		$idpermi   = $per->getCodigo();
		$sql = 'DELETE FROM `permissoes`
				WHERE `idpermissoes` ='.$idpermi;
		$res = $dba->query($sql);
	}
	public function deleteporuser($per){
		$dba = $this->dba;
		$idpermi   = $per->getCodigo();
		$iduser    = $per->getIdusuario();
		
		$sql = 'DELETE FROM permissoes
				where permissoes.idusuario = '.$iduser.'  
				and permissoes.idpermissoes = '.$idpermi.'';
				
		$res = $dba->query($sql);
	}
}
?>