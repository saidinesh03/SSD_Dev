({
	findAcc : function(component, event, helper) {
        component.set("v.fields", [
            { label : "Account Name", fieldName : "Name", type : "text"},
            { label : "Phone", fieldName : "Phone", type : "phone"},
            { label : "Account Num", fieldName : "AccountNumber", type : "text"},
            { label : "Owner", fieldName : "Owner.name", type : "text"},
            { label : "Type", fieldName : "Type", type : "text"}
        ]);
        
        var act = component.get("c.findAccounts");
        act.setParams({ type : component.find("type").get("v.value")});
        console.log("Here00");
        act.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.AccDetails", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(act);    
            
            
	}
})