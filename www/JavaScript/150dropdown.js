//Creates a new DropDownBox and injects it in the target container
function InsertDropDownBox(	entryArray,
							selectedValue,
							targetConatiner,
							onChangeCallback,
							filterName,
							onfilterBoxOpen)
{
	var Box= { 	
				'entryArray': entryArray,
				'onChange'	: onChangeCallback ,
				'filterName': filterName,
				'onOpen'	: function(){onfilterBoxOpen(filterName);},
				'status'	: "closed"
			} ;
	
	DropDownBoxes[filterName] = Box;//TODO gebracuth?
	
	
	 //InputBox
	Box.input=new Element('input',{
		 	'id'	: 'dropDown_'+filterName,
			'dropBoxNumber':	filterName,
		 	'type'	: 'text',
		 	'class'	: 'drop_down_box drop_down_input',		 	
			'events': { 'focus'		:	dropDownInputFocus2.bind(Box),
		 				'blur'		:	dropDownInputBlur2.bind(Box),
		 				'keydown'	:	dropDownInputKeyDown.bind(Box),
		 				'click'		:	dropDownInputClick2.bind(Box),
		 				'mousedown'	:	dropDownInputMousedown2.bind(Box)
	 					}
	 }).inject(targetConatiner);
	
	//DropDownBox
	Box.list = new Element('div', {
		'id'	: 'dropDown_'+filterName+'_list',
		'dropBoxNumber':	filterName,
		'styles': { 'visibility': 	'hidden'},
		'events'	: {	'mousedown'	:	dropDownListMouseDown2.bind(Box),
						'mouseup'	:	dropDownListMouseUp2.bind(Box) //sets the focus back to the input box
						},							
		'class'	: 'drop_down_box drop_down_list'
	}).inject( new Element('div',{'class':'drop_down_box_container'}).inject(targetConatiner));
	
	var selectedIndex=-1;
	//Entries
	for(var i=0;i<entryArray.length;i++)	
	{
		if(entryArray[i][0]==selectedValue)
			selectedIndex=i;
		
		 var tempEntry = new Element('div',{
			'styles'	: { 'display':'none'},
			 'id'		: 'dropDown_'+filterName+"_entry_"+i,
			 'indexNmber':i,
			 'dropBoxNumber':	filterName,
			 'events'	: {	'mouseover' :  function(){
			 										changeSelectedIndex2(Box,
			 											parseInt(this.getProperty('indexNmber')));
			 									},
			 				'click'		:  dropDownEntryClick2.bind(Box)
			 			  }
		 });
		 
		 //Count placeholders
		 new Element('span',{
			 'id'	: 'dropDown_'+filterName+"_count_"+entryArray[i][0],//For external access
			 'class': 'count'
		 	}).inject(tempEntry);
		 
		 tempEntry.appendText(entryArray[i][1]);		 
		 
		 tempEntry.inject(Box.list);
	}			
	
	$extend(Box,
			{	'entryDivs':$("dropDown_"+filterName+'_list').getChildren("div"),
				'selectedIndex':-2,//has to be overridden in changeSelectedIndex (see below)
				'minimum':-1,
				'maximum':entryArray.length,
				'userInputLength':0
			});
	
	changeSelectedIndex2(Box,selectedIndex,true);
	
}


//###############   Globals   ################


var dontBlur=false;
var DropDownBoxes={};

function showDropDownList(Box)
{
	Box.oldIndex=Box.selectedIndex;
	correctScroollPosition(Box,Box.selectedIndex);
	Box.list.setStyle('visibility',"visible");
	Box.input.select();
	Box.onOpen();

	Box.status="open";
}

function hideDropDownList(Box)
{
	//If something has changed (and not already saved)
	//the changings are discarded
	if(Box.oldIndex!=Box.selectedIndex)
		changeSelectedIndex2(Box,Box.oldIndex,true);
	
	Box.onChange(Box.filterName,
			Box.entryArray[Box.selectedIndex][0]);
		
	Box.list.setStyle('visibility',"hidden");
	Box.entryDivs.setStyle('display',"none");
	
	Box.userInputLength=0;

	Box.status="closed";
	konsole.log("status: CLOSED");
}

function dropDownInputBlur2()
{
	konsole.log("dropDownInputBlur2("+this.filterName+") status."+this.status);
	
	
	if(this.status!="clicking list" && this.status!="closed")
	{
		konsole.log("dropDownInputBlur2("+this.filterName+")");
		hideDropDownList(this);
	}
}
function dropDownInputFocus2()
{
	konsole.log("dropDownInputFocus2("+this.filterName+")");
	
	if(this.status!="opening")
		showDropDownList(this);
}

function dropDownInputClick2()
{
	//showDropDown list is called in the always accompaning
	// focus event
	
	konsole.log("dropDownInputClick2("+this.filterName+") status."+this.status);
	
	switch(this.status)
	{
	case "open":
		hideDropDownList(this);
		break;
		
	case "opening":
		showDropDownList(this);
		break;
	}		
}

