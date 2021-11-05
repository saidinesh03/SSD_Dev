public with sharing class TryingTriggerController{
contact ct;
Account ac;
trainer__c tc;
list<Student__c> newList = Trigger.new;
list<contact> cnlist = new list<contact>();
public void beforeInsertMethod()
{
 for(student__c s:newList)
{
ac = new Account();
tc = new Trainer__c();
ac.name = s.name;
system.debug('Student name is> ' + s.name);
tc.just_like_that__c = 5;
tc.female__c = true;
tc.male__c = false;
insert ac;
insert tc;
}
}
public void beforeUpdateMethod()
{
 
}
public void afterInsertMethod()
{
 for(Student__c s : newList)
{
 contact ct = new contact();
 ct.lastname = s.name;
 ct.student__c = s.id;
 cnlist.add(ct);
}
insert cnlist;
}
}