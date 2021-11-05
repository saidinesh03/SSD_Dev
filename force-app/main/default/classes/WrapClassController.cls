public with sharing class WrapClassController {

    public PageReference selectprocess() {
        return null;
    }


/*public pagereference hidemethod(){

return null;}*/

    public String addtolist { get; set; }
    
   // public list<WrapperC> wrappedlist{ get; set; }

    public list<String> selectedrecs { get; set; }

    public Boolean msg { get; set; }
    
    public list<selectoption> selOptns { get; set; }
    
    public Boolean tbrend { get; set; }
    
    public list<SObject> objectData { get; set; }
    
    public list<SObject> selobjectData { get; set; }
    
    public Boolean messrend { get; set; }
    
    public String objName { get; set; }

    public WrapClassController()
    {
    selOptns = new list<selectoption>();
    selOptns.add(new selectoption('Student__c','Student'));
    selOptns.add(new selectoption('Course__c','Course'));
    selOptns.add(new selectoption('Trainer__c','Trainer'));
    msg = false;
    tbrend = false;
    }
    
    public PageReference rend() {
        tbrend = true;
        objectData = Database.Query('select id, name from ' + objName);
        if(objectData.size()>0)
        {
           ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.CONFIRM,'Cool!!!');
           ApexPages.addMessage(myMsg);
        }
        else{
           ApexPages.Message erMsg = new ApexPages.Message(ApexPages.Severity.ERROR,'Error: No Data found.');
           ApexPages.addMessage(erMsg);
            }
        return null;
    }
    /*public void selectprocess(){
    list<ObjectData> selobjectData = new list<ObjectData>();
    for(wrapperC wrc : objectData){
    selobjectdata.add(wrc);
    
   }
        }
      public class WrapperC{  
    
}*/
}