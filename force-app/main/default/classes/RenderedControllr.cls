public with sharing class RenderedControllr {

    public Account acc { get; set; }
    
    Public string OutPutString{get;set;}

    public Boolean ShowpgBlkFlg { get; set; }

    public RenderedControllr()
    {
    acc = [select name,id,accountnumber,description from account limit 1];
   ShowpgBlkFlg = false;
   OutPutString = 'Test value set in Constructor';
   }
    public void ShowBlockMethod() {
    ShowpgBlkFlg = true;
     OutPutString = 'value set in method called by button click' ;
    }

}