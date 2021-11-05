import { LightningElement,api,track, wire} from 'lwc';
import getComplianceDate from '@salesforce/apex/AccountExtension.getComplianceDate';

export default class LWC_DateUpdate extends LightningElement {
    handleStartDateChange(event){
        //this.complianceDate;
        this.startDate = event.target.value;
        console.log(this.startDate);
        getComplianceDate({StartDt : this.startDate})
            .then(result => {
                console.log('result is' +result)
                this.complianceDate = result;
                console.log('result is comp' +this.complianceDate)
                console.log('complianceDate - ' + this.complianceDate);
            })
            .catch(error => {
                this.error = error;
                console.log('Error is' +error);
            });
        console.log('complianceDate - ' + this.complianceDate);
    }
}