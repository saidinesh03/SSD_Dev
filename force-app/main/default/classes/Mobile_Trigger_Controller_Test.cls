@isTest
public class Mobile_Trigger_Controller_Test {

    static testMethod void create_data(){
        Mobile__c mb1 = new Mobile__c(Customer_Name__c = 'Sai', Brand__c='Apple', Mobile_Price__c = 5250);
        Mobile__c mb2 = new Mobile__c(Customer_Name__c = 'Sai', Brand__c='Samsung', Mobile_Price__c = 5250);
        Mobile__c mb3 = new Mobile__c(Customer_Name__c = 'Sai', Brand__c='Blackberry', Mobile_Price__c = 5250);
        test.startTest();
        insert mb1;
        insert mb2;
        insert mb3;
        mb1.Discount_Applied__c = 'peace';
        mb2.Discount_Applied__c = 'peace';
        mb3.Discount_Applied__c = 'peace';
        update mb1;
        update mb2;
        update mb3;
        test.stopTest();
    }
    
}