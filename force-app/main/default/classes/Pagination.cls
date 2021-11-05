public with sharing class Pagination {

    public integer limitval { get; set; }

    public boolean nxtrend { get; set; }

    public boolean pvsrend { get; set; }
    
    public boolean pbsrend { get; set; }

    public String name { get; set; }
    
    public integer offsetval = 0;

    public list<SObject> objData { get; set; }
    
    public Pagination(){
    
    pvsrend = false;
    nxtrend = true;
    pbsrend = false;
    }

    public PageReference next() {
    offsetval = offsetval + limitval;
    rendervalue();
    system.debug('OFFSET VALUE IS>>>' +[select count() from Student__c]);
    objData = Database.Query('select name from Student__c order by ID  limit ' +limitval +' offset ' +offsetval);
        return null;
    }
    public PageReference previous() {
    offsetval = offsetval - limitval;
    rendervalue();    
    objData = Database.Query('select name from Student__c order by ID limit ' +limitval +' offset ' +offsetval);
        return null;
    }
    public void rendervalue()
    {
     pbsrend = true;
     if(offsetval == 0)
     {
      pvsrend = false;
      nxtrend = true;
     }
     else if( 5<= offsetval)
     {
      pvsrend = true;
      nxtrend = true;
     }
     else if([select count() from Student__c] - 5 <= offsetval || offsetval== [select count() from Student__c])
     {
      pvsrend = true;
      nxtrend = false;
     }
     else
     {
      pvsrend = true;
      nxtrend = true;
     }
    }
}