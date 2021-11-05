import { LightningElement } from 'lwc';
import Car_res	from '@salesforce/resourceUrl/Car_Rental_Resources';

export default class CarDetailsLWC extends LightningElement {
    carImage = Car_res + '/images/Ford_Fiesta.jpg';
    
    /*get carImage(){
        console.log(carImage);
        return this.carImage;
    }*/
}