({
    Fetching : function(component, event, helper) {
        var serv = component.get("c.getAccounts");
        serv.setParams({"inputName" : component.get("v.accountData[0]")});
        serv.setCallback(this, function(response) {
            var status = response.getState();
            console.log("Status :"+ status);
            console.log(response.getReturnValue());
            component.set("v.accountData", response.getReturnValue());
        });
      
         $A.enqueueAction(serv);
    }
     
})