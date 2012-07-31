var element_container = null;
var errText = "You have not chosen a right element. " +
		"\n You should choose an element on the canvas by clicking or dragging.";
$(document).ready(
		
		
		function() {
			// start
			var elem;
			$(".uidraggable").click(function() {
				// alert("click");
				
				if ($(this).hasClass(".item")) {
					elem = $(this).removeClass("uidraggable").draggable();
					$(this).unbind('click').removeClass("uidraggable");
					$(elem).unbind('click').removeClass("uidraggable");
				}
				if (!($(this).hasClass(".item"))) {
					elem = $(this).clone().removeClass("uidraggable");
					$(elem).addClass("item").draggable();
					$(this).unbind('click');
					$(elem).unbind('click');
				}
				$("#pad").dblclick(function(e) {
					// alert("clickagain");
					var x = e.pageX - this.offsetLeft;
					var y = e.pageY - this.offsetTop;
					$(elem).css({
						left : x,
						top : y
					}).appendTo('#pad');
					$(this).unbind('dblclick');
					var dc = ($(elem).parent().attr("data-category"));
					($(elem).parent().attr("data-category", "recently " + dc));
				});
			});

			$(".item").click(
					function() {
						// alert("click");
						var elem;
						if ($(this).hasClass(".item")) {
							elem = $(this).draggable("destroy").removeClass(
									"uidraggable").draggable();
							$(this).unbind('click');
							$(elem).unbind('click');
						}
						$("#pad").dblclick(function(e) {
							// alert("clickagain");
							var x = e.pageX - this.offsetLeft;
							var y = e.pageY - this.offsetTop;
							$(elem).css({
								left : x,
								top : y
							}).appendTo('#pad');
							$(this).unbind('dblclick');
						});
					});

			var counter = 0;
			$('.uidraggable').draggable({
				cursor : 'move',
				helper : 'clone',
				containment : "#pad",
				appendTo : "#pad",
				start : function() {
					var dc = ($(this).parent().attr("data-category"));
					($(this).parent().attr("data-category", "recently " + dc));
				},
				stop : function() {
					var tempWidth = this.offsetWidth;
					var tempHeight = this.offsetHeight;
					var tempoffset = $(this).offset();
					var tempx = tempoffset.left
					var tempy = tempoffset.top
					$('#inbox_width').val(tempWidth);
					$('#inbox_height').val(tempHeight);
					$('#inbox_x').val(tempx);
					$('#inbox_y').val(tempy);
				}

			});

			

			var tempElement = null;
			$('#pad').droppable({
				accept : '.uidraggable',
				drop : function(event, ui) {
					var elem = $(ui.helper).clone();
					counter++;
					elem.attr("id", "id" + counter);
					$(this).append($(elem));
					$(elem).addClass("item");
					$(".item").removeClass("ui-draggable");
					$(".item").removeClass("uidraggable");
					$(".item").draggable({
						cursor : 'move',
						containment : '#pad'
					}).resizable().bind({
						click : function() {
							var tempWidth = this.offsetWidth;
							var tempHeight = this.offsetHeight;
							var tempoffset = $(this).offset();
							var tempx = tempoffset.left
							var tempy = tempoffset.top
							$('#inbox_width').val(tempWidth);
							$('#inbox_height').val(tempHeight);
							$('#inbox_x').val(tempx);
							$('#inbox_y').val(tempy);
							element_container = this;
						},
						drag : function() {
							var tempWidth = this.offsetWidth;
							var tempHeight = this.offsetHeight;
							var tempoffset = $(this).offset();
							var tempx = tempoffset.left
							var tempy = tempoffset.top
							$('#inbox_width').val(tempWidth);
							$('#inbox_height').val(tempHeight);
							$('#inbox_x').val(tempx);
							$('#inbox_y').val(tempy);
							element_container = this;
						}
					});
				}
			});

			/** * Palette Control functions ** */
			/** * The user should either click or drag to put focus on an element ** */
			$('#palette').draggable();

			var clicked_remove_circle = false;
			$(".icon-remove-circle").click(function() {
				if (clicked_remove_circle) {
					$('#whxy').show();
					$('#palette_footer').show();
					clicked_remove_circle = false;
				} else {
					$('#whxy').hide();
					$('#palette_footer').hide();
					clicked_remove_circle = true;
				}
			});

			// remove button
			$(".icon-remove").click(function() {
				if(element_container == null){
					alert(errText);
				}
				
				$(element_container).remove();
				$('#inbox_width').val(0);
				$('#inbox_height').val(0);
				$('#inbox_x').val(0);
				$('#inbox_y').val(0);
				element_container = null;
			});

			/**
			 * * The user should click an up or down arrow on the palette to
			 * apply the size.**
			 */
			// change width
			$("#inbox_width").click(function() {
				if(element_container == null){
					alert(errText);
				}
				var input_value = $('#inbox_width').val();
				$(element_container).animate({
					width : input_value
				});
			});
			// change height
			$("#inbox_height").click(function() {
				if(element_container == null){
					alert(errText);
				}
				var input_value = $('#inbox_height').val();
				$(element_container).animate({
					height : input_value
				});
			});
			// change x-coordinate
			$("#inbox_x").click(function() {
				if(element_container == null){
					alert(errText);
				}
				var input_value = $('#inbox_x').val();
				$(element_container).animate({
					left : input_value
				});
			});
			// change y-coordinate
			$("#inbox_y").click(function() {
				if(element_container == null){
					alert(errText);
				}
				var input_value = $('#inbox_y').val();
				$(element_container).animate({
					top : input_value
				});
			});

			// lock button
			$(".icon-lock").click(
					function() {
						if(element_container == null){
							alert(errText);
						}
						var disabled = $(element_container).draggable("option",
								"disabled");
						if (disabled) {
							$(element_container).draggable({
								disabled : false
							});
							alert('The chosen element is able to Move');
						} else if (disabled == false) {
							$(element_container).draggable({
								disabled : true
							});
							alert('The chosen element is inable to Move');
						}
					});
			
			//text style changers 			
			$(".icon-bold").click(function() {
				try{
				if (element_container.style.fontWeight != "bold") {
					element_container.style.fontWeight = "bold";
				} else {
					element_container.style.fontWeight = "normal"
				}
				}catch(err){
				
				alert(errText);
				}
			});
			
			$(".icon-italic").click(function(){
				try{
				if (element_container.style.fontStyle != "italic") {
					element_container.style.fontStyle = "italic";
				} else {
					element_container.style.fontStyle = "normal"
				}
				}catch(err){
					alert(errText);
				}
			});
			
			$(".icon-underline").click(function(){
				try{
					if (element_container.style.textDecoration != "underline") {
						element_container.style.textDecoration = "underline";
					} else {
						element_container.style.textDecoration = "none"
					}
				}catch(err){
					alert(errText);
				}
			});
			
			$(".icon-strikethrough").click(function(){
				try{
					if (element_container.style.textDecoration != "line-through") {
						element_container.style.textDecoration = "line-through";
					} else {
						element_container.style.textDecoration = "none"
					}
				}catch(err){
					alert(errText);
				}
			});
			
			
			$(function() {
				var availableTags = [
					"Button",
					"Browser",
					"Image",
					"Textfield",
					"Button Bar",
					"Search",
					"Section Title",
					"Checkbox",
					"Radio Button",
					"Combobox",
					"Accordin",
					"Tab Bar",
					"Link Bar",
					"Vertical Tab",
					"Table",
					"Format Bar",
					"Menu",
					"Text Box",
					"Date Picker",
					"List",
					"Date Stepper"
					
				];
				$("#sbox").autocomplete({
					source: availableTags,
					autoFocus: true
				});
			}); 
			   
			var toInsert;    
			$("#sbox").keyup(function(event){
		    if(event.keyCode == 13){
		        toInsert = ($("#sbox").val());
				//alert(toInsert);
				}
				if(toInsert == "Button")
				{
					$('#sbtn').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Browser")
				{
					$('#libBrowserOuterFrame').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Image")
				{
					$('#libImage').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Textfield")
				{
					$('#libDummyContainer').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Button Bar")
				{
					$('#libButtonBarBox').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Search")
				{
					$('#libSearchBox').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Section Title")
				{
					$('#libHeaderBox').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Checkbox")
				{
					$('#libCheckBox').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Radio Button")
				{
					$('#libRadioBox').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Combobox")
				{
					$('#libComboBox').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Accordin")
				{
					$('#libAccordin').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Tab Bar")
				{
					$('#libTabbar').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Link Bar")
				{
					$('#libLinkbar').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Vertical Tab")
				{
					$('#libVerticalTab').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Table")
				{
					$('#libTable').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Format Bar")
				{
					$('#libFormatBar').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Menu")
				{
					$('#libMenu').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Text Box")
				{
					$('#libTextBox').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Date Picker")
				{
					$('#libDatePickerBox').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "List")
				{
					$('#libList').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				if(toInsert == "Date Stepper")
				{
					$('#libNumStepper').clone().appendTo('#pad').removeClass("uidraggable").addClass("item").draggable();
					toInsert = "";
					$("#sbox").val("");
				}
				
		    });

		});

function fontChanger(){
	try{
	var list_value = document.getElementById("list_style")
	element_container.style.fontFamily = list_value.options[list_style.selectedIndex].text;
	}catch(err){
		alert(errText);
	}
	//alert(list_value.options[list_style.selectedIndex].text);
}

