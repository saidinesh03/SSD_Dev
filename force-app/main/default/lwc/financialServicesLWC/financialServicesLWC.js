import { LightningElement, wire, track } from 'lwc';
import accList from '@salesforce/apex/FinancialServicesController.accList';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class FinancialServicesLWC extends LightningElement {

    @track AccList;
    direction = "asc";
    sortby;
    def = "asc";
    @track draftVal = [];
    
    /*wireddata({ data, error }){
        if (data) 
        {
	        this.AccList = data;
            this.error = undefined;
            console.log(data);
		}
        else if (error) {
		    this.error = error;
		    this.AccList = undefined;
	    }
    }*/

    /*connectedCallback(){
        this.getAccs();
    }*/

    @wire(accList)
    wiredAccs(data) {
        data.forEach( AccRec => {
            if(AccRec.OwnerId)
            AccRec.OwnerName = AccRec.Owner.Name;
        });
        this.AccList = data;
        if (data.error) {
            console.log("Error");
            this.AccList = undefined;
        }
    }; 

    /*getAccs(){
        accList()
        .then( result => { 
            this.AccList = result;
            console.log("Accounts retrieved");
        })
        .catch(error => {
            console.log("Error is" + error);
        })
    }*/
    
        columns= [
        { label: 'Account Name', fieldName: 'Name', editable: true, sortable: true },
        { label: 'Account Owner', fieldName: 'OwnerName', sortable: true, editable: true },
        { label: 'Phone', fieldName: 'Phone', editable: true },
        { label: 'Website', fieldName: 'Website', editable: true },
        { label: 'Annual Revenuee', fieldName: 'AnnualRevenue', editable: true  }];
     

    
    sortBy( sort, reverse, primer ){
        const key = primer ? (x) => primer( x[sort]) : (x) => x[sort];

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    sortHandler(event){

        const { fieldName: sortby, direction } = event.detail;
        const sortedData = [...this.AccList];

        sortedData.sort( this.sortBy(sortby, direction = "asc" ? 1 : -1));
        this.AccList = sortedData;
        this.direction = direction;
        this.sortby = sortby;
    }

    handleSave(event) {
        console.log("inside handleSave");
        this.draftVal = event.detail.draftValues;
        const recordInputs = this.draftVal.slice().map(draft => {
            const field = Object.assign({}, draft);
            return { field };
        });
        const promises = recordInputs.map(recordInput => {return updateRecord(recordInput)});
        Promise.all(promises)
            .then(res => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated',
                    variant: 'success'
                })
            );
            this.draftVal = [];
            return this.refresh();
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message:  'Record Save Failed',
                    variant: 'error'
                })
            );
        }).finally(() => {
            this.draftVal = [];
        });
    }

    async refresh() {
        await refreshApex(this.AccList);
    }
}
