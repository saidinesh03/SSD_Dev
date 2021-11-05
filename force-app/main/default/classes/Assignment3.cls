public with sharing class Assignment3 {

    public list<Sobject> objDetails { get; set; }

    public Boolean pbrend { get; set; }

    public list<selectoption> selOptns { get; set; }
    
    public list<selectoption> objList{get;set;}

    public String querySel{get;set;}
    
    public String SearchString{get;set;}
    
    public String objName { get; set; }
 public Assignment3(){
    selOptns = new list<selectoption>();
    objList = new list<selectoption>();
    objList.add(new selectoption('Yes','Yes'));
    objList.add(new selectoption('No','No'));
    selOptns.add(new selectoption('Student__c','Student'));
    selOptns.add(new selectoption('Course__c','Course'));
    selOptns.add(new selectoption('Trainer__c','Trainer'));
    pbrend = false;
    }
    public pagereference rend()
    {
    pbrend = true;
    return null;
    }
     public PageReference RetrieveDetails() {
    if(querySel=='Yes')
    {
    objDetails = new List<sObject>();
    System.debug('myvalue---->' +objName);
    objDetails = Database.Query('select id, name from ' + objName);
    }
    else
    {
    list<list<Sobject>> objDetail = new list<list<sObject>>();
    System.debug('myvalue---->' +objName);
    objDetail = Search.Query('find \''+SearchString+'*\' in name fields returning '+objName);
    objDetails = objDetail[0];
    }
    return null;
    }
}