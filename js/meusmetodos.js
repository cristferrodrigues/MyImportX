// JavaScript Document

$(document).ready(function(e) {
   	   $forms = $('form[id="formformulapadrao"]');
	$forms.validate({
		rules: {
			 codproduto:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			codmat:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },									
			},
		messages:{
			 codproduto: {
                      required:"Informar um produto",                      
                      },		  
					  
			codmat: {
                      required:"informar materia prima",                      
                      },	  		  
			},
		submitHandler: function(form) {
  		 				
			var $form = $(form);
            var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',
				url: '../php/formula-exec.php',
				data: params,				
				success: function(data){
					alert(data);
					
					$('#locprod').val('');
					$('#codmat').val('');
					$('#codmat').focus();					
					$('.mp').html('');
					$('#kg').val('');
					$('#participacao').val('');
					$('#cunit').val('');
					
					ListaGridFormulacao($("#codproduto").val());
				},
				error: function(data){
					
				}
			})
			return false;
		}
				
	});
	

	/*$(function(){
		$('select').selectric();
	});		*/
	
});

$(document).ready(function(e) {
	$('#btnadd').attr('disabled',true);
    $("#codproduto").blur(function(){
		$("#codprodutos").val($(this).val());
		$('#btnadd').attr('disabled',false);	
	});
});

function ListaGridFormulacao(codpro){
	
	
	$.ajax({
				type: 'POST',
				url: '../php/listagemdeformulcao.php',
				data: {codprod:codpro},	
				success: function(data){
					
					$('button').attr('disabled',false);					
					$(".rm").show();
					$("#listar").html(data);	
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,						
						 "fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(4)', nRow).css( "text-align", "right" );
                                 

                                  return nRow;
				          },
						 "bRetrieve": true,	  							
					});
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
					bootbox.hideAll();
				},
				error: function(data){
					alert(data.status);	
				}
			})
			return false;
	

}

$(document).ready(function(e) {
    var path = window.location.pathname.split('/');
	
	if(path[4] == "atualizar-formulacao.php"){
		
		bootbox.dialog({
			  message: "Estou buscando sua alteração, relaxa e aquarde ;D",
			  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
			});
			
		ListaGridFormulacao($("#codprodutos").val());
			
		
	}
});
function formatadata(data){
	var novadata = data.split(".");
	var nvdt = ""+novadata[0] +"/"+novadata[1]+"/"+novadata[2]+"";
	return nvdt;
}

