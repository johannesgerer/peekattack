//Needs Mootols

/*
This class can be used for Objects, that can have 
different properties switched on and off with the "setSwitch(name)" method
If one has to run a function func1 only if a certain switch is ON, or
as soon as it is switched to ON, the "waitOn(switchName,func1)" should be used

If one has to wait for several Waitables' switches, use the global 
"waitOn( { 'switch1' : Waitable1, 'switch2' : Waitable, ... } , func1 )"

 */


var Waitable = new Class({ 
	
	switches : {},
	
	Implements: Events,
	
	initialize: function(params){
		$extend(this,params);
	},
	
	waitOn: function(event, doIt){
	
		function doItfinally()
		{
			this.removeEvent(event,doIt);
			doIt();
		}
		
		if(this.switches[event])
			doItfinally();
		else
			this.addEvent(event,doIt);

	},
	
	getSwitch: function(name)
	{
		return this.switches[name];
	},
	
	setSwitch: function(switchName,value)
	{
		konsole.log(this.name+": "+switchName);
		
		if(!this.switches[switchName])
		{
			this.switches[switchName] = value || 1;
			this.fireEvent(switchName);
		}
	}			
});

//"waitOn( { 'switch1' : Waitable1, 'switch2' : Waitable, ... } , func1 )"
function waitOn(events,doIt){
	
	function onDone()
	{
		//Remove the event from the "todo-"list
		events[this] = null;
		
		//check there are events remaining
		for(var e in events)
			if(events[e] != null)
				return;
		
		doIt();
	}
	
	for(var event in events)
		events[event].waitOn(event,onDone.bind(event));
	
}