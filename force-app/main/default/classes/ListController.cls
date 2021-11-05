public with sharing class ListController {
    
    /*@AuraEnabled
    public static List<Contact> findAll() {
        return databse.query('SELECT id, name, phone FROM '+  +'LIMIT 20'];
    }*/
    
    @AuraEnabled
    public static List<SObject> findByName(String searchKey) {
        String name = '%' + searchKey + '%';
        return [select id,name ,phone from contact where Name Like :name limit 25];
    }
    @AuraEnabled
    public static List<SObject> findByNameA(String searchKey) {
        String name = '%' + searchKey + '%';
        return [select id,name ,phone from Account where Name Like :name limit 25];
    }
  }