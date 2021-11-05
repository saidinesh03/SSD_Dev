({
	fireEvent : function(component, event, helper) {
        var even = component.getEvent("eve");
        even.setParams({"Hero":component.find("names").get("v.value"), "fromevev":"Sending this to fire"});
        even.fire();
	}
})