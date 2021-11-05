import { LightningElement,api,track, wire} from 'lwc';
import getVehicleList from '@salesforce/apex/CCM_PR4Controller.getVehicle';
import getRegionUserId from '@salesforce/apex/CCM_PR4Controller.getRegionUserId';
import getDealerInfo from '@salesforce/apex/CCM_PR4Controller.getDealerInfo';
import getCaseData from '@salesforce/apex/CCM_PR4Controller.getCaseDetails';
import getVehicleDetails from '@salesforce/apex/CCM_PR4Controller.getVehicleDetails';
import getGuestState from '@salesforce/apex/CCM_PR4Controller.getGuestState';
import getGuestStateFromCase from '@salesforce/apex/CCM_PR4Controller.getGuestStateFromCase';
import getTimezone from '@salesforce/apex/CCM_PR4Controller.getTimezone';
import getOriginatingCaseNumber from '@salesforce/apex/CCM_PR4Controller.getOriginatingCaseNumber';
import getComplianceDate from '@salesforce/apex/CCM_PR4Controller.getComplianceDate';
import checkDRUser from '@salesforce/apex/CCM_LemonLawController.checkDRUser';
import checkPrimaryCoding from '@salesforce/apex/CCM_PR4Controller.checkPrimaryCoding';
import recordSavedSuccessfully from '@salesforce/label/c.CCM_RecordSavedSuccess';
import saveNCDSArbitrationCase from '@salesforce/apex/CCM_PR4Controller.saveNCDSArbitrationCase';
import CCM_CaseURL from "@salesforce/label/c.CCM_CaseURL";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import CCM_LemonLawMandatoryFieldsError from '@salesforce/label/c.CCM_LemonLawMandatoryFieldsError';
import CurrentMileageCheck from '@salesforce/label/c.CurrentMileageCheck'
import messageChannel from '@salesforce/messageChannel/ccmPathMsgChannel__c';
import {publish, MessageContext} from 'lightning/messageService';
import uId from '@salesforce/user/Id';
import { NavigationMixin } from 'lightning/navigation';
import {  getRecordNotifyChange } from 'lightning/uiRecordApi';
import { getRecord } from 'lightning/uiRecordApi';

export default class CcmStateArbitrationComponent extends NavigationMixin(LightningElement) {

		@api recordId;
		@track caseRecord = {};
		@track showTemplate= false;
		@track time;
		@track valueCheck = false;
		@track pickVal;
		@track details;
		@track prDetails;
		vehicleAssociationId='';
		@track vehicleList = [];
		@track contactName = '';
		handleSelectContact = false;
		handleSelectAccount = false;
		make = '';
		model = '';
		year = '';
		vehicleAssociationName;
		@track accountName = '';
		region = '';
		district = '';
		contactError = false;
		dealerError = false;
		showSpinner=false;
		falseVar=false;
		loggedInUser = uId;
		canEditFields = false; 
		@track dealerField;
		@track dealerDistrict;
		@track regionAreaUserId;
		@track dealer1Id;
		@track time;
		@track pickVal;
		@track filingstate;
		@track casestatus;
		@track details;
		@track VehicleModel;
		@track showReturnedReason=false;
		@track showClosedReason=false;
		@track showFirm=false;
		@track guestId;
		@track conType;
		@track conId;
		@track OGcaseNum;
		@track OGcaseNumUrl;
		@track vehicleEmpty=false;
		@track checkCurrentMileage=false;
		@track isVACorrect=false;
		@track createdDate;
		@track userTime;
		@track checkFields = true;
		@track primarycheck = true;
		@track checkSpin = false;
		@track finalMake;
		@track finalModel;
		@track finalModelYear;
		@track alwaysHide = false;
		@track disableNextButton = false;
		@track timeCheck=false;
		@track daysCheck = false;
		@track daysValue;
		@track showOriginatedCase = false;
		@track showPR4 = false;
		@track originatingCase;
		@track oldSubTypeValue;
		@track newSubTypeValue;
		@track subTypeStatusChangeIsNotValid=false;
		@track subTypeChangeErrorMessage;
		checkDR;
		@track mileageCheck;
		vehicleMandatoryCheck=true;
		vehicleModelMandatoryCheck=true;
		checkFieldsNew=true;
		isVaCorrectNew=false;
		errorForLemonLawSubTypeChange=false;
		errormessageForLLSubTypeChange='';
		regionManditoryCheck=false;
		regionAreaMAnditoryCheck=false;
		@track proCheck = false;
		@track subTypeCheck;
		allValidationPassed=true;
		@track checkSubType;
		vehMandatory = false;
		@track datecheck = false;
		primaryCodingValidation=false;//false means no need to display error message
		showOtherResolution =false;
		@wire(MessageContext)
		messageContext;
		@track startDate;
		@track complianceDate;
		@track finalMileage = false;
		cuMil;
		showOtherResolution=false;
    	GuestResolutionVal = '';

