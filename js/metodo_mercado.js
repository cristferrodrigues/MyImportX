// JavaScript Document

$(document).ready(function(){
	
    // Crio uma variável chamada $forms que pega o valor da tag form
    $forms = $('form[id="relaciona"]');	
    $forms.bind('submit', function(){

        var params = $(this.elements).serialize();
		
		var result = verificarrelacionamentos(params);
		
		if(result > 0){
			alert('Faltam relacionar '+result+'');
			return false;
		}
			
		if($("#cfop").val() > 5000){
			alert('CFOP informada não é valida para operações de entrada!');	
			$("#cfop").focus();
			return false;
		}
		
		
		var data_inicio   = $("#dtentrada").val();
		var data_fim      = $("#nota_dtemi").html();		
		
		var compara1 = parseInt(data_inicio.split(".")[2].toString() + data_inicio.split(".")[1].toString() + data_inicio.split(".")[0].toString());
		var compara2 = parseInt(data_fim.split(".")[2].toString() + data_fim.split(".")[1].toString() + data_fim.split(".")[0].toString());
		
		if(compara1 == ""){
			alert("O campo data não pode estar em branco!");
			$("#dtentrada").focus();
			return false;
		}else{
			
			if(compara1 < compara2){
				alert('Data de entrada não pode ser menor que a data da emissão!');	
				return false;
			}
			
		}
		
					
        var self = this;
        $.ajax({
            type: 'POST',
             url: '../php/relacionamento-exec.php?act=inserir',
            data: params,
            // Antes de enviar
            beforeSend: function(){
             	bootbox.dialog({
				  message: "Aguarde enquanto salvo suas alterações ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aguarde..",								  
				});
            },
            success: function(data){				
	             bootbox.hideAll();
				 				
				 alert(data);
				
				 $('#dtapropria').dataTable({					
					 "bSort" : false,
					 "paging":   false,
					 "ordering": false,
					 "info":     false,
					 "bDestroy": true,
					 "bFilter": false
				});
				
				 $('#apropria').css('width', '37%');
				 $('#apropria').modal({
					 show    : true,
					 keyboard: false,
					 backdrop: 'static'
				});
				
				
			 },
            error: function(data){
                
            }
        })
        return false;
    });
});

$(function()
{
	// Variável para armazenar seus arquivos
	var files;

	// adicionado o evento
	$('input[type=file]').on('change', prepareUpload);
	
	$('form[id="upload"]').on('submit', uploadFiles);

	// Pegue os arquivos e colocá-las à nossa variável
	function prepareUpload(event)
	{
		files = event.target.files;
	}

	// Pegar o envio de formulário e enviar os arquivos
	function uploadFiles(event)
	{
		event.stopPropagation(); // Pare de coisas acontecendo
        event.preventDefault(); // Totalmente parar coisas acontecendo

        // / Iniciar um spinner CARREGANDO AQUI

        // Criar um objeto FormData e adicionar os arquivos
		var data = new FormData();
		$.each(files, function(key, value)
		{
			data.append(key, value);
		});
        
        $.ajax({
            url: '../php/relacionamento-exec.php?act=box&files',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, 
            contentType: false, 
            success: function(data, textStatus, jqXHR)
            {
	
            	if(typeof data.error === 'undefined')
            	{
            		// Sucesso até chamar a função para processar o formulário
            		submitForm(event, data);
            	}
            	else
            	{

            		console.log('ERRORS: ' + data.error);
            	}
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
            	
            	console.log('ERRORS: ' + textStatus);
            	
            }
        });
    }

    function submitForm(event, data)
	{
		// Create a jQuery object from the form
		$form = $(event.target);
		
		// Serialize the form data
		var formData = $form.serialize();
		
		// You should sterilise the file names
		$.each(data.files, function(key, value)
		{
			formData = formData + '&filenames[]=' + value;
		});

		$.ajax({
			url: '../php/relacionamento-exec.php?act=box',
            type: 'POST',
            data: formData,
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
				$("#cfop").val(data[0].cfop);
				$("#dtentrada").val(data[0].dtentrada);				
				$("#for_nome").html(data[0].nome);
				$("#for_endereco").html(data[0].ende);
				$("#for_cidade").html(data[0].cid);
				$("#for_estado").html(data[0].esta);
				$("#for_cnpjcpf").html(data[0].cnpjcpf);
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
            },
            complete: function()
            {
            	// STOP LOADING SPINNER
            }
		});
	}
});

