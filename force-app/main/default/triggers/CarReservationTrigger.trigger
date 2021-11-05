Trigger CarReservationTrigger on Car_Reservation__c (before insert) {
    if(trigger.isinsert && trigger.isbefore){
        CarReservationTriggerController.updateRentDay(Trigger.New);
    }
    
}