		//LemonLawManadatoryError = CCM_LemonLawManadatoryError;
		//vehicleOrModelManadatoryError=CCM_VehicleOrModelManadatoryError;
		// @wire(getRecord, { recordId: '$recordId',fields: FIELDS})
		// getUserRecord({ data, error }) {
		//     console.log('### '+this.recordId);
		//     console.log('caserecord => ', data, error);
		//     if (data) {
		//         console.log(data);
		//         this.processRelatedObjects();
		//     } else if (error) {
		//         console.error('ERROR => ', JSON.stringify(error)); // handle error properly
		//     }
		// }
		connectedCallback(){
				getTimezone()
						.then(result => {
						this.userTime = result;
				})
				getCaseData({recId : this.recordId})
						.then(result=>{
						this.prDetails = result;
						this.createdDate = this.prDetails.CreatedDate ;
						this.vehicleAssociationId= result.Vehicle_Association__c;
						this.cuMil = result.Current_Mileage__c;
						this.region = result.Region__c;
						this.district = result.District__c;
						if(this.vehicleAssociationId!=''||this.vehicleAssociationId!=null){
								this.vehicleMandatoryCheck=false;
								this.vehicleModelMandatoryCheck=false;
						}
						if(this.prDetails.Connected_with_Guest__c === 'Yes'){
								this.showTemplate= true;
						}
						if(this.prDetails.Connected_with_Guest__c !=null){
								this.showPR4 = true;
						}
						console.log('Owner Id>>'+result.OwnerId);
						console.log('logged Id>>'+this.loggedInUser);
						console.log('GRS: ' + result.Guest_Resolution_Sought__c);
						if(result.Guest_Resolution_Sought__c!==''&& result.Guest_Resolution_Sought__c!==null && result.Guest_Resolution_Sought__c !== undefined){
								let str = result.Guest_Resolution_Sought__c;
								console.log('Guest Resolution: ' + str);
								let index = str.indexOf('Other');    
								if(index !== -1){
										this.showOtherResolution = true;
								} else{
										this.showOtherResolution = false;
								}
						}
				})
				checkDRUser()
						.then(result=>{
						this.checkDR=result;
						if(this.checkDR==false){
								this.disableNextButton=true; //disable the next button if user is non DR
						}
				})
				this.onloadData();
				this.getStateOnload();
				this.getOGCaseNum();
		}
		handleStatus(event){
				if(event.target.value === 'Returned for Revision'){
						this.showReturnedReason= true;
				}
				else if(event.target.value === 'Closed'){
						this.showClosedReason = true;
				}
				else{
						this.showReturnedReason= false;
						this.showClosedReason = false;
				}
		}
		checkCoding(){
				checkPrimaryCoding({recordId : this.recordId})
						.then(result=>{
						if(result == false){
								this.primarycheck = false;
								console.log('primary coding'+this.primarycheck);
						}

				})
		}
		getStateOnload(){
				getGuestStateFromCase({ caseId: this.recordId })
						.then(result => {
						this.filingstate=result.MailingStateCode;
				})
						.catch(error => {
						this.error = error;
				});
		}

