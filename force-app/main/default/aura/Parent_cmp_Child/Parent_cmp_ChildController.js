({
	handleEvent1 : function(component, event, helper) {
        var fromEve = event.getParam("fromevev") + "in Child 1";
		component.set("v.fromEven", fromEve);
	}
})