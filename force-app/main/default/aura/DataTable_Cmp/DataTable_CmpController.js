({
   init: function (cmp, event, helper) {
        cmp.set('v.mycolumns', [
            { label: 'Account Name', fieldName: 'Name', type: 'text'},
            { label: 'Phone', fieldName: 'Phone', type: 'phone'},
            { label: 'Account Number', fieldName: 'AccountNumber', type: 'text'}
        ]);
        //helper.getData(cmp);
        var action = cmp.get('c.getAccounts');
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set('v.mydata', response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    }
})