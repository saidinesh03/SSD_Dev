public class UpdateAcc{
id accId;
Account a=null;
public UpdateAcc (id accountId){
a = [select id,name from Account where id = :accountId];
}
public void updateAc(){
if(a.name== 'Sraersr'){
a.name = 'Sra1';
update a;
system.debug('ASDSF??' + a.name);}
else
system.debug('null' +a.name);
}
}