$(document).ready(function(e) {
	
	$('#remove').click(function(){
		
		var files = '';
		var array = [];
		
		jQuery(".cinput:checked").each(function(){
			
			files = this.value;
			//ids = array.push(files);
			array.push(files);	
			
		});
		
		
		
		if(array == ""){
		
			alert("Selecione um item para ser excluido na coluna 'ação' ! ");
			
		}else{
			
				$.ajax({
						type:'POST',
						async:false, 
						dataType: "json",
						url:"../php/formula-exec.php",
						data:{act:'delete',id: array},
						success: function(data){
							//alert(data.length);
							
							/*for (var i = 0; i < data.length; i++) {
								
								$(".table tbody tr[id='"+data[i].codigo+"']").remove();
								
							}*/
							ListaGridFormulacao($("#codproduto").val());
						}	
					});
					
			return false;					
		
		}     
	});
	
	
    $( "#codproduto" ).autocomplete(
		{	
		 source:'../php/produto-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".cp").html(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".cp").html(ui.item.nom)
		}		
	});
	
	 $( "#grupo" ).autocomplete(
		{	
		 source:'../php/grupo-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".cp").html(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".cp").html(ui.item.nom)
		}		
	});
	
	$( "#locprod" ).autocomplete(
		{	
		 source:'../php/localproducao-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".lp").html(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".lp").html(ui.item.nom)
		}	
	});
	
	$( "#codmat" ).autocomplete(
		{	
		 source:'../php/produto-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".mp").html(ui.item.nom)						 
		},
		focus: function( event, ui ) {
			$(".mp").html(ui.item.nom)
						
		}	
	});
	
	$( "#cliente" ).autocomplete(
		{	
		 source:'../php/cliente-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".mp").html(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".mp").html(ui.item.nom)
		}	
	});
	
	$( "#fornecedor" ).autocomplete(
		{	
		 source:'../php/fornecedor-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".mp").html(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".mp").html(ui.item.nom)
		}	
	});
	
	
	$( "#repre" ).autocomplete(
		{	
		 source:'../php/representante-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".mp").html(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".mp").html(ui.item.nom)
		}	
	});
	
	$( "#repres" ).autocomplete(
		{	
		 source:'../php/representante-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".nonrep").html(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".nonrep").html(ui.item.nom)
		}	
	});
	
	$( "#vendedor" ).autocomplete(
		{	
		 source:'../php/vendedor-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".mp").html(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".mp").html(ui.item.nom)
		}	
	});
	
	$( "#conta" ).autocomplete(
		{	
		 source:'../php/conta-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".mp").html(ui.item.nom)						 
		},
		focus: function( event, ui ) {
			$(".mp").html(ui.item.nom)
						
		}	
	});
	
	$( "#placa" ).autocomplete(
		{	
		 source:'../php/placa-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".pl").html(ui.item.placa)						 
		},
		focus: function( event, ui ) {
			$(".pl").html(ui.item.placa)
						
		}	
	});
	
	$( "#cfop" ).autocomplete(
		{	
		 source:'../php/cfop-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$(".cf").html(ui.item.nom)						 
		},
		focus: function( event, ui ) {
			$(".cf").html(ui.item.nom)
						
		}	
	});
	$( "#contafc" ).autocomplete(
		{	
		 source:'../php/financonta-exec.php?act=busca2',
		 minLength: 1,
		select: function(event, ui) {
			$(".cfc").html(ui.item.nom+' Cod centro:'+ui.item.centrocusto)						 
		},
		focus: function( event, ui ) {
			$(".cfc").html(ui.item.nom+' Cod centro:'+ui.item.centrocusto)
						
		}	
	});
	
	jQuery('#tableformula').dataTable();
	
	
});

$(document).ready(function(e) {
   	$forms = $('form[id="frmfaturamento"]');
	$forms.validate({
		 debug : true,
			errorElement : "em",
			errorContainer : $("#warning, #summary"),
			errorPlacement : function(error,
					element) {
				error.appendTo(element.parent("td")
						.next("td"));
			},
			success : function(label) {
				label.text("ok!").addClass(
						"success");
			},
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',
				async:false, 
				dataType: "json",	
				url: '../php/relatorios-exec.php',
				data: params,	
				success: function(data){
					
					var info = "<strong>Listagem de Faturamento de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong>";
					var total = 0;
					var table = '<table id="listfaturamento">';
					 
						table += '<caption><h3>ALLES COM. IND. DERIVADOS E TRANSP. LTDA.</h3><h4>'+info+'</h4></caption>';
						table += '<thead>';
						table += '<tr>';
						table += '<th>Emissão</th>';
						table += '<th>Código</th>';
						table += '<th>Razão Social</th>';
						table += '<th>CFOP</th>';
						table += '<th>Documento</th>';
						//table += '<th>Serie</th>';
						table += '<th>R$ Total</th>';
						table += '<th>Vendedor</th>';
						table += '</tr>';
						table += '</thead>';
						table += '<tbody>';	
					for (var i = 0; i < data.length; i++) {
						
						table += '<tr class="'+data[i].codfor+'">';
						table += '<td>'+data[i].dataemi+'</td>';
						table += '<td>'+data[i].codfor+'</td>';
						table += '<td>'+data[i].cliente+'</td>';
						table += '<td>'+data[i].cfop+'</td>';
						table += '<td>'+data[i].numnota+'</td>';
						//table += '<td>'+data[i].serienota+'</td>';
						table += '<td>'+data[i].vltotalnota+'</td>';
						table += '<td>'+data[i].represent+'</td>';
						table += '</tr>';
						
						total = data[i].total;	
						//$('#undefined').css({'display':'none'});
					}
					table += '<TFOOT>';
					table += '<tr>';
						table += '<td></td>';
						table += '<td></td>';
						table += '<td></td>';
						table += '<td></td>';
						table += '<td>Total:</td>';
						//table += '<td>'+data[i].serienota+'</td>';
						table += '<td>'+total+'</td>';
						table += '<td></td>';
						table += '</tr>';
					table += '</TFOOT>';
					
					table += '</tbody>';
					table += '</table>';
					
					
					
					$("#relatoriofatu").html(table);	
					$('#listfaturamento').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"dom": 'T<"clear">lfrtip',						
						 "fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(0)', nRow).css( "text-align", "center" );
                                  $('td:eq(1)', nRow).css( "text-align", "center" ); 
								  $('td:eq(2)', nRow).css( "text-align", "left" ); 
								  $('td:eq(3)', nRow).css( "text-align", "center" ); 
								  $('td:eq(4)', nRow).css( "text-align", "center" ); 
								  $('td:eq(5)', nRow).css( "text-align", "right" ); 
								  $('td:eq(6)', nRow).css( "text-align", "left" ); 

                                  return nRow;
				          },							
					});
					
					
					$('.undefined').css({'display':'none'});
					bootbox.hideAll();
				},
				error: function(data){
					alert(data.status);	
				}
			})
			return false;
		}				
	});	 				
});

