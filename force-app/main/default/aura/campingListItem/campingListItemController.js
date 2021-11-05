({
	PackItem: function(component, event, helper) {
        //var.btn = event.getSource();
        var a = component.get("v.item");
	    a.Packed__c = true;
        component.set("v.disabled", true);
	    component.set("v.item",a); 
	}
})