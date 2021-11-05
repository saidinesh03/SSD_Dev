public with sharing class ActionStatusExample {

    public pagereference incrementcounter() {
       count = count +5;
       return null;
       
    }
    public actionstatusexample()
    {
     count = 0;
     }
    public integer count { get; set; }
}