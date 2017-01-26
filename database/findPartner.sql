#### used in FindPartner.js
DELIMITER $$

DROP PROCEDURE IF EXISTS `findPartner` $$
CREATE DEFINER=`peekAttackBgrnd`@`localhost` PROCEDURE `findPartner`
( )

BEGIN

	

	TRUNCATE tPossibleCalls;

	INSERT INTO tPossibleCalls SELECT SQL_NO_CACHE

			A.fID, B.fID, NULL, A.fAPEpubid, B.fAPEpubid, A.fCredits, B.fCredits

			FROM tTempClientsForFindPartner A JOIN tTempClientsForFindPartner B

			ON A.fID < B.fID AND

##############################################################################

#######  GENDER:
(
  (A.FilterGender = B.PropertyGender) OR
  NOT(A.FilterGender)
)

AND

#######  SEXUAL:
(
  (A.FilterSexual = 1  AND B.fSexual > 0) OR
  (A.FilterSexual = -1 AND B.fSexual < 0 OR B.PropertyCamera = 0) OR
  NOT(A.FilterSexual)
)

AND

#######  FACEBOOK:
(  B.PropertyFacebook   OR  NOT(A.FilterFacebook)  )

AND

#######  COUNTRY
(  A.FilterCountry=B.PropertyCountry OR A.FilterCountry='0')

AND

#######  LANGUAGE
(
  B.PropertyLanguage1 = A.FilterLanguage OR
  B.PropertyLanguage2 = A.FilterLanguage OR
  B.PropertyLanguage3 = A.FilterLanguage OR
  B.PropertyLanguage4 = A.FilterLanguage OR
  A.FilterLanguage    = '0'
) AND

#######  Camera
(
  (A.FilterCamera = 1 AND B.PropertyCamera = 1) OR
  (A.FilterCamera = -1 AND B.PropertyCamera = 0) OR
  NOT(A.FilterCamera)
)


AND
##############################################################################

#######  GENDER:
(
  (B.FilterGender = A.PropertyGender) OR
  NOT(B.FilterGender)
)

AND

#######  SEXUAL:
(
  (B.FilterSexual = 1  AND A.fSexual > 0) OR
  (B.FilterSexual = -1 AND A.fSexual < 0 OR A.PropertyCamera = 0) OR
  NOT(B.FilterSexual)
)

AND

#######  FACEBOOK:
(  A.PropertyFacebook   OR  NOT(B.FilterFacebook)  )

AND

#######  COUNTRY
(  B.FilterCountry=A.PropertyCountry OR B.FilterCountry='0')

AND

#######  LANGUAGE
(
  A.PropertyLanguage1 = B.FilterLanguage OR
  A.PropertyLanguage2 = B.FilterLanguage OR
  A.PropertyLanguage3 = B.FilterLanguage OR
  A.PropertyLanguage4 = B.FilterLanguage OR
  B.FilterLanguage    = '0'
) AND

#######  Camera
(
  (B.FilterCamera = 1 AND A.PropertyCamera = 1) OR
  (B.FilterCamera = -1 AND A.PropertyCamera = 0) OR
  NOT(B.FilterCamera)
)

##############################################################################


			AND (A.fAvailable = 2 ||  B.fAvailable = 2)		#And dont compare waiting user as they shure dont match
			AND ( 	(A.fUDP = -1  && B.fUDP = -1) ||			#TCP with TCP
					(A.fUDP <> -1  && B.fUDP <> -1)) 			#UDP with UDP
			
     ORDER BY IF(A.fUDP = 0 && B.fUDP = 0,1,0),		#Perform matches with two users that just try UDP for the first time last
			 IF(A.fCredits < B.fCredits,
						B.fCredits + 0.4 * A.fCredits,
						A.fCredits + 0.4 * B.fCredits) DESC;
      #The pararmeter can be adjusted between 0 and 1
      #0 means the user with the highest Credit will get the first match
      #1 means both users have to have high credits, as their sum determins
      #  the order (this means choosing two medium partners is as good as
      #  satisfying one super user and a bad one!)

END $$

DELIMITER ;