		handleError(event) {
				this.showNotification('Error', event.detail.detail, 'Error');
				//  this.checkSpin = false;
		}
		showNotification(titleVar, msgVar, variantVar) {
				const evt = new ShowToastEvent({
						title: titleVar,
						message: msgVar,
						variant: variantVar
				});
				this.dispatchEvent(evt);
		}
		@api onloadData(){

				console.log('####recordId onload called=='+this.recordId);
				getCaseData({ recId: this.recordId })
						.then(result => {

						this.localCase = result;
						console.log('######################'+this.localCase.Guest_Resolution_Sought__c);
						console.log('######################JSON'+JSON.stringify(this.localCase.Guest_Resolution_Sought__c));
						//var str = JSON.stringify(this.localCase.Guest_Resolution_Sought__c));
						//var isOther = str.includes('Other');
						//console.log('isother'+isOther);
						if(this.localCase.Relationship__c === 'Attorney'){
								this.showFirm = true;
						}
						if(this.localCase.Status === 'Returned for Revision'){
								this.showReturnedReason = true;
						}
						else if(this.localCase.Status === 'Closed'){
								this.showClosedReason = true;
						}
						else{
								this.showReturnedReason = false;
								this.showClosedReason = false;
						}
						if(this.localCase.Dealer_1__c!=null){
								this.dealer1Id=this.localCase.Dealer_1__c;
								this.getDealer1Details();
						}
						console.log('###this.Case=' + JSON.stringify(this.localCase));
						this.recordTypeId = this.localCase.RecordTypeId;
						this.contactId = this.localCase.Customer_Name__c;
						this.oldSubTypeValue=this.localCase.Sub_Type__c;
						console.log('###this.Case sub type=' +this.oldSubTypeValue);
						if(this.localCase.Related_Case__c!= null){
								this.showOriginatedCase=true;
						}
						this.originatingCase=this.localCase.Related_Case__c;
						if (this.localCase.Customer_Name__c != null && this.localCase.Customer_Name__c != '' && this.localCase.Customer_Name__c != undefined) {
								console.log('@@@@1');
								this.contactName = this.localCase.Customer_Name__r.Name;
								this.handleSelectContact = true;
								this.getVehicleList();
						}

						if (this.localCase.Vehicle_Association__c != null && this.localCase.Vehicle_Association__c != undefined && this.localCase.Vehicle_Association__c != '') {
								console.log('@@@@2');
								this.vehicleAssociationName = this.localCase.Vehicle_Association__r.Name;
								this.vehicleAssociationId = this.localCase.Vehicle_Association__c;
								console.log('####vehicle name' + this.vehicleAssociationName);
						}


						if (this.vehicleAssociationId != null && this.vehicleAssociationId != '' && this.vehicleAssociationId != undefined) {
								console.log('@@@@3');
								this.make = this.localCase.Vehicle_Association__r.Make__c;
								this.model = this.localCase.Vehicle_Association__r.Model__c;
								this.year = this.localCase.Vehicle_Association__r.Model_Year__c;
								this.getVehicleDetails();
						}
						if (this.localCase.Vehicle_Model_Lookup__c != null && this.localCase.Vehicle_Model_Lookup__c != undefined && this.localCase.Vehicle_Model_Lookup__c != '') {
								console.log('@@@@4');
								// this.vehicleAssociationName = this.localCase.Vehicle_Model_Lookup__c.Name;
								this.VehicleModel = this.localCase.Vehicle_Model_Lookup__c;
								console.log('####VehicleModel' + this.VehicleModel);
								if (this.VehicleModel != null && this.VehicleModel != '' && this.VehicleModel != undefined) {
										console.log('@@@@3');
										this.make = this.localCase.Vehicle_Model_Lookup__r.Make__c;
										this.model = this.localCase.Vehicle_Model_Lookup__r.Model__c;
										this.year = this.localCase.Vehicle_Model_Lookup__r.Model_Year__c;
										//this.getVehicleDetails();
								}
						}
						this.accountId = this.localCase.Dealer_1__c;
						if (this.localCase.Dealer_1__c != null && this.localCase.Dealer_1__c != '' && this.localCase.Dealer_1__c != undefined) {
								console.log('@@@@4');
								this.accountName = this.localCase.Dealer_1__r.Name;
								this.region = this.localCase.Dealer_1__r.Dealer_Region_Area__c;
								this.district = this.localCase.Dealer_1__r.District__c;
								this.handleSelectAccount = true;
								console.log('@@@@4==='+this.accountName);
						}
						if (this.localCase.Reg_Area__c!=NULL){
								this.regionAreaUserId = this.localCase.Reg_Area__c;
						}
						this.casestatus = this.localCase.Status;
						this.conType = this.localCase.Relationship__c;


						if(this.localCase.Customer_Name__c!=NULL){
								getGuestState({guestId: this.localCase.Customer_Name__c})
										.then(result => {
										this.filingstate = result.MailingStateCode;

								})
						}
				})
						.catch(error => {
						this.error = error;
						//this.showSpinner =  false;
						console.log('#### Error in the ccmDRcase Info in the JS controller'+JSON.stringify(error));
						console.log('###Error in ccmDrCaseInfo connected call back-' + console.log(this.error));
						//this.showNotification('Error',error.body.message,'error');
				});
		}
		//get vehicle List
		getVehicleList() {
				this.vehicleList=[];
				getVehicleList({ contactId: this.contactId })
						.then(result => {
						this.vehicleList = [...this.vehicleList, { value: '', label: '--None--' }];
						for (let i = 0; i < result.length; i++) {
								this.vehicleList = [...this.vehicleList, { value: result[i].vehicleId, label: result[i].vehicleName }];
						}

				})
						.catch(error => {
						this.error = error;
						//this.showSpinner =  false;
						console.log('###Error in getVehicleList' + this.error);
						//this.showNotification('Error',error.body.message,'error');
				});
		}
		getOGCaseNum(){
				getOriginatingCaseNumber({ prId: this.recordId })
						.then(result => {
						this.OGcaseNum=result.Case_Number__c;
						this.OGcaseNumUrl = CCM_CaseURL+result.Id+'/view';
				})
						.catch(error => {
						this.error = error;
				});
		}
		handleContactLoad(event) {
				this.contactId = event.detail.contactId;
				this.getVehicleList();
		}
		handleContactSelect(event) {
				this.contactId = event.detail.contactId;
				console.log('this.contactId:' + this.contactId);
				this.getVehicleList();
		}
		handleContactRemove(event) {
				this.contactId = '';
				console.log('contact removed');
				this.vehicleList = [];
				this.vehicleAssociationName = null;
				this.vehicleAssociationId = null;
				this.make = '';
				this.model = '';
				this.year = '';
		}
		handleContactChange(event){
				this.getContactState(event);
				if(event.target.value!=''){
						this.contactId =event.target.value;
						this.getVehicleList();
				}
				else {
						this.contactId = '';
						console.log('contact removed');
						this.vehicleList = [];
						this.vehicleAssociationName = null;
						this.vehicleAssociationId = null;
						this.make = '';
						this.model = '';
						this.year = '';
				}
		}
		handleVAChange(event) {
				this.vehicleAssociationId = event.detail.value;
				if (this.vehicleAssociationId != null && this.vehicleAssociationId != '') {
						this.getVehicleDetails();
						this.vehicleEmpty=false;
						this.vehMandatory = false;
				}
				if((this.vehicleAssociationId == null || this.vehicleAssociationId == undefined || this.vehicleAssociationId == '')){
						this.make = '';
						this.model = '';
						this.year = '';
				}
				if( this.vehicleAssociationId!='' ||this.vehicleAssociationId!=null){
						this.vehicleMandatoryCheck=false;
						this.vehicleModelMandatoryCheck=false;
				}
				if((this.vehicleAssociationId=='' ||this.vehicleAssociationId==null)){
						this.vehicleMandatoryCheck=true;
						this.vehicleModelMandatoryCheck=true;
				}
				/*if (this.vehicleAssociationId == null && this.vehicleAssociationId == '') {
            this.vehicleEmpty=true;
                this.template.querySelector('[data-my-id="vehicleCombobox"]').classList.add('redBorderOnCombobox');
        }*/
		}

