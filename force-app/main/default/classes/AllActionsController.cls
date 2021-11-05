public with sharing class AllActionsController {

    public String Optext { get; set; }

    public String Textx { get; set; }

    public PageReference Yo() {
        Optext = Textx;    
        return null;
    }

}