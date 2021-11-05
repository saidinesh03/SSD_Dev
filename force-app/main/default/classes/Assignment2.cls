public with sharing class Assignment2 {
    
    public list<Student__c> objDataStudent { get; set; }

    public Student__C objData { get; set; }
    
    public List<Course__C> objDataCourse { get; set; }

    public List<selectoption> selOptns { get; set; }

    public String objName { get; set; }
    
    public list<sobject> objdetails{get;set;}
    public assignment2(){
    selOptns = new list<selectoption>();
    selOptns.add(new selectoption('Student__c','Student'));
    selOptns.add(new selectoption('Course__c','Course'));
    selOptns.add(new selectoption('Trainer__c','Trainer'));
    }
    
    public PageReference retrieveObjData() {
    objDetails = database.query('select OwnerId, LastModifiedById, CreatedById, Name, RecordTypeId from '+objName);
    return null;
    }
}