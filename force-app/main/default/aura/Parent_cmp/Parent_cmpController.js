({
	handleEvent : function(component, event, helper) {
        var hero = event.getParam("Hero");
        var fromEve = event.getParam("fromevev") + "in parent";
        console.log("Name" + hero);
		component.set("v.pname", hero);
        component.set("v.fromEve", fromEve);
	}
})