public with sharing class secondcustomcontroller {
public Account a{get;set;}
id acid;
public secondcustomcontroller()
{
acid=apexpages.currentpage().getparameters().get('id');
if(acid==null)
a=new Account();
else
a=[select id,Name from account where id=:acid];
}
public pagereference save()
{
//insert a;
upsert a;
pagereference page=new pagereference('/apex/thirdpage?id='+a.id);
return page;
}
}