function dropDownInputMousedown2()
{
	konsole.log("dropDownInputMousedown2("+this.filterName+") status."+this.status);
	
	if(this.status=="closed")
		this.status="opening";
}

function dropDownListMouseDown2()
{
	konsole.log("dropDownListMouseDown2("+this.filterName+")");
	this.status="clicking list";
	return false;
}

function dropDownListMouseUp2()
{
	konsole.log("dropDownListMouseUp2("+this.filterName+") status."+this.status);
	this.statis="open";
}

function dropDownEntryClick2(event)
{
	acceptChanges.apply(this);
	event.stopPropagation();//Prevent dropDownListMouseUp2	
}

function changeSelectedIndex2(dropBox,newIndex,dontSelect)
{	
	if(dropBox.selectedIndex>-1)
		dropBox.entryDivs[dropBox.selectedIndex].removeClass('drop_down_box_over');
	
	dropBox.selectedIndex=newIndex;
	
	if(newIndex>-1)
	{
		dropBox.entryDivs[newIndex].addClass('drop_down_box_over');
		
		var newValue=dropBox.entryArray[newIndex][1];
		dropBox.input.value=newValue;

		
		if(!dontSelect)
			dropBox.input.selectRange(dropBox.userInputLength,newValue.length);
		
	}
}


function acceptChanges()
{
	this.oldIndex=this.selectedIndex;
	
	konsole.log("entryclick");
	hideDropDownList(this);
}

//###############   Events   ################

var dropDownInputKeyDown=function(event)
{
	//Function keys
	if(event.code <= 126 && event.code <=112)
		return true;
	
	switch(event.key)
	{
		case "$":
		case "#":
		case "right":
		case "left":
		case "tab":
		case "strg":
		case "shift":
		case "alt":
			
		return true;		//##########################################################################
		
		
		case "enter":
			konsole.log("enter HIT");
			acceptChanges.apply(this);
			return false;
			
		case "esc":
			hideDropDownList(this);
			return;		//##########################################################################

		case "down":
			newIndex=this.entryDivs[this.selectedIndex].getProperty('next')||0;
			newIndex=parseInt(newIndex);
			if(newIndex>0 && newIndex<this.minimum)
				newIndex=this.minimum;
			else if(newIndex>this.maximum)
				newIndex=this.maximum;
			break;		//##########################################################################
			
		case "up":
			newIndex=this.entryDivs[this.selectedIndex].getProperty('prev')||0;
			newIndex=parseInt(newIndex);
			if(newIndex<this.minimum)
				newIndex=0;
			break;		//##########################################################################
			
		default:
			dropDownInputChange.delay(10,this,event);
			
	}
	
	dropDownInputNewIndex.delay(10,this,[newIndex,event])
};

function dropDownInputNewIndex(newIndex,event)
{
	//Only auto complete if there are others from "(not filtered)" left 
	//length of input if larger than zero 
	//and backspace was not pressed
	if(event.key!="backspace" && event.key!="delete" &&  newIndex!=-1)
		changeSelectedIndex2(this,newIndex);
	
	correctScroollPosition(this,newIndex);
}

function dropDownInputChange(event)
{
	this.userInputLength=0;this.minimum=0;this.maximum=0;
	var areCountsShowen= (!$chk(this.entryDivs[0].getProperty('prev')));
	for(var i=1;i<this.entryDivs.length;i++)
	if(//Filter out entries that do not match the user input
			0==this.entryArray[i][1].toLowerCase().indexOf($(event.target).value.toLowerCase(),0)
			//And if counts have been set, only if the actual entry has counts
			//TODO ohne das aber dann haben pfeiltasten probleme:
			&&  (!areCountsShowen || $chk(this.entryDivs[i].getProperty('next')))
			)
	{
		if(this.minimum==0)
			this.minimum=i;
		this.maximum=i;
		
		this.entryDivs[i].setStyle('display',"block");
	}else
		this.entryDivs[i].setStyle('display',"none");

	newIndex=this.selectedIndex.limit(this.minimum,this.maximum);
	
	if(newIndex==0)
		newIndex=-1;
	
	this.userInputLength=$(event.target).value.length;
	
	dropDownInputNewIndex.apply(this,[newIndex,event]);
}

function correctScroollPosition(Box,newIndex)
{
	if(newIndex==-1)
		return;
	
	//check for a needed correction of the scrollin position
	var entry=Box.entryDivs[newIndex];
	
	if(entry.offsetTop<Box.list.scrollTop)
		Box.list.scrollTop=entry.offsetTop;
	else
	{
		var bottomKoordinate=entry.offsetTop+entry.offsetHeight;
		if(bottomKoordinate>Box.list.offsetHeight+Box.list.scrollTop)
			Box.list.scrollTop=bottomKoordinate-Box.list.offsetHeight+2;
	}
}
