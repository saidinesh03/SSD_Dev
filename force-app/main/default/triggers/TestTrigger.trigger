trigger TestTrigger on Course__c (before insert) {
Course__c cc;
date birthDate = date.parse('04/15/2014');

if(trigger.isinsert)
{
 Student__c cs= new Student__c();
 for(course__c c: Trigger.New)
 {
 cs.name = c.Course_Trainer__c;
 cs.email_id__c = 'Hyorinmaru@zanp.com';
 cs.contact_number__c = '7893291045';
 cs.location__c = 'Hyderabad';
 cs.preffered_Location__c = 'Vijayawada';
 cs.date_of_birth__c = birthDate;
 cs.status__c = 'active';
 } 
 insert cs;
}
}