		getVehicleDetails() {
				getVehicleDetails({ vehicleAssociationId: this.vehicleAssociationId })
						.then(result => {
						console.log('#####result ffrom vehicle details==' + JSON.stringify(result));
						this.make = result.make;
						this.model = result.model;
						this.year = result.year;
				})
						.catch(error => {
						this.error = error;
						console.log('###Error in getVehicleDetails-' + this.error);
				});
		}
		getDetails() {
				getDealerInfo({ DealerId: this.dealer1Id })
						.then(result => {
						console.log('#####result ffrom vehicle details==' + JSON.stringify(result));
						this.region = result.region;
						this.district =result.district;
				})
						.catch(error => {
						this.error = error;
						console.log('###Error in getVehicleDetails-' + this.error);
				});
		}
		handleRegionChange(event){
				console.log(event.target.value);
				getRegionUserId({ region: event.target.value })
						.then(result => {
						console.log( 'result.value'+result);
						this.regionAreaUserId = result;
				})
						.catch(error => {
						this.error = error;
						console.log('Error '+error);
				});
		}
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
		handleDealer1Change(event){
				if(event.target.value!=''){
						this.dealer1Id=event.target.value;
						getDealerInfo({ DealerId: event.target.value })
								.then(result => {
								console.log('#####result ffrom vehicle details==' + JSON.stringify(result));
								this.region = result.region;
								this.district =result.district;
						})
								.catch(error => {
								this.error = error;
								console.log('###Error in getVehicleDetails-' + this.error);
						});
				}
				else{
						this.region='';
						this.district='';
				}
		}
		getContactState(event){
				getGuestState({guestId: event.target.value})
						.then(result => {
						this.details = result;
						this.filingstate = this.details.MailingStateCode;

				})
		}

