#######################################################################
# Erzeugt die Matches
#######################################################################

DROP VIEW IF EXISTS `vMatches`;
CREATE OR REPLACE ALGORITHM=MERGE DEFINER=`root`@`localhost`
 SQL SECURITY DEFINER VIEW `vMatches` AS

SELECT

f.fID 		AS fCID,
p.fID, p.fAvailable, p.fUDP, p.fCredits, p.fAPEpubid


FROM tTempClientsForFindPartner f JOIN tTempClientsForFindPartner p

ON

#######  GENDER:
(
  (f.FilterGender = p.PropertyGender) OR
  NOT(f.FilterGender)
)

AND

#######  SEXUAL:
(
  (f.FilterSexual = 1  AND p.fSexual > 0) OR
  (f.FilterSexual = -1 AND p.fSexual < 0 OR p.PropertyCamera = 0) OR
  NOT(f.FilterSexual)
)

AND

#######  FACEBOOK:
(  p.PropertyFacebook   OR  NOT(f.FilterFacebook)  )

AND

#######  COUNTRY
(  f.FilterCountry=p.PropertyCountry OR f.FilterCountry='0')

AND

#######  LANGUAGE
(
  p.PropertyLanguage1 = f.FilterLanguage OR
  p.PropertyLanguage2 = f.FilterLanguage OR
  p.PropertyLanguage3 = f.FilterLanguage OR
  p.PropertyLanguage4 = f.FilterLanguage OR
  f.FilterLanguage    = '0'
) AND

#######  Camera
(
  (f.FilterCamera = 1 AND p.PropertyCamera = 1) OR
  (f.FilterCamera = -1 AND p.PropertyCamera = 0) OR
  NOT(f.FilterCamera)
)

#######  UDP  is not selected via filter, it is just a property, that is matched in a certain way by the find partner procedure
;