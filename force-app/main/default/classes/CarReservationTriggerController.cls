public class CarReservationTriggerController {
    public static void updateRentDay(List<Car_Reservation__C> CarList){
        for( Car_Reservation__c c : CarList){
            Car__c cs = new Car__c();
            cs = [select id, Car_Type__c, Car_Trim__c from Car__c where id = :c.Car__c];
            system.debug('c.Car__r.Car_Type__c');
            if(cs.Car_Type__c == 'Economy'){
                switch on cs.Car_Trim__c{
                    when 'Hatchback' {
                        c.Rent_Day__c = 33;}
                    when 'Intermediate'{
                        c.Rent_Day__c = 37;}
                    when 'Sedan'{
                        c.Rent_Day__c = 40;}
                    when 'Compact SUV'{
                        c.Rent_Day__c = 45;}
                    when 'SUV'{
                        c.Rent_Day__c = 52;}
                    when 'Suburban'{
                        c.Rent_Day__c = 58;}
                }
            }
            else if (cs.Car_Type__c == 'Luxury'){
                switch on cs.Car_Trim__c{
                    when 'Hatchback' {
                        c.Rent_Day__c = 38;}
                    when 'Intermediate'{
                        c.Rent_Day__c = 43;}
                    when 'Sedan'{
                        c.Rent_Day__c = 45;}
                    when 'Compact SUV'{
                        c.Rent_Day__c = 50;}
                    when 'SUV'{
                        c.Rent_Day__c = 60;}
                    when 'Suburban'{
                        c.Rent_Day__c = 65;}
                }    
            }
            else if (cs.Car_Type__c == 'Off-Road'){
                c.Rent_Day__c = 65;
            }
            else if (cs.Car_Type__c == 'Sport'){
                c.Rent_Day__c = 60;
        	}
            else if (cs.Car_Type__c == 'Vintage'){
                c.Rent_Day__c = 59;
            }
        double rent = c.Start_Date_Time__c.date().daysBetween(c.End_Date_Time__c.date()) * c.Rent_Day__c;
        double tax = 0.15 * rent;
        c.Total__c =  rent + tax; 
    	}
	}
    @AuraEnabled
    public static List<Car__c> carSearch(string carType){
        Set<Id> carId = new Set<Id>();
        List<Car__c> cars = new List<Car__c>([select id, Name, Car_Make__c, Car_Model__c, Color__c, Fuel_100_KM__c, Car_Trim__c, Year__c, Transmission__c, Capacity__c from Car__c where Id in :CarId and Car_Type__c = :carType]);
        List<Car_Reservation__C> Car_Res = new List<Car_Reservation__C>([select Car__c from Car_Reservation__c where Status__c in ('Booked', 'In Progress') ]);
        for ( Car__c c : cars){
            if(Car_Res.contains(c.Id)){

            }else{
                carId.add()
            }
        }

        List<Car__c> cars = new List<Car__c>([select id, Name, Car_Make__c, Car_Model__c, Color__c, Fuel_100_KM__c, Car_Trim__c, Year__c, Transmission__c, Capacity__c from Car__c where Id in :CarId and Car_Type__c = :carType]);
        return cars;
    }
}