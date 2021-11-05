({
	displayOpp : function(component, event, helper) {
        component.set("v.column_v", [
            { label: 'Name', fieldName: 'Name', type: 'text'},
            { label: 'Account', fieldName: 'Account.Name', type: 'text'},
            { label: 'Stage Name', fieldName: 'StageName', type: 'text'},
            { label: 'Amount', fieldName: 'Amount', type: 'currency'}
        ]);
		var act = component.get("c.searchOpps");
        act.setParams({"acc_Name": event.getParam("accName")});
        act.setCallback(this, function(response){
            var state = response.getState();
            if(state==="SUCCESS"){
                component.set("v.Opp_info", response.getReturnValue());    
            }else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
        	}
		})
        $A.enqueueAction(act);
    }
})