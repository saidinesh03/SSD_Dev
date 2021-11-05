public class UpdateAcc1{
id accId;
Account a=null;
public UpdateAcc1 (id accountId){
a = [select id,name from Account where id = :accountId];
}
public void updateAc(){
if(a.name== 'Naruto'){
a.name = 'Uzumaki';
update a;
system.debug('Anime??' + a.name);}
else
a.Name = 'Hyuuga';
system.debug('protagonist' +a.name);
}
}