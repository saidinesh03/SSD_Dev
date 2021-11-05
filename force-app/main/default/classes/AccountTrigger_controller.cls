public with sharing class AccountTrigger_controller    {
  
  public static void updateAccNames(list<Account> ua){
  
  List<Account> abc= new List<Account>();
  list<Account> Acctoupdate = new list<Account>();
  List<Account> uaId = new list<Account>();
  system.debug('gdf' +ua);
  
  abc = [select id from Account where name like '%Reddy%'];
  uaId = [select id from Account where id in :ua];
  system.debug('gf' +abc);
  
 for( account a : uaId)    {
      if(abc.contains(a)){
        system.debug('inside');
        a.name = 'New update';
    Acctoupdate.add(a);
    Acctoupdate.size();
  }
  }
  system.debug('size000 ' +Acctoupdate.size() +Acctoupdate);
  update Acctoupdate;
  }
  
  public static void updateContacts(List<Account> acca){
  
  List<Contact> uc = new List<Contact>();
  List<contact> ContoUpdate = new List<Contact>();
  uc = [select id, Level__c, Account_Updates__c from Contact where AccountId in :acca];
  
  for( Contact c : uc){
  
  if(c.level__c=='Primary'){
  
  c.Account_Updates__c = c.Account_Updates__c +1;
  ContoUpdate.add(c);
  }  
  }
  update ContoUpdate;
  }
  
  public static void insertCon(List<Account> acc){
  
  List<Contact> inscon = new List<Contact>();
  
  for(Account a : acc){
  
  Contact nc = new Contact();
  
  nc.Accountid = a.id;
  nc.FirstName = a.name.substringBefore(' ');
  nc.LastName = a.Name.substringAfterLast(' ');
  nc.phone= a.phone;
  
  inscon.add(nc);
  }
  if(inscon.size()>0){
  insert inscon;
  }
  //updatedef(inscon);
}
  /*public static void updatedef( List<Contact> uc){
  
  List<Account> acc = new list<Account>();
  
  acc = [select id from Account where id in :uc];
  
  for(Account a : acc){
  if([select count() from Account where id = :a.id]>=1){
  
  a.Only_Default_Contact__c=false;
  }
  }
  }*/
    public static void deleteCheck(List<Account> Del_Acc){
        List<Account> Del_List = new List<Account>();
        List<Account> Err_List = new List<Account>();
        for(Account ac : Del_Acc){
            if(ac.ownerid != Userinfo.getUserId())
             	ac.addError('You cannot delete because, you are not owner');
        }
        //delete Del_List;        
    }
    public static void createContact(List<Account> AccList){
        List<Contact> cc = new List<Contact>();
        
        for(Account a : AccList){
            Contact c = new Contact();
            c.AccountId = a.Id;
            c.FirstName = 'Dummy';
            c.LastName = 'Contact';
            cc.add(c);
        }
        insert cc;
    }
}