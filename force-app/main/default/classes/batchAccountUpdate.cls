global class batchAccountUpdate implements Database.Batchable<sobject>
{
 global Database.QueryLocator start(Database.BatchableContext BC)
 {
  String query = 'select id,name from Account';
  return Database.getQueryLocator(query);
 }
 global void execute(Database.BatchableContext BC,list<Account> scope)
 {
  for(Account a: scope)
  {
   a.name = a.name + ' Reddy'; 
  }
  update scope;
 }
 global void finish(Database.BatchableContext BC)
 {
 }
   }