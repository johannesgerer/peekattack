#######################################################################
# Gibt Rating Informationen für tUser '1' zurück: Wieviel ihn als nackt und wieviel ihn als nicht nackt gerated haben
#######################################################################

SELECT count(1) as n, fNaked FROM tRatings r
LEFT JOIN tConnections co
ON r.fCallID=co.fCallID OR r.fCallID=co.fWaitingCallID
LEFT JOIN tCalls ca
ON ca.fID = co.fWaitingCallID OR ca.fID = co.fCallID
LEFT JOIN tClients cl
ON ca.fClientID = cl.fID
WHERE cl.fUserID='1' AND r.fCallID <> ca.fID
GROUP BY fNaked



#######################################################################
# Calculates the filter counts using matches from above 
#######################################################################
DROP VIEW IF EXISTS `vFilterCounts`;
CREATE OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vFilterCounts` AS

SELECT mp.filterID,count(1) as "count" FROM tClients c

JOIN vMatches mp ON c.fPropertyID = mp.propertyID

GROUP BY filterID;
;