		firmname(event){
				if(event.target.value==='Attorney'){
						this.showFirm = true;
				}
				else{
						this.showFirm= false;
				}
		}
		handleSubType(event){
				this.checkSubType = event.target.value;
				console.log('get changed Value in the tablea'+event.target.value);
				console.log('get the old value'+this.oldSubTypeValue);
				console.log('get the checkDr user'+this.checkDR);
				this.newSubTypeValue=event.target.value;
				if((event.target.value.includes("Lemon")||event.target.value=="FYI"||event.target.value=="PRRP")){
						this.disableNextButton=false;
				}else{
						this.disableNextButton=true;
				}
		}    
		handleSuccess(){
				//  this.checkSpin = false;
				this.onloadData();
				const evt = new ShowToastEvent({
						title: 'Success',
						message: 'Record saved successfully.',
						variant: 'success',
				});
				this.dispatchEvent(evt);
				let message = {messageText: 'Flow is Updated'};
				publish(this.messageContext, messageChannel, message);
				this.dispatchEvent(evt);
		}

		handleLimitCurMilegae(event){
				if(isNaN(event.target.value) == true){
						this.finalMileage = true;
				}else{
						this.finalMileage = false;
				}
				this.mileageCheck = parseInt(event.target.value);
				event.preventDefault();
				console.log(event.detail.value);
				console.log(event.detail.value.length);
				if(parseInt(event.detail.value)>9999999999){
						console.log('hi '+event.detail.value.substring(0,9));
						//event.detail.value = 	event.detail.value.substring(0,9);
						this.checkCurrentMileage=true;				
				}
				else{
						this.checkCurrentMileage=false;
				}
		}
		handleSubmit(event){
				event.preventDefault(); 
				this.template.querySelector('lightning-record-edit-form').submit();


		}

		handleClickRoute(event){
				this.finalMake = this.make;
				this.finalModel = this.model;
				this.finalModelYear = this.year;

				console.log('Inside no Sub type change');
		}
		startDateTrack(event){
				let todayDate = new Date();
				let finalDate = new Date(event.target.value);
				//finalDate = event.target.value;
				console.log('todayDate'+todayDate);
				console.log('finalDate'+finalDate);
				if(finalDate - todayDate>0){
						this.dateCheck = true;
						console.log('inside if date');
				}else{
						this.dateCheck = false;
				}
		}



