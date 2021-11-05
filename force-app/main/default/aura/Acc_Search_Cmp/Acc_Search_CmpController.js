({
	SearchRecs : function(component, event, helper) {
		var acc = component.find("AccName").get("v.value");
        var evt = $A.get("e.c:Acc_Search_Event");
        evt.setParams({"accName":acc});
        evt.fire();
	}
})