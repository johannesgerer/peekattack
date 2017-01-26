DELIMITER $$

DROP PROCEDURE IF EXISTS `Startup` $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Startup`()
BEGIN

TRUNCATE peekAttack.tGeoIP;
INSERT INTO peekAttack.tGeoIP (country,begin_num,end_num) SELECT country,begin_num,end_num FROM peekAttack.GeoIpImport;

TRUNCATE peekAttackBeforeLive.tGeoIP;
INSERT INTO peekAttackBeforeLive.tGeoIP (country,begin_num,end_num) SELECT country,begin_num,end_num FROM peekAttackBeforeLive.GeoIpImport;

TRUNCATE peekAttackLive.tGeoIP;
INSERT INTO peekAttackLive.tGeoIP (country,begin_num,end_num) SELECT country,begin_num,end_num FROM peekAttackLive.GeoIpImport;

  SHOW WARNINGS;

END $$

DELIMITER ;