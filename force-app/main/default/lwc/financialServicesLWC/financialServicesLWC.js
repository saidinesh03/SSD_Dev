import { LightningElement, wire, track } from 'lwc';
import accList from '@salesforce/apex/FinancialServicesController.accList';

export default class FinancialServicesLWC extends LightningElement {

    AccList;
    sortedBy;
    direction;
    sortby;
    def = "asc";
    @track draftValues;

    @track AccList;
    
    /*@wire(getAccs)
    wireddata({ error, data }){
        if (data) 
        {
	        this.data =  data.map(
	        record => Object.assign(
		        { "Owner.Name" : record.Owner.Name},
		        record
	            )
		    );
		}
        else if (error) {
		    this.error = error;
		    this.data = undefined;
	    }
    }*/
    
    connectedCallback(){
        this.getAccs();
    }
    columns= [
        { label: 'Account Name', fieldName: 'Name', editable: true, sortable: true },
        { label: 'Account Owner', fieldName: 'OwnerId', sortable: true, editable: true },
        { label: 'Phone', fieldName: 'Phone', editable: true },
        { label: 'Website', fieldName: 'Website', editable: true },
        { label: 'Annual Revenuee', fieldName: 'AnnualRevenue', editable: true  }];
     
    getAccs(){
        accList()
        .then( result => { 
            this.AccList = result;
            console.log("Accounts retrieved");
        })
        .catch(error => {
            console.log("Error is" + error);
        })
    }
    
    sortBy( sort, reverse, con ){
        const key = con ? (x) => con( x[sort]) : (x) => x[sort];

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    sortHandler(event){

        const { fieldName: sortby, direction } = event.detail;
        const sortedData = [...this.data];

        sortedData.sort( this.sortBy(sortby, direction = "asc" ? 1 : -1));
        this.data = sortedData;
        this.direction = direction;
        this.sortby = sortby;
    }
}
