trigger AccTrigger on Account (after update, after insert, before delete) {

	if(Trigger.isafter){

    	if(Trigger.isinsert){
    		AccountTrigger_controller.insertCon(Trigger.new);
            AccountTrigger_controller.createContact(Trigger.new);
     	}
  		if(Trigger.isupdate){
   			AccountTrigger_controller.updateAccNames(Trigger.new);
   			AccountTrigger_controller.updateContacts(Trigger.new);
        }
    }
    if(Trigger.isbefore && Trigger.isdelete){
        AccountTrigger_controller.deleteCheck(Trigger.old);
    }
}