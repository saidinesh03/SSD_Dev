({
	creatCone : function(component, event, helper) {
        var acti = component.get("c.createCon");
        acti.setParams({"fname":component.find("fName").get("v.value"), 
                       "lname":component.find("lName").get("v.value"), 
                       "email":component.find("email").get("v.value"), 
                       "accId":event.getParam("accId"),
                      "phone":event.getParam("accPhone")
                      })
        console.log(event.getParam("accId")+  event.getParam("accPhone"));
        acti.setCallback(this, function(response){
            var state = response.getState();
        	if(state === "SUCCESS"){
                alert(response.getReturnValue());
            }
            else
                alert(response.getReturnValue());
        })
        $A.enqueueAction(acti);
	}
})