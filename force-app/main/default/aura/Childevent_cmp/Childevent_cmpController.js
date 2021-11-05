({
	childComponentEvent : function(cmp, event, helper) {
		var cmpEvent = cmp.getEvent("sampleCmpEvent"); 
        //Set event attribute value
        cmpEvent.setParams({"message" : "Welcome "},{"show" : "Ussop"}); 
        cmpEvent.fire(); 
	}
})