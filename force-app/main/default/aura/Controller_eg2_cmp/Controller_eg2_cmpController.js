({
	Calc : function( cmp, event, helper) {
		cmp.set("v.intrest", (cmp.get("v.total_amt")*cmp.get("v.rate")*cmp.get("v.years")/100))
	}
})