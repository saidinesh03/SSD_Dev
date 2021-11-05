@istest
public class UpdateAccountHandler1{
public static testmethod void test1(){
Account a = new Account();
a.name = 'Naruto';
insert a;
UpdateAcc1 ua = new UpdateAcc1(a.id);
ua.updateAc();
}
public static testmethod void test2(){
Account a = new Account();
a.name = 'Hinata';
insert a;
UpdateAcc1 ua = new UpdateAcc1(a.id);
ua.updateAc();
}
}