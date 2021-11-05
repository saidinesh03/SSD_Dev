public with sharing class LoginComponentController {

    public void LoginMethod() {
        if(password!=null || userName != null){
        if(password == [select Contact_Number__c from Student__c where name = :userName]){
        ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.Confirm,'Correct creds.');
        ApexPages.addMessage(myMsg);
        }
        else{
        ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.Error,'Invalid login creds.');
        ApexPages.addMessage(myMsg);
        }
        }
        else{
        ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.Error,'Please Enter detials');
        ApexPages.addMessage(myMsg);
        }
    }
    public list<Student__c> password { get; set; }

    public String userName { get; set; }
}