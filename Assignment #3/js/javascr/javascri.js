$(document).ready(function() {    
//start     
	$('.uidraggable').draggable({
		cursor: 'move',
		helper: 'clone',
        containment: "#pad", 
		appendTo: "#pad" 
		
    });
	
	var id_container = null;
	var class_container = null;
	
	var tempElement = null;
	$('#pad').droppable({
        accept: '.uidraggable',
        drop: function(event, ui){		
			var elem = $(ui.helper).clone();
			var n = $(elem).attr('class');
			//alert(n);
			$(this).append($(elem));
			$(elem).addClass("item");
            $(".item").removeClass("ui-draggable");
			$(".item").removeClass("uidraggable");
            $(".item").draggable({
				cursor: 'move',
				containment: '#pad'                        
            }).resizable()
            .click(function() {
            	
            	
            	//remove button 
            	var temp = this;
            	$(".icon-remove").click(function(){
            		//alert(tempElement);
            		//tempElement.remove();
            		$(temp).remove();
            	});
            	
            	
            	//	paletteController(this);
            /*	alert(this);
            	tempElement = this;
            	id_contatiner = $(this).attr('id');
            	class_conatiner = $(this).attr('class');
            	
            	alert(id_contatiner + ' ahah ' + class_conatiner);
            	//$(this).focus();            	
            	
            	var current_id = $(this).attr('id');
            	current_id = current_id + '-babo';
            	alert(id_container + ' and ' + current_id);
            	
            	if(id_container != current_id){
            		//alert("Handler for .click() called.");
                	//$(this).removeClass("item").addClass("clicked_item");
            		$(this).focus();
            		alert($(this).hasfocus);
            	}*/            	            	            	
            });            
		}
	});
	
	
	/*** Palette Control functions ***/
	$('#palette').draggable();	
	
	var clicked_remove_circle = false;
	$(".icon-remove-circle").click(function() {
		//  alert("Handler for .click() called.");		
		if(clicked_remove_circle){
			$('#whxy').show();
			$('#palette_footer').show();
			clicked_remove_circle = false;
		}else{			
			$('#whxy').hide();
			$('#palette_footer').hide();
			clicked_remove_circle = true;	
		}		
	});
	
	$(".icon-remove").click(function(){
		/*//alert(tempElement);
		//tempElement.remove();
		var element = document.getElementById(tempElement);
		.remove(element);*/
	});
	
	function paletteController(element){
		alert(element);
		$(".icon-remove").click(function(){
			alert(element);
		});
	}
	
}); 
           