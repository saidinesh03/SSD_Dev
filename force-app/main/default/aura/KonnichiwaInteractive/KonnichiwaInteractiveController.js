({
    handleClick: function(component, event, helper) {
        var btnClicked = event.getSource();         // the button
        var btnMessage = component.get("v.label"); // the button's label
        var btnn = "Yo!!Wassup";
        if(btnMessage == null)
           {
           component.set("v.message", btnn);// update our message
    }
    else{
        component.set("v.message", btnMessage + btnn);  
}
    }, handleClick2: function(component, event, helper) {
    var newMessage = event.getSource().get("v.label");
    console.log("handleClick2: Message: " + newMessage);
    component.set("v.message", newMessage);
},
handleClick3: function(component, event, helper) {
    component.set("v.message", event.getSource().get("v.label"));
}
})