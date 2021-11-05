import { LightningElement, track, wire } from 'lwc';
import carSearch from '@salesforce/apex/CarReservationTriggerController.carSearch';
/*import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Car_Type__c from '@salesforce/schema/Car__c.Car_Type__c'
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import car from '@salesforce/schema/Car__c';*/

export default class CarSearchLWC extends LightningElement {

    /*@wire(getObjectInfo, { objectApiName: car })
    carInfo;
    @wire(getPicklistValues, { recordTypeId: '$Carinfo.data.defaultRecordTypeId', fieldApiName: Car_Type__c})
    carTypes;*/
    
    renderedCallback(){
        //this.searchCars();
    }
    CarType="Economy";
    CarsList;
    columns= [
        { label: 'Car Make', fieldName: 'Car_Make__c', editable: false },
        { label: 'Car Model', fieldName: 'Car_Model__c', editable: false },
        { label: 'Car Trim', fieldName: 'Car_Trim__c', editable: false },
        { label: 'Year', fieldName: 'Year__c', editable: false },
        { label: 'Mileage', fieldName: 'Fuel_100_KM__c' },
        { label: 'Capacity', fieldName: 'Capacity__c' },
        { label: 'Color', fieldName: 'Color__c' }];
    
    get carTypes() {
        return [
            { label: 'Luxury', value: 'Luxury' },
            { label: 'Economy', value: 'Economy' },
            { label: 'Sport', value: 'Sport' },
            { label: 'Off-Road', value: 'Off-Road' },
            { label: 'Vintage', value: 'Vintage' }
        ];
    }
    searchCars(event){
        console.log("Entered searchCars");
        this.CarTypes = event.detail.value;
        carSearch({ carType : this.CarTypes })
        .then( result => {
            this.CarsList = result;
            console.log("CarsList" + CarsList.size());
        })
        .catch(error => {
            console.log("Error is" + error);
        })
    }
}