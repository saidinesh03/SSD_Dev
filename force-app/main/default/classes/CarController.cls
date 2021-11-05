public class CarController{
    
    public static Car__c carSearch( string carType){

        Car__c cars = new Car__c(select id, Name, Car_Make__c, Car_Model__c, Color__c, Fuel_100_KM__c, Car_Trim__c, Year__c, Transmission__c, Capacity__c from Car__c where Car_Type__c = :carType]);

        return cars;
    }