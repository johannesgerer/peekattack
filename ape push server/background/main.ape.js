var mysql;

//#############     SETTINGS   ################

var CreditsTTLinDays = 1/24/30;//LIVE longer: 7

var RatingsTTLinMinutes = 5;//LIVE longer: 20

var RatingsToCreditsTimeframeinMinutes = 1/60;//LIVE longer: 20

var maxCreditsPerRating = 15; 

	
Ape.addEvent("init", function() {
	include("../framework/mootools.js");
	include("../peekAttack/Settings.js");
	include("../peekAttack/MySQL.js");
	include("../peekAttack/Utils.js");
	include("../framework/mootools.js");
	include("../peekAttack/Filters.js");
	include("ratings_and_credits.js");
	
	mysqlRatings = MySQLConnection('peekAttackBgrnd',function(){
		mysqlFilters = MySQLConnection('peekAttackBgrnd',function(){
			
			Ape.log("mysql connect");
			
	//########     Ratings And Credits  #########	
		
			 Ape.setInterval(ratingsAndCredits, 1000);//LIVE longer
			
			function ratingsAndCredits()
			{
				sequentialExecutor([
			                    	processRatings,
			                    	processPendingRatings,
			                    	processCredits
			                    ]);
			}
			
			
	//########      Filter Counts  #########		
			
			 Ape.setInterval(updateFilterCounts, 1000); //LIVE longer?
			
			function updateFilterCounts()
			{
				mysqlFilters.querySuccess("CALL updateFilterCounts()");
			}
			
		});
	});
});

