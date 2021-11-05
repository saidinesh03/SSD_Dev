({
	displayAcc : function(component, event, helper) {
        component.set('v.column_Val', [
            { label: 'Account Name', fieldName: 'linkName', type: 'url',
             typeAttributes: { label: { fieldName: 'Name' }, target: '_blank', tooltip: {fieldName: 'Name'}}},
            { label: 'Phone', fieldName: 'Phone', type: 'phone'},
            { label: 'Industry', fieldName: 'Industry', type: 'text'},
            { label: 'Type', fieldName: 'Type', type: 'text'}
        ]);
		var act = component.get("c.searchAccounts");
        act.setParams({"acc_Name": event.getParam("accName")});
        act.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var records =response.getReturnValue();
                records.forEach(function(record){
                    record.linkName = '/'+record.Id;
                    record.AccountName = record.Account.Name;
                })
                component.set("v.Acc_info", records);
            }else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
        	}
		})
        $A.enqueueAction(act);
    }
})