function print_r(arr,level) {
var dumped_text = "";
if(!level) level = 0;

//The padding given at the beginning of the line.
var level_padding = "";
for(var j=0;j<level+1;j++) level_padding += "    ";

if(typeof(arr) == 'object') { //Array/Hashes/Objects 
    for(var item in arr) {
        var value = arr[item];

        if(typeof(value) == 'object') { //If it is an array,
            dumped_text += level_padding + "'" + item + "' ...\n";
            dumped_text += print_r(value,level+1);
        } else {
            dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
        }
    }
} else { //Stings/Chars/Numbers etc.
    dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
}
return dumped_text;
}
 function printDiv(id, pg) {
		var oPrint, oJan;
		oPrint = window.document.getElementById(id).innerHTML;
		oJan = window.open(pg,'','status=no,toolbar=no,scrollbars=yes,titlebar=no,menubar=no,fullscreen=1,resizable=yes,width=9'+screen.width+',height='+screen.height+',directories=no,location=no');
		oJan.document.write("<html>");
		oJan.document.write("<head>");
		oJan.document.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'/>");
		oJan.document.write("<link href='../css/bootplus.css' rel='stylesheet' type='text/css' media='all'>");
		oJan.document.write("<link href='../css/jquery.dataTables.css' rel='stylesheet' type='text/css' media='all'>");
		oJan.document.write("<style>");
		oJan.document.write(".pvalor{text-align: right;margin-right:10px;}   thead{display: table-header-group; } tfoot{display: table-footer-group; }");
		oJan.document.write("</style>");
		oJan.document.write("</head>");
		
		oJan.document.write("<body>");	
		oJan.document.write(oPrint);		
		oJan.document.write("</body>");
		oJan.document.write("<html>");
		oJan.window.print();
		//oJan.document.close();
		//oJan.focus();
	}
	
 function printproducao(id) {
	
	$.ajax({
		type:'POST',
		url:"../php/printproducao.php",
		data:{id:id},		
		success: function(data){
		
		$('#relatorio').html(data);
			
		var ids = 'relatorio';
		var oPrint = window.document.getElementById(ids).innerHTML;
				
		var	pg;
		oJan = window.open(pg,'','status=no,toolbar=no,scrollbars=yes,titlebar=no,menubar=no,fullscreen=1,resizable=yes,width=9'+screen.width+',height='+screen.height+',directories=no,location=no');
		oJan.document.write("<html>");
		oJan.document.write("<head>");
		oJan.document.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'/>");	

		oJan.document.write("</head>");		
		oJan.document.write("<body>");
		oJan.document.write(oPrint);
		oJan.document.write("</body>");
		oJan.document.write("<html>");
		oJan.window.print();
		
		},
		error: function(data){
					alert(data);	
		}			
			
	});
			
}	
	
