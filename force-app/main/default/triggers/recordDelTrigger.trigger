trigger recordDelTrigger on Job_Application__c (after update) {
job_application__c ja = new job_application__c();
JobApplicationController jac = new JobApplicationController();
if(Trigger.isupdate){
jac.afterUpdateMethod((list<job_application__c>)Trigger.new);
}
}