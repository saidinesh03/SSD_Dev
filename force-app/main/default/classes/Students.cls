public with sharing class Students {

    public PageReference links() {
        return null;
    }


public list<Student__c> st{get;set;}
public Students()
{
 st= new list<Student__c>();
 st = [select id,name from Student__c];
 }

}