$(document).ready(function(e) {
   	$formscp = $('form[id="frmcontaspagarvencimento"]');
	$formscp.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriocontasapagarporvencimento.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>ALLES COM. IND. DERIVADOS E TRANSP. LTDA.</h3><h4><strong>Contas a pagar por vencimento de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,						
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});
$(document).ready(function(e) {
   	$formscr = $('form[id="frmcontasrecebervencimento"]');
	$formscr.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriocontasareceberporvencimento.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>ALLES COM. IND. DERIVADOS E TRANSP. LTDA.</h3><h4><strong>Contas a receber por vencimento de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						 "fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(5)', nRow).css( "text-align", "right" );
                                  $('td:eq(6)', nRow).css( "text-align", "right" ); 
								  $('th:eq(5)', nRow).css( "text-align", "right" );
                                  $('th:eq(6)', nRow).css( "text-align", "right" );                              
                                  return nRow;
				          },												
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frmcontaspagaremissao"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriocontasapagarporemissao.php',
				data: params,	
				success: function(data){
					
					
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Contas a pagar por emissão de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(5)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },
						   "order": []
					   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formscl = $('form[id="frmcontasareceberporcliente"]');
	$formscl.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			cliente: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },	
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			cliente: {
                      required:"Selecione um cliente",                      
                      },		  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriocontasareceberporcliente.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Contas a receber por cliente de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</br>"+$(".mp").html()+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,	
						"order": []				   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formscl = $('form[id="frmcontasapagarporcliente"]');
	$formscl.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			cliente: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },	
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			cliente: {
                      required:"Selecione um cliente",                      
                      },		  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriocontasapagarporcliente.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Contas a pagar por fornecedor de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,	
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(3)', nRow).css( "text-align", "right" );
							      $('td:eq(5)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },
						"order": []				   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formscl = $('form[id="frmlistagemporrepresentante"]');
	$formscl.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			repre: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },	
				comissao: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },	
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			repre: {
                      required:"Selecione um repesentante",                      
                      },
				comissao: {
                      required:"Informa um % de comissão",                      
                      },	  		  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemporrepresentante.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem Por Representante de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"<br/> Percentual de  Comissão "+$("#comissao").val()+"%</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(3)', nRow).css( "text-align", "right" );	
								  $('td:eq(6)', nRow).css( "text-align", "right" );							  
                                  return nRow;
				          },				
						"order": []				   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formsemi = $('form[id="frmfluxodecaixa"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriofluxodecaixa.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Fluxo de caixa de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(1)', nRow).css( "text-align", "right" );	
								  $('td:eq(2)', nRow).css( "text-align", "right" );
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );							  
                                  return nRow;
				          },						
						   "order": []
					   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formsemi = $('form[id="frmlistagemdeproducao"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			codproduto: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			as: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },		
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			codproduto: {
                      required:"Digite um produto",                      
                      },
			as: {
                      required:"Selecione se Analítico/Sintético",                      
                      },		  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemdeproducao.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem de produção "+$('select[name="as"] option:selected').text()+" por produto de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</br>"+$(".cp").html()+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.tbl').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );
								  $('td:eq(5)', nRow).css( "text-align", "right" );
								  $('td:eq(6)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },						
						   "order": []
					   													
					});	
					
					$('.tbls').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );
								  $('td:eq(5)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },						
						   "order": []
					   													
					});	
					
					$('.tabl').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(0)', nRow).css( "text-align", "center" );	
								  $('td:eq(1)', nRow).css( "text-align", "center" );
								  $('td:eq(2)', nRow).css( "text-align", "center" );
                                  return nRow;
				          },						
						   "order": []
					   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frminventario"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                }	
					
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      }		  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatorioinventario.php',
				data: params,	
				success: function(data){
					
					var cp = $(".cp").html();
					if(cp == ""){
						cp = "TODOS";
					}
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Inventário de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+" do grupo "+cp+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },											
						   "order": []
					   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});



