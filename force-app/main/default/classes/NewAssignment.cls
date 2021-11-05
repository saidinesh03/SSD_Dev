public with sharing class NewAssignment {

    public String PickLists{ get; set; }

    public List<Student__c> Stu { get; set; }
    public list<selectoption> PicklistValues { get; set; }
    public boolean hidevalue{get;set;}
    public NewAssignment()
    {
     PicklistValues =new List<selectoption>();
     PicklistValues.add(new selectoption('none','-select-'));
     PicklistValues.add(new selectoption('Active','Active'));
     PicklistValues.add(new selectoption('Inactive','Inactive'));
    Stu = new list<Student__c>();
    hidevalue = false;
    }
    public pagereference Searching() {
        Stu = [select id,name, contact_number__c, email_id__c, date_of_birth__c, status__c from Student__c where Status__c = :PickLists];
        if(stu.size()>0)
        {
        hidevalue = true;
        }else{
        hidevalue = false;
        }
        
        return null;
    } 
}