public with sharing class componentslist {


public string check{get;set;}
public list<selectoption> optionslist{get;set;}
public string checks{get;set;}
public string picks{get;set;}
public string radios{get;set;}

public componentslist()
{
optionslist = new list<selectoption>();
optionslist.add(new selectoption('male','male'));
optionslist.add(new selectoption('female','female'));
}
}