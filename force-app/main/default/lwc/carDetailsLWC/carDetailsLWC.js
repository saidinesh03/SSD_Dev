import { LightningElement, wire } from 'lwc';
import Car_res	from '@salesforce/resourceUrl/Car_Rental_Resources';
import carSearch from '@salesforce/apex/CarReservationTriggerController.carSearch';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';

import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Record_Selected__c';

export default class CarDetailsLWC extends LightningElement {
    carImage = Car_res + '/ImgRes/images/Ford_Fiesta.jpg';

    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
        this.recordId = message.recordId;
        console.log("REcord" +this.recordId);
    }

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    // Helper
    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                message: reduceErrors(error).join(', '),
                variant: 'error',
            })
        );
    }

    
}