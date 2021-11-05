({
    searchKeyChange: function(component, event, helper) {
        var fevent = $A.get("e.c:Assign2event");
        fevent.setParams({"searchKey": event.target.value});
        fevent.fire();
    }
})