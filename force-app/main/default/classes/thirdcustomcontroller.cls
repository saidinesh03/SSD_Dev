public with sharing class thirdcustomcontroller {

public Account a{get;set;}
id acid;
public thirdcustomcontroller()
{
acid = apexpages.currentpage().getparameters().get('id');
a = [select id,name from account where id = :acid];
}
public pagereference edit()
{
 pagereference page = new pagereference('/apex/secondpage?id='+acid);
 return page; 
}
}