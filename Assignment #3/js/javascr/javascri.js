$(document).ready(function() {    
//start     
	$('.uidraggable').draggable({
		cursor: 'move',
		helper: 'clone',
        containment: "#pad", 
		appendTo: "#pad" 
		
    });
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
                        
                });
		}
	});
}); 
           