$(document).ready(function(e) {
   	$formsemi = $('form[id="frmextratodoproduto"]');
	$formsemi.validate({
	
		rules: {
			
			codproduto: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },		
					
			},
		messages:{
			 
			codproduto: {
                      required:"Digite um produto",                      
                      },
  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatorioextratodoproduto.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Extrato do produto "+$(".cp").html()+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					
					bootbox.hideAll();
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },										
						   "order": []
					   													
					});	
					
																				
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

 
$(document).ready(function() {
	
	 $formsemi = $('form[id="formproducao"]');
	$formsemi.validate({
	
		rules: {
			
			codproduto: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
				kg: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },	
				dtproducao:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },	
					
					
			},
		messages:{
			 
			codproduto: {
                      required:"Digite um produto",                      
                      },
  		  	kg: {
                      required:"Informa a quantidade",                      
                    },
			dtproducao: {
                      required:"Informa a data da produção",                      
                    },			
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Aquarde enquanto listo sua produção",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/producao-exec.php',
				data: params,	
				success: function(data){
					
					$("#codprod").val($("#codproduto").val());
					$("#kgs").val($("#kg").val());
					$("#dtpro").val($("#dataini").val());
					$("#locals").val($("select[name='local']").val());
					
					
					//alert(data);
					listainfoproducao();			
					
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 
	  
});

function listainfoproducao(){

			$.ajax({
				type: 'POST',			
				url: '../php/listagemdeinformaproducao.php',
				data: {act:'lista'},	
				success: function(data){
					
					
					$("#tableproducaolist").html(data);
					
					bootbox.hideAll();
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },										
						   "order": []
					   													
					});	
					
																				
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;

}

$(document).ready(function(e) {
		$('#listainfoproducao').dataTable({
			"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
			"iDisplayLength": -1,
			"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
					  $('td:eq(2)', nRow).css( "text-align", "right" );	
					  $('td:eq(3)', nRow).css( "text-align", "right" );
					  $('td:eq(4)', nRow).css( "text-align", "right" );
					  return nRow;
			  },										
			   "order": []
														
		});	
		
																
	var pathArray = window.location.pathname.split('/');
	if(pathArray[4] == 'atualizar-producao.php'){

		$('.dataTables_length').css({'display':'none'});
		$('.dataTables_filter').css({'display':'none'});
		$('.dataTables_paginate').css({'display':'none'});
		$('.dataTables_info').css({'display':'none'});
	
	}
	
	$('.deleterowproducao').click(function(){
            var conf = confirm('Continue delete?');
	    if(conf)
                $(this).parents('tr').fadeOut(function(){
					
					$.ajax({
						type:'POST',
						url:"../php/producao-exec.php",
						data:{act:'deletar',id: $(this).attr('id')},
						success: function(data){
							
							$(this).remove();
							
						}	
					});
					
					
			});
	    return false;
	});	
});


$(document).ready(function(e) {
   	$formscl = $('form[id="frmlistagemvendedor"]');
	$formscl.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
								
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemporvendendor.php',
				data: params,	
				success: function(data){
					
					var mp = $(".mp").html();
					if(mp == ""){
						mp = "TODOS";
					}
					
					var info = "<h3>"+$('#empresa').val()+"/h3><h4><strong>Listagem Por Vendedor "+$('select[name="as"] option:selected').text()+" de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4><br/> <strong style='float:left;'>Vendedor: "+mp+" </strong>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,	
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(4)', nRow).css( "text-align", "right" );
							      $('td:eq(5)', nRow).css( "text-align", "right" );
								  $('td:eq(6)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },
						"order": []				   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formscl = $('form[id="frmlistagemcliente"]');
	$formscl.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
								
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemporcliente.php',
				data: params,	
				success: function(data){
					
					var mp = $(".mp").html();
					if(mp == ""){
						mp = "TODOS";
					}
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem Por cliente "+$('select[name="as"] option:selected').text()+" de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4><br/> <strong style='float:left;'>Cliente: "+mp+" </strong>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,	
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(4)', nRow).css( "text-align", "right" );
							      $('td:eq(5)', nRow).css( "text-align", "right" );
								  $('td:eq(6)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },
						"order": []				   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
    $('.tbmovim').dataTable({
		"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "TODOS"]],
		"iDisplayLength": -1,							
		"order": []														
	});	
	
	
$(document).ready(function(e) {
   	$formscl = $('form[id="formmovimentacao"]');
	$formscl.validate({
	
		rules: {
			data:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			conta: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			valor: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },	
			hist: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },			
			},
		messages:{
			 data: {
                      required:"Selecione uma data.",                      
                      },
			conta: {
                      required:"Selecione uma conta",                      
                      },
			valor: {
                      required:"Colca um valor",                      
                      },
			hist: {
                      required:"Descreva o que se refere a movimentação",                      
                      },						  		  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Aquarde enquanto cadastro sua movimentação.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/movi-exec.php',
				data: params,	
				success: function(data){
				//alert(data);
				
				listconta();

				bootbox.hideAll();	
					
				$("#dataini").val('');	
				$("#conta").val('');	
				$('#cp').html('');
				$("#valor").val('');
				$('#area5').val('');
				$("#dataini").focus();	
					
				$('.dataTables_length').css({'display':'none'});
				$('.dataTables_filter').css({'display':'none'});
				$('.dataTables_paginate').css({'display':'none'});
				$('.dataTables_info').css({'display':'none'});
				
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});	
	
});


function listconta(){
	
	var idc = 'nada';
	
	$.ajax({
		type:"POST",
		url:"../php/ajaxlistmovi.php",
		data:{idc: idc},
		success: function(data){
			alert("Adicionado com sucesso !");
			$(".tbmovim tbody").html(data);
			
		},
		error:function(data){
			
			alert(data);
			
		}
	});
	
	
}



$(document).ready(function(e) {
   	$formscl = $('form[id="frmlistagemdecaixa"]');
	$formscl.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
							
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  	  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemdecaixa.php',
				data: params,	
				success: function(data){
					
					var mp = $(".mp").html();
					if(mp == ""){
						mp = "TODOS";
					}
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem de Caixa de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4><br/> <strong style='float:left;'>Conta: "+mp+" </strong>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,	
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(4)', nRow).css( "text-align", "right" );
							      $('td:eq(5)', nRow).css( "text-align", "right" );
								  $('td:eq(6)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },
						"order": []				   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formscl = $('form[id="frmbalancete"]');
	$formscl.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
							
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  	  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriobalancete.php',
				data: params,	
				success: function(data){
					
					var mp = $(".mp").html();
					if(mp == ""){
						mp = "TODOS";
					}
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Balancete "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4><br/> <strong style='float:left;'>Conta: "+mp+" </strong>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,	
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(4)', nRow).css( "text-align", "right" );
							      $('td:eq(5)', nRow).css( "text-align", "right" );
								  $('td:eq(6)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },
						"order": []				   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formsemi = $('form[id="frmlistagemdecomrpasporproducao"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemdecomprasporproducao.php',
				data: params,	
				success: function(data){
					
					
					var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem de compras "+$('select[name="as"] option:selected').text()+" para produção de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</br>"+$(".cp").html()+"</strong></h4>";
					
					
					$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
					
					
					$('.tbl').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );
								  $('td:eq(5)', nRow).css( "text-align", "right" );
								  $('td:eq(6)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },						
						   "order": []
					   													
					});	
					
					$('.tbls').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );
								  $('td:eq(5)', nRow).css( "text-align", "right" );
                                  return nRow;
				          },						
						   "order": []
					   													
					});	
					
					$('.tabl').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(0)', nRow).css( "text-align", "center" );	
								  $('td:eq(1)', nRow).css( "text-align", "center" );
								  $('td:eq(2)', nRow).css( "text-align", "center" );
                                  return nRow;
				          },						
						   "order": []
					   													
					});	
					
					
					$('.tablr').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                                                               
								  $('td:eq(1)', nRow).css( "text-align", "right" );
								  $('td:eq(2)', nRow).css( "text-align", "right" );
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								
                                 return nRow;
				          },						
						   "order": []
					   													
					});													
					
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frmclientespositivados"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatorioclientespositivados.php',
				data: params,	
				success: function(data){
										
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Clientes Positivados  de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								 
                                  return nRow;
				          },						
						   "order": []
					   													
					});	
					
				
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formsemi = $('form[id="frmlistagemdecomissaopordatapagamento"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemdecomissaopordatapagamento.php',
				data: params,	
				success: function(data){
										
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem de comissão por data de pagamento de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								 
								 
                                  return nRow;
				          },						
						   "order": []
					   													
					});	
					
				
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frmlistagemdecomferencia"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemdeconferencia.php',
				data: params,	
				success: function(data){
										
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem de conferencia de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								 
								 
                                  return nRow;
				          },									
  					    "order": []
					   													
					});	
					
				
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frmcurvaabc"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriocurvaabc.php',
				data: params,	
				success: function(data){
										
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Curva ABC de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "left" );	
								 
								 
                                  return nRow;
				          },									
  					    "order": []
					   													
					});	
					
				
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frmlistagemfofao"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemfofao.php',
				data: params,	
				success: function(data){
				var sel = $('select[name="as"] option:selected').text();
				var pro = $('#codproduto').val();
				
				if(pro == ""){
					pro = "";				
				}else{
					pro = 'Produto :'+$('.cp').html()+'';
				}
				if(sel == "Selecione"){
					
					sel = "";
				}						
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Estatistica: "+sel+" de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+" "+pro+"</strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(4)', nRow).css( "text-align", "right" );	
								 
								 
                                  return nRow;
				          },									
  					    "order": []
					   													
					});
					
									
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});
$(document).ready(function(e) {
   	$formsemi = $('form[id="frmbalancetedecontas"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriobalancetedecontas.php',
				data: params,	
				success: function(data){
								
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Balancete de custo de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+" </strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(5)', nRow).css( "text-align", "right" );	
								 
								 
                                  return nRow;
				          },									
  					    "order": []
					   													
					});
					
									
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formsemi = $('form[id="frmconferenciaporplaca"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemdeconferenciaporplaca.php',
				data: params,	
				success: function(data){
				
				var pl = $('#placa').val();
				var plc;
				
				if(pl == ""){
					plc = "";
				}else{
					plc = "Placa: "+pl+"";
				}
								
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Conferencia Por Placa de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+" "+plc+" </strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,														
  					    "order": []
					   													
					});
					
									
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
    $(".dtf").change(function(){
		
		var dtini = $('#dataini').val();
		var dtfim = $(this).val();
		
		if(dtini != ""){
			
			$.ajax({
			type: 'POST',
				async:false, 
				dataType: "json",	
				url: '../php/placa-exec.php',
				data: {act:'seleciona',dtini:dtini,dtfim:dtfim},
				success: function(data){
					
					for (var i = 0; i < data.length; i++) {
						
						$('#placa').append('<option>' + (data[i].placa ? data[i].placa : 'Empty') + '</option>');
					}
					$('#placa').selectric('refresh');
				},
				error: function(data){
					alert(data);	
				}	
			
			});
			
			
		}else{
			$('#dataini').focus();
			$(this).val('');
			alert('Ops! Para melhorar a pesquisa primeiro selecione a data inicial!');
		}
		
	});
});