		CheckfieldLevelValidations(){
				this.checkFieldsNew=true;
				this.template.querySelectorAll('lightning-input-field').forEach(element => {
						element.reportValidity();
						if(element.reportValidity() === false){
								this.checkFieldsNew = false;
								console.log('reportfieldvalidity in new section');
						}
						console.log('element new validation'+element.reportValidity());
				});
				this.isVaCorrectNew = [...this.template.querySelectorAll("lightning-combobox")]
						.reduce((validSoFar, inputField) => {
						inputField.reportValidity();
						return validSoFar && inputField.checkValidity();
				}, true);
				console.log('va New variable'+this.isVaCorrectNew);
				if(this.isVaCorrectNew === false){
						this.checkFieldsNew = false;
						console.log('vacorrect New');
				}

				if(this.vehicleAssociationId == null || this.vehicleAssociationId == ''){
						this.vehicleEmpty=true;  
						this.checkFieldsNew=false;  
						this.vehMandatory = true; 
						console.log('Printing the inside statement new change'+this.checkFieldsNew);
				}
				if(this.vehicleEmpty==true){	
						this.vehicleMandatoryCheck=true;
						this.vehicleModelMandatoryCheck=true;
						this.checkFieldsNew=false;
						console.log('Printing the inside statement'+this.checkFieldsNew);
						//alert('Im here');
				}

				console.log('checking the new method for field validations'+this.checkFieldsNew);
				return this.checkFieldsNew;
		}
		handleSave(){
				/*let mil;
        if(this.mileageCheck === undefined || this.mileageCheck === null || this.mileageCheck === ''){
            mil = this.cuMil;
        }else{
            mil = this.mileageCheck;
        }
        console.log('Save 1');
        if(this.finalMileage == true){
            this.showNotification('Error','Enter a valid number in Current Mileage field','error');
        }*/
				if(!this.template.querySelector('lightning-input-field[data-my-id=currentMileage]').reportValidity()||this.mileageCheck < 0){
						this.showNotification('Error','Enter a valid Current Mileage value','error');
				}
				else if(this.mileageCheck > 9999999999){
						this.showNotification('Error',CurrentMileageCheck,'error');
				}
				else if(this.dateCheck == true){
						this.showNotification('Error','NCDS/State Start Date cannot be future date','error');
				}
				else{
						let otherResolution = this.template.querySelector('lightning-input-field[data-my-id=otherResolution]') == null || this.template.querySelector('lightning-input-field[data-my-id=otherResolution]') == '' || this.template.querySelector('lightning-input-field[data-my-id=otherResolution]') == undefined ? null : this.template.querySelector('lightning-input-field[data-my-id=otherResolution]').value;
						let gName = this.template.querySelector('lightning-input-field[data-my-id=guestName]') == null || this.template.querySelector('lightning-input-field[data-my-id=guestName]') == '' || this.template.querySelector('lightning-input-field[data-my-id=guestName]') == undefined ? null : this.template.querySelector('lightning-input-field[data-my-id=guestName]').value; 
						let fState = this.template.querySelector('lightning-input-field[data-my-id=filingState]') == null || this.template.querySelector('lightning-input-field[data-my-id=filingState]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=filingState]').value;
						let fStatus =  this.template.querySelector('lightning-input-field[data-my-id=status]') == null || this.template.querySelector('lightning-input-field[data-my-id=status]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=status]').value;
						let ncdsstatecase = this.template.querySelector('lightning-input-field[data-my-id=stateCase]') == null || this.template.querySelector('lightning-input-field[data-my-id=stateCase]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=stateCase]').value;
						let ncdsstatestartdate = this.template.querySelector('lightning-input-field[data-my-id=startDate]') == null || this.template.querySelector('lightning-input-field[data-my-id=startDate]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=startDate]').value;
						let hearingDate = this.template.querySelector('lightning-input-field[data-my-id=hearingDate]') == null || this.template.querySelector('lightning-input-field[data-my-id=hearingDate]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=hearingDate]').value;
						let timezone = this.template.querySelector('lightning-input-field[data-my-id=timezone]') == null || this.template.querySelector('lightning-input-field[data-my-id=timezone]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=timezone]').value;
						let hearingType = this.template.querySelector('lightning-input-field[data-my-id=hearingType]') == null || this.template.querySelector('lightning-input-field[data-my-id=hearingType]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=hearingType]').value;
						let inEligibleCode = this.template.querySelector('lightning-input-field[data-my-id=ineligibleCode]') == null || this.template.querySelector('lightning-input-field[data-my-id=ineligibleCode]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=ineligibleCode]').value;
						let mrfCompliancedate = this.template.querySelector('lightning-input-field[data-my-id=complianceDate]') == null || this.template.querySelector('lightning-input-field[data-my-id=complianceDate]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=complianceDate]').value;
						let guestResolution = this.template.querySelector('lightning-input-field[data-my-id=guestResolution]') == null || this.template.querySelector('lightning-input-field[data-my-id=guestResolution]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=guestResolution]').value;
						let cReason = this.template.querySelector('lightning-input-field[data-my-id=closedReason]') == null || this.template.querySelector('lightning-input-field[data-my-id=closedReason]') == '' ?  null : this.template.querySelector('lightning-input-field[data-my-id=closedReason]').value;
						let cName = this.template.querySelector('lightning-input-field[data-my-id=contactName]') == null || this.template.querySelector('lightning-input-field[data-my-id=contactName]')=='' || this.template.querySelector('lightning-input-field[data-my-id=contactName]') == undefined ? null : this.template.querySelector('lightning-input-field[data-my-id=contactName]').value;
						let conType = this.template.querySelector('lightning-input-field[data-my-id=contactType]') == null || this.template.querySelector('lightning-input-field[data-my-id=contactType]')=='' ? null : this.template.querySelector('lightning-input-field[data-my-id=contactType]').value;
						let orig = this.template.querySelector('lightning-input-field[data-my-id=initialChannel]') == null || this.template.querySelector('lightning-input-field[data-my-id=initialChannel]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=initialChannel]').value;
						let nFirm = this.template.querySelector('lightning-input-field[data-my-id=nameOfFirm]') == null || this.template.querySelector('lightning-input-field[data-my-id=nameOfFirm]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=nameOfFirm]').value;
						let cMileage = this.template.querySelector('lightning-input-field[data-my-id=currentMileage]') == null || this.template.querySelector('lightning-input-field[data-my-id=currentMileage]')=='' ? null : parseInt(this.template.querySelector('lightning-input-field[data-my-id=currentMileage]').value);
						let reg = this.template.querySelector('lightning-input-field[data-my-id=region]') == null || this.template.querySelector('lightning-input-field[data-my-id=region]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=region]').value;
						let regAreaUser = this.template.querySelector('lightning-input-field[data-my-id=regionArea]') == null || this.template.querySelector('lightning-input-field[data-my-id=regionArea]') == '' || this.template.querySelector('lightning-input-field[data-my-id=regionArea]') == undefined ? null : this.template.querySelector('lightning-input-field[data-my-id=regionArea]').value;
						let deal1 = this.template.querySelector('lightning-input-field[data-my-id=dealer1]') == null || this.template.querySelector('lightning-input-field[data-my-id=dealer1]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=dealer1]').value;
						let deal2 = this.template.querySelector('lightning-input-field[data-my-id=dealer2]') == null || this.template.querySelector('lightning-input-field[data-my-id=dealer2]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=dealer2]').value;
						let deal3 = this.template.querySelector('lightning-input-field[data-my-id=dealer3]') == null || this.template.querySelector('lightning-input-field[data-my-id=dealer3]') == '' ? null : this.template.querySelector('lightning-input-field[data-my-id=dealer3]').value;
						console.log(this.recordId+gName+fState+fStatus+ncdsstatecase+ncdsstatestartdate+hearingDate+timezone+hearingType+mrfCompliancedate+cReason+guestResolution+this.vehicleAssociationId+cMileage+this.make+this.model+this.modelYear+reg+regAreaUser+deal1+deal2+deal3);
						saveNCDSArbitrationCase({caseId : this.recordId,
																		 guestId : gName,
																		 other: otherResolution,
																		 filingState : fState,
																		 status : fStatus,
																		 ncdsstatecase: ncdsstatecase,
																		 ncdsstartdate : ncdsstatestartdate,
																		 mrfcompliancedate : mrfCompliancedate,
																		 hearingdatetime : hearingDate,
																		 timezone : timezone,
																		 hearingtype : hearingType,
																		 closedReason : cReason,
																		 contactId : cName,
																		 relationship : conType,
																		 origin : orig,
																		 nameOfFirm : nFirm,
																		 vehicleAssociationId : this.vehicleAssociationId,
																		 currentMileage : cMileage,
																		 make : this.make,
																		 model : this.model,
																		 modelYear : this.year,
																		 region : reg,
																		 regionAreaUserId : regAreaUser,
																		 dealer1 : deal1,
																		 dealer2 : deal2,
																		 dealer3 : deal3,
																		 guestresolution : guestResolution,
																		 ineligiblecode : inEligibleCode})
								.then(result=>{
								if(result==='Success'){
										this.handleSuccess();
										getRecordNotifyChange([{recordId:this.recordId}]);
								}
								else{
										this.showNotification('Error',result,'error');
								} 
						})
				}
		}

		handleGuestResolutionChange(event){
			console.log('multiSelect '+event.detail.value);
			var str = event.detail.value;
			this.GuestResolutionVal = event.detail.value;
			var index = str.indexOf("Other");    
			if(index !== -1){
				this.showOtherResolution = true;
			} else{
				this.showOtherResolution = false;
			}
		}


}