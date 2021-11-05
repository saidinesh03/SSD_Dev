public class Mobile_Trigger_Controller {
	
    public static void insertMethod(List<Mobile__c> RecsList){
        List<Mobile__c> updateRecs = new List<mobile__c>();
        Double discount;
        for(Mobile__c r : RecsList){
            if(r.Brand__c == 'Samsung')
                discount = 0.1*r.Mobile_Price__c;
            else if(r.Brand__c == 'Apple')
                discount = 0.2*r.Mobile_Price__c;
            else
                discount = 0;
            r.Mobile_Price__c = r.Mobile_Price__c - discount;
            if(discount!=0)
            	r.Discount_Applied__c = 'Congrats! You got a discount of ' +discount + ' on your purchase';
            else
                r.Discount_Applied__c = 'You got no discount on your purchase';
           updateRecs.add(r); 
        }
    }
    public static void updateMethod(List<Mobile__c> RecsList){
        List<Mobile__c> updateRecs = new List<mobile__c>();
        Double discount;
        for(Mobile__c r : RecsList){
            if(r.Brand__c == 'Samsung')
                discount = 0.05*r.Mobile_Price__c;
            else
                discount = 0;
            r.Mobile_Price__c = r.Mobile_Price__c - discount;
            if(discount!=0)
            	r.Discount_Applied__c = 'Congrats! You got a discount of ' +discount + ' on your purchase';
            else
                r.Discount_Applied__c = 'You got no discount on your purchase';
            updateRecs.add(r); 
        }
    }
}