$(document).ready(function(e) {
   	$formsemi = $('form[id="frmlistagemrecebimento"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemdecomissaoderecebimento.php',
				data: params,	
				success: function(data){
				
				var repr;
				var comitx;
				var rp   = $('.mp').html();				
				var comi = $('#comissao').val();
				
				
				
				if(rp == ""){
					repr = "";
				}else{
					repr = "Representante : "+rp+"";
				}
				if(comi == ""){
					comitx = "";
				}else{
					comitx = "Comissão : "+comi+"%";
				}				
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem de comissão de recebimento "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+" <br/>"+repr+" "+comitx+"</strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(5)', nRow).css( "text-align", "right" );	
								 
								 
                                  return nRow;
				          },									
  					    "order": []
					   													
					});
					
									
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frmlistagemsenar"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemsenar.php',
				data: params,	
				success: function(data){
				
			
			
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Listagem Senar de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+" </strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(1)', nRow).css( "text-align", "right" );	
								  $('td:eq(2)', nRow).css( "text-align", "right" );
								 
                                  return nRow;
				          },									
  					    "order": []
					   													
					});
					
									
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frmextratocontaplano"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatorioextratoporcontaplano.php',
				data: params,	
				success: function(data){
				
				var cn = $('.cf').html();
				var cntx;
				if(cn == ""){
					cntx = "";
				}else{
					cntx = "Contas: "+cn+"";
				}
				
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Extrato p/ conta (Plano) de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4><strong style='float:left;'>"+cntx+" </strong>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );  
                                  return nRow;
				          },									
  					    "order": []
					   													
					});
					
									
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});

