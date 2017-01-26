#######################################################################
# Erzeugt die Matches
#######################################################################
#### used in updateFilterCounts.sql

DROP VIEW IF EXISTS `vFilterCounts`;
CREATE OR REPLACE ALGORITHM=MERGE DEFINER=`peekAttackBgrnd`@`localhost` SQL SECURITY DEFINER VIEW `vFilterCounts` AS

SELECT SQL_NO_CACHE
CONCAT(f.fValue,";",ca.fValue,";",l.fValue,";",co.fValue,";",s.fValue,";",g.fValue) as fID,
COUNT(p.fSexual) as fCount


FROM tTempClientsForFilterCounts p

JOIN (SELECT 1 UNION SELECT -1 UNION SELECT 0) g ON

(
  (g.fValue = p.PropertyGender) OR
  NOT(g.fValue)
)

JOIN (SELECT 1 UNION SELECT -1 UNION SELECT 0) s ON

(
  (s.fValue = 1  AND p.fSexual > 0) OR
  (s.fValue = -1 AND p.fSexual < 0 OR p.PropertyCamera = 0) OR
  NOT(s.fValue)
)

JOIN (SELECT 1 UNION SELECT 0) f ON

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

JOIN (SELECT 1 UNION SELECT 0) ca ON
(
  (ca.fValue = 1 AND p.PropertyCamera = 1) OR
  (ca.fValue = -1 AND p.PropertyCamera = 0) OR
  NOT(ca.fValue)
)


GROUP BY l.fValue, co.fValue, ca.fValue, f.fValue, s.fValue, g.fValue ;