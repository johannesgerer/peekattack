#### used in filterAndProperties.js in www und Filter.js in ape

DELIMITER $$

DROP PROCEDURE IF EXISTS `GenerateJavaScriptFunctions` $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GenerateJavaScriptFunctions`()
BEGIN

 PREPARE stmt FROM
  'SELECT CONCAT(
  GROUP_CONCAT(CONCAT("set.",fName,"+",fMaxValue+1,"*") SEPARATOR "("),"0",GROUP_CONCAT("" SEPARATOR ")")
 ) into @result
  FROM
  tPropertiesAndFilters WHERE fType=? ORDER BY fSortingPosition';

  SET  @selector='prop';
  EXECUTE stmt USING @selector;

  SET @final=CONCAT("function addIdToSet(set)//generated ",NOW(),"
{
  if(set.Type=='prop')
  {
  set.Id=",@result,";
  }else{
  set.Id=");

  SET  @selector='filt';
  EXECUTE stmt USING @selector;


SET @final=CONCAT(@final,@result,";
  }
 }


 ");

#z.B.result.fLanguage=Id%68;Id=Math.floor(Id/68);
  PREPARE stmt FROM
  'SELECT CONCAT(
  GROUP_CONCAT(CONCAT("set.",fName,"=Id%",fMaxValue+1,
    ";Id=Math.floor(Id/",fMaxValue+1,");
    ") SEPARATOR "")
 ) into @result
  FROM
    tPropertiesAndFilters WHERE fType=? ORDER BY fSortingPosition';


  SET  @selector='prop';
 EXECUTE stmt USING @selector;

SET @final=CONCAT(@final,"function getSetFromId(Id,selector)//generated ",NOW(),"
{
	var set={'Id':Id,'Type':selector};

	if(selector=='prop')
	{
	",@result,"
	}else{
");
  SET  @selector='filt';
 EXECUTE stmt USING @selector;

SET @final=CONCAT(@final,@result,"
	}

	return set;
}");



PREPARE stmt FROM
'SELECT CONCAT("\'INSERT IGNORE ",?," \'+
\'SET ID=\'+set.Id+
\',",GROUP_CONCAT(CONCAT(fName,"=\'+set.",fName) SEPARATOR "+
\',")
) into @result
  FROM
    tPropertiesAndFilters WHERE fType=? ORDER BY fSortingPosition';

SET @TargetTable = 'tPropertySets';
SET  @selector='prop';
EXECUTE stmt USING @TargetTable,@selector;


SET @final=CONCAT(@final,"function insertSet(set)//generated ",NOW(),"
{
	if(set.Type == 'prop')
	{
		sql.executeQuery(
				 ",@result,"
		,null);
	}else{
		sql.executeQuery(
				 ");

SET @TargetTable = 'tFilterSets';
SET  @selector='filt';
EXECUTE stmt USING @TargetTable,@selector;

SET @final=CONCAT(@final,@result,"
				 ,null);
	}
}");


SELECT CONVERT(@final USING latin1)

UNION

SELECT CONVERT(CONCAT("var Languages={",
  GROUP_CONCAT(CONCAT("'",fValue,"':[",fID,",'",fDescription,"']") SEPARATOR ","),
"};//generated ",NOW()
 )USING latin1) as Languages
  FROM
  tLanguages

UNION

SELECT CONVERT(CONCAT("var Countries={",
  GROUP_CONCAT(CONCAT("'",fValue,"':[",fID,",'",fDescription,"']") SEPARATOR ","),
"};//generated ",NOW()
 )USING latin1) as Countries
  FROM
    tCountries;


END $$

DELIMITER ;