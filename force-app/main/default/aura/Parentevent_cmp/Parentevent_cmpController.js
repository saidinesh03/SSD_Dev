({
	parentComponentEvent : function(cmp, event) {
		var message = event.getParam("message"); 
        var showm = event.getParam("show"); 
        //Set the handler attributes based on event data 
        cmp.set("v.eventMessage", message + 'Dinesh');
        cmp.set("v.eventshow", show + 'Luffy');
	}
})