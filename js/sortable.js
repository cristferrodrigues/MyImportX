// JavaScript Document



$(document).ready(function(e) {

	$("ul.menuadm").sortable({ opacity: 0.6, cursor: 'move', update: function() {
		var order = $(this).sortable("serialize") + '&act=alterarprosicao'; 
		
		$.post("../php/submenu-exec.php", order, function(theResponse){									
			//alert("Ok Ordenado :D");
			 			 
			var myStack = {"dir1": "down", "dir2": "right", "push": "top"};
			new PNotify({
				title: "Ordenação",
				text: "Menu Ordenado.",
				addclass: "stack-custom",
				stack: myStack
			});
		});															 
	}								  
	});
});
	

