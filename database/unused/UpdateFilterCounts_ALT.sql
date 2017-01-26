
#######################################################################
# Producure for Filter Combinations
#######################################################################
DELIMITER $$

DROP PROCEDURE IF EXISTS `CreateFilterCombinations` $$
CREATE DEFINER=`root`@`localhost`
PROCEDURE `CreateFilterCombinations`(filters BOOLEAN, ins BOOLEAN)
BEGIN

  DECLARE usedTable VARCHAR(50) DEFAULT 'tAvailableProperties';
  DECLARE TypeColumn VARCHAR(20) DEFAULT 'fTypeID';
  DECLARE ValueColumn VARCHAR(20) DEFAULT 'fValue';
  DECLARE ColumnNameColumn VARCHAR(20) DEFAULT 'fColumnName';
  DECLARE StatesTable VARCHAR(50) DEFAULT 'tAvailableStates';
  DECLARE q CHAR(1) DEFAULT CHAR(39);
  DECLARE filterOrProperty VARCHAR(50) DEFAULT '<=0';
  DECLARE TargetTable VARCHAR(20) DEFAULT 'tPropertySets';

  IF filters=1 THEN
    SET usedTable   = 'tAvailableFilters';
    SET TargetTable = 'tFilterSets';
    SET filterOrProperty = '>=0';
  END IF;

  DROP TABLE IF EXISTS tempStates;
  CREATE TABLE  tempStates (
    `fTypeID` int(10) unsigned NOT NULL,
    `fValue` varchar(10) NOT NULL,
    PRIMARY KEY (`fTypeID`,`fValue`) USING BTREE
  ) ENGINE=MEMORY DEFAULT CHARSET=latin1;

  SET @sql=CONCAT('INSERT INTO tempStates SELECT fTypeID, fValue FROM ',StatesTable,' WHERE fFilterOrProperty',filterOrProperty);
  PREPARE stmt FROM @sql;
    EXECUTE stmt;
  DROP PREPARE stmt;

  SET @sql=CONCAT(
  'SELECT CONVERT(CONCAT("  INSERT ',TargetTable,' (",
    GROUP_CONCAT(fColumnName),
    ") SELECT ",
    GROUP_CONCAT(CONCAT(" ",fColumnName,".',ValueColumn,' as ',q,'",fColumnName,"',q,'")),
    " FROM",
    GROUP_CONCAT(CONCAT(" tempStates as ",fColumnName))," WHERE",
    GROUP_CONCAT(CONCAT(" ",fColumnName,".',TypeColumn,' = ",fID) SEPARATOR " AND "),
    #" LIMIT 10000",
    " ON DUPLICATE KEY UPDATE ',TargetTable,'.tStamp=',q,NOW(),q,'  ")
    USING latin1)
    INTO @Result
    FROM (
      SELECT DISTINCT fColumnName,f.fID FROM ',usedTable,' f
      RIGHT JOIN tempStates s ON f.fID=s.',TypeColumn,'
    ) as Types;');

  PREPARE stmt FROM @sql;
    EXECUTE stmt;
  DROP PREPARE stmt;

IF NOT(ins) THEN
  SELECT @Result;
ELSE

  PREPARE stmt FROM @Result;
  EXECUTE stmt;
  DROP PREPARE stmt;

  SET @sql= CONCAT("SELECT count(*),tStamp FROM ",TargetTable, " GROUP BY tStamp");

  PREPARE stmt FROM @sql;
  EXECUTE stmt;
  DROP PREPARE stmt;

  SHOW WARNINGS;

  DROP TABLE tempStates;

END IF;



END $$

DELIMITER ;