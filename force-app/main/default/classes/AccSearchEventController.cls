public class AccSearchEventController {
 	@AuraEnabled
    public static List<Account> searchAccounts(String acc_Name){
        List<Account> acclist = new List<Account>();
        String a= acc_Name;
  		String j= '%'+a+'%';
        acclist = [select Name, Phone, Industry, Type from Account where Name like :j];        
        return acclist;
    }
    @AuraEnabled
    public static List<Contact> searchCons(String acc_Name){
        List<Contact> conlist = new List<Contact>();
        String a= acc_Name;
  		String j= '%'+a+'%';
        conlist = [select FirstName, LastName, Account.Name, Phone from Contact where Account.Name like :j];  
        for (Contact c : conlist){
            System.debug(c.Account.Name);
        }
        return conlist;
    }
    @AuraEnabled
    public static List<Opportunity> searchOpps(String acc_Name){
        List<Opportunity> Opplist = new List<Opportunity>();
        String a= acc_Name;
  		String j= '%'+a+'%';
        Opplist = [select Name, Account.Name, StageName, Amount from Opportunity where Account.Name like :j];
        for (Opportunity o : Opplist){
            System.debug(o.Account.Name);
        }
        return Opplist;
    }
}