#### used in background/main.ape.js
DELIMITER $$

DROP PROCEDURE IF EXISTS `updateFilterCounts` $$
CREATE DEFINER=`peekAttackBgrnd`@`localhost` PROCEDURE `updateFilterCounts`()
BEGIN

TRUNCATE tFilterCounts2;

INSERT INTO tFilterCounts2 (fID,fCount) SELECT 
CONCAT(f.fValue,";",ca.fValue,";",l.fValue,";",co.fValue,";",s.fValue,";",g.fValue) as fID,
COUNT(p.fSexual) as fCount


FROM tTempClientsForFilterCounts p

JOIN (SELECT 1 as fValue UNION SELECT -1 UNION SELECT 0) g ON

(
  (g.fValue = p.PropertyGender) OR
  NOT(g.fValue)
)

JOIN (SELECT 1 as fValue UNION SELECT -1 UNION SELECT 0) s ON

(
  (s.fValue = 1  AND p.fSexual > 0) OR
  (s.fValue = -1 AND p.fSexual < 0 OR p.PropertyCamera = 0) OR
  NOT(s.fValue)
)

JOIN (SELECT 1 as fValue UNION SELECT 0) f ON

(  p.PropertyFacebook AND f.fValue = 1   OR  NOT(f.fValue)  )

JOIN tCountries co ON

(  co.fValue=p.PropertyCountry OR co.fValue='0')

JOIN tLanguages l ON

(
  p.PropertyLanguage1 = l.fValue OR
  p.PropertyLanguage2 = l.fValue OR
  p.PropertyLanguage3 = l.fValue OR
  p.PropertyLanguage4 = l.fValue OR
  l.fValue    = '0'
)

JOIN (SELECT 1 as fValue UNION SELECT 0  UNION SELECT -1) ca ON
(
  (ca.fValue = 1 AND p.PropertyCamera = 1) OR
  (ca.fValue = -1 AND p.PropertyCamera = 0) OR
  NOT(ca.fValue)
)


GROUP BY l.fValue, co.fValue, ca.fValue, f.fValue, s.fValue, g.fValue ;


RENAME TABLE tFilterCounts TO AjeEuglLkqmEHAjeEuglLkqmEHAjeEuglLkqmEH,
             tFilterCounts2 TO tFilterCounts,
             AjeEuglLkqmEHAjeEuglLkqmEHAjeEuglLkqmEH TO tFilterCounts2;

INSERT INTO aLog (type,comment,value) VALUES
(1,'Total',(SELECT fCount FROM tFilterCounts WHERE fID ='0;0;0;0;0;0')),
(2,'Naked',(SELECT fCount FROM tFilterCounts WHERE fID ='0;0;0;0;1;0')),
(3,'Clothed',(SELECT fCount FROM tFilterCounts WHERE fID ='0;0;0;0;-1;0')),
(4,'Male',(SELECT fCount FROM tFilterCounts WHERE fID ='0;0;0;0;0;1')),
(5,'Female',(SELECT fCount FROM tFilterCounts WHERE fID ='0;0;0;0;0;-1')),
(6,'Facebook',(SELECT fCount FROM tFilterCounts WHERE fID ='1;0;0;0;0;0')),
(7,'Not next',(SELECT COUNT(*) FROM tClients WHERE FilterGender IS NULL));

END $$

DELIMITER ;