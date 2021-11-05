trigger Mobile_Trigger on Mobile__c (before insert, before update) {
    if(trigger.isbefore && trigger.isinsert){
        Mobile_Trigger_Controller.insertMethod(Trigger.new);
    }
    if(trigger.isbefore && trigger.isupdate){
        Mobile_Trigger_Controller.updateMethod(Trigger.new);
    }
}