function relacionarproduto(idfor,ifpro,i){
		
		var html = "";
		
		html += "<form method='post' id='relacionaproduto' onSubmit='submeterformulario(this); return false;'>";
		
		html += "<input type='hidden' name='act' value='relacionar'/>"
		html += "<input type='hidden' name='idfor' value='"+idfor+"'/>"
		html += "<input type='hidden' name='idpro' value='"+ifpro+"'/>"
		html += "<input type='hidden' name='id' value='"+i+"'/>"
		
		html += "<div class='input-prepend'>";
			
			html += "<label>Produto:<i id='npr'></i></label>";	
			html += "<span class='add-on icon-terminal'></span>";
			html += "<input type='text' name='produto' class='form-control span3' onKeyPress='buscaproduto();' id='codproduto' >";
			html += "<input type='hidden' name='nomepro' id='nomepro' value=''/>";	
			
		html += "</div>";
		html += "<div class='input-prepend'>";
			html += "<label>&nbsp;</label>";
			html += "<input class='btn btn-primary' type='submit' name='submit'  value='Relacionar'>";
		html += "</div>";
		html += "</form>";
		
		bootbox.dialog({
		  message: ""+html+"",
		  title: "Relacionar",								  
		});

}

function buscaproduto(){
	
	$("#codproduto").autocomplete(
		{	
		 source:'../php/produto-exec.php?act=busca',
		 minLength: 1,
		select: function(event, ui) {
			$("#npr").html(ui.item.nom)			
			$("#nomepro").val(ui.item.nom);		
		},
		focus: function( event, ui ) {
			$("#npr").html(ui.item.nom)
		}		
	});

}

function submeterformulario(elemento){
	
	// Crio uma variável chamada $forms que pega o valor da tag form
    $forms = $('form[id="relacionaproduto"]');	

    //var params = $forms.elements;
		//params.serialize()
		var params = $(elemento.elements).serialize();
		       
	    $.ajax({
            type: 'POST',
             url: "../php/relacionamento-exec.php",
            data: params,
			cache: false,
            dataType: 'json',
            // Antes de enviar
            beforeSend: function(){
             	bootbox.dialog({
				  message: "Aguarde enquanto salvo suas alterações ;D",
				  title: "<img src='../images/loading-icon.gif'/> Aguarde..",								  
				});
            },
            success: function(data){				
	             
				 $("tr[id='"+data.idpro+"'] > td[id='rel"+data.idpro+"']").html('<input type="hidden" name="item['+data.id+'][IDPROD_REL]" value="'+data.produto+'"/>'+data.produto+' - '+data.nomepro+'');
				  alert("Relacionado");
				 bootbox.hideAll(); 
			 },
            error: function(data){
                
            }
        });
	   
	 return false;
}

function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}


function verificarrelacionamentos(items){
	var retorno;
	$.ajax({
            type: 'POST',
             url: '../php/relacionamento-exec.php?act=verificarelacionamento',
             data: items,
			 async:false,
             cache: false,
             dataType: 'json', 
            success: function(data){								
				retorno = data.length;
			 },
            error: function(data){
                
            }
        });
      return retorno;

}
function buscacentro(){
	var cfor = $("#cfor").val();
    $( "#centro" ).autocomplete(
		{	
		 source:'../php/centro-exec.php?act=busca&cfor='+cfor+'',
		 minLength: 1,
		select: function(event, ui) {
			$("#xcentro").val(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".mp").html(ui.item.nom)
		}	
	});
}
function buscafinanccentro(){

	 var ccentro = $("#centro").val();
    $("#conta").autocomplete(
		{	
		 source:'../php/conta-exec.php?act=busca&ccont='+ccentro+'',
		 minLength: 1,
		select: function(event, ui) {
			$("#xconta").val(ui.item.nom)			
					
		},
		focus: function( event, ui ) {
			$(".mp").html(ui.item.nom)
		}	
	});


}


