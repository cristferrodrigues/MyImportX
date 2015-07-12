// JavaScript Document

$(document).ready(function(e) {
    
	
	$("input[name='RadioGroup1']").click(function(){
	
		
		if($(this).val() == 1){
			
			$("#por_arquivo").show();
			$("#por_barras").hide();
			
		}else if($(this).val() == 2){
			
			$("#por_arquivo").hide();
			$("#por_barras").show();
			
		}
		
	});
	
});
$(document).ready(function () {
   $('form[id="upload2"]').bind('submit', function(){
	   	$("#subimp").click();
     	return false;
   });
});
$(document).ready(function(e) {
    $("#dtentrada").change(function(){
				
		var data_inicio   = $(this).val();
		var data_fim      = $("#nota_dtemi").html();		
		
		var compara1 = parseInt(data_inicio.split(".")[2].toString() + data_inicio.split(".")[1].toString() + data_inicio.split(".")[0].toString());
		var compara2 = parseInt(data_fim.split(".")[2].toString() + data_fim.split(".")[1].toString() + data_fim.split(".")[0].toString());
	
		
		if(compara1 == ""){
			alert("O campo data não pode estar em branco!");
		}else{
			
			if(compara1 < compara2){
				alert('Data de entrada não pode ser menor que a data da emissão!');	
		
			}
			
		}
		
	});
	
	$("#cfop").blur(function(){
			
		if($(this).val() > 5000){
			//alert('CFOP MAIOR QUE O PLANEJADO');	
			bootbox.alert("CFOP informada não é valida para operações de entrada!", function() {
	
			});			
		}
		
	});
	
});

