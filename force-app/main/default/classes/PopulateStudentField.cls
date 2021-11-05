global class PopulateStudentField implements Database.Batchable<Sobject>{
    global Database.querylocator Start(database.BatchableContext dbc){
        return database.getQueryLocator('select id, name from Student__c');
    }
    global void execute(database.BatchableContext dbc, list<Student__c> slist){
        for(sobject s : slist){
        Student__c s1=(Student__c)s;
        system.debug('ID>>,' +s1.id);
        system.debug('Name>>,' +s1.name);
            s1.B_tech_done__c = true; 
        }
        update slist;
    }
    global void finish(database.BatchableContext dbc){
      AsyncApexJob a = [SELECT Id, Status, NumberOfErrors, JobItemsProcessed,
      TotalJobItems, CreatedBy.Email
      FROM AsyncApexJob WHERE Id =
      :dbc.getJobId()];
      Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
      String[] toAddresses = new String[] {a.CreatedBy.Email};
      mail.setToAddresses(toAddresses);
      mail.setSubject('Apex Sharing Recalculation ' + a.Status);
      mail.setPlainTextBody
      ('The batch Apex job processed ' + a.TotalJobItems +
      ' batches with '+ a.NumberOfErrors + ' failures.');
      Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
      }
    }