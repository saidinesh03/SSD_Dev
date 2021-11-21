import { LightningElement, track, wire } from 'lwc';
import carSearch from '@salesforce/apex/CarReservationTriggerController.carSearch';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Record_Selected__c'

/*import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Car_Type__c from '@salesforce/schema/Car__c.Car_Type__c'
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import car from '@salesforce/schema/Car__c';*/

export default class CarSearchLWC extends LightningElement {

    @wire(MessageContext)
    messageContext;

    CarType="Economy";
    CarsList;
    columns= [
        { label: 'Car Make', fieldName: 'Car_Make__c', editable: false },
        { label: 'Car Model', fieldName: 'Car_URL', type: 'url', editable: false, 
            typeAttributes: {
                label: { 
                    fieldName: 'Car_Model__c'
                },
                target : '_parent'
            } 
        },
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
            let url = 'https://ssdneshtm-dev-ed.lightning.force.com/lightning/';
            result.forEach(carRec => { 
                carRec.Car_URL = url + carRec.Id;
            });
            this.CarsList = result;
            console.log("CarsList" + CarsList.size());
        })
        .catch(error => {
            console.log("Error is" + error);
        })
    }

    showDetails(event){
        const rowId = event.detail.row.Id;
        publish(this.messageContext, recordSelected, payload);
    }
    
}