$(document).ready(function(){
	
    // Crio uma variável chamada $forms que pega o valor da tag form
   $("#apm").click(function(){	
			
		var centro  = $("#centro").val();
		var conta   = $("#conta").val();
		var valor   = $("#vl").val();
		var nota    = $("#nota_numeros").html();
		var cfor    = $("#cfor").val();
		var empresa = "-1";
		var emissao = $("#dt_emissao").html();
		var xcentro = $("#xcentro").val();
		var xconta	= $("#xconta").val();
					
        $.ajax({
            type: 'POST',
             url: '../php/apropriacao-exec.php?act=inserir',
            data: {centros:centro,contas:conta,vl:valor,notas:nota,cfors:cfor,emp:empresa,dtemi:emissao,xcentros:xcentro,xcontas:xconta },
			cache: false,
            dataType: 'json',
            // Antes de enviar
            beforeSend: function(){
             	bootbox.dialog({
				  message: "Aguarde..",
				  title: "<img src='../images/loading-icon.gif'/> <br/>Aguarde..",								  
				});
            },
            success: function(data){				
	             bootbox.hideAll();
				 
				 var html = "";
				 var subtotal = 0;
				$("#dtapropria tbody tr .dataTables_empty").remove(); 
				 for(i =0; i < data.length; i++){
					
						 html += '<tr id="'+data[i].cod+'">';
						 html += '<td><span class="center"><input type="checkbox" name="id[]" class="cinput" value="'+data[i].cod+'" /> </span></td>';
						 html += '<td>'+data[i].centros+' - '+data[i].xcentros+'</td>';
						 html += '<td>'+data[i].contas+' - '+data[i].xcontas+'</td>';
						 html += '<td>'+data[i].vl+'<input type="hidden" id="val'+data[i].cod+'" value="'+data[i].vl+'"/></td>';
					     html += '</tr>';					
						subtotal = 	parseFloat(data[i].vl) + parseFloat($("#valortotal").val());
						//alert(''+data[i].vl+' - '+$("#valortotal").val()+'')
				 }
				 
				var subt = subtotal;
				
				$("#valortotal").val(subt);
				
				$("#subtotal").html('');					
				$("#subtotal").html('Valor Apropriado: '+number_format(subt,2,',','.'));
									
				$("#dtapropria tbody").append(html);
								
				$('#vl').val('');
				$('#vl').focus();
				$('#centro').val('');
				$('#conta').val('');
				
			 },
            error: function(data){
                
            }
        })
        return false;
    });
});


function deletar(){

		var files = '';
		var array = [];
   	    var subtotal;
		
		$(".cinput:checked").each(function(){
		//if(this.checked) {
			files = this.value;
			//ids = array.push(files);
			array.push(files);				
		//}
		});
		//alert(array);
		var conf = confirm('Continue delete?');
	    if(conf){
                
					
			$.ajax({
				type:'POST',
				url:"../php/apropriacao-exec.php",
				cache: false,
	            dataType: 'json',
				data:{act:'deletar',id: array},
				success: function(data){
					
				 for(i =0; i < data.length; i++){
					 
					 //alert(''+$("#valortotal").val()+' '+$("#val"+data[i].cod+"").val()+' ');
					 subtotal = parseFloat($("#valortotal").val()) - parseFloat($("#val"+data[i].cod+"").val());
					 
					$("#dtapropria tbody tr[id='"+data[i].cod+"']").remove();										
					$("#valortotal").val(subtotal);
				}
				
					
					
					$("#subtotal").html('');					
					$("#subtotal").html('Valor Apropriado: '+number_format(subtotal,2,',','.'));
					
				}	
			});
					
			return false;		
		}
	    
		
}