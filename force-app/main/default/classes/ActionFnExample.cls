public with sharing class ActionFnExample {
public ActionFnExample (){
system.debug('heya');

}
    public void functioncal() {
    system.debug('Hey'+Apexpages.currentPage().getParameters().get('firstval'));
       val = 'You have entered : 1 - '+Apexpages.currentPage().getParameters().get('firstval')+
                               ' 2 -'+Apexpages.currentPage().getParameters().get('secondval')+
                               ' 3 -'+Apexpages.currentPage().getParameters().get('thirdval');
                               
    }


    public String val { get; set; }
    
    @InvocableMethod
    public static void testinv(){}
}