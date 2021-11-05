({
	Test : function(wats, event, helper) {
	  wats.set("v.anime", "Naruto");
      wats.set("v.season", 4);
      wats.set("v.seasoneps",25);
     
    // wats.set("v.totaleps",wats.get("v.season")*wats.get("v.seasoneps"));

        var s = wats.get("v.season");
        var e=wats.get("v.seasoneps")
        var t = s*e;
        wats.set("v.totaleps", t);
        alert(t);
    }
})