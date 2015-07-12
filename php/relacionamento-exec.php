<?php

	

	require_once('../inc/inc.autoload.php');

	session_start();

	if(isset($_REQUEST['act']) and !empty($_REQUEST['act'])){

		

		

		$act = $_REQUEST['act'];	

		

		switch($act){

			case 'box':
				
				$data 		= array();
				$condicao   = array();
				$condicao2  = array();
				$condicao3  = array();
				
				if(isset($_GET['files']))
				{	
					$error = false;
					$files = array();
					$uploaddir = '../uploads/';
					foreach($_FILES as $file)
					{
						
						
						if(move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name']))){
							
							$files[] = $uploaddir .$file['name'];
							
						}else{
							
							$error = true;
						}
						
											
						
					}
					$data = ($error) ? array('error' => 'Houve um erro ao carregar seus arquivos') : array('files' => $files);
				}else{
				
					foreach($_REQUEST['filenames'] as $arquivo){
						
					if($xml =  simplexml_load_file($arquivo)){
							
							$dEmi         = explode('T',$xml->NFe->infNFe->ide->dhEmi);
							$dEmi         = implode(".", array_reverse(explode("-", "".$dEmi[0]."")));
							
							$condicao2[]  = " m.numero_nota = '".$xml->NFe->infNFe->ide->nNF."' ";
							$condicao2[]  = " f.cnpj_cpf = '".$xml->NFe->infNFe->emit->CNPJ."' ";
							$condicao2[]  = " m.data_emissao = '".implode(".", array_reverse(explode("-", "".$dEmi."")))."' ";
							
							$where2 = '';
							if(count($condicao2) > 0){							
								$where2 = ' where'.implode('AND',$condicao2);									
							}
													
							//verifica se existe a nota
							$daon = new NotasEntradaMDAO();
							$vetn = $daon->VerificaNotas($where2);
							$numn = count($vetn);
							
							if($numn == 0){
							
							//verificar se é para a empresa  
							$condicao3[]  = " n.cnpj = '".$xml->NFe->infNFe->dest->CNPJ."' ";
							$condicao3[]  = " n.ie = '".$xml->NFe->infNFe->dest->IE."' ";
													
							$where3 = '';
							if(count($condicao3) > 0){							
								$where3 = ' where'.implode('AND',$condicao3);									
							}
							
							$daonf = new Nf_EDAO();
							$vetnf = $daonf->VerificaEmitenteDaNota($where3);
							$numnf = count($vetnf);
							
							if($numnf >= 0){
							
							$condicao[]  = " f.cnpj_cpf = '".$xml->NFe->infNFe->emit->CNPJ."' ";
							$condicao[]  = " f.inscrica_estadual = '".$xml->NFe->infNFe->emit->IE."' ";

							$where = '';
							if(count($condicao) > 0){							
								$where = ' where'.implode('AND',$condicao);									
							}
							
							$dao = new FornecedorDAO();
							$vet = $dao->VerificaFornecedor($where);
							$num = count($vet);
							
							if($num > 0){
								//existe -> pega os dados
								
								$for = $vet[0];
								
								$cod	  = $for->getCodigo();	
								$nome 	  = $for->getNome();
								$ende 	  = $for->getEndereco();
								$esta 	  = $for->getEstado();
								$cid  	  = $for->getCidade();
								$barr 	  = $for->getBairro();
								$cep  	  = $for->getCep();
								$tel  	  = $for->getTelefone();
								$fax  	  = $for->getFax();
								$cont 	  = $for->getContato();
								$cnpjcpf  = $for->getCnpjCpf(); 
								$ins	  = $for->getIncricoesEstadual();
								$contactb = $for->getContaCtb();
								$placa	  = $for->getPlaca();
								$uf		  = $for->getUf();
								$antt	  = $for->getAntt();
								$pais	  = $for->getPais();
								$emil	  = $for->getEmail();
								$produtor = $for->getProdutor();
								$obs	  = $for->getObs();
								$tipo	  = $for->getTipo();
														
								array_push($data,array(
									'cod' => ''.$cod.'',
									'nome' => ''.$nome.'',
									'ende' => ''.$ende.'',
									'esta' => ''.$esta.'',
									'cid' => ''.$cid.'',
									'barr' => ''.$barr.'',
									'cep' => ''.$cep.'',
									'tel' => ''.$tel.'',
									'cnpjcpf' => ''.$cnpjcpf.'',
									'ins' => ''.$ins.'',
									'arquivo' => ''.$arquivo.'',
									'Numero'=>''.$xml->NFe->infNFe->ide->nNF.'',
									'dtemis'=>''.implode(".", array_reverse(explode("-", "".$xml->NFe->infNFe->ide->dEmi.""))).'',
									'cfop'=>''.$xml->NFe->infNFe->det->prod->CFOP.'',
									'dtentrada'=>''.implode(".", array_reverse(explode("-", "".$xml->NFe->infNFe->ide->dSaiEnt.""))).'',
									'vIPI'=>''.$xml->NFe->infNFe->total->ICMSTot->vIPI.'',
									'vFrete'=>''.$xml->NFe->infNFe->total->ICMSTot->vFrete.'',
									'vST'=>''.$xml->NFe->infNFe->total->ICMSTot->vST.'',
									'vOutro'=>''.$xml->NFe->infNFe->total->ICMSTot->vOutro.'',
									'vDesc'=>''.$xml->NFe->infNFe->total->ICMSTot->vDesc.'',
								));						
								
							foreach($xml->NFe->infNFe->det as $prod){	
								
								$daor = new RelacionaProdutoDAO();
								$vetr = $daor->verificaRelacionamento($prod->prod->cProd);
								$numr = count($vetr);
								
								if($numr > 0){
									$rel = $vetr[0];
									
									$idfornec  = $rel->getIdFornecedor();
									$idprod    = $rel->getIdProduto();
									$idprodrel = $rel->getIdProdutoRelacionado();
									
									//ProdutoFormulacao
									$daop =  new ProdutosDAO();
									$vetp = $daop->ProdutoFormulacao($idprodrel);
									$nump = count($vetp);
									
									if($nump > 0){
										$pro = $vetp[0];
										
										$prod_codigo    = $pro->getCodigo();
										$prod_descricao = $pro->getDescricao();
										
										
									}else{
										
										$prod_codigo 	= "";
										$prod_descricao = "";
									
									}
									
								 }else{
									
										$prod_codigo 	= "";
										$prod_descricao = "";
										
								 }
								
								array_push($data,array(
									'cProd' => ''.$prod->prod->cProd.'',
									'xProd' => ''.$prod->prod->xProd.'',
									'NCM' => ''.$prod->prod->NCM.'',
									'CFOP' => ''.$prod->prod->CFOP.'',
									'uCom' => ''.$prod->prod->uCom.'',
									'qCom' => ''.$prod->prod->qCom.'',
									'vUnCom' => ''.$prod->prod->vUnCom.'',
									'vProd' => ''.$prod->prod->vProd.'',
									'uTrib' => ''.$prod->prod->uTrib.'',
									'qTrib' => ''.$prod->prod->qTrib.'',
									'vUnTrib' => ''.$prod->prod->vUnTrib.'',
									'indTot' => ''.$prod->prod->indTot.'',
									'relacionado' => ''.$prod_codigo.' '.$prod_descricao.'',
								));
								
								
							}
								
							}else{
								
								//não existe -> insere e pega os dados
								
								$proximo_id = $dao->ProximoId();
								$codprox    = $proximo_id[0];								
								$prox_id    = $codprox->getProximo_Id();
								
								$for = new Fornecedor();
								
								$for->setCodigo($prox_id);
								$for->setNome(utf8_encode($xml->NFe->infNFe->emit->xNome));
								$for->setEndereco($xml->NFe->infNFe->emit->enderEmit->xLgr);
								$for->setEstado($xml->NFe->infNFe->emit->enderEmit->UF);
								$for->setCidade($xml->NFe->infNFe->emit->enderEmit->xMun);
								$for->setBairro($xml->NFe->infNFe->emit->enderEmit->xBairro);
								$for->setCep($xml->NFe->infNFe->emit->enderEmit->CEP);
								$for->setTelefone('');
								$for->setFax('');
								$for->setContato('');
								$for->setCnpjCpf($xml->NFe->infNFe->emit->CNPJ); 
								$for->setIncricoesEstadual($xml->NFe->infNFe->emit->IE);
								$for->setContaCtb('');
								$for->setPlaca('');
								$for->setUf('');
								$for->setAntt('');
								$for->setPais($xml->NFe->infNFe->emit->enderEmit->cPais);
								$for->setEmail($xml->NFe->infNFe->emit->email);
								$for->setProdutor('');
								$for->setObs('');
								$for->setTipo('1');
								
								$dao->inserir($for);
								
								array_push($data,array(
									'cod' => ''.$prox_id.'',
									'nome' => ''.$xml->NFe->infNFe->emit->xNome.'',
									'ende' => ''.$xml->NFe->infNFe->emit->enderEmit->xLgr.'',
									'esta' => ''.$xml->NFe->infNFe->emit->enderEmit->UF.'',
									'cid' => ''.$xml->NFe->infNFe->emit->enderEmit->xMun.'',
									'barr' => ''.$xml->NFe->infNFe->emit->enderEmit->xBairro.'',
									'cep' => ''.$xml->NFe->infNFe->emit->enderEmit->CEP.'',
									'tel' => '',
									'cnpjcpf' => ''.$xml->NFe->infNFe->emit->CNPJ.'',
									'ins' => ''.$xml->NFe->infNFe->emit->IE.'',
									'arquivo' => ''.$arquivo.'',
									'Numero'=>''.$xml->NFe->infNFe->ide->nNF.'',
									'dtemis'=>''.implode(".", array_reverse(explode("-", "".$xml->NFe->infNFe->ide->dEmi.""))).'',
									'cfop'=>''.$xml->NFe->infNFe->det->prod->CFOP.'',
									'dtentrada'=>''.implode(".", array_reverse(explode("-", "".$xml->NFe->infNFe->ide->dSaiEnt.""))).'',
									'vIPI'=>''.$xml->NFe->infNFe->total->ICMSTot->vIPI.'',
									'vFrete'=>''.$xml->NFe->infNFe->total->ICMSTot->vFrete.'',
									'vST'=>''.$xml->NFe->infNFe->total->ICMSTot->vST.'',
									'vOutro'=>''.$xml->NFe->infNFe->total->ICMSTot->vOutro.'',
									'vDesc'=>''.$xml->NFe->infNFe->total->ICMSTot->vDesc.'',
								));						
								
							foreach($xml->NFe->infNFe->det as $prod){	
								
								$daor = new RelacionaProdutoDAO();
								$vetr = $daor->verificaRelacionamento($prod->prod->cProd);
								$numr = count($vetr);
								
								if($numr > 0){
									$rel = $vetr[0];
									
									$idfornec  = $rel->getIdFornecedor();
									$idprod    = $rel->getIdProduto();
									$idprodrel = $rel->getIdProdutoRelacionado();
									
									//ProdutoFormulacao
									$daop =  new ProdutosDAO();
									$vetp = $daop->ProdutoFormulacao($idprodrel);
									$nump = count($vetp);
									
									if($nump > 0){
										$pro = $vetp[0];
										
										$prod_codigo    = $pro->getCodigo();
										$prod_descricao = $pro->getDescricao();
										
										
									}else{
										
										$prod_codigo 	= "";
										$prod_descricao = "";
									
									}
									
								 }else{
									
										$prod_codigo 	= "";
										$prod_descricao = "";
										
								 }
								
								array_push($data,array(
									'cProd' => ''.$prod->prod->cProd.'',
									'xProd' => ''.$prod->prod->xProd.'',
									'NCM' => ''.$prod->prod->NCM.'',
									'CFOP' => ''.$prod->prod->CFOP.'',
									'uCom' => ''.$prod->prod->uCom.'',
									'qCom' => ''.$prod->prod->qCom.'',
									'vUnCom' => ''.$prod->prod->vUnCom.'',
									'vProd' => ''.$prod->prod->vProd.'',
									'uTrib' => ''.$prod->prod->uTrib.'',
									'qTrib' => ''.$prod->prod->qTrib.'',
									'vUnTrib' => ''.$prod->prod->vUnTrib.'',
									'indTot' => ''.$prod->prod->indTot.'',									
									'relacionado' => ''.$prod_codigo.' '.$prod_descricao.'',
								));
								
								
							}
								
								
							
							}
						}else{
							
							array_push($data,array(
									'msgerro' => '2',									
								));
						
						}
						 }else{
							
							array_push($data,array(
									'msgerro' => '1',									
								));
								
							
						}//termino do if que verifica a nota
						 
						 }else{
							
							 $error = true;							 	
						}
					}
						
				}
				
				echo json_encode($data);
				
							
									
			break;
			case 'inserir':
				
				$item     = $_REQUEST['item'];										
				$arquivo  = $_REQUEST['arquivo'];
				$condicao = array();
				$qtdprod  = count($_REQUEST['item']);
				/*echo "<pre>";
				print_r($_REQUEST);*/
				foreach($item as $key=>$value){
										
					
					$xml =  simplexml_load_file($arquivo);
					
					
					
					$cProd 		   = $value['cProd'];
					$xProd 		   = $value['xProd'];
					$qCom  		   = $value['qCom'];
					$vProd		   = $value['vProd'];
					$CFOP  		   = $value['CFOP'];
					$IDPROD_REL    = $value['IDPROD_REL'];
					$cfor		   = $value['cfor'];
					$formcfop      = $_REQUEST['cfop'];
					$formdtentrada = $_REQUEST['dtentrada'];
					
					$nNF     = $xml->NFe->infNFe->ide->nNF;		
					$serie   = $xml->NFe->infNFe->ide->serie;
					if(empty($_REQUEST['dtentrada'])){
						
						$dEmi         = explode('T',$xml->NFe->infNFe->ide->dhEmi);
						$hS           = explode('-',$dEmi[1]);						
						$hSaiEnt	  = $hS[0];
						$dEmi         = implode(".", array_reverse(explode("-", "".$dEmi[0]."")));
						
						
					}else{
						
						$dEmient	   = $_REQUEST['dtentrada'];
						
						$dEmi2         = explode('T',$xml->NFe->infNFe->ide->dhEmi);
						$dEmi          = implode(".", array_reverse(explode("-", "".$dEmi2[0]."")));
						//print_r($dEmi2);
						$hS            = explode('-',$dEmi2[1]);										
						$hSaiEnt	   = $hS[0];
					}
					
					
					//$dSaiEnt = implode(".", array_reverse(explode("-", "".$xml->NFe->infNFe->ide->dSaiEnt."")));
					//$hSaiEnt = $xml->NFe->infNFe->ide->hSaiEnt;	
					$vFrete	 = !empty($xml->NFe->infNFe->det->prod->vFrete) ? $xml->NFe->infNFe->det->prod->vFrete : '0.00';										
					$vSeg    = !empty($xml->NFe->infNFe->det->prod->vSeg)   ? $xml->NFe->infNFe->det->prod->vSeg   : '0.00';
					$vOutro  = !empty($xml->NFe->infNFe->det->prod->vOutro) ? $xml->NFe->infNFe->det->prod->vOutro : '0.00';
					$uCom    = $xml->NFe->infNFe->det->prod->uCom;
					$infAdic = $xml->NFe->infNFe->infAdic->infCpl;
					
					
					$vIPI	 = !empty($xml->NFe->infNFe->det->imposto->IPI->IPITrib->vIPI) ? $xml->NFe->infNFe->det->imposto->IPI->IPITrib->vIPI : '0.00';
					$vBC	 = !empty($xml->NFe->infNFe->det->imposto->IPI->IPITrib->vBC) ? $xml->NFe->infNFe->det->imposto->IPI->IPITrib->vBC : '0.00';
					$pIPI	 = !empty($xml->NFe->infNFe->det->imposto->IPI->IPITrib->pIPI) ? $xml->NFe->infNFe->det->imposto->IPI->IPITrib->pIPI : '0.00';
					
					$vNF	 = !empty($xml->NFe->infNFe->total->ICMSTot->vNF) ? $xml->NFe->infNFe->total->ICMSTot->vNF : '0.00';
					$vBCs	 = !empty($xml->NFe->infNFe->total->ICMSTot->vBC) ? $xml->NFe->infNFe->total->ICMSTot->vBC : '0.00';
					
					$qVol 	 = $xml->NFe->infNFe->transp->vol->qVol;	
					$esp     = $xml->NFe->infNFe->transp->vol->esp;	
					$pesoB	 = $xml->NFe->infNFe->transp->vol->pesoB;
					$pesoL	 = $xml->NFe->infNFe->transp->vol->pesoL;		
					
					
					$vDesc   = !empty($xml->NFe->infNFe->total->ICMSTot->vDesc) ? $xml->NFe->infNFe->total->ICMSTot->vDesc : '0.00';
					$vtotprod   = !empty($xml->NFe->infNFe->total->ICMSTot->vProd) ? $xml->NFe->infNFe->total->ICMSTot->vProd : '0.00';
					
					$placa	 = $xml->NFe->infNFe->transp->veicTransp->placa;
					$UF		 = $xml->NFe->infNFe->transp->veicTransp->UF;
					
					$ICMS00    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->CST;
					$ICMS10    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->CST;
					$ICMS20    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->CST;
					$ICMS30    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->CST;
					$ICMS40    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->CST;
					$ICMS41    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS41->CST;
					$ICMS50    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS50->CST;
					$ICMS51    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->CST;
					$ICMS60    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->CST;
					$ICMS70    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->CST;
					$ICMS90    = $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->CST;
					
					$ICMSSN102    = $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->CSOSN;
					$ICMSSN202    = $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->CSOSN;
					$ICMSSN500    = $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->CSOSN;
					$ICMSSN900    = $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->CSOSN;
					 
					if($ICMSSN102 == 102){
					
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->vICMS : 'NULL';	
						
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN102->vICMSST : 'NULL';	
						
					}else if($ICMSSN202 == 202){
						
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->vICMS : 'NULL';	
						
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->vICMSST : 'NULL';
					
					}else if($ICMSSN500 == 500){
						
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->vICMS : 'NULL';	
						
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN500->vICMSST : 'NULL';
						
					}else if($ICMSSN900 == 900){
						
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN202->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->vICMS : 'NULL';	
						
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMSSN900->vICMSST : 'NULL';
						
					}
					
					if($ICMS00 == "00"){
						
						//$xml->NFe->infNFe->det->imposto->ICMS->ICMS00->
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->vICMS : 'NULL';	
										
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS00->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS00->vICMSST : 'NULL';						
						
					}else if($ICMS10 == "10"){
						
						//$xml->NFe->infNFe->det->imposto->ICMS->ICMS10->
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->vICMS : 'NULL';					
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS10->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS10->vICMSST : 'NULL';
					}else if($ICMS20 == "20"){
					
						//$xml->NFe->infNFe->det->imposto->ICMS->ICMS20->
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->vICMS : 'NULL';					
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS20->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS20->vICMSST : 'NULL';
						
					}else if($ICMS30 == "30"){
						
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->vICMS : 'NULL';					
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS30->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS30->vICMSST : 'NULL';
						
					}else if($ICMS40 == "40" or $ICMS41 == "41" or $ICMS50 == "50"){
						
						//$xml->NFe->infNFe->det->imposto->ICMS->ICMS40->
											
						
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->vICMS : 'NULL';					
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS40->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS40->vICMSST : 'NULL';
						
					}else if($ICMS51 == "51"){
						
						//$xml->NFe->infNFe->det->imposto->ICMS->ICMS51->
										
						
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->vICMS : 'NULL';					
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS51->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS51->vICMSST : 'NULL';
						
						
					}else if($ICMS60 == "60"){
						
						//$xml->NFe->infNFe->det->imposto->ICMS->ICMS60->
						
						
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->vICMS : 'NULL';					
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS60->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS60->vICMSST : 'NULL';
						
					}else if($ICMS70 == "70"){						
						
						//$xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vICMS						
												
						
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vICMS : 'NULL';					
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS70->vICMSST : 'NULL';
						
					}else if($ICMS90 == "90"){
				
						//$xml->NFe->infNFe->det->imposto->ICMS->ICMS90->
							
						$orig 	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->orig) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->orig : '';
						$CST       = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->CST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->CST : '';						
						$modBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->modBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->modBC : 'NULL';					
						$pRedBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pRedBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pRedBC : 'NULL';					
						$vBC	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->vBC) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->vBC : 'NULL';					
						$pICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pICMS : 'NULL';					
						$vICMS	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->vICMS) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->vICMS : 'NULL';					
						$modBCST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->modBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->modBCST : 'NULL';						
						$pMVAST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pMVAST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pMVAST : 'NULL';					
						$pRedBCST  = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pRedBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pRedBCST : 'NULL';						
						$vBCST	   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->vBCST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->vBCST : 'NULL';					
						$pICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->pICMSST : 'NULL';						
						$vICMSST   = !empty($xml->NFe->infNFe->det->imposto->ICMS->ICMS90->vICMSST) ? $xml->NFe->infNFe->det->imposto->ICMS->ICMS90->vICMSST : 'NULL';
						
					}
					
					
							$condicao[]  = " f.cnpj_cpf = '".$xml->NFe->infNFe->transp->transporta->CNPJ."' ";
							$condicao[]  = " f.inscrica_estadual = '".$xml->NFe->infNFe->transp->transporta->IE."' ";

							$where = '';
							if(count($condicao) > 0){							
								$where = ' where'.implode('AND',$condicao);									
							}
							
							$dao = new FornecedorDAO();
							$vet = $dao->VerificaFornecedor($where);
							$num = count($vet);
							
							if($num > 0){
								//existe -> pega os dados
								
								$for = $vet[0];
								
								$cod	  = $for->getCodigo();	
								$nome 	  = $for->getNome();
								$ende 	  = $for->getEndereco();
								$esta 	  = $for->getEstado();
								$cid  	  = $for->getCidade();
								$barr 	  = $for->getBairro();
								$cep  	  = $for->getCep();
								$tel  	  = $for->getTelefone();
								$fax  	  = $for->getFax();
								$cont 	  = $for->getContato();
								$cnpjcpf  = $for->getCnpjCpf(); 
								$ins	  = $for->getIncricoesEstadual();
								$contactb = $for->getContaCtb();
								$placa	  = $for->getPlaca();
								$uf		  = $for->getUf();
								$antt	  = $for->getAntt();
								$pais	  = $for->getPais();
								$emil	  = $for->getEmail();
								$produtor = $for->getProdutor();
								$obs	  = $for->getObs();
								$tipo	  = $for->getTipo();
								
							}else{
								
								$proximo_id = $dao->ProximoId();
								$codprox    = $proximo_id[0];								
								$cod	    = $codprox->getProximo_Id();
								
								$for = new Fornecedor();
								
								$for->setCodigo($cod);
								$for->setNome(utf8_encode($xml->NFe->infNFe->transp->transporta->xNome));
								$for->setEndereco($xml->NFe->infNFe->transp->transporta->xEnder);
								$for->setEstado($xml->NFe->infNFe->transp->transporta->UF);
								$for->setCidade($xml->NFe->infNFe->transp->transporta->xMun);
								$for->setBairro('NULL');
								$for->setCep('NULL');
								$for->setTelefone('');
								$for->setFax('');
								$for->setContato('');
								$for->setCnpjCpf($xml->NFe->infNFe->transp->transporta->CNPJ); 
								$for->setIncricoesEstadual($xml->NFe->infNFe->transp->transporta->IE);
								$for->setContaCtb('');
								$for->setPlaca('');
								$for->setUf('');
								$for->setAntt('');
								$for->setPais('1058');
								$for->setEmail('NULL');
								$for->setProdutor('');
								$for->setObs('');
								$for->setTipo('1');
								
								$dao->inserir($for);
							
							
							}
					
					$daon = new NotasEntradaMDAO();
					$vetn = $daon->ProximoId();
					$nem  = $vetn[0];
					$reg  = $nem->getProximoId();

					
					$ntem = new NotasEntradaM();
					
					$ntem->setEntradaSaida('E'); //ver
					$ntem->setNumeroNota($nNF);
					$ntem->setSerieNota($serie);
					$ntem->setDataEmissao($dEmi);
					$ntem->setCfop($formcfop);//validar cfop com st e busca na tabela natura		
					$ntem->setDataEntrada($dEmient);
					$ntem->setCodigoFornecedor($cfor);
					$ntem->setHorario($hSaiEnt);
					$ntem->setValorFrete($vFrete); // FRETE COMPOS POR 
					$ntem->setValorSeguro($vSeg); // 
					$ntem->setOutrosDespecas($vOutro);
					$ntem->setValorIpi($vIPI); // PEGAR NO DETALHE 
					$ntem->setBaseCalculo($vBCs); // PEGAR NO DETALHE 
					$ntem->setValorIcm($vICMS);
					$ntem->setBaseCalculoSubs($vBCST); // PEGAR NO DETALHE 
					$ntem->setValorIcmSubs($vICMSST); // PEGAR NO DETALHE 
					$ntem->setValorTotalProdutos($vProd); // PEGAR NO DETALHE 
					$ntem->setValortotalnota($vNF); //valor toral da nota pegar no total
					$ntem->setCodTransp($cod); // iqual fornecedor
					$ntem->setFrete((int)$vFrete);// NO TOTAL
					$ntem->setPlaca($placa);
					$ntem->setUfPlaca($UF);
					$ntem->setQuantidadeRodape($qVol); //QVOL
					$ntem->setEspecie($esp);//esp
					$ntem->setMarca('');//
					$ntem->setNumero('');
					$ntem->setPesoBruto($pesoB); //pesoB
					$ntem->setPesoLiquido($pesoL);//pesol
					$ntem->setValorDescontoAplicado($vDesc); // NOS TOTAL O vDesc
					$ntem->setProdCodigo($IDPROD_REL); // CODIGO PRODUTO
					$ntem->setProdCodFornecedor($cfor); // COD FORNECEDOR
					$ntem->setProdutoQuantidade($qCom); // QUANTIDADE DOS INTENS DO PRODUTO
					$ntem->setProdPrecoUnitario($vProd); // PRECO UNITARIO
					$ntem->setProdLiquotaIcms($pICMS); // pICMS	
					$ntem->setProdValorIcm($vICMS); // vICMS
					$ntem->setProdAliquotaIpi($pIPI); // IPI / pIPI
					$ntem->setProdValorIpi($vIPI); //// IPI / VIPI
					$ntem->setProdValorDesc($vDesc); // vDesc 
					$ntem->setProdUnidade($uCom); // 
					$ntem->setProdSubTotal($vtotprod);
					$ntem->setProdIcmsSubst($vICMSST);
					$ntem->setReg($reg);	
					$ntem->setCfopInteiro($formcfop);
					$ntem->setAvistaAprazo(0);
					$ntem->setProdPecas(0);
					$ntem->setReboque('');	
					$ntem->setUfReboque('');
					$ntem->setNfeCst($CST);
					$ntem->setNfeOrig($orig);	
					$ntem->setNfeVbc($vBC);
					$ntem->setNfeVicms($vICMS);
					$ntem->setNfePredBc($pRedBC);
					$ntem->setNfeVbcst($vBCST);
					$ntem->setNfeVicmsSt($vICMSST);
					$ntem->setNfeNfAdFisco('');
					$ntem->setNfeInfCpl($infAdic); 
					$ntem->setTipoNota(0);
					$ntem->setNfeGerado('');
					$ntem->setNfeAliqIcmss($pICMSST);
					$ntem->setAcrescerPauta('S');
					$ntem->setPrediCmssNfe('NULL');
					$ntem->setFundesa('NULL');
					$ntem->setVendedor('');
					$ntem->setNpVendedor('');
					$ntem->setPrazo1('NULL');
					$ntem->setPrazo2('NULL');
					$ntem->setPrazo3('NULL');
					$ntem->setPrazo4('NULL');
					$ntem->setPrazo5('NULL');	 		
					$ntem->setCondVendas('');
					$ntem->setTabelaPrecos('');
					$ntem->setCondPaga('');
					$ntem->setRegVendedor('NULL');
					$ntem->setEntrada1(0.00);
					$ntem->setDataEntrada1('NULL');
					$ntem->setBaseIpi(0.00);
					$ntem->setProdBaseIpi(0.00);	
					$ntem->setIndIpiAliqUnid('');
					$ntem->setNumeroCarga('');
					$ntem->setPedido('');		
					$ntem->setProdValorFrete($vFrete);
					$ntem->setProdValorSeguro($vSeg);	
					$ntem->setProdVlRoutDespecas('NULL');
					$ntem->setJageRoucReceber(''); 
					$ntem->setCodPrecoPrawer('');
					$ntem->setSituacao('');
					$ntem->setProdCaixas('NULL');
					$ntem->setEspessura(0.00);
					$ntem->setLargura(0.00);
					$ntem->setComprimento(0.00);
					$ntem->setPercDesc(0.00);
					$ntem->setNfeInfAdProd('');
					$ntem->setConsulate(0.00);
					$ntem->setPcredSn(0.00);
					$ntem->setVcredIcmssn($vICMS);
					$ntem->setCfopNota($formcfop);
					$ntem->setHoraRegistro($hSaiEnt);
					$ntem->setModBc($modBC);
					$ntem->setModBcSt($modBCST);
					$ntem->setReferencia('');
					$ntem->setManifesto('');
					$ntem->setPedidoLiberado('');
					
					
					$daon->inserir($ntem);
					
				}
				echo "Inserido com sucesso";
			break;
			case 'relacionar':
				
				$idfornec  = $_REQUEST['idfor'];
				$idprod    = $_REQUEST['idpro'];
				$idprodrel = $_REQUEST['produto'];
				$id		   = $_REQUEST['id'];
				$nomepro   = $_REQUEST['nomepro'];
				
				$rel = new RelacionaProduto();
			
				$rel->setIdFornecedor($idfornec);
				$rel->setIdProduto($idprod);
				$rel->setIdProdutoRelacionado($idprodrel);
				
				$dao = new RelacionaProdutoDAO();
				$dao->inserir($rel);
				
				echo json_encode($_REQUEST);
				
			break;
			
			case 'teste':
				
				
				include_once("../libs/NFe/ToolsNFePHP.class.php");
							
				
				$nfe = new ToolsNFePHP();
				
				$AN = 'false';
				$chNFe = '43150487958674000181558900075443931694638066';
				$tpAmb = '1';
				$modSOAP = '2'; //usando cURL
				$xjust = "";
				if (!($xml = $nfe->getNFe($AN,$chNFe,$tpAmb,$modSOAP))){
				
					echo "Houve erro !! $xml $nfe->errMsg";
					echo '<br><br><PRE>';
					echo htmlspecialchars($nfe->soapDebug);
					echo '</PRE><BR>';
					
				} else {
				
					print_r($xml);
				}

				
				/*if (!($xml = $nfe->manifDest($chNFe,210210,$xjust,$tpAmb))){
				
					echo "Houve erro !! $xml $nfe->errMsg";
					echo '<br><br><PRE>';
					echo htmlspecialchars($nfe->soapDebug);
					echo '</PRE><BR>';
					
				} else {
				
					print_r($xml);
				}*/
				
				

			break;
			
			case 'verificarelacionamento':
			
				$item     = $_REQUEST['item'];														
				$condicao = array();
				
				
				foreach($item as $key=>$value){
					
					$cProd 		   = $value['cProd'];
					$xProd 		   = $value['xProd'];
					$qCom  		   = $value['qCom'];
					$vProd		   = $value['vProd'];
					$CFOP  		   = $value['CFOP'];
					$cfor		   = $value['cfor'];
					
					
					if(empty($value['IDPROD_REL'])){
						
						array_push($condicao,array(
							'rel' => ''+$xProd+'',									
						));
						
					}
					
					
				}
				
				
				echo json_encode($condicao);
			
			break;
			
		}

	

	

	}

	

?>