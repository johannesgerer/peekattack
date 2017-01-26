DELIMITER $$

DROP PROCEDURE IF EXISTS `CreateFilterCombinations` $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateFilterCombinations`(filters BOOLEAN, ins BOOLEAN)
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

    SET @sql=CONCAT('TRUNCATE ',TargetTable);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DROP PREPARE stmt;


  DROP TABLE IF EXISTS tempStates;

  SET @sql=CONCAT('CREATE TABLE tempStates SELECT fTypeID, fValue FROM ',
  StatesTable,' WHERE fFilterOrProperty',filterOrProperty);
  PREPARE stmt FROM @sql;
    EXECUTE stmt;
  DROP PREPARE stmt;

  DROP TABLE IF EXISTS tempoTable;
  SET @sql=CONCAT('CREATE TABLE tempoTable LIKE ',TargetTable);
  PREPARE stmt FROM @sql;
    EXECUTE stmt;
  DROP PREPARE stmt;

  SET @sql=CONCAT(
  'UPDATE ',usedTable,' f2,(
   SELECT fID,COUNT(fTypeID) as num FROM tempStates
   RIGHT JOIN ',usedTable,' f ON f.fID=fTypeID  GROUP BY fID
    ) as derived SET f2.fNumStates=num WHERE derived.fID=f2.fID');

SELECT @sql;
  PREPARE stmt FROM @sql;
    EXECUTE stmt;
  DROP PREPARE stmt;

  SET @sql=CONCAT(
  'SELECT CONVERT(CONCAT("  INSERT tempoTable (",
    GROUP_CONCAT(fColumnName),
    ") SELECT ",
    GROUP_CONCAT(CONCAT(" ",fColumnName,".',ValueColumn,' as ',q,'",fColumnName,"',q,'")),
    " FROM",
    GROUP_CONCAT(CONCAT(" tempStates as ",fColumnName))," WHERE",
    GROUP_CONCAT(CONCAT(" ",fColumnName,".',TypeColumn,' = ",fID) SEPARATOR " AND ")
    ) USING latin1)
    INTO @Result
    FROM (
      SELECT DISTINCT fColumnName,f.fID FROM ',usedTable,' f
      RIGHT JOIN tempStates s ON f.fID=s.',TypeColumn,' ORDER BY f.fID
    ) as Types;');

  PREPARE stmt FROM @sql;
    EXECUTE stmt;
  DROP PREPARE stmt;


 SET @sql2=CONCAT(
  'SELECT CONCAT("INSERT ',TargetTable,' SELECT * FROM tempoTable ORDER BY ",
  GROUP_CONCAT(fColumnName)) INTO @Result2
    FROM (
      SELECT DISTINCT fColumnName,f.fID FROM ',usedTable,' f
      RIGHT JOIN tempStates s ON f.fID=s.',TypeColumn,' ORDER BY f.fID
    ) as Types;');

  PREPARE stmt FROM @sql2;
    EXECUTE stmt;
  DROP PREPARE stmt;

IF NOT(ins) THEN
  SELECT @Result;
  SELECT @Result2;
ELSE

  PREPARE stmt FROM @Result;
  EXECUTE stmt;
  DROP PREPARE stmt;

  PREPARE stmt FROM @Result2;
  EXECUTE stmt;
  DROP PREPARE stmt;


END IF;

  #DROP TABLE tempStates;
  DROP TABLE tempoTable;


END $$

DELIMITER ;