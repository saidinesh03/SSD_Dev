public with sharing class myext {

    public myext(ApexPages.StandardController controller) {

    }
    public PageReference editac()
    {
    PageReference ref = new PageReference('/apex/EditingPage?id='+ApexPages.currentPage().getParameters().get('id'));
    return ref;
    }

}