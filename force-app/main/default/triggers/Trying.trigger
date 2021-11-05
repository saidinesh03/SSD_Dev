trigger Trying on Student__c (before insert, Before update, after insert) {
TryingTriggerController ttc = new TryingTriggerController();
if(Trigger.isbefore && Trigger.isinsert)
{
 ttc.beforeInsertMethod();
}
if(Trigger.isbefore && Trigger.isupdate)
{
 ttc.beforeUpdateMethod();
}
if(Trigger.isafter && Trigger.isinsert)
{
 ttc.afterInsertMethod();
}
}