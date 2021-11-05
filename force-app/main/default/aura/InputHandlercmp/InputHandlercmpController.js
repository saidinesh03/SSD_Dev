({
    show : function(component, event, helper) {
    	var fname = component.get("v.fName");
        var age = component.get("v.fage");
        var phone = component.get("v.fphone");
    	
    var details = "Details you provided are : " + fname + " " + age + " " + phone;
    component.set("v.det", details);
	},
	print : function(component, event, helper) {
		var fname = component.get("v.fName");
        var age = component.get("v.fage");
        var phone = component.get("v.fphone");
        
        var sent = "Your details are" + fname + age+ phone + "as per input";
        component.set("v.sentence", sent);
	}
})