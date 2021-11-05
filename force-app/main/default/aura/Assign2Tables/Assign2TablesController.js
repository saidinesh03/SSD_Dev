({
    doInit : function(component, event) {
        var action = component.get("c.findAll");
        action.setCallback(this, function(a) {
            component.set("v.contacts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    searchKeyChange: function(component, event) {
        var searchKey = event.getParam("searchKey");
        var action = component.get("c.findByName");
        var action1 = component.get("c.findbynameA");
        
        action.setParams({"searchKey": searchKey});
        action.setCallback(this, function(a) {
            component.set("v.contacts", a.getReturnValue());
            console.log("Status :"+ status);
            console.log(response.getReturnValue());
        });
        $A.enqueueAction(action);
        action1.setParams({"searchKey": searchKey});
        action1.setCallback(this, function(a1) {
            component.set("v.accounts",a1.getReturnValue());
            console.log("Status :"+ status);
            console.log(response.getReturnValue());
        });
        $A.enqueueAction(action1);
        
    }
})