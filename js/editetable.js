// JavaScript Document

$(document).ready(function(e) {
    	
	$(".table td[class='crsqtd']").on('click',function(){
	
		displayform($(this));
		
	});
	
});
function displayform(cell){
	
	var column = cell.attr('class'),
		id = cell.closest('tr').attr('id'),
		cellwidth = cell.css('width'),
		prevcontent = cell.text(),
		form = '<form action="javascript: this.preventDefault"><input type="text" name="newvalue" value="'+prevcontent+'"/><input type="hidden" name="id" value="'+id+'"/><input type="hidden" name="column" value="'+column+'"/></form>';
		
		cell.html(form).find('input[type=text]')
		.focus()
		.css('width',cellwidth);
		
		
		cell.on('click',function(){return false;});
		
		cell.on('keydown',function(e){
				if(e.keyCode == 13){
					changeField(cell,prevcontent);
				}else if(e.keyCode == 27){
					cell.text(prevcontent);
					cell.off('click');
				
				}
		});
}

function changeField(cell,prevcontent){
	cell.off('keydown');
	var url = 'producao-exec.php?act=editar',
		input = cell.find('form').serialize();
		
		
		
		$.ajax({
			type: 'POST',
			async:false, 
			dataType: "json",	
			url: url,
			data: input,	
			success: function(data){
				
				cell.html(data[0].value);
				
				var pathArray = window.location.pathname.split('/');
				
				if(pathArray[4] == 'atualizar-producao.php'){
										
					var url  = window.location.search.replace("?", "");
					var parm = url.split("=");
					
					listainfoalteracaoproducao(parm[1]);
					
				}else{
					listainfoproducao();
				}
				
			},
			error: function(data){
				alert('Houve um problema ao atualizar os dados. Por favor, tente novamente.');
				cell.html(prevcontent);
			}
		});
		
			
		cell.off('click');
	
}

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

function listainfoalteracaoproducao(code){

			$.ajax({
				type: 'POST',			
				url: '../php/listagemdeinformaproducao.php',
				data: {id:code},	
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