$(document).ready(function(e) {
   	$formsemi = $('form[id="frmextratoporcentrocombustivel"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatorioextratoporcentrocombustivel.php',
				data: params,	
				success: function(data){
				
				var cn = $('.cfc').html();
				var cntx;
				if(cn == ""){
					cntx = "";
				}else{
					cntx = "Contas: "+cn+"";
				}
				
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Extrato p/ centro (Combustivel) de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+"</strong></h4><strong style='float:left;'>"+cntx+" </strong>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(2)', nRow).css( "text-align", "right" );	
								  $('td:eq(3)', nRow).css( "text-align", "right" );
								  $('td:eq(4)', nRow).css( "text-align", "right" );  
                                  return nRow;
				          },									
  					    "order": []
					   													
					});
					
									
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});


$(document).ready(function(e) {
   	$formsemi = $('form[id="frmbalancetedecadastrocontas"]');
	$formsemi.validate({
	
		rules: {
			 dataini:{           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			datafin: {           //input name: fullName
                    required: true,   //required boolean: true/false                 
                },
			
			},
		messages:{
			 dataini: {
                      required:"Selecione a data inicial.",                      
                      },
			datafin: {
                      required:"Selecione a data final",                      
                      },
			  		  
					  		  
					  			
			},
		submitHandler: function(form) {
  		  
		bootbox.dialog({
				  message: "Enquanto o relatorio vai gerando.. relaxa ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aquarde..",								  
				});
		  
		   var $form = $(form);
           var params = $form.serialize();	
			
			$.ajax({
				type: 'POST',			
				url: '../php/relatoriolistagemcadastrodecontas.php',
				data: params,	
				success: function(data){
								
				var info = "<h3>"+$('#empresa').val()+"</h3><h4><strong>Lista cadastro de contas de "+formatadata($("#dataini").val())+" a "+formatadata($("#datafin").val())+" </strong></h4>";
															
				$("#relatoriofatu").html('<div class="info" align="center">'+info+'</div>'+data+'');
					//$(".info").html(info);
					bootbox.hideAll();
					
										
					$('.table').dataTable({
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"iDisplayLength": -1,
						"fnRowCallback"  : function(nRow,aData,iDisplayIndex) {                               
                                  $('td:eq(6)', nRow).css( "text-align", "right" );	
								 
								 
                                  return nRow;
				          },									
  					    "order": []
					   													
					});
					
									
					$('.dataTables_length').css({'display':'none'});
					$('.dataTables_filter').css({'display':'none'});
					$('.dataTables_paginate').css({'display':'none'});
					$('.dataTables_info').css({'display':'none'});
				},
				error: function(data){
					alert(data);	
				}
			})
			return false;
		}				
	});	 				
});