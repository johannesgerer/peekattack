DELIMITER $$

DROP PROCEDURE IF EXISTS `CreateClient` $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateClient`(
      IP            VARCHAR(15),     #From Ape
      FacebookID    BIGINT unsigned, #NULL for anonym user
      UserID        BIGINT unsigned, #NULL for facebook or new anonym user
      AccessToken    varchar(200),   #1. Facebook (verified!) AccessToken,
                                     #2. Token from Cookie for anonym User
                                     #3. Newly generated Token for new anonym
      StratusID     varchar(127)    #From SWF

#OUT   ClientID      BIGINT unsigned  #1. NULL if connection denied: (e.g. Wrong AccesToken for anonymous User, IP blocked,...)
                                      #2. LAST_INSERT_ID
#OUT   UserID      (eig. INOUT: s.o.)
#OUT   Country     CHAR(2);
)

BEGIN
DECLARE IPn       INTEGER unsigned;
DECLARE ClientID  BIGINT unsigned;
DECLARE Country   CHAR(2);
DECLARE outUserID BIGINT unsigned;

IF UserID IS NULL THEN
#Wenn is ein Facebook user ist, dann erstellen wir einen neuen User
#und schreiben den AccesToken rein, oder falls der FacebookUser schon
#vorhanden ist (unique key tFacebookID) wird sein AccesToken nur aktuelisiert
#Wenn es kein Facebook User ist (das heißt also ein neuer anonymer User),
#dann wird einfach ein neuer erstellt und der AccesToken reingeschrieben
# (Für fFacebookID=NULL gibt es nie duplicate Keys)

  INSERT INTO tUsers SET

    fFacebookID=FacebookID,
    fAccessToken=AccessToken

  ON DUPLICATE KEY UPDATE

    fID=LAST_INSERT_ID(fID),
    fAccessToken=AccessToken;

  SET outUserID=LAST_INSERT_ID();

ELSE
#Wenn es ein anonymer User ist, der schonmal da war,
#er also eine ID und Toek hat, dann müssen die beiden mit dem
#entsprechenden Datenbank eintag übereinstimmen:

  SET outUserID=(
    SELECT fID  FROM tUsers
    WHERE fID=UserID AND fAccessToken=AccessToken
  );

END IF;


#Für Facebook User ist das folgende immer erfüllt und
#für schon vorhandene anonyme nurm, wenn der Token Stimmt
IF outUserID IS NOT NULL THEN

  SET IPn=INET_ATON(IP);

  #Only calculate the country if User is not null (above)!
  SET Country=ip2Country(IPn);

  INSERT INTO tClients SET
    fStratusID   =StratusID,
    fUserID      =outUserID,
    fIPnum       =IPn;

  SET ClientID=LAST_INSERT_ID();

  #SOLANGE ES KEINE PREPARED STATEMENTS GIBT MÜSSEN DIE OUT
  #VARIABLEN ALS RESULT AUSGEGEBEN WERDEN:
  SELECT outUserID,ClientID,Country;

END IF;

END $$




