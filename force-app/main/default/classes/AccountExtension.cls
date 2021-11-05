public without sharing class AccountExtension {
    private Account account;

    public AccountExtension(ApexPages.StandardController stdController) {
    
    if(!apexpages.currentpage().getparameters().containskey('id'))
        {
         account = new Account();
        }
    
    }
      
      public account getAccount()
      {
      return account;
      }
        public PageReference myEdit(){
        PageReference ref = new PageReference('/apex/EditingPage?id='+ApexPages.currentpage().getparameters().get('id'));
        return ref;
        }
        public PageReference save()
        {
        if(apexpages.currentpage().getparameters().containskey('id'))
        {
        update account;
        PageReference red = new PageReference('/apex/naruto?id='+ApexPages.currentpage().getparameters().get('id'));
        return red;
        }
        else
        {
        
        
        insert account;
        PageReference red = new PageReference('/apex/naruto?id='+account.id);
       // PageReference red = new PageReference('/apex/naruto?id='+ApexPages.currentpage().getparameters().get('id'));
        return red;
        } 
        }
    
    @AuraEnabled
    public static List<Account> getAccounts( Integer count){
        List<Account> acclist = new List<Account>();
        
        acclist = [select id, Name, Phone, AccountNumber from Account limit: count];
        for( Account a : acclist)
            system.debug(a.id);        
        return acclist;
        
    }
    @AuraEnabled
    public static List<Account> findAccounts(String type, String own){
        List<Account> acclist = new List<Account>();
        
        acclist = [select id, Name, Phone, AccountNumber, Type, Owner.name from Account where type Like :type or phone != null];
        for( Account a : acclist)
            system.debug(a.id);        
        return acclist;
    }
    @AuraEnabled
    public static String getAccountInfo(String Name, String Type){
        Account a = new Account();
        a = [select id from Account where Type Like :Type or Name Like :Name limit 1];       
        return a.Id;
    }
    @AuraEnabled
    public static List<Account> searchAccounts(String acc_Name){
        List<Account> acclist = new List<Account>();
        
        acclist = [select Name, Phone, Industry, Type from Account where Name like :acc_Name];        
        return acclist;
    }
    @AuraEnabled
    public static Date getComplianceDate(Date StartDt){
        Date complianceDate;
        if(StartDt == null){
            complianceDate = null;
        }
        else{
            complianceDate = StartDt.addDays(10);
        }
        return complianceDate;
    }
}