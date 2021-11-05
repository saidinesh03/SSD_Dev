public with sharing class JobApplicationController{
Job_Application__c ja = new Job_Application__c();
list<Job_Application__c> delrecord = new list<Job_Application__c>();
public void afterUpdateMethod( list<job_application__c> trignew){
system.debug('yo1');
for(Job_application__c j:trignew){
if(j.Status__c == 'Rejected'){
delrecord.add(ja);
delete delrecord;
system.debug('yo');
}
}
}
}