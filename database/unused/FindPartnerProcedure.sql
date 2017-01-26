DELIMITER $$

DROP PROCEDURE IF EXISTS `FindPartner` $$


CREATE DEFINER=`root`@`localhost` PROCEDURE `FindPartner` (
    myFilterID   BIGINT unsigned,
    myClientID   BIGINT unsigned,
OUT myPropertyID BIGINT unsigned,
OUT Red5ClientID BIGINT unsigned,
OUT ServerURL    varchar(255),
    fGender      tinyint(4),
    fSexual      tinyint(3),
    fFacebook    tinyint(1),
    fCountry     char(2),
    fLanguage    char(2),
    fCamera      tinyint(1) unsigned,
    fUDP         tinyint(1) unsigned,
    fLastParnterClientID BIGINT unsigned,
)
BEGIN

DECLARE PartnerClientID BIGINT unsigned;

####################################################
########    FIND myPropertyID            ###########
####################################################

SELECT fID INTO myPropertyID from tPropertySets WHERE
#myP.fID=1;
#myP.fGender   =  -1    AND
#myP.fSexual   =  -1    AND
#myP.fFacebook =  0     AND
#myP.fCountry  =  'AD'  AND
#myP.fLanguage =  'af'  AND
#myP.fCamera   =  0     AND
#myP.fUDP      =  0
tPropertySets.fGender   =  fGender    AND
tPropertySets.fSexual   =  fSexual    AND
tPropertySets.fFacebook =  fFacebook  AND
tPropertySets.fCountry  =  fCountry   AND
tPropertySets.fLanguage =  fLanguage  AND
tPropertySets.fCamera   =  fCamera    AND
tPropertySets.fUDP      =  fUDP;


####################################################
########    FIND Partner ClientID         ##########
####################################################

SELECT
#This tells me so far unkown myPropertyID,
#which is found using WHERE with my properties
c.fID,c.fRed5ClientID,c.ServerURL INTO PartnerClientID,Red5ClientID,ServerURL

FROM tClients c
JOIN vMatches ClientPropertyMatch
JOIN vMatches ClientFilterMatch

WHERE ClientPropertyMatch.propertyID  =  c.fPropertyID
AND   ClientPropertyMatch.filterID    =  myFilterID

AND   ClientFilterMatch.filterID      =  c.fFilterID
AND   ClientFilterMatch.propertyID    =  myPropertyID

#Only show available
AND   c.fAvailable
#Dont call myself
AND c.fID <> fLastParnterClientID
AND c.fID <> myClientID

LIMIT 1;


####################################################
########    FIND Partner ClientID         ##########
####################################################


IF ClientID IS NOT NULL THEN

UPDATE tClients c SET c.fAvailable = 0
WHERE c.fID=ClientID OR c.fID=PartnerClientID

ELSE
SELECT ClientID;
END IF;

END $$

DELIMITER ;

#################################################         USE:  
#CALL FindPartner(240,4,-1,-1,0,'De','de',0,0,4,@a,@b,@c,@d);