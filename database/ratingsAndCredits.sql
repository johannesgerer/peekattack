#### used in background/main.ape.js

DELIMITER $$

DROP PROCEDURE IF EXISTS `processRatings` $$
CREATE DEFINER=`peekAttackBgrnd`@`localhost` PROCEDURE `processRatings`
( )

BEGIN
	DECLARE maxCreditsPerRating INTEGER UNSIGNED DEFAULT 15;
	DECLARE creditsForSingleRater INTEGER UNSIGNED DEFAULT 5;
	
	DECLARE RatingsToCreditsTimeframeinMinutes INTEGER UNSIGNED DEFAULT 8;

	ROLLBACK;
	START TRANSACTION;
	
############# Schreibe Ratings in die "pending" table, aus der sie gelöscht werden,    ############
#		wenn sie vom user abgezogen werden .
	
	INSERT INTO tPendingRatings (fRating, tCreated, fRateeUserID,fID )
						SELECT fRating, tCreated, fRateeUserID,fID
		FROM tRatings 
			WHERE tCreated <= DATE_SUB(NOW(),INTERVAL RatingsToCreditsTimeframeinMinutes MINUTE);
	
############# Schreibe alte Ratings ins Archiv.  ##############
	INSERT INTO aRatings (fID, fRating, tCreated, fCallID, fRaterUserID, fRateeUserID ) 
		SELECT fID, fRating, tCreated, fCallID, fRaterUserID, fRateeUserID 
		FROM tRatings 
			WHERE tCreated <= DATE_SUB(NOW(),INTERVAL RatingsToCreditsTimeframeinMinutes MINUTE);
		
############ Wandle alte Ratings in Credits um  ############
	INSERT INTO tCredits (fRatingID, fRating, fUserID, fMean, fCount, fCredits) 
		SELECT r.fID, r.fRating, r.fRaterUserID, SUM(s.fRating), COUNT(s.fRating), 
		IF( COUNT(s.fRating) = 1, creditsForSingleRater , 
				SIGN(r.fRating) * AVG(s.fRating) * ABS(AVG(s.fRating)) * maxCreditsPerRating ) 
		FROM tRatings r JOIN tRatings s
		ON r.fRateeUserID=s.fRateeUserID AND r.fID<=s.fID 
		AND ( s.fRaterUserID != r.fRaterUserID || s.fID = r.fID ) 
		WHERE r.tCreated <= DATE_SUB(NOW(),INTERVAL RatingsToCreditsTimeframeinMinutes MINUTE)
		GROUP BY r.fID;
		
######### Lösche alte Ratings
	DELETE FROM tRatings 
		WHERE tCreated <= DATE_SUB(NOW(),INTERVAL RatingsToCreditsTimeframeinMinutes MINUTE);
	
	
	COMMIT;
	
END $$

DELIMITER ;











DELIMITER $$

DROP PROCEDURE IF EXISTS `processCredits` $$
CREATE DEFINER=`peekAttackBgrnd`@`localhost` PROCEDURE `processCredits`
( )

BEGIN
	DECLARE CreditsTTLinHours INTEGER UNSIGNED DEFAULT 6;
	

# #####################  Remove old credits from Users  ##############
ROLLBACK;
START TRANSACTION;

	INSERT INTO aCredits
		SELECT * FROM tCredits WHERE tCreated <= DATE_SUB(NOW(),INTERVAL CreditsTTLinHours HOUR);

	DELETE FROM tCredits
		WHERE tCreated <= DATE_SUB(NOW(),INTERVAL CreditsTTLinHours HOUR);
		
COMMIT;	

END $$

DELIMITER ;












DELIMITER $$

DROP PROCEDURE IF EXISTS `processPendingRatings` $$
CREATE DEFINER=`peekAttackBgrnd`@`localhost` PROCEDURE `processPendingRatings`
( )

BEGIN
	DECLARE RatingsTTLinMinutes INTEGER UNSIGNED DEFAULT 40;

	ROLLBACK;
	START TRANSACTION;
	
		
# #####################  Remove old ratings from Users  ##############
	DELETE FROM tPendingRatings 
		WHERE tCreated <= DATE_SUB(NOW(),INTERVAL RatingsTTLinMinutes MINUTE);


	COMMIT;	

END $$

DELIMITER ;