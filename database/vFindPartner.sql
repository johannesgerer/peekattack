DROP VIEW IF EXISTS `vFindPartner`;
CREATE OR REPLACE ALGORITHM=MERGE DEFINER=`root`@`localhost`
 SQL SECURITY DEFINER VIEW `vFindPartner` AS

SELECT

			A.fID 				as AfID, 
			A.fUserID 			as AfUserID,
			A.fAPEpubid			as Apubid,
			A.tLastNext			as AtLastNext,
			A.FilterSexual		as AFilterSexual,
			A.FilterGender		as AFilterGender,
			A.FilterFacebook	as AFilterFacebook,
			A.FilterCountry		as AFilterCountry,
			A.FilterLanguage	as AFilterLanguage,
			A.FilterCamera		as AFilterCamera,
			A.PropertyGender	as APropertyGender,
			A.PropertyFacebook	as APropertyFacebook,
			A.PropertyCountry	as APropertyCountry,
			A.PropertyLanguage1	as APropertyLanguage1,
			A.PropertyLanguage2	as APropertyLanguage2,
			A.PropertyLanguage3	as APropertyLanguage3,
			A.PropertyLanguage4	as APropertyLanguage4,
			A.PropertyCamera	as APropertyCamera,
			A.fUDP				as AfUDP,
			uA.fCredits			as ACredits,
			uA.fSexual 			as AfSexual,
			
			B.fID 				as BfID, 
			B.fUserID 			as BfUserID,
			B.fAPEpubid			as Bpubid,
			B.tLastNext			as BtLastNext,
			B.FilterSexual		as BFilterSexual,
			B.FilterGender		as BFilterGender,
			B.FilterFacebook	as BFilterFacebook,
			B.FilterCountry		as BFilterCountry,
			B.FilterLanguage	as BFilterLanguage,
			B.FilterCamera		as BFilterCamera,
			B.PropertyGender	as BPropertyGender,
			B.PropertyFacebook	as BPropertyFacebook,
			B.PropertyCountry	as BPropertyCountry,
			B.PropertyLanguage1	as BPropertyLanguage1,
			B.PropertyLanguage2	as BPropertyLanguage2,
			B.PropertyLanguage3	as BPropertyLanguage3,
			B.PropertyLanguage4	as BPropertyLanguage4,
			B.PropertyCamera	as BPropertyCamera,
			B.fUDP				as BfUDP,
			uB.fCredits			as BCredits,
			uB.fSexual 			as BfSexual
			
			
			FROM tClients A JOIN tClients B
			
			JOIN tUsers uA JOIN tUsers uB
			
			ON uA.fID = A.fUserID AND uB.fID = B.fUserID


			
			AND A.fID < B.fID AND

##############################################################################

#######  GENDER:
(
  (A.FilterGender = B.PropertyGender) OR
  NOT(A.FilterGender)
)

AND

#######  SEXUAL:
(
  (A.FilterSexual = 1  AND uB.fSexual > 0) OR
  (A.FilterSexual = -1 AND uB.fSexual < 0 OR B.PropertyCamera = 0) OR
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
  (B.FilterSexual = 1  AND uA.fSexual > 0) OR
  (B.FilterSexual = -1 AND uA.fSexual < 0 OR A.PropertyCamera = 0) OR
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


			AND A.fAvailable = 1 AND  B.fAvailable = 1		
			AND ( 	(A.fUDP = -1  && B.fUDP = -1) ||			#TCP with TCP
					(A.fUDP <> -1  && B.fUDP <> -1)) 			#UDP with UDP

	LEFT OUTER JOIN tNexts n1 ON
				( A.fID = n1.fNexterClientID AND  B.fID = n1.fNexteeClientID)

  LEFT OUTER JOIN tNexts n2 ON
  				( B.fID = n2.fNexterClientID AND  A.fID = n2.fNexteeClientID)

	WHERE n2.fNexterClientID IS NULL
			AND n1.fNexterClientID IS NULL
				 
     ORDER BY IF(A.fUDP = 0 && B.fUDP = 0,1,0),		#Perform matches with two users that just try UDP for the first time last
			 IF(uA.fCredits < uB.fCredits,
						uB.fCredits + 0.4 * uA.fCredits,
						uA.fCredits + 0.4 * uB.fCredits) DESC;
      #The pararmeter can be adjusted between 0 and 1
      #0 means the user with the highest Credit will get the first match
      #1 means both users have to have high credits, as their sum determins
      #  the order (this means choosing two medium partners is as good as
      #  satisfying one super user and a bad one!)