$(function()
{
    
	$("#subimp").attr('disabled',true);
	
	$("#subimp").click(function(){
			
		bootbox.dialog({
				  message: "<div align='center'><img src='../images/loading-icon.gif'/></div>",
				  title: "Aguarde..",								  
				});	
		var manifest = $("select[name='manif']").val();
		
		if(manifest == ""){
			alert("Informe uma operação!");
			 bootbox.hideAll();
			return false;
		}
		
		
		if( $("#file_upload2").val() != ""){
			
		$.ajax({
            url: '../php/relacionamento2-exec.php',
            type: 'POST',
            data: {file_upload:$("#file_upload2").val(),act:'sefaz',manif:$('select[name="manif"] :selected').val()},
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR)
            {
	
            	if(typeof data.error === 'undefined')
            	{
            		// Sucesso até chamar a função para processar o formulário
            		var file = data.files;
					 bootbox.hideAll();
					console.log('sucesso: ' + data.files);
					$('#msg').html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>Ok Tudo certo!</div>');
					
					submitForm2(data);
					$("#subimp").focus();
					
					
					
            	}
            	else
            	{
					 bootbox.hideAll();
            		console.log('ERRORS: ' + data.error);
					$('#msg').html('<div class="alert alert-block"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Aviso!</h4>'+data.error+'</div>')
					$("#subimp").focus();
            	}
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
            	
            	console.log('ERRORS2: ' + textStatus);
				$('#msg').html('<div class="alert alert-block"><button type="button" class="close" data-dismiss="alert">&times;</button><h4>Aviso!</h4>'+textStatus+'</div>')
				 bootbox.hideAll();
				$("#subimp").focus();
            	
            }
        });
		
		$("#subimp").attr('disabled',false);
		}else{
			
			alert("Digite a chave ou passe o leitor de codigo de barras!");
			 bootbox.hideAll();
			$("#subimp").focus();
		}
	});

	
});

 function submitForm2(data2)
	{
		//data.files
		
		
		$.ajax({
			url: '../php/relacionamento2-exec.php',
            type: 'POST',
            data: {act:'box',filenames:data2.files},
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR)
            {

				if(data[0].msgerro == '1'){
				
					alert('Nota já existe!');
				}else if(data[0].msgerro == '2'){
					alert('Essa Nota não pertencia a este destinatario!');
				}else{
				
				$("#nota_dados").show();
				$("#for_dados").show();
				$("#total_dados").show();
				$("#btnaction").show();

				$("#nota_numero").html(data[0].Numero);
				$("#nota_dtemi").html(data[0].dtemis);
				//$("#cfop").val(data[0].cfop);
				$("#cfop").val();
				$("#cfop").focus();
				$("#dtentrada").val(data[0].dtentrada);				
				$("#for_nome").html(data[0].nome);
				$("#for_endereco").html(data[0].ende);
				$("#for_cidade").html(data[0].cid);
				$("#for_estado").html(data[0].esta);
				$("#for_cnpjcpf").html(data[0].cnpjcpf);
				
				// para o formulario de apropriação
				
				$("#for_nomes").html(data[0].nome);
				$("#nota_numeros").html(data[0].Numero);
				$("#dt_emissao").html(data[0].dtemis);
				$("#cfor").val(data[0].cod);
				
				//$("").html(data[0].ende);
				var table   = "";
				var vtotpro = 0;
				var vltotal = 0;
				for (var i = 1; i < data.length; i++) {
					
					var dados = data[i];
					
					
					
					table += ' <tr id="'+dados.cProd+'">';
					table += '<input type="hidden" name="item['+i+'][cfor]" value="'+data[0].cod+'"/>';
					table += '<td><input type="hidden" name="item['+i+'][cProd]" value="'+dados.cProd+'"/>'+dados.cProd+'</td>';
					table += '<td><input type="hidden" name="item['+i+'][xProd]" value="'+dados.xProd+'"/>'+dados.xProd+'</td>';
					table += '<td><input type="hidden" name="item['+i+'][qCom]" value="'+dados.qCom+'"/>'+dados.qCom+'</td>';
					table += '<td><input type="hidden" name="item['+i+'][vProd]" value="'+dados.vProd+'"/>'+dados.vProd+'</td>';
					table += '<td><input type="hidden" name="item['+i+'][CFOP]" value="'+dados.CFOP+'"/>'+dados.CFOP+'</td>';
					if(dados.relacionado == " "){
						table += '<td id="rel'+dados.cProd+'"><a href="#" onClick="relacionarproduto('+data[0].cod+',\''+dados.cProd+'\','+i+');" class="btn btn-default">Relacionar</a></td>';
					}else{
						var rela = dados.relacionado.split(" ");
						table += '<td><input type="hidden" name="item['+i+'][IDPROD_REL]" value="'+rela[0]+'"/>'+dados.relacionado+'</td>';
					}
					table += '</tr>';
								
					vtotpro = vtotpro + parseFloat(dados.vProd);
				}
				
				vltotal = parseFloat(vtotpro) + parseFloat(data[0].vIPI) + parseFloat(data[0].vST) + parseFloat(data[0].vFrete) + parseFloat(data[0].vOutro) - parseFloat(data[0].vDesc);
				
				$("#totalnota").html(number_format(vltotal,2,',','.'));
				$("#valor_tot").html(number_format(vltotal,2,',','.'));
				$("#valor_tots").val(vltotal);
				
				
				$('#dyntable').dataTable({					
					 "bSort" : false,
					 "paging":   false,
					 "ordering": false,
					 "info":     false,
					 "bDestroy": true
				});
				
				$("#dyntable_filter").css({'display':'none'})
				
				$('#relaciona').append('<input type="hidden" name="arquivo" value="'+data[0].arquivo+'"/>');
				$('#dyntable tbody').html(table);	
								
				}
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
            	// Handle errors here
            	console.log('ERRORS: ' + textStatus);
				alert('ERRORS: ' + textStatus);
				 bootbox.hideAll();
            },
            complete: function()
            {
            	// STOP LOADING SPINNER
            }
		});
	}
	
	
	$(document).ready(function(e) {
        
		$('select[name="manif"]').change(function(){
			
			
			switch ($(this).val()){
				
				case '210200':
				
					bootbox.confirm("<h2>CONFIRMACAÇÃO DA OPERAÇÃO</h2> confirmando a ocorrência da operação e o recebimento da mercadoria (para as operações com circulação de mercadoria).<br/> EX.: Você adiquiriu a mercadoria e ja recebeu a mesma em seu estabelecimento. Deseja confirmar esta manifestação?", function(result) {
			
						 if(result == true){
								$("#file_upload2").focus();
								$("#subimp").attr('disabled',false);
							}else{
								$("#subimp").attr('disabled',true);						
							}
					
						}); 
					
				break;
				case '210210':
									
						
					
					bootbox.confirm("<h2>CIÊNCIA DA OPERAÇÃO</h2> declarando ter ciência da operação destinada ao CNPJ, mas ainda não possui elementos suficientes para apresentar uma manifestação conclusiva, como as acima citadas. <br/>EX.: Você confirma estar ciente desta compra, mas ainda não recebeu a mercadoria. Deseja confirmar esta manifestação? ", function(result) {
						 
								
						if(result == true){
								$("#file_upload2").focus();
								$("#subimp").attr('disabled',false);
							}else{
							
								$("#subimp").attr('disabled',true);
							}
									 
						 
						}); 
					
					
					
					
				break;
				case '210220':
															
					
					bootbox.confirm("<H2>DESCONHECIMEMTO DA OPERAÇÃO</H2> declarando o Desconhecimento da Operação. <br/>EX.: Você não fez esta compra. Deseja confirmar esta manifestação?", function(result) {
					 	
						if(result == true){
						$("#file_upload2").focus();
							$("#subimp").attr('disabled',false);
						}else{
						
							$("#subimp").attr('disabled',true);
						}
							
					}); 
					
				break;
				case '210240':										
										
					bootbox.confirm(" OPERAÇÃO NÃO REALIZADO – declarando que a Operação não foi Realizada (com Recusa do Recebimento da mercadoria e outros) e a justificativa porque a operação não se realizou. EX.: Você comprou a mercadoria, mas por motivos de (devolução, furto, desacordo, ou outros) não recebeu a mercadoria. Deseja confirmar esta manifestação?", function(result) {
						
							if(result == true){
								
								$("#file_upload2").focus();
								$("#subimp").attr('disabled',false);
								
							}else{
							
								$("#subimp").attr('disabled',true);	
								
							}
					}); 
										
				break;
				default:
										
					$("#subimp").attr('disabled',true);	
					
				break;
			
			}
		
		});
		
    });
	
	
	$(document).ready(function(e) {
        
		$("#sv").click(function(){
	//		alert(''+$("#valor_tots").val()+' '+$("#valortotal").val()+'');
			var dtemi 	   = $("#dt_emissao").html();
			var cfor  	   = $("#cfor").val();
			var numeronota = $("#nota_numeros").html();
			var totalnota  = $("#valor_tot").html();
			var arquivo    = $("input[name='arquivo']").val();
			var cfop	   = $("#cfop").val();
						
			var array = [{"empresa":"0001","cedente":""+cfor+"","emissao":""+dtemi+"","tipo":"DP","numeronota":""+numeronota+"","totalnota":""+totalnota+"","arquivo":""+arquivo+"","cfop":""+cfop+""}];
		
			if(parseFloat($("#valor_tots").val()) != parseFloat($("#valortotal").val())){
					
					alert('O valor apropriado é diferente do valor da nota. Reveja O(s) Lançamento(s).');
					
			}else{
					
				
				mostrarduplics(arquivo,array);						
					
					
			}
		});
		
    });
	
	function mostrarduplics(arquivo,array){
	
		
			$.ajax({
				type:'POST',
				url:"../php/duplic-exec.php",
				cache: false,
				dataType: 'json',
				data:{act:'mostra',arquivo: arquivo},
				success: function(data){
					 var html = "";
					 for(i =0; i < data.length; i++){
					 	
						html += '<strong>Numero Da Duplicata: </strong>'+data[i].nDup+' <br/>';
						html += '<strong>Data vecimento Da Duplicata:</strong> '+data[i].dVenc+' <br/>';
						html += '<strong>Valor Da Duplicata:</strong> '+data[i].vDup+'<br/>';
						html += '------------------------------------------------- <br/>';	
					 
					 }
					
					bootbox.dialog({
					  message: ""+html+"",
					  title: "Duplicatas a serem inseridas",
					  buttons: {					
						main: {
						  label: "Ok!",
						  className: "btn-primary",
						  callback: function() {
							
							$.ajax({
									type:'POST',
									url:"../php/duplic-exec.php",
									cache: false,
									dataType: 'json',
									data:{act:'inserir',dados: array},
									success: function(data){
										
										if(data[0].tipo == 'ok'){
											alert(data[0].msg);
											 
											$("#nota_dados").hide();
											$("#for_dados").hide();
											$("#total_dados").hide();
											$("#btnaction").hide();
											$("#subimp").attr('disabled',true);
											$("#msg").hide();
											$("#cfop").val('');
											$("#file_upload2").val('');
											$("#file_upload2").focus();
											 bootbox.hideAll(); 
											$('#apropria').modal('hide');
											
										}else if(data[0].tipo == 'not'){
											alert(data[0].msg);
										}
																							
										
									}	
								});
										
								return false;
							
						  }
						}
					  }
					});

				}	
			});
	
	}