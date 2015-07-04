/* DRAG AND DROP */
/* Dragend - event $(document).bind('dragend', function(){ console.log("Dragend"); }); */ 
/* Dragging workaround: set variable to true when clicked on link and check on mouse up */
function createDraggableObject(fabricObject, buttonName) {
	var draggingStarted = false;
	
	/* Create a deep copy of the object to be able to add multiple elements */
	var deepCopy =  $.extend({}, fabricObject);
	
	$('#' + buttonName).mousedown(function() {
		draggingStarted = true;
		
		/* Change mouse cursor while dragging */
		$("nav").css('cursor', 'copy');
		$("div").css('cursor', 'copy');
		$("a").css('cursor', 'copy');
		canvas.defaultCursor = 'copy';
		
		$("#fire-dragend").mouseup(function(e) {
			if(draggingStarted == true) {
				console.log("Mouseup");
				draggingStarted = false;
				
				/* Change mouse cursor back as we're done dropping */
				$("nav").css('cursor', 'auto');
				$("div").css('cursor', 'auto');
				$("a").css('cursor', 'auto');
				canvas.defaultCursor = 'auto';
				
				/* Get mouse position on canvas */
				var offset = $("#fire-dragend").offset();
				var mouseCoordinates = {'x': e.pageX-offset.left, 'y': e.pageY-offset.top};
				
				/* Add object */	
				canvas.add(deepCopy);
				showMessage("Added button", showMessageBlue);
				
				/* Set coordinates */
				deepCopy.setTop(mouseCoordinates.y);
				deepCopy.setLeft(mouseCoordinates.x);
				
				/* Let element be further moved */
				deepCopy.setCoords();
				canvas.renderAll();
				
				/* Create a new deep copy to empty the old one */
				deepCopy =  $.extend({}, fabricObject);
			}
		});
		
		/* To end mousedown event right afterwards */
		return false;
	});
}