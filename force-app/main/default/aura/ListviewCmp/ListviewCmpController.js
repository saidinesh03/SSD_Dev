({
	retrieve : function(component, event, helper) {
        component.set('v.mycolumns', [
           		{ label: "Account name", fieldName: "Name", type: "text"},
                { label: "Account Phone", fieldName: "Phone", type: "phone"},
                { label: "Account Number", fieldName: "AccountNumber", type: "text"}
        ]);
        var s = component.find("size").get("v.value");
		var action = component.get('c.getAccounts');
        action.setCallback(this, function(response){
            action.setParams({count : s});
            var state = response.getState();
            if (state === "SUCCESS") {
            	component.set('v.listViewAccounts', response.getReturnValue());
            }else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
	}
})