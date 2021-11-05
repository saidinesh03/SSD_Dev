({
	getAccountas : function(component, event, helper) {
        var act = component.get("c.getAccountInfo");
        act.setParams({"Name":component.find("AccName").get("v.value"),
                       "Type":component.find("AccType").get("v.value")});
        act.setCallback(this, function(response){
                        var state = response.getState();
        				if(state === "SUCCESS"){
                            var aid = response.getReturnValue();
                            console.log(aid+component.find("AccPhone").get("v.value"));
                            var accev = component.getEvent("accEve");
                            accev.setParams({"accId":aid,
                                             "accPhone":component.find("AccPhone").get("v.value")});
                            accev.fire();
        				}
        				else{
            				alert("Failed");
        				}
        });
        $A.enqueueAction(act);
	}
})