public with sharing class firstcustomcontroller
{
 public list<Account> acclist{get;set;}
 public firstcustomcontroller()
 {
 acclist = new list<account>();
 acclist = [select id,name from account];
 }
 public pagereference neww()
 {
 return page.secondpage;
 }
  }