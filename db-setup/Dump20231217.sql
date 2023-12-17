CREATE DATABASE  IF NOT EXISTS `man_location_work` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `man_location_work`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 34.122.43.56    Database: man_location_work
-- ------------------------------------------------------
-- Server version	8.0.31-google

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '22bd158d-9642-11ee-a197-42010a400003:1-149376';

--
-- Table structure for table `area_profesion`
--

DROP TABLE IF EXISTS `area_profesion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area_profesion` (
  `id_area` int NOT NULL AUTO_INCREMENT,
  `nombre_area_profesion` varchar(45) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `estado` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_area`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_profesion`
--

LOCK TABLES `area_profesion` WRITE;
/*!40000 ALTER TABLE `area_profesion` DISABLE KEYS */;
INSERT INTO `area_profesion` VALUES (1,'TECNOLOGIA','PROFESION DEDICADA A LA TECNOLOGIA EN GENERAL','ACTIVO'),(2,'ABOGACIA','AREA DE LA PROFESION DEDICADA ALA PARTE LEGAL','ACTIVO'),(3,'ELECTRONICO','AREA DE PROFESION DEDICADA A LA ELECTRICIDAD','ACTIVO'),(4,'CONSTRUCCION','AREA DE LA CONSTRUCCION DE INMOBILIARIO','ACTIVO'),(5,'DISEÑO DIGITAL','AREA DE DISEÑO','ACTIVO'),(6,'ALBAÑIL','AREA DE LA CONSTRUCCION','ACTIVO'),(7,'PLOMERO','AREA DE LA PLOMERIA','ACTIVO'),(8,'CLASES MATEMATICAS','AREA DE LA EDUCACION','ACTIVO'),(9,'ELECTRICO','AREA DE LA ELECTRICIDAD','ACTIVO'),(10,'CONTRATISTA','PARA CONTRATACION D OBRAS','ACTIVO'),(11,'REDES DE COMNICACION','PROFESIONAL DE CABLEADO ESTRUCTURADO LAN WAN WIFI Y TODO TIPO DE CABLEADO','ACTIVO'),(12,'BASE DE DATOS','CREACION Y MANTENIMIENTO DE BASES DE DATOS SQL ORACEL MONGO MYSQL SERVER','ACTIVO');
/*!40000 ALTER TABLE `area_profesion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificacion` (
  `ID_CALIFICACION` int NOT NULL AUTO_INCREMENT,
  `NIVEL_CALIFICACION` int NOT NULL,
  `COMENTARIO` varchar(500) NOT NULL,
  `ID_USUARIO_TRABAJADOR` int NOT NULL,
  `ID_CONTRATO` int DEFAULT NULL,
  PRIMARY KEY (`ID_CALIFICACION`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacion`
--

LOCK TABLES `calificacion` WRITE;
/*!40000 ALTER TABLE `calificacion` DISABLE KEYS */;
INSERT INTO `calificacion` VALUES (1,10,'SOY JUAN PUGUAVE, BUEN TRABAJO , LO RECOMIENDO',2,1),(2,9,'SOY CARLOS VILELA, REALIZO EL TRABAJO ADECUADAMENTE SIN PROBLEMAS.',4,2);
/*!40000 ALTER TABLE `calificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrato`
--

DROP TABLE IF EXISTS `contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrato` (
  `id_contrato` int NOT NULL AUTO_INCREMENT,
  `id_usuario_contratante` int NOT NULL,
  `estado` varchar(45) NOT NULL,
  `tipo_contrato` int NOT NULL,
  `id_usuario_trabajador` int NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_contrato`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrato`
--

LOCK TABLES `contrato` WRITE;
/*!40000 ALTER TABLE `contrato` DISABLE KEYS */;
INSERT INTO `contrato` VALUES (1,1,'TERMINADO',2,2,'2023-11-01 00:00:00','2023-11-03 00:00:00','contrato para hacer un deber'),(2,1,'TERMINADO',2,4,'2023-11-01 00:00:00','2023-11-01 00:00:00','contrato para hacer otro deber'),(3,1,'CONTRATADO',2,6,'2023-11-01 00:00:00','2023-11-01 00:00:00','trabajo de prueba en post man prueba de insercion de contrato'),(4,1,'CONTRATADO',2,6,'2023-11-01 00:00:00','2023-11-01 00:00:00','trabajo de prueba en post man prueba de insercion de contrato');
/*!40000 ALTER TABLE `contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil_trabajo`
--

DROP TABLE IF EXISTS `perfil_trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil_trabajo` (
  `ID_PERFIL` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `PROFESION` int NOT NULL,
  `TIEMPO_EXPERIENCIA` varchar(45) NOT NULL,
  `INTRODUCCION` varchar(500) NOT NULL,
  PRIMARY KEY (`ID_PERFIL`),
  UNIQUE KEY `uk_perfil_trabajo` (`ID_USUARIO`,`PROFESION`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil_trabajo`
--

LOCK TABLES `perfil_trabajo` WRITE;
/*!40000 ALTER TABLE `perfil_trabajo` DISABLE KEYS */;
INSERT INTO `perfil_trabajo` VALUES (1,1,1,'10 AÑOS','INGENIERO EN SISTEMAS, TRABAJO EN EL AREA DE DESARROLLO, EXPERIENCIA EN JAVA, ORACLE SPRING BOOT'),(2,2,1,'5 AÑOS','INGENIERIA EN SISTEMAS TRABAJO EN DISEÑO GRAFICO, DISEÑOS WEB'),(3,1,12,'10 AÑOS','INGENIERIA EN SISTEMAS, DESARROLLO EN BASE DE DATOS ORACLE, CONOZCO DE MYSQL, MONGO DB'),(4,3,9,'5 AÑOS','EXPERTO EN TEMAS ELECTRONICOS TRABAJO EN EL PUERTO DE GUAYAQUIL'),(5,4,2,'20 AÑOS','ABOGADO EXPERTO EN LITIGIOS CONYUGALES Y LABORALES'),(6,5,1,'5 AÑOS','EXPERTO EN SOLVENTAR ERRORES EN CAJEROS AUTOMATICOS, VALIDACION Y SOLUCION DE REDES'),(7,6,2,'20 años','ABOGADO EXPERTO EN LITIGIOS CONYUGALES, LABORALES Y PENALES'),(15,14,10,'5 años','contrato personal');
/*!40000 ALTER TABLE `perfil_trabajo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(45) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'CON','ACTIVO','ROL PARA IDENTIFICAR AL USUARIO PARA FUNCIONALIDADES DE CONTRATISTA'),(2,'JOB','ACTIVO','ROL PARA IDENTIFICAR AL USUARIO PARA FUNCIONALIDADES DE TRABAJADOR'),(3,'ADM','ACTIVO','ROL DE ADMINISTRADOR');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicacion` (
  `identificacion_usuario` varchar(35) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `latitud` varchar(100) NOT NULL,
  `longitud` varchar(100) NOT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`identificacion_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES ('0910000001','0986648315','-2.0138','-79.8670','ACTIVO','cdla. arbolletaa'),('0910000002','0969240646','-2.24334','-79.89326','ACTIVO','cdla valdivia'),('0910000003','0968792787','-2.177231','-79.897262','ACTIVO','CDLA KENNDY VIEJA CERCA DE UNIVERSIDAD DE GUAYAQUIL'),('0917262198','0989968908','-2.229619','-79.8982','ACTIVO','moll del sur frente a pyca'),('0923232323','0989666701','-2.26228','-79.87794','ACTIVO','cerca del pedregal'),('0951515151','0959904276','-2.274918','-79.892900','ACTIVO','cerca del hospital general del guasmo');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_rol` int NOT NULL,
  `estado` varchar(10) NOT NULL,
  `identificacion` varchar(45) NOT NULL,
  `tipo_identificacion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario_rol_idx` (`id_rol`),
  CONSTRAINT `id_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'carlos vilela','cvilela1979@gmail.com','$2b$10$36hyVfKqOFxVHySlGt1H5utgKT4/EXFZmPsC2llePEWfzDK6a/QoO',1,'activo','0917262198','CEDULA'),(2,'LIGIA DOMINGUEZ','ligia.dominguez.ortiz@gmail.com','$2b$10$36hyVfKqOFxVHySlGt1H5utgKT4/EXFZmPsC2llePEWfzDK6a/QoO',2,'activo','0923232323','CEDULA'),(3,'shubert dominguez','shubert@gmail.com','$2b$10$36hyVfKqOFxVHySlGt1H5utgKT4/EXFZmPsC2llePEWfzDK6a/QoO',2,'activo','0951515151','CEDULA'),(4,'byron vilela','byronvilela@gmail.com','$2b$10$36hyVfKqOFxVHySlGt1H5utgKT4/EXFZmPsC2llePEWfzDK6a/QoO',2,'activo','0910000001','CEDULA'),(5,'erick charcopa','erick@gmail.com','$2b$10$36hyVfKqOFxVHySlGt1H5utgKT4/EXFZmPsC2llePEWfzDK6a/QoO',2,'activo','0910000002','CEDULA'),(6,'veronica cepeda','veronica@gmail.com','$2b$10$36hyVfKqOFxVHySlGt1H5utgKT4/EXFZmPsC2llePEWfzDK6a/QoO',2,'activo','0910000003','CEDULA'),(14,'EMA AITANA VILELA DOMINGUEZ','ema@gmail.com','$2b$10$qcomEIIyE.x6RWOC2b0aEuflux5/1hZ0aAj.GeLZEoh7yXTjX9VDG',1,'activo','0950121212','CEDULA');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-17 14:00:14
