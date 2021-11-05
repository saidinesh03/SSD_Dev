({
	show : function(component, event, helper) {
		var hero = component.find("hero").get("v.value");
        var heroine = component.find("heroine").get("v.value");
        var sea = hero+ ' and ' +heroine;
        component.find("see").set("v.value",sea);
	},
    read : function(component, event, helper) {
       var he = component.get("v.hero");
       var her = component.get("v.heroine");
       var both = he + 'and' + her;
       component.set("v.bothname",both);
     },
    lear : function(component, event, helper) {
       //component.find("see").set("v.value",'');
       component.set("v.bothname",'');
     }
})