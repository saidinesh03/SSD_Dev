public with sharing class apexInput {
@AuraEnabled
    public static List<SObject> getAccounts(String inputName) {
        return database.query('select Name from '+inputName);        
    }   

}