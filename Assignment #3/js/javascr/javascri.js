$(document).ready(function() {    
//start     
	var counter = 0;
	$('.uidraggable').draggable({
		cursor: 'move',
		helper: 'clone',
        containment: "#pad", 
		appendTo: "#pad",
		start: function() {
			   var dc =($(this).parent().attr("data-category"));
			   ($(this).parent().attr("data-category", "recently " + dc));
			   } 
		
    });
	
	var element_container = null;
	
	var tempElement = null;
	$('#pad').droppable({
        accept: '.uidraggable',
        drop: function(event, ui){		
			var elem = $(ui.helper).clone();
			counter++;
			elem.attr("id", "id" + counter);
			$(this).append($(elem));
			$(elem).addClass("item");
            $(".item").removeClass("ui-draggable");
			$(".item").removeClass("uidraggable");
            $(".item").draggable({
				cursor: 'move',
				containment: '#pad'                        
            }).resizable()
           /* .click(function()   
            	
            	//remove button 
            	var temp = this;
            	$(".icon-remove").click(function(){
            		$(temp).remove();
            	});      	            	
            }) */
            .bind({            	
            	click: function() { 
            		var tempWidth = this.offsetWidth;
                	var tempHeight = this.offsetHeight;
                	var tempoffset = $(this).offset();
                	var tempx = tempoffset.left + tempWidth / 2;
                	var tempy = tempoffset.top + tempHeight / 2;
                	$('#inbox_width').val(tempWidth);
                	$('#inbox_height').val(tempHeight);
                	$('#inbox_x').val(tempx);
                	$('#inbox_y').val(tempy);
                	element_container = this;
            	},            	
            	drag: function(){
            		var tempWidth = this.offsetWidth;
                	var tempHeight = this.offsetHeight;
                	var tempoffset = $(this).offset();
                	var tempx = tempoffset.left + tempWidth / 2;
                	var tempy = tempoffset.top + tempHeight / 2;
            		$('#inbox_width').val(tempWidth);
                    $('#inbox_height').val(tempHeight);
                    $('#inbox_x').val(tempx);
                    $('#inbox_y').val(tempy);
                    element_container = this;
            	}            	
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
		$(element_container).remove();
	});   
	
}); 
           