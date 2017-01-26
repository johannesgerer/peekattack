-- MySQL dump 10.13  Distrib 5.1.37, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	5.1.37-1ubuntu5.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Current Database: `peekAttack`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `peekAttack` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `peekAttack`;

--
-- Table structure for table `GeoIpImport`
--

DROP TABLE IF EXISTS `GeoIpImport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GeoIpImport` (
  `begin_ip` text NOT NULL,
  `end_ip` text NOT NULL,
  `begin_num` int(11) unsigned NOT NULL,
  `end_num` int(11) unsigned NOT NULL,
  `country` char(2) NOT NULL,
  `name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ISO6393`
--

DROP TABLE IF EXISTS `ISO6393`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ISO6393` (
  `Id` char(3) NOT NULL,
  `Part2B` char(3) DEFAULT NULL,
  `Part2T` char(3) DEFAULT NULL,
  `Part1` char(2) DEFAULT NULL,
  `Scope` char(1) NOT NULL,
  `Type` char(1) NOT NULL,
  `Ref_Name` varchar(150) NOT NULL,
  `Comment` varchar(150) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCallTermination`
--

DROP TABLE IF EXISTS `aCallTermination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCallTermination` (
  `fCallID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAction` varchar(45) NOT NULL,
  `tTermination` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fClientID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCalls`
--

DROP TABLE IF EXISTS `aCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCalls` (
  `fID` bigint(20) unsigned NOT NULL,
  `AfClientID` bigint(20) unsigned NOT NULL,
  `AfUserID` bigint(20) unsigned NOT NULL,
  `AtLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `AfAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `AFilterSexual` tinyint(3) DEFAULT NULL,
  `AFilterGender` tinyint(3) DEFAULT NULL,
  `AFilterFacebook` tinyint(3) DEFAULT NULL,
  `AFilterCountry` char(2) DEFAULT NULL,
  `AFilterLanguage` char(2) DEFAULT NULL,
  `AFilterCamera` tinyint(3) DEFAULT NULL,
  `APropertyGender` tinyint(3) DEFAULT NULL,
  `APropertyFacebook` tinyint(3) DEFAULT NULL,
  `APropertyCountry` char(2) DEFAULT NULL,
  `APropertyLanguage1` char(2) DEFAULT NULL,
  `APropertyLanguage2` char(2) DEFAULT NULL,
  `APropertyLanguage3` char(2) DEFAULT NULL,
  `APropertyLanguage4` char(2) DEFAULT NULL,
  `APropertyCamera` tinyint(3) DEFAULT NULL,
  `AfUDP` tinyint(3) DEFAULT NULL,
  `AfLastPartnerId` bigint(20) unsigned NOT NULL,
  `AfSexual` tinyint(3) DEFAULT NULL,
  `AfCredits` int(10) unsigned NOT NULL DEFAULT '0',
  `BfClientID` bigint(20) unsigned NOT NULL,
  `BfUserID` bigint(20) unsigned NOT NULL,
  `BtLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `BfAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `BFilterSexual` tinyint(3) DEFAULT NULL,
  `BFilterGender` tinyint(3) DEFAULT NULL,
  `BFilterFacebook` tinyint(3) DEFAULT NULL,
  `BFilterCountry` char(2) DEFAULT NULL,
  `BFilterLanguage` char(2) DEFAULT NULL,
  `BFilterCamera` tinyint(3) DEFAULT NULL,
  `BPropertyGender` tinyint(3) DEFAULT NULL,
  `BPropertyFacebook` tinyint(3) DEFAULT NULL,
  `BPropertyCountry` char(2) DEFAULT NULL,
  `BPropertyLanguage1` char(2) DEFAULT NULL,
  `BPropertyLanguage2` char(2) DEFAULT NULL,
  `BPropertyLanguage3` char(2) DEFAULT NULL,
  `BPropertyLanguage4` char(2) DEFAULT NULL,
  `BPropertyCamera` tinyint(3) DEFAULT NULL,
  `BfUDP` tinyint(3) DEFAULT NULL,
  `BfLastPartnerId` bigint(20) unsigned NOT NULL,
  `BfSexual` tinyint(3) DEFAULT NULL,
  `BfCredits` int(10) unsigned NOT NULL DEFAULT '0',
  `tEstablished` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aClients`
--

DROP TABLE IF EXISTS `aClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aClients` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fUserAgent` text NOT NULL,
  `fIP` int(10) unsigned NOT NULL,
  `tConnected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tDisconnected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fQuitCode` varchar(20) NOT NULL DEFAULT '0',
  `fLocation` varchar(45) NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCredits`
--

DROP TABLE IF EXISTS `aCredits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCredits` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL COMMENT 'Receiving User',
  `fRating` tinyint(4) NOT NULL,
  `fMean` mediumint(8) NOT NULL COMMENT 'Mean value of subsequent ratings',
  `fCount` mediumint(8) unsigned NOT NULL COMMENT 'Total number of subsequent ratings',
  `fCredits` int(10) unsigned NOT NULL COMMENT 'Number of credits assigned for rating',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tRatingID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aFilterSets`
--

DROP TABLE IF EXISTS `aFilterSets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aFilterSets` (
  `fID` char(20) NOT NULL,
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aRatings`
--

DROP TABLE IF EXISTS `aRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aRatings` (
  `fID` bigint(20) unsigned NOT NULL,
  `fRating` tinyint(3) NOT NULL,
  `tCreated` datetime NOT NULL,
  `fCallID` bigint(20) unsigned NOT NULL,
  `fRaterUserID` bigint(20) unsigned NOT NULL,
  `fRateeUserID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aSnapshots`
--

DROP TABLE IF EXISTS `aSnapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aSnapshots` (
  `fID` bigint(20) unsigned NOT NULL,
  `fCallID` bigint(20) unsigned NOT NULL,
  `tCreated` bigint(20) unsigned DEFAULT NULL,
  `fFilename` varchar(22) NOT NULL,
  `fAutomatic` tinyint(4) DEFAULT '0',
  `fUserID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `fDeleted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fDeletedByUser` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aUsers`
--

DROP TABLE IF EXISTS `aUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aUsers` (
  `fID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned DEFAULT NULL,
  `tCreated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fCredits` int(10) unsigned DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  `tCreditsUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fTotalCredits` int(10) unsigned DEFAULT '0',
  `fGender` tinyint(4) NOT NULL DEFAULT '0',
  `fFBPermissions` varchar(45) NOT NULL,
  `tDestroyed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tClients`
--

DROP TABLE IF EXISTS `tClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tClients` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAPEpubid` char(32) NOT NULL,
  `fRTMInfo` varchar(64) NOT NULL,
  `tLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL,
  `PropertyGender` tinyint(3) DEFAULT NULL,
  `PropertyFacebook` tinyint(3) DEFAULT NULL,
  `PropertyCountry` char(2) DEFAULT NULL,
  `PropertyLanguage1` char(2) DEFAULT NULL,
  `PropertyLanguage2` char(2) DEFAULT NULL,
  `PropertyLanguage3` char(2) DEFAULT NULL,
  `PropertyLanguage4` char(2) DEFAULT NULL,
  `PropertyCamera` tinyint(3) DEFAULT NULL,
  `fUDP` tinyint(3) DEFAULT NULL,
  `fLastPartnerId` bigint(20) unsigned DEFAULT '0',
  PRIMARY KEY (`fID`),
  KEY `Available_Index` (`fAvailable`),
  KEY `FindPartner_Index` (`FilterGender`,`FilterFacebook`,`FilterCountry`,`FilterCamera`,`PropertyGender`,`PropertyFacebook`,`PropertyCountry`,`PropertyLanguage1`,`PropertyLanguage2`,`PropertyLanguage3`,`PropertyLanguage4`,`PropertyCamera`,`FilterSexual`,`FilterLanguage`,`fLastPartnerId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED COMMENT='Client Connections to ape';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tClientsPreArchive`
--

DROP TABLE IF EXISTS `tClientsPreArchive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tClientsPreArchive` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fUserAgent` text NOT NULL,
  `fIP` int(10) unsigned NOT NULL,
  `tConnected` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fLocation` varchar(45) NOT NULL,
  PRIMARY KEY (`fID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tCountries`
--

DROP TABLE IF EXISTS `tCountries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tCountries` (
  `fValue` char(2) NOT NULL,
  `fDescription` varchar(105) NOT NULL,
  PRIMARY KEY (`fValue`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tCredits`
--

DROP TABLE IF EXISTS `tCredits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tCredits` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fUserID` bigint(20) unsigned NOT NULL COMMENT 'Receiving User',
  `fRating` tinyint(4) NOT NULL,
  `fMean` mediumint(8) NOT NULL COMMENT 'Mean value of subsequent ratings',
  `fCount` mediumint(8) unsigned NOT NULL COMMENT 'Total number of subsequent ratings',
  `fCredits` int(10) unsigned NOT NULL COMMENT 'Number of credits assigned for rating',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fRatingID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterCounts`
--

DROP TABLE IF EXISTS `tFilterCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterCounts` (
  `fID` char(20) NOT NULL,
  `fCount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterCounts2`
--

DROP TABLE IF EXISTS `tFilterCounts2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterCounts2` (
  `fID` char(20) NOT NULL,
  `fCount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterStates`
--

DROP TABLE IF EXISTS `tFilterStates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterStates` (
  `fValue` int(10) NOT NULL,
  PRIMARY KEY (`fValue`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Conatins all possible numeric, filter reduced property state';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tGeoIP`
--

DROP TABLE IF EXISTS `tGeoIP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tGeoIP` (
  `begin_num` int(10) unsigned NOT NULL,
  `end_num` int(10) unsigned NOT NULL,
  `country` char(2) NOT NULL,
  PRIMARY KEY (`begin_num`) USING BTREE
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tLanguages`
--

DROP TABLE IF EXISTS `tLanguages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tLanguages` (
  `fValue` char(2) NOT NULL,
  `fDescription` varchar(505) NOT NULL,
  PRIMARY KEY (`fValue`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tMatchCounts`
--

DROP TABLE IF EXISTS `tMatchCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tMatchCounts` (
  `Count` int(10) unsigned NOT NULL,
  `AfClientID` bigint(20) unsigned NOT NULL,
  `BfClientID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`AfClientID`,`BfClientID`)
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tPendingRatings`
--

DROP TABLE IF EXISTS `tPendingRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tPendingRatings` (
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fRating` tinyint(3) unsigned NOT NULL,
  `fRateeUserID` bigint(20) unsigned NOT NULL,
  KEY `Index_1` (`tCreated`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tPossibleCalls`
--

DROP TABLE IF EXISTS `tPossibleCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tPossibleCalls` (
  `AID` bigint(20) unsigned NOT NULL,
  `BID` bigint(20) unsigned NOT NULL,
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Apubid` char(32) NOT NULL,
  `Bpubid` char(32) NOT NULL,
  `ACredits` int(10) unsigned NOT NULL,
  `BCredits` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tRatings`
--

DROP TABLE IF EXISTS `tRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tRatings` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fRating` tinyint(1) NOT NULL COMMENT 'rated as ''naked'' ?',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fCallID` bigint(20) unsigned NOT NULL COMMENT 'The call that this rating happened on',
  `fRaterUserID` bigint(20) unsigned NOT NULL COMMENT 'Indicates if the user who rated was the waiting user in the call',
  `fRateeUserID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='All rating events, used for credits and nakedness';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tSnapshots`
--

DROP TABLE IF EXISTS `tSnapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tSnapshots` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fCallID` bigint(20) unsigned NOT NULL,
  `tCreated` bigint(20) unsigned DEFAULT NULL,
  `fFilename` varchar(43) NOT NULL,
  `fAutomatic` tinyint(4) DEFAULT '0',
  `fUserID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`fID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tUsers`
--

DROP TABLE IF EXISTS `tUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tUsers` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fFacebookID` bigint(20) unsigned DEFAULT NULL,
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fCredits` int(10) unsigned DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  `tCreditsUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fTotalCredits` int(10) unsigned DEFAULT '0',
  `fGender` tinyint(4) NOT NULL DEFAULT '0',
  `fFBPermissions` varchar(45) NOT NULL,
  PRIMARY KEY (`fID`),
  UNIQUE KEY `facebookID` (`fFacebookID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `vFilterCounts`
--

DROP TABLE IF EXISTS `vFilterCounts`;
/*!50001 DROP VIEW IF EXISTS `vFilterCounts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `vFilterCounts` (
  `fID` varbinary(53),
  `fCount` bigint(21)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vMatches`
--

DROP TABLE IF EXISTS `vMatches`;
/*!50001 DROP VIEW IF EXISTS `vMatches`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `vMatches` (
  `fCID` bigint(20) unsigned,
  `fID` bigint(20) unsigned,
  `fUserID` bigint(20) unsigned,
  `fAPEpubid` char(32),
  `fRTMInfo` varchar(64),
  `tLastNext` timestamp,
  `fAvailable` tinyint(1),
  `FilterSexual` tinyint(3),
  `FilterGender` tinyint(3),
  `FilterFacebook` tinyint(3),
  `FilterCountry` char(2),
  `FilterLanguage` char(2),
  `FilterCamera` tinyint(3),
  `PropertyGender` tinyint(3),
  `PropertyFacebook` tinyint(3),
  `PropertyCountry` char(2),
  `PropertyLanguage1` char(2),
  `PropertyLanguage2` char(2),
  `PropertyLanguage3` char(2),
  `PropertyLanguage4` char(2),
  `PropertyCamera` tinyint(3),
  `fUDP` tinyint(3),
  `fLastPartnerId` bigint(20) unsigned,
  `fCredits` int(10) unsigned
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `peekAttackBeforeLive`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `peekAttackBeforeLive` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `peekAttackBeforeLive`;

--
-- Table structure for table `GeoIpImport`
--

DROP TABLE IF EXISTS `GeoIpImport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GeoIpImport` (
  `begin_ip` text NOT NULL,
  `end_ip` text NOT NULL,
  `begin_num` int(11) unsigned NOT NULL,
  `end_num` int(11) unsigned NOT NULL,
  `country` char(2) NOT NULL,
  `name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ISO6393`
--

DROP TABLE IF EXISTS `ISO6393`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ISO6393` (
  `Id` char(3) NOT NULL,
  `Part2B` char(3) DEFAULT NULL,
  `Part2T` char(3) DEFAULT NULL,
  `Part1` char(2) DEFAULT NULL,
  `Scope` char(1) NOT NULL,
  `Type` char(1) NOT NULL,
  `Ref_Name` varchar(150) NOT NULL,
  `Comment` varchar(150) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCallTermination`
--

DROP TABLE IF EXISTS `aCallTermination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCallTermination` (
  `fCallID` varchar(50) NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAction` varchar(45) NOT NULL,
  `tTermination` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fClientID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCalls`
--

DROP TABLE IF EXISTS `aCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCalls` (
  `fID` varchar(50) NOT NULL,
  `AfClientID` bigint(20) unsigned NOT NULL,
  `AfUserID` bigint(20) unsigned NOT NULL,
  `AtLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `AFilterSexual` tinyint(3) DEFAULT NULL,
  `AFilterGender` tinyint(3) DEFAULT NULL,
  `AFilterFacebook` tinyint(3) DEFAULT NULL,
  `AFilterCountry` char(2) DEFAULT NULL,
  `AFilterLanguage` char(2) DEFAULT NULL,
  `AFilterCamera` tinyint(3) DEFAULT NULL,
  `APropertyGender` tinyint(3) DEFAULT NULL,
  `APropertyFacebook` tinyint(3) DEFAULT NULL,
  `APropertyCountry` char(2) DEFAULT NULL,
  `APropertyLanguage1` char(2) DEFAULT NULL,
  `APropertyLanguage2` char(2) DEFAULT NULL,
  `APropertyLanguage3` char(2) DEFAULT NULL,
  `APropertyLanguage4` char(2) DEFAULT NULL,
  `APropertyCamera` tinyint(3) DEFAULT NULL,
  `AfUDP` tinyint(3) DEFAULT NULL,
  `AfSexual` tinyint(3) DEFAULT NULL,
  `AfCredits` int(10) unsigned NOT NULL DEFAULT '0',
  `BfClientID` bigint(20) unsigned NOT NULL,
  `BfUserID` bigint(20) unsigned NOT NULL,
  `BtLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `BFilterSexual` tinyint(3) DEFAULT NULL,
  `BFilterGender` tinyint(3) DEFAULT NULL,
  `BFilterFacebook` tinyint(3) DEFAULT NULL,
  `BFilterCountry` char(2) DEFAULT NULL,
  `BFilterLanguage` char(2) DEFAULT NULL,
  `BFilterCamera` tinyint(3) DEFAULT NULL,
  `BPropertyGender` tinyint(3) DEFAULT NULL,
  `BPropertyFacebook` tinyint(3) DEFAULT NULL,
  `BPropertyCountry` char(2) DEFAULT NULL,
  `BPropertyLanguage1` char(2) DEFAULT NULL,
  `BPropertyLanguage2` char(2) DEFAULT NULL,
  `BPropertyLanguage3` char(2) DEFAULT NULL,
  `BPropertyLanguage4` char(2) DEFAULT NULL,
  `BPropertyCamera` tinyint(3) DEFAULT NULL,
  `BfUDP` tinyint(3) DEFAULT NULL,
  `BfSexual` tinyint(3) DEFAULT NULL,
  `BfCredits` int(10) unsigned NOT NULL DEFAULT '0',
  `tEstablished` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aClients`
--

DROP TABLE IF EXISTS `aClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aClients` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fUserAgent` text NOT NULL,
  `fIP` int(10) unsigned NOT NULL,
  `tConnected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tDisconnected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fQuitCode` varchar(20) NOT NULL DEFAULT '0',
  `fLocation` varchar(45) NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCredits`
--

DROP TABLE IF EXISTS `aCredits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCredits` (
  `fUserID` bigint(20) unsigned NOT NULL COMMENT 'Receiving User',
  `fRating` tinyint(4) NOT NULL,
  `fMean` mediumint(8) NOT NULL COMMENT 'Mean value of subsequent ratings',
  `fCount` mediumint(8) unsigned NOT NULL COMMENT 'Total number of subsequent ratings',
  `fCredits` int(10) unsigned NOT NULL COMMENT 'Number of credits assigned for rating',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tRatingID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aFilterSets`
--

DROP TABLE IF EXISTS `aFilterSets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aFilterSets` (
  `fID` char(20) NOT NULL,
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aLog`
--

DROP TABLE IF EXISTS `aLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aLog` (
  `value` bigint(20) NOT NULL,
  `type` int(10) unsigned NOT NULL,
  `comment` varchar(145) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aRatings`
--

DROP TABLE IF EXISTS `aRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aRatings` (
  `fID` bigint(20) unsigned NOT NULL,
  `fRating` tinyint(3) NOT NULL,
  `tCreated` datetime NOT NULL,
  `fCallID` varchar(50) NOT NULL,
  `fRaterUserID` bigint(20) unsigned NOT NULL,
  `fRateeUserID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aSnapshots`
--

DROP TABLE IF EXISTS `aSnapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aSnapshots` (
  `fID` bigint(20) unsigned NOT NULL,
  `fCallID` varchar(50) NOT NULL,
  `tCreated` bigint(20) unsigned DEFAULT NULL,
  `fFilename` varchar(22) NOT NULL,
  `fAutomatic` tinyint(4) DEFAULT '0',
  `fUserID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `fDeleted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fDeletedByUser` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aUsers`
--

DROP TABLE IF EXISTS `aUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aUsers` (
  `fID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned DEFAULT NULL,
  `tCreated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fCredits` int(10) unsigned DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  `tCreditsUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fTotalCredits` int(10) unsigned DEFAULT '0',
  `fGender` tinyint(4) NOT NULL DEFAULT '0',
  `fFBPermissions` varchar(45) NOT NULL,
  `tDestroyed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tClients`
--

DROP TABLE IF EXISTS `tClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tClients` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAPEpubid` char(32) NOT NULL,
  `tLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL,
  `PropertyGender` tinyint(3) DEFAULT NULL,
  `PropertyFacebook` tinyint(3) DEFAULT NULL,
  `PropertyCountry` char(2) DEFAULT NULL,
  `PropertyLanguage1` char(2) DEFAULT NULL,
  `PropertyLanguage2` char(2) DEFAULT NULL,
  `PropertyLanguage3` char(2) DEFAULT NULL,
  `PropertyLanguage4` char(2) DEFAULT NULL,
  `PropertyCamera` tinyint(3) DEFAULT NULL,
  `fUDP` tinyint(3) DEFAULT NULL,
  `PropertySexual` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`fID`),
  KEY `Available_Index` (`fAvailable`),
  KEY `userid` (`fUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC COMMENT='Client Connections to ape';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tClientsPreArchive`
--

DROP TABLE IF EXISTS `tClientsPreArchive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tClientsPreArchive` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fUserAgent` text NOT NULL,
  `fIP` int(10) unsigned NOT NULL,
  `tConnected` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fLocation` varchar(45) NOT NULL,
  PRIMARY KEY (`fID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tCountries`
--

DROP TABLE IF EXISTS `tCountries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tCountries` (
  `fValue` char(2) NOT NULL,
  `fDescription` varchar(105) NOT NULL,
  PRIMARY KEY (`fValue`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tCredits`
--

DROP TABLE IF EXISTS `tCredits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tCredits` (
  `fUserID` bigint(20) unsigned NOT NULL COMMENT 'Receiving User',
  `fRating` tinyint(4) NOT NULL,
  `fMean` mediumint(8) NOT NULL COMMENT 'Mean value of subsequent ratings',
  `fCount` mediumint(8) unsigned NOT NULL COMMENT 'Total number of subsequent ratings',
  `fCredits` int(10) NOT NULL COMMENT 'Number of credits assigned for rating',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fRatingID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fRatingID`),
  KEY `created` (`tCreated`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterCounts`
--

DROP TABLE IF EXISTS `tFilterCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterCounts` (
  `fID` char(20) NOT NULL,
  `fCount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterCounts2`
--

DROP TABLE IF EXISTS `tFilterCounts2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterCounts2` (
  `fID` char(20) NOT NULL,
  `fCount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterStates`
--

DROP TABLE IF EXISTS `tFilterStates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterStates` (
  `fValue` int(10) NOT NULL,
  PRIMARY KEY (`fValue`)
) ENGINE=MEMORY DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED COMMENT='Conatins all possible numeric, filter reduced property state';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tGeoIP`
--

DROP TABLE IF EXISTS `tGeoIP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tGeoIP` (
  `begin_num` int(10) unsigned NOT NULL,
  `end_num` int(10) unsigned NOT NULL,
  `country` char(2) NOT NULL,
  PRIMARY KEY (`begin_num`) USING BTREE
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tLanguages`
--

DROP TABLE IF EXISTS `tLanguages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tLanguages` (
  `fValue` char(2) NOT NULL,
  `fDescription` varchar(505) NOT NULL,
  PRIMARY KEY (`fValue`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tNexts`
--

DROP TABLE IF EXISTS `tNexts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tNexts` (
  `fNexterClientID` bigint(20) unsigned NOT NULL,
  `fNexteeClientID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fNexteeClientID`,`fNexterClientID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tPendingRatings`
--

DROP TABLE IF EXISTS `tPendingRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tPendingRatings` (
  `fID` bigint(20) unsigned NOT NULL,
  `fRating` tinyint(1) NOT NULL COMMENT 'rated as ''naked'' ?',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fCallID` varchar(50) NOT NULL COMMENT 'The call that this rating happened on',
  `fRaterUserID` bigint(20) unsigned NOT NULL COMMENT 'Indicates if the user who rated was the waiting user in the call',
  `fRateeUserID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fID`),
  KEY `rateeid` (`fRateeUserID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tPossibleCalls`
--

DROP TABLE IF EXISTS `tPossibleCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tPossibleCalls` (
  `AID` bigint(20) unsigned NOT NULL,
  `BID` bigint(20) unsigned NOT NULL,
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Apubid` char(32) NOT NULL,
  `Bpubid` char(32) NOT NULL,
  `ACredits` int(10) unsigned NOT NULL,
  `BCredits` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tRatings`
--

DROP TABLE IF EXISTS `tRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tRatings` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fRating` tinyint(1) NOT NULL COMMENT 'rated as ''naked'' ?',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fCallID` varchar(50) NOT NULL COMMENT 'The call that this rating happened on',
  `fRaterUserID` bigint(20) unsigned NOT NULL COMMENT 'Indicates if the user who rated was the waiting user in the call',
  `fRateeUserID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fID`),
  KEY `created` (`tCreated`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED COMMENT='All rating events, used for credits and nakedness';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tSnapshots`
--

DROP TABLE IF EXISTS `tSnapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tSnapshots` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fCallID` varchar(50) NOT NULL,
  `tCreated` bigint(20) unsigned DEFAULT NULL,
  `fFilename` varchar(43) NOT NULL,
  `fAutomatic` tinyint(4) DEFAULT '0',
  `fUserID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`fID`),
  KEY `user_id_created` (`fUserID`,`tCreated`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tTempClientsForFilterCounts`
--

DROP TABLE IF EXISTS `tTempClientsForFilterCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tTempClientsForFilterCounts` (
  `PropertyGender` tinyint(3) DEFAULT NULL,
  `PropertyFacebook` tinyint(3) DEFAULT NULL,
  `PropertyCountry` char(2) DEFAULT NULL,
  `PropertyLanguage1` char(2) DEFAULT NULL,
  `PropertyLanguage2` char(2) DEFAULT NULL,
  `PropertyLanguage3` char(2) DEFAULT NULL,
  `PropertyLanguage4` char(2) DEFAULT NULL,
  `PropertyCamera` tinyint(3) DEFAULT NULL,
  `fSexual` tinyint(4) DEFAULT '0'
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tTempClientsForFindPartner`
--

DROP TABLE IF EXISTS `tTempClientsForFindPartner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tTempClientsForFindPartner` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAPEpubid` char(32) NOT NULL,
  `tLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL,
  `PropertyGender` tinyint(3) DEFAULT NULL,
  `PropertyFacebook` tinyint(3) DEFAULT NULL,
  `PropertyCountry` char(2) DEFAULT NULL,
  `PropertyLanguage1` char(2) DEFAULT NULL,
  `PropertyLanguage2` char(2) DEFAULT NULL,
  `PropertyLanguage3` char(2) DEFAULT NULL,
  `PropertyLanguage4` char(2) DEFAULT NULL,
  `PropertyCamera` tinyint(3) DEFAULT NULL,
  `fUDP` tinyint(3) DEFAULT NULL,
  `fCredits` int(10) unsigned DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`fID`)
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tUsers`
--

DROP TABLE IF EXISTS `tUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tUsers` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fFacebookID` bigint(20) unsigned DEFAULT NULL,
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fCredits` int(10) unsigned DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  `tCreditsUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fTotalCredits` int(10) DEFAULT '0',
  `fGender` tinyint(4) NOT NULL DEFAULT '0',
  `fFBPermissions` varchar(45) NOT NULL,
  PRIMARY KEY (`fID`),
  UNIQUE KEY `facebookID` (`fFacebookID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `vFindPartner`
--

DROP TABLE IF EXISTS `vFindPartner`;
/*!50001 DROP VIEW IF EXISTS `vFindPartner`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `vFindPartner` (
  `AfID` bigint(20) unsigned,
  `AfUserID` bigint(20) unsigned,
  `Apubid` char(32),
  `AtLastNext` timestamp,
  `AFilterSexual` tinyint(3),
  `AFilterGender` tinyint(3),
  `AFilterFacebook` tinyint(3),
  `AFilterCountry` char(2),
  `AFilterLanguage` char(2),
  `AFilterCamera` tinyint(3),
  `APropertyGender` tinyint(3),
  `APropertyFacebook` tinyint(3),
  `APropertyCountry` char(2),
  `APropertyLanguage1` char(2),
  `APropertyLanguage2` char(2),
  `APropertyLanguage3` char(2),
  `APropertyLanguage4` char(2),
  `APropertyCamera` tinyint(3),
  `AfUDP` tinyint(3),
  `ACredits` int(10) unsigned,
  `AfSexual` tinyint(4),
  `BfID` bigint(20) unsigned,
  `BfUserID` bigint(20) unsigned,
  `Bpubid` char(32),
  `BtLastNext` timestamp,
  `BFilterSexual` tinyint(3),
  `BFilterGender` tinyint(3),
  `BFilterFacebook` tinyint(3),
  `BFilterCountry` char(2),
  `BFilterLanguage` char(2),
  `BFilterCamera` tinyint(3),
  `BPropertyGender` tinyint(3),
  `BPropertyFacebook` tinyint(3),
  `BPropertyCountry` char(2),
  `BPropertyLanguage1` char(2),
  `BPropertyLanguage2` char(2),
  `BPropertyLanguage3` char(2),
  `BPropertyLanguage4` char(2),
  `BPropertyCamera` tinyint(3),
  `BfUDP` tinyint(3),
  `BCredits` int(10) unsigned,
  `BfSexual` tinyint(4)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `peekAttackDev1`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `peekAttackDev1` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `peekAttackDev1`;

--
-- Table structure for table `GeoIpImport`
--

DROP TABLE IF EXISTS `GeoIpImport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GeoIpImport` (
  `begin_ip` text NOT NULL,
  `end_ip` text NOT NULL,
  `begin_num` int(11) unsigned NOT NULL,
  `end_num` int(11) unsigned NOT NULL,
  `country` char(2) NOT NULL,
  `name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ISO6393`
--

DROP TABLE IF EXISTS `ISO6393`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ISO6393` (
  `Id` char(3) NOT NULL,
  `Part2B` char(3) DEFAULT NULL,
  `Part2T` char(3) DEFAULT NULL,
  `Part1` char(2) DEFAULT NULL,
  `Scope` char(1) NOT NULL,
  `Type` char(1) NOT NULL,
  `Ref_Name` varchar(150) NOT NULL,
  `Comment` varchar(150) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCallTermination`
--

DROP TABLE IF EXISTS `aCallTermination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCallTermination` (
  `fCallID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAction` varchar(45) NOT NULL,
  `tTermination` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fClientID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCalls`
--

DROP TABLE IF EXISTS `aCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCalls` (
  `fID` bigint(20) unsigned NOT NULL,
  `AfClientID` bigint(20) unsigned NOT NULL,
  `AfUserID` bigint(20) unsigned NOT NULL,
  `AtLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `AfAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `AFilterSexual` tinyint(3) DEFAULT NULL,
  `AFilterGender` tinyint(3) DEFAULT NULL,
  `AFilterFacebook` tinyint(3) DEFAULT NULL,
  `AFilterCountry` char(2) DEFAULT NULL,
  `AFilterLanguage` char(2) DEFAULT NULL,
  `AFilterCamera` tinyint(3) DEFAULT NULL,
  `APropertyGender` tinyint(3) DEFAULT NULL,
  `APropertyFacebook` tinyint(3) DEFAULT NULL,
  `APropertyCountry` char(2) DEFAULT NULL,
  `APropertyLanguage1` char(2) DEFAULT NULL,
  `APropertyLanguage2` char(2) DEFAULT NULL,
  `APropertyLanguage3` char(2) DEFAULT NULL,
  `APropertyLanguage4` char(2) DEFAULT NULL,
  `APropertyCamera` tinyint(3) DEFAULT NULL,
  `AfUDP` tinyint(3) DEFAULT NULL,
  `AfSexual` tinyint(3) DEFAULT NULL,
  `AfCredits` int(10) unsigned NOT NULL DEFAULT '0',
  `BfClientID` bigint(20) unsigned NOT NULL,
  `BfUserID` bigint(20) unsigned NOT NULL,
  `BtLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `BfAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `BFilterSexual` tinyint(3) DEFAULT NULL,
  `BFilterGender` tinyint(3) DEFAULT NULL,
  `BFilterFacebook` tinyint(3) DEFAULT NULL,
  `BFilterCountry` char(2) DEFAULT NULL,
  `BFilterLanguage` char(2) DEFAULT NULL,
  `BFilterCamera` tinyint(3) DEFAULT NULL,
  `BPropertyGender` tinyint(3) DEFAULT NULL,
  `BPropertyFacebook` tinyint(3) DEFAULT NULL,
  `BPropertyCountry` char(2) DEFAULT NULL,
  `BPropertyLanguage1` char(2) DEFAULT NULL,
  `BPropertyLanguage2` char(2) DEFAULT NULL,
  `BPropertyLanguage3` char(2) DEFAULT NULL,
  `BPropertyLanguage4` char(2) DEFAULT NULL,
  `BPropertyCamera` tinyint(3) DEFAULT NULL,
  `BfUDP` tinyint(3) DEFAULT NULL,
  `BfSexual` tinyint(3) DEFAULT NULL,
  `BfCredits` int(10) unsigned NOT NULL DEFAULT '0',
  `tEstablished` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aClients`
--

DROP TABLE IF EXISTS `aClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aClients` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fUserAgent` text NOT NULL,
  `fIP` int(10) unsigned NOT NULL,
  `tConnected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tDisconnected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fQuitCode` varchar(20) NOT NULL DEFAULT '0',
  `fLocation` varchar(45) NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCredits`
--

DROP TABLE IF EXISTS `aCredits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCredits` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL COMMENT 'Receiving User',
  `fRating` tinyint(4) NOT NULL,
  `fMean` mediumint(8) NOT NULL COMMENT 'Mean value of subsequent ratings',
  `fCount` mediumint(8) unsigned NOT NULL COMMENT 'Total number of subsequent ratings',
  `fCredits` int(10) unsigned NOT NULL COMMENT 'Number of credits assigned for rating',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tRatingID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aFilterSets`
--

DROP TABLE IF EXISTS `aFilterSets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aFilterSets` (
  `fID` char(20) NOT NULL,
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aRatings`
--

DROP TABLE IF EXISTS `aRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aRatings` (
  `fID` bigint(20) unsigned NOT NULL,
  `fRating` tinyint(3) NOT NULL,
  `tCreated` datetime NOT NULL,
  `fCallID` bigint(20) unsigned NOT NULL,
  `fRaterUserID` bigint(20) unsigned NOT NULL,
  `fRateeUserID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aSnapshots`
--

DROP TABLE IF EXISTS `aSnapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aSnapshots` (
  `fID` bigint(20) unsigned NOT NULL,
  `fCallID` bigint(20) unsigned NOT NULL,
  `tCreated` bigint(20) unsigned DEFAULT NULL,
  `fFilename` varchar(22) NOT NULL,
  `fAutomatic` tinyint(4) DEFAULT '0',
  `fUserID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `fDeleted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fDeletedByUser` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aUsers`
--

DROP TABLE IF EXISTS `aUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aUsers` (
  `fID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned DEFAULT NULL,
  `tCreated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fCredits` int(10) unsigned DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  `tCreditsUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fTotalCredits` int(10) unsigned DEFAULT '0',
  `fGender` tinyint(4) NOT NULL DEFAULT '0',
  `fFBPermissions` varchar(45) NOT NULL,
  `tDestroyed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tClients`
--

DROP TABLE IF EXISTS `tClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tClients` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAPEpubid` char(32) NOT NULL,
  `fRTMInfo` varchar(64) NOT NULL,
  `tLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL,
  `PropertyGender` tinyint(3) DEFAULT NULL,
  `PropertyFacebook` tinyint(3) DEFAULT NULL,
  `PropertyCountry` char(2) DEFAULT NULL,
  `PropertyLanguage1` char(2) DEFAULT NULL,
  `PropertyLanguage2` char(2) DEFAULT NULL,
  `PropertyLanguage3` char(2) DEFAULT NULL,
  `PropertyLanguage4` char(2) DEFAULT NULL,
  `PropertyCamera` tinyint(3) DEFAULT NULL,
  `fUDP` tinyint(3) DEFAULT NULL,
  `fLastPartnerId` bigint(20) unsigned DEFAULT '0',
  PRIMARY KEY (`fID`),
  KEY `Available_Index` (`fAvailable`),
  KEY `FindPartner_Index` (`FilterGender`,`FilterFacebook`,`FilterCountry`,`FilterCamera`,`PropertyGender`,`PropertyFacebook`,`PropertyCountry`,`PropertyLanguage1`,`PropertyLanguage2`,`PropertyLanguage3`,`PropertyLanguage4`,`PropertyCamera`,`FilterSexual`,`FilterLanguage`,`fLastPartnerId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED COMMENT='Client Connections to ape';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tClientsPreArchive`
--

DROP TABLE IF EXISTS `tClientsPreArchive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tClientsPreArchive` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fUserAgent` text NOT NULL,
  `fIP` int(10) unsigned NOT NULL,
  `tConnected` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fLocation` varchar(45) NOT NULL,
  PRIMARY KEY (`fID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tCountries`
--

DROP TABLE IF EXISTS `tCountries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tCountries` (
  `fValue` char(2) NOT NULL,
  `fDescription` varchar(105) NOT NULL,
  PRIMARY KEY (`fValue`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tCredits`
--

DROP TABLE IF EXISTS `tCredits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tCredits` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fUserID` bigint(20) unsigned NOT NULL COMMENT 'Receiving User',
  `fRating` tinyint(4) NOT NULL,
  `fMean` mediumint(8) NOT NULL COMMENT 'Mean value of subsequent ratings',
  `fCount` mediumint(8) unsigned NOT NULL COMMENT 'Total number of subsequent ratings',
  `fCredits` int(10) unsigned NOT NULL COMMENT 'Number of credits assigned for rating',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fRatingID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterCounts`
--

DROP TABLE IF EXISTS `tFilterCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterCounts` (
  `fID` char(20) NOT NULL,
  `fCount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterCounts2`
--

DROP TABLE IF EXISTS `tFilterCounts2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterCounts2` (
  `fID` char(20) NOT NULL,
  `fCount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterStates`
--

DROP TABLE IF EXISTS `tFilterStates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterStates` (
  `fValue` int(10) NOT NULL,
  PRIMARY KEY (`fValue`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Conatins all possible numeric, filter reduced property state';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tGeoIP`
--

DROP TABLE IF EXISTS `tGeoIP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tGeoIP` (
  `begin_num` int(10) unsigned NOT NULL,
  `end_num` int(10) unsigned NOT NULL,
  `country` char(2) NOT NULL,
  PRIMARY KEY (`begin_num`) USING BTREE
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tLanguages`
--

DROP TABLE IF EXISTS `tLanguages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tLanguages` (
  `fValue` char(2) NOT NULL,
  `fDescription` varchar(505) NOT NULL,
  PRIMARY KEY (`fValue`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tMatches`
--

DROP TABLE IF EXISTS `tMatches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tMatches` (
  `AfClientID` bigint(20) unsigned NOT NULL,
  `BfClientID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`BfClientID`,`AfClientID`)
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tNexts`
--

DROP TABLE IF EXISTS `tNexts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tNexts` (
  `fNexterClientID` bigint(20) unsigned NOT NULL,
  `fNexteeClientID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fNexteeClientID`,`fNexterClientID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tPendingRatings`
--

DROP TABLE IF EXISTS `tPendingRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tPendingRatings` (
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fRating` tinyint(3) unsigned NOT NULL,
  `fRateeUserID` bigint(20) unsigned NOT NULL,
  KEY `Index_1` (`tCreated`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tPossibleCalls`
--

DROP TABLE IF EXISTS `tPossibleCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tPossibleCalls` (
  `AID` bigint(20) unsigned NOT NULL,
  `BID` bigint(20) unsigned NOT NULL,
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Apubid` char(32) NOT NULL,
  `Bpubid` char(32) NOT NULL,
  `ACredits` int(10) unsigned NOT NULL,
  `BCredits` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tRatings`
--

DROP TABLE IF EXISTS `tRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tRatings` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fRating` tinyint(1) NOT NULL COMMENT 'rated as ''naked'' ?',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fCallID` bigint(20) unsigned NOT NULL COMMENT 'The call that this rating happened on',
  `fRaterUserID` bigint(20) unsigned NOT NULL COMMENT 'Indicates if the user who rated was the waiting user in the call',
  `fRateeUserID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='All rating events, used for credits and nakedness';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tSnapshots`
--

DROP TABLE IF EXISTS `tSnapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tSnapshots` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fCallID` bigint(20) unsigned NOT NULL,
  `tCreated` bigint(20) unsigned DEFAULT NULL,
  `fFilename` varchar(43) NOT NULL,
  `fAutomatic` tinyint(4) DEFAULT '0',
  `fUserID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`fID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tUsers`
--

DROP TABLE IF EXISTS `tUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tUsers` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fFacebookID` bigint(20) unsigned DEFAULT NULL,
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fCredits` int(10) unsigned DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  `tCreditsUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fTotalCredits` int(10) unsigned DEFAULT '0',
  `fGender` tinyint(4) NOT NULL DEFAULT '0',
  `fFBPermissions` varchar(45) NOT NULL,
  PRIMARY KEY (`fID`),
  UNIQUE KEY `facebookID` (`fFacebookID`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `vFilterCounts`
--

DROP TABLE IF EXISTS `vFilterCounts`;
/*!50001 DROP VIEW IF EXISTS `vFilterCounts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `vFilterCounts` (
  `fID` varbinary(53),
  `fCount` bigint(21)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vMatches`
--

DROP TABLE IF EXISTS `vMatches`;
/*!50001 DROP VIEW IF EXISTS `vMatches`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `vMatches` (
  `fCID` bigint(20) unsigned,
  `fID` bigint(20) unsigned,
  `fUserID` bigint(20) unsigned,
  `fAPEpubid` char(32),
  `fRTMInfo` varchar(64),
  `tLastNext` timestamp,
  `fAvailable` tinyint(1),
  `FilterSexual` tinyint(3),
  `FilterGender` tinyint(3),
  `FilterFacebook` tinyint(3),
  `FilterCountry` char(2),
  `FilterLanguage` char(2),
  `FilterCamera` tinyint(3),
  `PropertyGender` tinyint(3),
  `PropertyFacebook` tinyint(3),
  `PropertyCountry` char(2),
  `PropertyLanguage1` char(2),
  `PropertyLanguage2` char(2),
  `PropertyLanguage3` char(2),
  `PropertyLanguage4` char(2),
  `PropertyCamera` tinyint(3),
  `fUDP` tinyint(3),
  `fLastPartnerId` bigint(20) unsigned,
  `fCredits` int(10) unsigned
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `peekAttackLive`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `peekAttackLive` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `peekAttackLive`;

--
-- Table structure for table `Debug`
--

DROP TABLE IF EXISTS `Debug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Debug` (
  `tablename` varchar(45) NOT NULL,
  `rowcount` int(10) unsigned NOT NULL,
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`fID`)
) ENGINE=ARCHIVE AUTO_INCREMENT=37930 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GeoIpImport`
--

DROP TABLE IF EXISTS `GeoIpImport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GeoIpImport` (
  `begin_ip` text NOT NULL,
  `end_ip` text NOT NULL,
  `begin_num` int(11) unsigned NOT NULL,
  `end_num` int(11) unsigned NOT NULL,
  `country` char(2) NOT NULL,
  `name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ISO6393`
--

DROP TABLE IF EXISTS `ISO6393`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ISO6393` (
  `Id` char(3) NOT NULL,
  `Part2B` char(3) DEFAULT NULL,
  `Part2T` char(3) DEFAULT NULL,
  `Part1` char(2) DEFAULT NULL,
  `Scope` char(1) NOT NULL,
  `Type` char(1) NOT NULL,
  `Ref_Name` varchar(150) NOT NULL,
  `Comment` varchar(150) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCallTermination`
--

DROP TABLE IF EXISTS `aCallTermination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCallTermination` (
  `fCallID` varchar(50) NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAction` varchar(45) NOT NULL,
  `tTermination` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fClientID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCalls`
--

DROP TABLE IF EXISTS `aCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCalls` (
  `fID` varchar(50) NOT NULL,
  `AfClientID` bigint(20) unsigned NOT NULL,
  `AfUserID` bigint(20) unsigned NOT NULL,
  `AtLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `AFilterSexual` tinyint(3) DEFAULT NULL,
  `AFilterGender` tinyint(3) DEFAULT NULL,
  `AFilterFacebook` tinyint(3) DEFAULT NULL,
  `AFilterCountry` char(2) DEFAULT NULL,
  `AFilterLanguage` char(2) DEFAULT NULL,
  `AFilterCamera` tinyint(3) DEFAULT NULL,
  `APropertyGender` tinyint(3) DEFAULT NULL,
  `APropertyFacebook` tinyint(3) DEFAULT NULL,
  `APropertyCountry` char(2) DEFAULT NULL,
  `APropertyLanguage1` char(2) DEFAULT NULL,
  `APropertyLanguage2` char(2) DEFAULT NULL,
  `APropertyLanguage3` char(2) DEFAULT NULL,
  `APropertyLanguage4` char(2) DEFAULT NULL,
  `APropertyCamera` tinyint(3) DEFAULT NULL,
  `AfUDP` tinyint(3) DEFAULT NULL,
  `AfSexual` tinyint(3) DEFAULT NULL,
  `AfCredits` int(10) NOT NULL DEFAULT '0',
  `BfClientID` bigint(20) unsigned NOT NULL,
  `BfUserID` bigint(20) unsigned NOT NULL,
  `BtLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `BFilterSexual` tinyint(3) DEFAULT NULL,
  `BFilterGender` tinyint(3) DEFAULT NULL,
  `BFilterFacebook` tinyint(3) DEFAULT NULL,
  `BFilterCountry` char(2) DEFAULT NULL,
  `BFilterLanguage` char(2) DEFAULT NULL,
  `BFilterCamera` tinyint(3) DEFAULT NULL,
  `BPropertyGender` tinyint(3) DEFAULT NULL,
  `BPropertyFacebook` tinyint(3) DEFAULT NULL,
  `BPropertyCountry` char(2) DEFAULT NULL,
  `BPropertyLanguage1` char(2) DEFAULT NULL,
  `BPropertyLanguage2` char(2) DEFAULT NULL,
  `BPropertyLanguage3` char(2) DEFAULT NULL,
  `BPropertyLanguage4` char(2) DEFAULT NULL,
  `BPropertyCamera` tinyint(3) DEFAULT NULL,
  `BfUDP` tinyint(3) DEFAULT NULL,
  `BfSexual` tinyint(3) DEFAULT NULL,
  `BfCredits` int(10) NOT NULL DEFAULT '0',
  `tEstablished` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aClients`
--

DROP TABLE IF EXISTS `aClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aClients` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fUserAgent` text NOT NULL,
  `fIP` int(10) unsigned NOT NULL,
  `tConnected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `tDisconnected` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fQuitCode` varchar(20) NOT NULL DEFAULT '0',
  `fLocation` varchar(45) NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aCredits`
--

DROP TABLE IF EXISTS `aCredits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aCredits` (
  `fUserID` bigint(20) unsigned NOT NULL COMMENT 'Receiving User',
  `fRating` tinyint(4) NOT NULL,
  `fMean` mediumint(8) NOT NULL COMMENT 'Mean value of subsequent ratings',
  `fCount` mediumint(8) unsigned NOT NULL COMMENT 'Total number of subsequent ratings',
  `fCredits` int(10) NOT NULL COMMENT 'Number of credits assigned for rating',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tRatingID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aFilterSets`
--

DROP TABLE IF EXISTS `aFilterSets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aFilterSets` (
  `fID` char(20) NOT NULL,
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aLog`
--

DROP TABLE IF EXISTS `aLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aLog` (
  `value` bigint(20) NOT NULL,
  `type` int(10) unsigned NOT NULL,
  `comment` varchar(145) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aRatings`
--

DROP TABLE IF EXISTS `aRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aRatings` (
  `fID` bigint(20) unsigned NOT NULL,
  `fRating` tinyint(3) NOT NULL,
  `tCreated` datetime NOT NULL,
  `fCallID` varchar(50) NOT NULL,
  `fRaterUserID` bigint(20) unsigned NOT NULL,
  `fRateeUserID` bigint(20) unsigned NOT NULL
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aSnapshots`
--

DROP TABLE IF EXISTS `aSnapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aSnapshots` (
  `fID` bigint(20) unsigned NOT NULL,
  `fCallID` varchar(50) NOT NULL,
  `tCreated` bigint(20) DEFAULT NULL,
  `fFilename` varchar(22) NOT NULL,
  `fAutomatic` tinyint(4) DEFAULT '0',
  `fUserID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `fDeleted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fDeletedByUser` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aUsers`
--

DROP TABLE IF EXISTS `aUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aUsers` (
  `fID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned DEFAULT NULL,
  `tCreated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fCredits` int(10) DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  `tCreditsUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fTotalCredits` int(10) DEFAULT '0',
  `fGender` tinyint(4) NOT NULL DEFAULT '0',
  `fFBPermissions` varchar(45) NOT NULL,
  `tDestroyed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fu`
--

DROP TABLE IF EXISTS `fu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fu` (
  `fID` varchar(50) NOT NULL,
  KEY `Index_1` (`fID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tClients`
--

DROP TABLE IF EXISTS `tClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tClients` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAPEpubid` char(32) NOT NULL,
  `tLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL,
  `PropertyGender` tinyint(3) DEFAULT NULL,
  `PropertyFacebook` tinyint(3) DEFAULT NULL,
  `PropertyCountry` char(2) DEFAULT NULL,
  `PropertyLanguage1` char(2) DEFAULT NULL,
  `PropertyLanguage2` char(2) DEFAULT NULL,
  `PropertyLanguage3` char(2) DEFAULT NULL,
  `PropertyLanguage4` char(2) DEFAULT NULL,
  `PropertyCamera` tinyint(3) DEFAULT NULL,
  `fUDP` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`fID`),
  KEY `Available_Index` (`fAvailable`),
  KEY `userid` (`fUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=21227416 DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED COMMENT='Client Connections to ape';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tClientsPreArchive`
--

DROP TABLE IF EXISTS `tClientsPreArchive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tClientsPreArchive` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fUserAgent` text NOT NULL,
  `fIP` int(10) unsigned NOT NULL,
  `tConnected` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fLocation` varchar(45) NOT NULL,
  PRIMARY KEY (`fID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tCountries`
--

DROP TABLE IF EXISTS `tCountries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tCountries` (
  `fValue` char(2) NOT NULL,
  `fDescription` varchar(105) NOT NULL,
  PRIMARY KEY (`fValue`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tCredits`
--

DROP TABLE IF EXISTS `tCredits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tCredits` (
  `fUserID` bigint(20) unsigned NOT NULL COMMENT 'Receiving User',
  `fRating` tinyint(4) NOT NULL,
  `fMean` mediumint(8) NOT NULL COMMENT 'Mean value of subsequent ratings',
  `fCount` mediumint(8) unsigned NOT NULL COMMENT 'Total number of subsequent ratings',
  `fCredits` int(10) NOT NULL COMMENT 'Number of credits assigned for rating',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fRatingID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fRatingID`),
  KEY `created` (`tCreated`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterCounts`
--

DROP TABLE IF EXISTS `tFilterCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterCounts` (
  `fID` char(20) NOT NULL,
  `fCount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tFilterCounts2`
--

DROP TABLE IF EXISTS `tFilterCounts2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tFilterCounts2` (
  `fID` char(20) NOT NULL,
  `fCount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tGeoIP`
--

DROP TABLE IF EXISTS `tGeoIP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tGeoIP` (
  `begin_num` int(10) unsigned NOT NULL,
  `end_num` int(10) unsigned NOT NULL,
  `country` char(2) NOT NULL,
  PRIMARY KEY (`begin_num`) USING BTREE
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tLanguages`
--

DROP TABLE IF EXISTS `tLanguages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tLanguages` (
  `fValue` char(2) NOT NULL,
  `fDescription` varchar(505) NOT NULL,
  PRIMARY KEY (`fValue`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tNexts`
--

DROP TABLE IF EXISTS `tNexts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tNexts` (
  `fNexterClientID` bigint(20) unsigned NOT NULL,
  `fNexteeClientID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fNexteeClientID`,`fNexterClientID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tPendingRatings`
--

DROP TABLE IF EXISTS `tPendingRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tPendingRatings` (
  `fID` bigint(20) unsigned NOT NULL,
  `fRating` tinyint(1) NOT NULL COMMENT 'rated as ''naked'' ?',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fCallID` varchar(50) NOT NULL COMMENT 'The call that this rating happened on',
  `fRaterUserID` bigint(20) unsigned NOT NULL COMMENT 'Indicates if the user who rated was the waiting user in the call',
  `fRateeUserID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fID`),
  KEY `rateeid` (`fRateeUserID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tPossibleCalls`
--

DROP TABLE IF EXISTS `tPossibleCalls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tPossibleCalls` (
  `AID` bigint(20) unsigned NOT NULL,
  `BID` bigint(20) unsigned NOT NULL,
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Apubid` char(32) NOT NULL,
  `Bpubid` char(32) NOT NULL,
  `ACredits` int(10) NOT NULL,
  `BCredits` int(10) NOT NULL,
  PRIMARY KEY (`fID`) USING HASH
) ENGINE=MEMORY DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tRatings`
--

DROP TABLE IF EXISTS `tRatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tRatings` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fRating` tinyint(1) NOT NULL COMMENT 'rated as ''naked'' ?',
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fCallID` varchar(50) NOT NULL COMMENT 'The call that this rating happened on',
  `fRaterUserID` bigint(20) unsigned NOT NULL COMMENT 'Indicates if the user who rated was the waiting user in the call',
  `fRateeUserID` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`fID`),
  KEY `created` (`tCreated`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1279615 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED COMMENT='All rating events, used for credits and nakedness';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tSnapshots`
--

DROP TABLE IF EXISTS `tSnapshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tSnapshots` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fCallID` varchar(50) NOT NULL,
  `tCreated` bigint(20) unsigned DEFAULT NULL,
  `fFilename` varchar(43) NOT NULL,
  `fAutomatic` tinyint(4) DEFAULT '0',
  `fUserID` bigint(20) unsigned NOT NULL,
  `fFacebookID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `tCreatedServertime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`fID`),
  KEY `user_id_created` (`fUserID`,`tCreated`),
  KEY `Index_3` (`fCallID`)
) ENGINE=InnoDB AUTO_INCREMENT=109988 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tTempClientsForFilterCounts`
--

DROP TABLE IF EXISTS `tTempClientsForFilterCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tTempClientsForFilterCounts` (
  `PropertyGender` tinyint(3) DEFAULT NULL,
  `PropertyFacebook` tinyint(3) DEFAULT NULL,
  `PropertyCountry` char(2) DEFAULT NULL,
  `PropertyLanguage1` char(2) DEFAULT NULL,
  `PropertyLanguage2` char(2) DEFAULT NULL,
  `PropertyLanguage3` char(2) DEFAULT NULL,
  `PropertyLanguage4` char(2) DEFAULT NULL,
  `PropertyCamera` tinyint(3) DEFAULT NULL,
  `fSexual` tinyint(4) DEFAULT '0'
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tTempClientsForFindPartner`
--

DROP TABLE IF EXISTS `tTempClientsForFindPartner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tTempClientsForFindPartner` (
  `fID` bigint(20) unsigned NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `fAPEpubid` char(32) NOT NULL,
  `tLastNext` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fAvailable` tinyint(1) NOT NULL DEFAULT '0',
  `FilterSexual` tinyint(3) DEFAULT NULL,
  `FilterGender` tinyint(3) DEFAULT NULL,
  `FilterFacebook` tinyint(3) DEFAULT NULL,
  `FilterCountry` char(2) DEFAULT NULL,
  `FilterLanguage` char(2) DEFAULT NULL,
  `FilterCamera` tinyint(3) DEFAULT NULL,
  `PropertyGender` tinyint(3) DEFAULT NULL,
  `PropertyFacebook` tinyint(3) DEFAULT NULL,
  `PropertyCountry` char(2) DEFAULT NULL,
  `PropertyLanguage1` char(2) DEFAULT NULL,
  `PropertyLanguage2` char(2) DEFAULT NULL,
  `PropertyLanguage3` char(2) DEFAULT NULL,
  `PropertyLanguage4` char(2) DEFAULT NULL,
  `PropertyCamera` tinyint(3) DEFAULT NULL,
  `fUDP` tinyint(3) DEFAULT NULL,
  `fCredits` int(10) unsigned DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`fID`)
) ENGINE=MEMORY DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tUsers`
--

DROP TABLE IF EXISTS `tUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tUsers` (
  `fID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fFacebookID` bigint(20) unsigned DEFAULT NULL,
  `tCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fCredits` int(10) DEFAULT '0',
  `fSexual` tinyint(4) DEFAULT '0',
  `tCreditsUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fTotalCredits` int(10) DEFAULT '0',
  `fGender` tinyint(4) NOT NULL DEFAULT '0',
  `fFBPermissions` varchar(45) NOT NULL,
  PRIMARY KEY (`fID`),
  UNIQUE KEY `facebookID` (`fFacebookID`)
) ENGINE=InnoDB AUTO_INCREMENT=442884 DEFAULT CHARSET=latin1 ROW_FORMAT=FIXED;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `test1`
--

DROP TABLE IF EXISTS `test1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test1` (
  `fFilename` varchar(43) NOT NULL,
  `fUserID` bigint(20) unsigned NOT NULL,
  `tCreatedServertime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `vFindPartner`
--

DROP TABLE IF EXISTS `vFindPartner`;
/*!50001 DROP VIEW IF EXISTS `vFindPartner`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `vFindPartner` (
  `AfID` bigint(20) unsigned,
  `AfUserID` bigint(20) unsigned,
  `Apubid` char(32),
  `AtLastNext` timestamp,
  `AFilterSexual` tinyint(3),
  `AFilterGender` tinyint(3),
  `AFilterFacebook` tinyint(3),
  `AFilterCountry` char(2),
  `AFilterLanguage` char(2),
  `AFilterCamera` tinyint(3),
  `APropertyGender` tinyint(3),
  `APropertyFacebook` tinyint(3),
  `APropertyCountry` char(2),
  `APropertyLanguage1` char(2),
  `APropertyLanguage2` char(2),
  `APropertyLanguage3` char(2),
  `APropertyLanguage4` char(2),
  `APropertyCamera` tinyint(3),
  `AfUDP` tinyint(3),
  `ACredits` int(10),
  `AfSexual` tinyint(4),
  `BfID` bigint(20) unsigned,
  `BfUserID` bigint(20) unsigned,
  `Bpubid` char(32),
  `BtLastNext` timestamp,
  `BFilterSexual` tinyint(3),
  `BFilterGender` tinyint(3),
  `BFilterFacebook` tinyint(3),
  `BFilterCountry` char(2),
  `BFilterLanguage` char(2),
  `BFilterCamera` tinyint(3),
  `BPropertyGender` tinyint(3),
  `BPropertyFacebook` tinyint(3),
  `BPropertyCountry` char(2),
  `BPropertyLanguage1` char(2),
  `BPropertyLanguage2` char(2),
  `BPropertyLanguage3` char(2),
  `BPropertyLanguage4` char(2),
  `BPropertyCamera` tinyint(3),
  `BfUDP` tinyint(3),
  `BCredits` int(10),
  `BfSexual` tinyint(4)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vTempClientsForFilterCounts`
--

DROP TABLE IF EXISTS `vTempClientsForFilterCounts`;
/*!50001 DROP VIEW IF EXISTS `vTempClientsForFilterCounts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `vTempClientsForFilterCounts` (
  `PropertyGender` tinyint(3),
  `PropertyFacebook` tinyint(3),
  `PropertyCountry` char(2),
  `PropertyLanguage1` char(2),
  `PropertyLanguage2` char(2),
  `PropertyLanguage3` char(2),
  `PropertyLanguage4` char(2),
  `PropertyCamera` tinyint(3),
  `fSexual` tinyint(4)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `peekAttack`
--

USE `peekAttack`;

--
-- Final view structure for view `vFilterCounts`
--

/*!50001 DROP TABLE `vFilterCounts`*/;
/*!50001 DROP VIEW IF EXISTS `vFilterCounts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vFilterCounts` AS select sql_no_cache concat(`f`.`fValue`,';',`ca`.`fValue`,';',`l`.`fValue`,';',`co`.`fValue`,';',`s`.`fValue`,';',`g`.`fValue`) AS `fID`,count(`p`.`fID`) AS `fCount` from (((((((`tClients` `p` join `tUsers` `u` on((`p`.`fUserID` = `u`.`fID`))) join `tFilterStates` `g` on(((`g`.`fValue` = `p`.`PropertyGender`) or (not(`g`.`fValue`))))) join `tFilterStates` `s` on((((`s`.`fValue` = 1) and (`u`.`fSexual` >= 0)) or ((`s`.`fValue` = -(1)) and (`u`.`fSexual` <= 0)) or (not(`s`.`fValue`))))) join `tFilterStates` `f` on(((`p`.`PropertyFacebook` and (`f`.`fValue` = 1)) or (not(`f`.`fValue`))))) join `tCountries` `co` on(((`co`.`fValue` = `p`.`PropertyCountry`) or (`co`.`fValue` = '0')))) join `tLanguages` `l` on(((`p`.`PropertyLanguage1` = `l`.`fValue`) or (`p`.`PropertyLanguage2` = `l`.`fValue`) or (`p`.`PropertyLanguage3` = `l`.`fValue`) or (`p`.`PropertyLanguage4` = `l`.`fValue`) or (`l`.`fValue` = '0')))) join `tFilterStates` `ca` on((((`ca`.`fValue` = 1) and (`p`.`PropertyCamera` = 1)) or ((`ca`.`fValue` = -(1)) and (`p`.`PropertyCamera` = 0)) or (not(`ca`.`fValue`))))) group by `l`.`fValue`,`co`.`fValue`,`ca`.`fValue`,`f`.`fValue`,`s`.`fValue`,`g`.`fValue` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vMatches`
--

/*!50001 DROP TABLE `vMatches`*/;
/*!50001 DROP VIEW IF EXISTS `vMatches`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vMatches` AS select `f`.`fID` AS `fCID`,`p`.`fID` AS `fID`,`p`.`fUserID` AS `fUserID`,`p`.`fAPEpubid` AS `fAPEpubid`,`p`.`fRTMInfo` AS `fRTMInfo`,`p`.`tLastNext` AS `tLastNext`,`p`.`fAvailable` AS `fAvailable`,`p`.`FilterSexual` AS `FilterSexual`,`p`.`FilterGender` AS `FilterGender`,`p`.`FilterFacebook` AS `FilterFacebook`,`p`.`FilterCountry` AS `FilterCountry`,`p`.`FilterLanguage` AS `FilterLanguage`,`p`.`FilterCamera` AS `FilterCamera`,`p`.`PropertyGender` AS `PropertyGender`,`p`.`PropertyFacebook` AS `PropertyFacebook`,`p`.`PropertyCountry` AS `PropertyCountry`,`p`.`PropertyLanguage1` AS `PropertyLanguage1`,`p`.`PropertyLanguage2` AS `PropertyLanguage2`,`p`.`PropertyLanguage3` AS `PropertyLanguage3`,`p`.`PropertyLanguage4` AS `PropertyLanguage4`,`p`.`PropertyCamera` AS `PropertyCamera`,`p`.`fUDP` AS `fUDP`,`p`.`fLastPartnerId` AS `fLastPartnerId`,`u`.`fCredits` AS `fCredits` from ((`tClients` `f` join `tClients` `p`) join `tUsers` `u` on(((`p`.`fUserID` = `u`.`fID`) and ((`f`.`FilterGender` = `p`.`PropertyGender`) or (not(`f`.`FilterGender`))) and (((`f`.`FilterSexual` = 1) and (`u`.`fSexual` >= 0)) or ((`f`.`FilterSexual` = -(1)) and (`u`.`fSexual` <= 0)) or (not(`f`.`FilterSexual`))) and (`p`.`PropertyFacebook` or (not(`f`.`FilterFacebook`))) and ((`f`.`FilterCountry` = `p`.`PropertyCountry`) or (`f`.`FilterCountry` = '0')) and ((`p`.`PropertyLanguage1` = `f`.`FilterLanguage`) or (`p`.`PropertyLanguage2` = `f`.`FilterLanguage`) or (`p`.`PropertyLanguage3` = `f`.`FilterLanguage`) or (`p`.`PropertyLanguage4` = `f`.`FilterLanguage`) or (`f`.`FilterLanguage` = '0')) and (((`f`.`FilterCamera` = 1) and (`p`.`PropertyCamera` = 1)) or ((`f`.`FilterCamera` = -(1)) and (`p`.`PropertyCamera` = 0)) or (not(`f`.`FilterCamera`)))))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Current Database: `peekAttackBeforeLive`
--

USE `peekAttackBeforeLive`;

--
-- Final view structure for view `vFindPartner`
--

/*!50001 DROP TABLE `vFindPartner`*/;
/*!50001 DROP VIEW IF EXISTS `vFindPartner`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vFindPartner` AS select `A`.`fID` AS `AfID`,`A`.`fUserID` AS `AfUserID`,`A`.`fAPEpubid` AS `Apubid`,`A`.`tLastNext` AS `AtLastNext`,`A`.`FilterSexual` AS `AFilterSexual`,`A`.`FilterGender` AS `AFilterGender`,`A`.`FilterFacebook` AS `AFilterFacebook`,`A`.`FilterCountry` AS `AFilterCountry`,`A`.`FilterLanguage` AS `AFilterLanguage`,`A`.`FilterCamera` AS `AFilterCamera`,`A`.`PropertyGender` AS `APropertyGender`,`A`.`PropertyFacebook` AS `APropertyFacebook`,`A`.`PropertyCountry` AS `APropertyCountry`,`A`.`PropertyLanguage1` AS `APropertyLanguage1`,`A`.`PropertyLanguage2` AS `APropertyLanguage2`,`A`.`PropertyLanguage3` AS `APropertyLanguage3`,`A`.`PropertyLanguage4` AS `APropertyLanguage4`,`A`.`PropertyCamera` AS `APropertyCamera`,`A`.`fUDP` AS `AfUDP`,`uA`.`fCredits` AS `ACredits`,`uA`.`fSexual` AS `AfSexual`,`B`.`fID` AS `BfID`,`B`.`fUserID` AS `BfUserID`,`B`.`fAPEpubid` AS `Bpubid`,`B`.`tLastNext` AS `BtLastNext`,`B`.`FilterSexual` AS `BFilterSexual`,`B`.`FilterGender` AS `BFilterGender`,`B`.`FilterFacebook` AS `BFilterFacebook`,`B`.`FilterCountry` AS `BFilterCountry`,`B`.`FilterLanguage` AS `BFilterLanguage`,`B`.`FilterCamera` AS `BFilterCamera`,`B`.`PropertyGender` AS `BPropertyGender`,`B`.`PropertyFacebook` AS `BPropertyFacebook`,`B`.`PropertyCountry` AS `BPropertyCountry`,`B`.`PropertyLanguage1` AS `BPropertyLanguage1`,`B`.`PropertyLanguage2` AS `BPropertyLanguage2`,`B`.`PropertyLanguage3` AS `BPropertyLanguage3`,`B`.`PropertyLanguage4` AS `BPropertyLanguage4`,`B`.`PropertyCamera` AS `BPropertyCamera`,`B`.`fUDP` AS `BfUDP`,`uB`.`fCredits` AS `BCredits`,`uB`.`fSexual` AS `BfSexual` from (((((`tClients` `A` join `tClients` `B`) join `tUsers` `uA`) join `tUsers` `uB` on(((`uA`.`fID` = `A`.`fUserID`) and (`uB`.`fID` = `B`.`fUserID`) and (`A`.`fID` < `B`.`fID`) and ((`A`.`FilterGender` = `B`.`PropertyGender`) or (not(`A`.`FilterGender`))) and (((`A`.`FilterSexual` = 1) and (`uB`.`fSexual` > 0)) or ((`A`.`FilterSexual` = -(1)) and (`uB`.`fSexual` < 0)) or (`B`.`PropertyCamera` = 0) or (not(`A`.`FilterSexual`))) and (`B`.`PropertyFacebook` or (not(`A`.`FilterFacebook`))) and ((`A`.`FilterCountry` = `B`.`PropertyCountry`) or (`A`.`FilterCountry` = '0')) and ((`B`.`PropertyLanguage1` = `A`.`FilterLanguage`) or (`B`.`PropertyLanguage2` = `A`.`FilterLanguage`) or (`B`.`PropertyLanguage3` = `A`.`FilterLanguage`) or (`B`.`PropertyLanguage4` = `A`.`FilterLanguage`) or (`A`.`FilterLanguage` = '0')) and (((`A`.`FilterCamera` = 1) and (`B`.`PropertyCamera` = 1)) or ((`A`.`FilterCamera` = -(1)) and (`B`.`PropertyCamera` = 0)) or (not(`A`.`FilterCamera`))) and ((`B`.`FilterGender` = `A`.`PropertyGender`) or (not(`B`.`FilterGender`))) and (((`B`.`FilterSexual` = 1) and (`uA`.`fSexual` > 0)) or ((`B`.`FilterSexual` = -(1)) and (`uA`.`fSexual` < 0)) or (`A`.`PropertyCamera` = 0) or (not(`B`.`FilterSexual`))) and (`A`.`PropertyFacebook` or (not(`B`.`FilterFacebook`))) and ((`B`.`FilterCountry` = `A`.`PropertyCountry`) or (`B`.`FilterCountry` = '0')) and ((`A`.`PropertyLanguage1` = `B`.`FilterLanguage`) or (`A`.`PropertyLanguage2` = `B`.`FilterLanguage`) or (`A`.`PropertyLanguage3` = `B`.`FilterLanguage`) or (`A`.`PropertyLanguage4` = `B`.`FilterLanguage`) or (`B`.`FilterLanguage` = '0')) and (((`B`.`FilterCamera` = 1) and (`A`.`PropertyCamera` = 1)) or ((`B`.`FilterCamera` = -(1)) and (`A`.`PropertyCamera` = 0)) or (not(`B`.`FilterCamera`))) and (`A`.`fAvailable` = 1) and (`B`.`fAvailable` = 1) and (((`A`.`fUDP` = -(1)) and (`B`.`fUDP` = -(1))) or ((`A`.`fUDP` <> -(1)) and (`B`.`fUDP` <> -(1))))))) left join `tNexts` `n1` on(((`A`.`fID` = `n1`.`fNexterClientID`) and (`B`.`fID` = `n1`.`fNexteeClientID`)))) left join `tNexts` `n2` on(((`B`.`fID` = `n2`.`fNexterClientID`) and (`A`.`fID` = `n2`.`fNexteeClientID`)))) where (isnull(`n2`.`fNexterClientID`) and isnull(`n1`.`fNexterClientID`)) order by if(((`A`.`fUDP` = 0) and (`B`.`fUDP` = 0)),1,0),if((`uA`.`fCredits` < `uB`.`fCredits`),(`uB`.`fCredits` + (0.4 * `uA`.`fCredits`)),(`uA`.`fCredits` + (0.4 * `uB`.`fCredits`))) desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Current Database: `peekAttackDev1`
--

USE `peekAttackDev1`;

--
-- Final view structure for view `vFilterCounts`
--

/*!50001 DROP TABLE `vFilterCounts`*/;
/*!50001 DROP VIEW IF EXISTS `vFilterCounts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vFilterCounts` AS select sql_no_cache concat(`f`.`fValue`,';',`ca`.`fValue`,';',`l`.`fValue`,';',`co`.`fValue`,';',`s`.`fValue`,';',`g`.`fValue`) AS `fID`,count(`p`.`fID`) AS `fCount` from (((((((`tClients` `p` join `tUsers` `u` on((`p`.`fUserID` = `u`.`fID`))) join `tFilterStates` `g` on(((`g`.`fValue` = `p`.`PropertyGender`) or (not(`g`.`fValue`))))) join `tFilterStates` `s` on((((`s`.`fValue` = 1) and (`u`.`fSexual` >= 0)) or ((`s`.`fValue` = -(1)) and (`u`.`fSexual` <= 0)) or (not(`s`.`fValue`))))) join `tFilterStates` `f` on(((`p`.`PropertyFacebook` and (`f`.`fValue` = 1)) or (not(`f`.`fValue`))))) join `tCountries` `co` on(((`co`.`fValue` = `p`.`PropertyCountry`) or (`co`.`fValue` = '0')))) join `tLanguages` `l` on(((`p`.`PropertyLanguage1` = `l`.`fValue`) or (`p`.`PropertyLanguage2` = `l`.`fValue`) or (`p`.`PropertyLanguage3` = `l`.`fValue`) or (`p`.`PropertyLanguage4` = `l`.`fValue`) or (`l`.`fValue` = '0')))) join `tFilterStates` `ca` on((((`ca`.`fValue` = 1) and (`p`.`PropertyCamera` = 1)) or ((`ca`.`fValue` = -(1)) and (`p`.`PropertyCamera` = 0)) or (not(`ca`.`fValue`))))) group by `l`.`fValue`,`co`.`fValue`,`ca`.`fValue`,`f`.`fValue`,`s`.`fValue`,`g`.`fValue` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vMatches`
--

/*!50001 DROP TABLE `vMatches`*/;
/*!50001 DROP VIEW IF EXISTS `vMatches`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vMatches` AS select `f`.`fID` AS `fCID`,`p`.`fID` AS `fID`,`p`.`fUserID` AS `fUserID`,`p`.`fAPEpubid` AS `fAPEpubid`,`p`.`fRTMInfo` AS `fRTMInfo`,`p`.`tLastNext` AS `tLastNext`,`p`.`fAvailable` AS `fAvailable`,`p`.`FilterSexual` AS `FilterSexual`,`p`.`FilterGender` AS `FilterGender`,`p`.`FilterFacebook` AS `FilterFacebook`,`p`.`FilterCountry` AS `FilterCountry`,`p`.`FilterLanguage` AS `FilterLanguage`,`p`.`FilterCamera` AS `FilterCamera`,`p`.`PropertyGender` AS `PropertyGender`,`p`.`PropertyFacebook` AS `PropertyFacebook`,`p`.`PropertyCountry` AS `PropertyCountry`,`p`.`PropertyLanguage1` AS `PropertyLanguage1`,`p`.`PropertyLanguage2` AS `PropertyLanguage2`,`p`.`PropertyLanguage3` AS `PropertyLanguage3`,`p`.`PropertyLanguage4` AS `PropertyLanguage4`,`p`.`PropertyCamera` AS `PropertyCamera`,`p`.`fUDP` AS `fUDP`,`p`.`fLastPartnerId` AS `fLastPartnerId`,`u`.`fCredits` AS `fCredits` from ((`tClients` `f` join `tClients` `p`) join `tUsers` `u` on(((`p`.`fUserID` = `u`.`fID`) and ((`f`.`FilterGender` = `p`.`PropertyGender`) or (not(`f`.`FilterGender`))) and (((`f`.`FilterSexual` = 1) and (`u`.`fSexual` >= 0)) or ((`f`.`FilterSexual` = -(1)) and (`u`.`fSexual` <= 0)) or (not(`f`.`FilterSexual`))) and (`p`.`PropertyFacebook` or (not(`f`.`FilterFacebook`))) and ((`f`.`FilterCountry` = `p`.`PropertyCountry`) or (`f`.`FilterCountry` = '0')) and ((`p`.`PropertyLanguage1` = `f`.`FilterLanguage`) or (`p`.`PropertyLanguage2` = `f`.`FilterLanguage`) or (`p`.`PropertyLanguage3` = `f`.`FilterLanguage`) or (`p`.`PropertyLanguage4` = `f`.`FilterLanguage`) or (`f`.`FilterLanguage` = '0')) and (((`f`.`FilterCamera` = 1) and (`p`.`PropertyCamera` = 1)) or ((`f`.`FilterCamera` = -(1)) and (`p`.`PropertyCamera` = 0)) or (not(`f`.`FilterCamera`)))))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Current Database: `peekAttackLive`
--

USE `peekAttackLive`;

--
-- Final view structure for view `vFindPartner`
--

/*!50001 DROP TABLE `vFindPartner`*/;
/*!50001 DROP VIEW IF EXISTS `vFindPartner`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vFindPartner` AS select `A`.`fID` AS `AfID`,`A`.`fUserID` AS `AfUserID`,`A`.`fAPEpubid` AS `Apubid`,`A`.`tLastNext` AS `AtLastNext`,`A`.`FilterSexual` AS `AFilterSexual`,`A`.`FilterGender` AS `AFilterGender`,`A`.`FilterFacebook` AS `AFilterFacebook`,`A`.`FilterCountry` AS `AFilterCountry`,`A`.`FilterLanguage` AS `AFilterLanguage`,`A`.`FilterCamera` AS `AFilterCamera`,`A`.`PropertyGender` AS `APropertyGender`,`A`.`PropertyFacebook` AS `APropertyFacebook`,`A`.`PropertyCountry` AS `APropertyCountry`,`A`.`PropertyLanguage1` AS `APropertyLanguage1`,`A`.`PropertyLanguage2` AS `APropertyLanguage2`,`A`.`PropertyLanguage3` AS `APropertyLanguage3`,`A`.`PropertyLanguage4` AS `APropertyLanguage4`,`A`.`PropertyCamera` AS `APropertyCamera`,`A`.`fUDP` AS `AfUDP`,`uA`.`fCredits` AS `ACredits`,`uA`.`fSexual` AS `AfSexual`,`B`.`fID` AS `BfID`,`B`.`fUserID` AS `BfUserID`,`B`.`fAPEpubid` AS `Bpubid`,`B`.`tLastNext` AS `BtLastNext`,`B`.`FilterSexual` AS `BFilterSexual`,`B`.`FilterGender` AS `BFilterGender`,`B`.`FilterFacebook` AS `BFilterFacebook`,`B`.`FilterCountry` AS `BFilterCountry`,`B`.`FilterLanguage` AS `BFilterLanguage`,`B`.`FilterCamera` AS `BFilterCamera`,`B`.`PropertyGender` AS `BPropertyGender`,`B`.`PropertyFacebook` AS `BPropertyFacebook`,`B`.`PropertyCountry` AS `BPropertyCountry`,`B`.`PropertyLanguage1` AS `BPropertyLanguage1`,`B`.`PropertyLanguage2` AS `BPropertyLanguage2`,`B`.`PropertyLanguage3` AS `BPropertyLanguage3`,`B`.`PropertyLanguage4` AS `BPropertyLanguage4`,`B`.`PropertyCamera` AS `BPropertyCamera`,`B`.`fUDP` AS `BfUDP`,`uB`.`fCredits` AS `BCredits`,`uB`.`fSexual` AS `BfSexual` from (((((`tClients` `A` join `tClients` `B`) join `tUsers` `uA`) join `tUsers` `uB` on(((`uA`.`fID` = `A`.`fUserID`) and (`uB`.`fID` = `B`.`fUserID`) and (`A`.`fID` < `B`.`fID`) and ((`A`.`FilterGender` = `B`.`PropertyGender`) or (not(`A`.`FilterGender`))) and (((`A`.`FilterSexual` = 1) and (`uB`.`fSexual` > 0)) or ((`A`.`FilterSexual` = -(1)) and (`uB`.`fSexual` < 0)) or (`B`.`PropertyCamera` = 0) or (not(`A`.`FilterSexual`))) and (`B`.`PropertyFacebook` or (not(`A`.`FilterFacebook`))) and ((`A`.`FilterCountry` = `B`.`PropertyCountry`) or (`A`.`FilterCountry` = '0')) and ((`B`.`PropertyLanguage1` = `A`.`FilterLanguage`) or (`B`.`PropertyLanguage2` = `A`.`FilterLanguage`) or (`B`.`PropertyLanguage3` = `A`.`FilterLanguage`) or (`B`.`PropertyLanguage4` = `A`.`FilterLanguage`) or (`A`.`FilterLanguage` = '0')) and (((`A`.`FilterCamera` = 1) and (`B`.`PropertyCamera` = 1)) or ((`A`.`FilterCamera` = -(1)) and (`B`.`PropertyCamera` = 0)) or (not(`A`.`FilterCamera`))) and ((`B`.`FilterGender` = `A`.`PropertyGender`) or (not(`B`.`FilterGender`))) and (((`B`.`FilterSexual` = 1) and (`uA`.`fSexual` > 0)) or ((`B`.`FilterSexual` = -(1)) and (`uA`.`fSexual` < 0)) or (`A`.`PropertyCamera` = 0) or (not(`B`.`FilterSexual`))) and (`A`.`PropertyFacebook` or (not(`B`.`FilterFacebook`))) and ((`B`.`FilterCountry` = `A`.`PropertyCountry`) or (`B`.`FilterCountry` = '0')) and ((`A`.`PropertyLanguage1` = `B`.`FilterLanguage`) or (`A`.`PropertyLanguage2` = `B`.`FilterLanguage`) or (`A`.`PropertyLanguage3` = `B`.`FilterLanguage`) or (`A`.`PropertyLanguage4` = `B`.`FilterLanguage`) or (`B`.`FilterLanguage` = '0')) and (((`B`.`FilterCamera` = 1) and (`A`.`PropertyCamera` = 1)) or ((`B`.`FilterCamera` = -(1)) and (`A`.`PropertyCamera` = 0)) or (not(`B`.`FilterCamera`))) and (`A`.`fAvailable` = 1) and (`B`.`fAvailable` = 1) and (((`A`.`fUDP` = -(1)) and (`B`.`fUDP` = -(1))) or ((`A`.`fUDP` <> -(1)) and (`B`.`fUDP` <> -(1))))))) left join `tNexts` `n1` on(((`A`.`fID` = `n1`.`fNexterClientID`) and (`B`.`fID` = `n1`.`fNexteeClientID`)))) left join `tNexts` `n2` on(((`B`.`fID` = `n2`.`fNexterClientID`) and (`A`.`fID` = `n2`.`fNexteeClientID`)))) where (isnull(`n2`.`fNexterClientID`) and isnull(`n1`.`fNexterClientID`)) order by if(((`A`.`fUDP` = 0) and (`B`.`fUDP` = 0)),1,0),if((`uA`.`fCredits` < `uB`.`fCredits`),(`uB`.`fCredits` + (0.4 * `uA`.`fCredits`)),(`uA`.`fCredits` + (0.4 * `uB`.`fCredits`))) desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vTempClientsForFilterCounts`
--

/*!50001 DROP TABLE `vTempClientsForFilterCounts`*/;
/*!50001 DROP VIEW IF EXISTS `vTempClientsForFilterCounts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vTempClientsForFilterCounts` AS select `p`.`PropertyGender` AS `PropertyGender`,`p`.`PropertyFacebook` AS `PropertyFacebook`,`p`.`PropertyCountry` AS `PropertyCountry`,`p`.`PropertyLanguage1` AS `PropertyLanguage1`,`p`.`PropertyLanguage2` AS `PropertyLanguage2`,`p`.`PropertyLanguage3` AS `PropertyLanguage3`,`p`.`PropertyLanguage4` AS `PropertyLanguage4`,`p`.`PropertyCamera` AS `PropertyCamera`,`U`.`fSexual` AS `fSexual` from (`tClients` `p` join `tUsers` `U` on((`p`.`fUserID` = `U`.`fID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
