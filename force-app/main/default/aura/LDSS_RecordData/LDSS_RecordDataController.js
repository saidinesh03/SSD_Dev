({
	creatCon : function(component, event, helper) {
		component.find("LDS_Form").getNewRecord("Contact",
                       null,
                       false,
                       $A.getCallback(function(){
                       		var recs = component.get("v.rec");
                       		var em = component.get("v.error");
                           if( recs === null || em){
                               console.log("Record not created");
                               return;
                           }else
                               console.log("Record created" + recs.sobjectType);
                         }))
	}
})