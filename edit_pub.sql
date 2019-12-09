-- MySQL dump 10.13  Distrib 8.0.18, for osx10.15 (x86_64)
--
-- Host: localhost    Database: edit_pub
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pouzivatel`
--

DROP TABLE IF EXISTS `pouzivatel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pouzivatel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meno` varchar(30) NOT NULL,
  `priezvisko` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `typ` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pouzivatel`
--

LOCK TABLES `pouzivatel` WRITE;
/*!40000 ALTER TABLE `pouzivatel` DISABLE KEYS */;
/*!40000 ALTER TABLE `pouzivatel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publikacie`
--

DROP TABLE IF EXISTS `publikacie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publikacie` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT 'key',
  `meno` varchar(1000) NOT NULL COMMENT 'Retazec krstnych mien autorv',
  `priezvisko` varchar(1000) CHARACTER SET utf8 COLLATE utf8_slovak_ci NOT NULL COMMENT 'Retazec priezvisk autorov',
  `titul` varchar(1000) NOT NULL COMMENT 'Retazec titulov autorov',
  `percento` varchar(1000) DEFAULT NULL COMMENT 'Retazec percentualneho podielu autorov',
  `doktorand` varchar(1000) CHARACTER SET utf8 COLLATE utf8_slovak_ci DEFAULT NULL COMMENT 'TextovĂ˝ reĹĄazec tvorenĂ˝ informaciami, ci je autor doktorandom',
  `pracovisko` varchar(1000) NOT NULL COMMENT 'Retazec pracovisk autorov',
  `ustav` varchar(1000) NOT NULL COMMENT 'Retazec ustavov/katedier autorov',
  `kontakt` varchar(1000) DEFAULT NULL COMMENT 'Retazec kontaktnych informacii autorov',
  `nazov` varchar(200) NOT NULL COMMENT 'Nazov publikacie',
  `preklad` varchar(200) NOT NULL COMMENT 'Preklad nazvu publikacie',
  `skkey` varchar(500) NOT NULL COMMENT 'Slovenske klucove slova',
  `engkey` varchar(500) NOT NULL COMMENT 'Anglicke klucove slova',
  `kategoria` varchar(10) NOT NULL COMMENT 'Kategoria publikacie',
  `oblastVyskumu` varchar(100) DEFAULT NULL,
  `cislog` varchar(1000) DEFAULT NULL COMMENT 'Retazec cisel grantov',
  `nazovg` varchar(1000) DEFAULT NULL COMMENT 'Retazec nazvov grantov',
  `doplnokg` varchar(100) DEFAULT NULL COMMENT 'Doplnkove info ku grantom',
  `projektg` varchar(1500) DEFAULT NULL,
  `agenturag` varchar(500) DEFAULT NULL,
  `www` varchar(100) DEFAULT NULL COMMENT 'Webova adresa pripadnej elektronickej publikacie',
  `typ` varchar(20) NOT NULL COMMENT 'Typ publikacie',
  `rok` varchar(20) NOT NULL COMMENT 'Rok vydania dokumentu',
  `rozsah` varchar(50) NOT NULL COMMENT 'Pocet stran dokumentu',
  `isn` varchar(100) NOT NULL COMMENT 'ISSN alebo ISBN (zdrojoveho) dokumentu',
  `datum` varchar(20) NOT NULL COMMENT 'Datum odoslania formularu',
  `code` varchar(100) NOT NULL COMMENT 'Kod publikacie vzhladom na citacie',
  `vstup` varchar(100) NOT NULL COMMENT 'Pracovisko autora, ktory vyplnil formular',
  `mon_miesto` varchar(100) DEFAULT NULL COMMENT 'Miesto vydania monografie',
  `mon_vydavatelstvo` varchar(100) DEFAULT NULL COMMENT 'Vydavatelstvo monografie',
  `mon_rok` varchar(20) DEFAULT NULL COMMENT 'Rok vydania monografie',
  `mon_rozsah` varchar(50) DEFAULT NULL COMMENT 'Pocet stran monografie',
  `mon_pocetah` varchar(50) DEFAULT NULL COMMENT 'Pocet autorskych harkov monografie',
  `mon_isbn` varchar(100) DEFAULT NULL COMMENT 'ISBN monografie',
  `kap_zdroj` varchar(100) DEFAULT NULL COMMENT 'Nazov zdrojoveho dokumentu clanku v zborniku (kapitoly v knihe)',
  `kap_miesto` varchar(100) DEFAULT NULL COMMENT 'Miesto vydania zdrojoveho dokumentu clanku v zborniku (kapitoly v knihe)',
  `kap_vydavatelstvo` varchar(100) DEFAULT NULL COMMENT 'Vydavatelstvo zdrojoveho dokumentu clanku v zborniku (kapitoly v knihe)',
  `kap_rok` varchar(20) DEFAULT NULL COMMENT 'Rok vydania zdrojoveho dokumentu clanku v zborniku (kapitoly v knihe)',
  `kap_pocetah` varchar(50) DEFAULT NULL COMMENT 'Pocet autorskych harkov clanku v casopise alebo kapitoly v knihe',
  `kap_od` varchar(50) DEFAULT NULL COMMENT 'Prva strana clanku v zborniku (kapitoly v knihe)',
  `kap_do` varchar(50) DEFAULT NULL COMMENT 'Posledna strana clanku v zborniku (kapitoly v knihe)',
  `kap_isbn` varchar(100) DEFAULT NULL COMMENT 'ISBN zdrojoveho dokumentu clanku v zborniku (kapitoly v knihe)',
  `cas_zdroj` varchar(100) DEFAULT NULL COMMENT 'Nazov zdrojoveho dokumentu clanku v casopise',
  `cas_rocnik` varchar(20) DEFAULT NULL COMMENT 'Rocnik zdrojoveho dokumentu clanku v casopise',
  `cas_cislo` varchar(20) DEFAULT NULL COMMENT 'Cislo zdrojoveho dokumentu clanku v casopise',
  `cas_rok` varchar(20) DEFAULT NULL COMMENT 'Rok vydania zdrojoveho dokumentu clanku v casopise',
  `cas_od` varchar(50) DEFAULT NULL COMMENT 'Prva strana clanku v casopise',
  `cas_do` varchar(50) DEFAULT NULL COMMENT 'Posledna strana clanku v casopise',
  `cas_issn` varchar(100) DEFAULT NULL COMMENT 'ISSN zdrojoveho dokumentu clanku v casopise',
  `cas_krajina` varchar(100) CHARACTER SET utf8 COLLATE utf8_slovak_ci DEFAULT NULL COMMENT 'Krajina vydania zdrojoveho dokumentu clanku v casopise',
  `konf_nazov` varchar(500) DEFAULT NULL COMMENT 'Nazov konferencie',
  `konf_miesto` varchar(500) DEFAULT NULL COMMENT 'Miesto konania konferencie',
  `konf_cislo` varchar(100) DEFAULT NULL COMMENT 'Cislo konferencie',
  `konf_datum` varchar(200) DEFAULT NULL COMMENT 'Datum konania konferencie',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publikacie`
--

LOCK TABLES `publikacie` WRITE;
/*!40000 ALTER TABLE `publikacie` DISABLE KEYS */;
/*!40000 ALTER TABLE `publikacie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-09 15:49:36
