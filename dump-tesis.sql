-- MySQL dump 10.13  Distrib 5.6.45, for Win64 (x86_64)
--
-- Host: localhost    Database: tesis
-- ------------------------------------------------------
-- Server version	5.6.45-log

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
-- Table structure for table `calificacion_cliente`
--

DROP TABLE IF EXISTS `calificacion_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calificacion_cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clienteid` int(11) NOT NULL,
  `profesionalid` int(11) NOT NULL,
  `dsc` mediumtext COLLATE latin1_spanish_ci NOT NULL,
  `estrellas` int(11) NOT NULL,
  `fechahorainsert` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `calificacion_cliente_fk` (`clienteid`),
  KEY `calificacion_cliente_fk_1` (`profesionalid`),
  CONSTRAINT `calificacion_cliente_fk` FOREIGN KEY (`clienteid`) REFERENCES `usuario` (`id`),
  CONSTRAINT `calificacion_cliente_fk_1` FOREIGN KEY (`profesionalid`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacion_cliente`
--

LOCK TABLES `calificacion_cliente` WRITE;
/*!40000 ALTER TABLE `calificacion_cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificacion_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificacion_profesional`
--

DROP TABLE IF EXISTS `calificacion_profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calificacion_profesional` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dsc` mediumtext COLLATE latin1_spanish_ci NOT NULL,
  `estrellas_trabajo` int(11) NOT NULL,
  `estrellas_trabajador` int(11) NOT NULL,
  `estrellas_precio` int(11) NOT NULL,
  `fechahorainsert` datetime NOT NULL,
  `profesionalid` int(11) NOT NULL,
  `clienteid` int(11) NOT NULL,
  `propuestaid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `calificacion_profesional_fk` (`profesionalid`),
  KEY `calificacion_profesional_fk_1` (`clienteid`),
  KEY `calificacion_profesional_fk_2` (`propuestaid`),
  CONSTRAINT `calificacion_profesional_fk` FOREIGN KEY (`profesionalid`) REFERENCES `usuario` (`id`),
  CONSTRAINT `calificacion_profesional_fk_1` FOREIGN KEY (`clienteid`) REFERENCES `usuario` (`id`),
  CONSTRAINT `calificacion_profesional_fk_2` FOREIGN KEY (`propuestaid`) REFERENCES `propuesta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacion_profesional`
--

LOCK TABLES `calificacion_profesional` WRITE;
/*!40000 ALTER TABLE `calificacion_profesional` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificacion_profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emisorid` int(11) NOT NULL,
  `receptorid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chat_un` (`emisorid`,`receptorid`),
  KEY `chat_fk_1` (`receptorid`),
  CONSTRAINT `chat_fk` FOREIGN KEY (`emisorid`) REFERENCES `usuario` (`id`),
  CONSTRAINT `chat_fk_1` FOREIGN KEY (`receptorid`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,1,2);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chatid` int(11) NOT NULL,
  `mensaje` longtext COLLATE latin1_spanish_ci NOT NULL,
  `emisorid` int(11) NOT NULL,
  `receptorid` int(11) NOT NULL,
  `leido` tinyint(1) NOT NULL,
  `fechahorainsert` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mensaje_fk` (`chatid`),
  KEY `mensaje_fk_1` (`emisorid`),
  KEY `mensaje_fk_2` (`receptorid`),
  CONSTRAINT `mensaje_fk` FOREIGN KEY (`chatid`) REFERENCES `chat` (`id`),
  CONSTRAINT `mensaje_fk_1` FOREIGN KEY (`emisorid`) REFERENCES `usuario` (`id`),
  CONSTRAINT `mensaje_fk_2` FOREIGN KEY (`receptorid`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensaje`
--

LOCK TABLES `mensaje` WRITE;
/*!40000 ALTER TABLE `mensaje` DISABLE KEYS */;
INSERT INTO `mensaje` VALUES (1,1,'Hola',1,2,1,'2020-02-02 18:48:52'),(2,1,'Hola, todo bien?',2,1,0,'2020-02-02 18:49:57');
/*!40000 ALTER TABLE `mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil_profesional`
--

DROP TABLE IF EXISTS `perfil_profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfil_profesional` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioid` int(11) NOT NULL,
  `cono_habi` longtext COLLATE latin1_spanish_ci NOT NULL,
  `profesiones` longtext COLLATE latin1_spanish_ci NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `perfil_laboral_un` (`usuarioid`),
  FULLTEXT KEY `perfil_laboral_cono_habi_IDX` (`cono_habi`,`profesiones`),
  CONSTRAINT `perfil_laboral_fk` FOREIGN KEY (`usuarioid`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil_profesional`
--

LOCK TABLES `perfil_profesional` WRITE;
/*!40000 ALTER TABLE `perfil_profesional` DISABLE KEYS */;
INSERT INTO `perfil_profesional` VALUES (1,1,'trabajo en una consultora de sistemas','Analista en Sistemas,Android Developer,Mysql,.NET Developer,',1);
/*!40000 ALTER TABLE `perfil_profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil_profesional_profesiones`
--

DROP TABLE IF EXISTS `perfil_profesional_profesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfil_profesional_profesiones` (
  `perfilprofesionalid` int(11) NOT NULL,
  `profesionid` int(11) NOT NULL,
  PRIMARY KEY (`perfilprofesionalid`,`profesionid`),
  KEY `perfil_laboral_profesiones_fk_1` (`profesionid`),
  CONSTRAINT `perfil_laboral_profesiones_fk` FOREIGN KEY (`perfilprofesionalid`) REFERENCES `perfil_profesional` (`id`),
  CONSTRAINT `perfil_laboral_profesiones_fk_1` FOREIGN KEY (`profesionid`) REFERENCES `profesion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil_profesional_profesiones`
--

LOCK TABLES `perfil_profesional_profesiones` WRITE;
/*!40000 ALTER TABLE `perfil_profesional_profesiones` DISABLE KEYS */;
INSERT INTO `perfil_profesional_profesiones` VALUES (1,1),(1,2),(1,3),(1,4);
/*!40000 ALTER TABLE `perfil_profesional_profesiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesion`
--

DROP TABLE IF EXISTS `profesion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dsc` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `profesion_un` (`dsc`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesion`
--

LOCK TABLES `profesion` WRITE;
/*!40000 ALTER TABLE `profesion` DISABLE KEYS */;
INSERT INTO `profesion` VALUES (1,'Analista en Sistemas',1),(2,'Android Developer',1),(3,'Mysql',1),(4,'.NET Developer',1),(5,'paseador de perro',1),(6,'cuidador de perro',1);
/*!40000 ALTER TABLE `profesion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propuesta`
--

DROP TABLE IF EXISTS `propuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `propuesta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trabajoid` int(11) NOT NULL,
  `profesionalid` int(11) NOT NULL,
  `dsc` text COLLATE latin1_spanish_ci NOT NULL,
  `precio` double DEFAULT NULL,
  `fechahorainsert` datetime NOT NULL,
  `fechahoraupdate` datetime DEFAULT NULL,
  `aceptado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `propuesta_fk` (`trabajoid`),
  KEY `propuesta_fk_1` (`profesionalid`),
  CONSTRAINT `propuesta_fk` FOREIGN KEY (`trabajoid`) REFERENCES `trabajo` (`id`),
  CONSTRAINT `propuesta_fk_1` FOREIGN KEY (`profesionalid`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propuesta`
--

LOCK TABLES `propuesta` WRITE;
/*!40000 ALTER TABLE `propuesta` DISABLE KEYS */;
INSERT INTO `propuesta` VALUES (1,1,2,'Hola',100,'2020-01-31 16:25:29',NULL,0);
/*!40000 ALTER TABLE `propuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajo`
--

DROP TABLE IF EXISTS `trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trabajo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarioid` int(11) NOT NULL,
  `titulo` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `profesiones` longtext COLLATE latin1_spanish_ci NOT NULL,
  `dsc` longtext COLLATE latin1_spanish_ci NOT NULL,
  `cantidadpropuestas` int(11) NOT NULL DEFAULT '0',
  `fechahorapublicacion` datetime NOT NULL,
  `fechahorafinalizacion` datetime DEFAULT NULL,
  `estado` varchar(100) COLLATE latin1_spanish_ci NOT NULL DEFAULT 'PENDIENTE',
  `preciodesde` double DEFAULT NULL,
  `preciohasta` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trabajo_fk` (`usuarioid`),
  FULLTEXT KEY `trabajo_titulo_IDX` (`titulo`,`profesiones`,`dsc`),
  CONSTRAINT `trabajo_fk` FOREIGN KEY (`usuarioid`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajo`
--

LOCK TABLES `trabajo` WRITE;
/*!40000 ALTER TABLE `trabajo` DISABLE KEYS */;
INSERT INTO `trabajo` VALUES (1,1,'cuidado para mi perro','paseador de perro,cuidador de perro,','necesito que alguien se encargue de pasear a mis dos perros. precio por día',1,'2020-01-31 12:16:27',NULL,'PENDIENTE',0,700);
/*!40000 ALTER TABLE `trabajo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajo_profesiones`
--

DROP TABLE IF EXISTS `trabajo_profesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trabajo_profesiones` (
  `trabajoid` int(11) NOT NULL,
  `profesionid` int(11) NOT NULL,
  PRIMARY KEY (`trabajoid`,`profesionid`),
  KEY `trabajo_profesiones_fk_1` (`profesionid`),
  CONSTRAINT `trabajo_profesiones_fk` FOREIGN KEY (`trabajoid`) REFERENCES `trabajo` (`id`),
  CONSTRAINT `trabajo_profesiones_fk_1` FOREIGN KEY (`profesionid`) REFERENCES `profesion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajo_profesiones`
--

LOCK TABLES `trabajo_profesiones` WRITE;
/*!40000 ALTER TABLE `trabajo_profesiones` DISABLE KEYS */;
INSERT INTO `trabajo_profesiones` VALUES (1,5),(1,6);
/*!40000 ALTER TABLE `trabajo_profesiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `pwd` text COLLATE latin1_spanish_ci NOT NULL,
  `apellido` text COLLATE latin1_spanish_ci NOT NULL,
  `nombre` text COLLATE latin1_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `telefono` text COLLATE latin1_spanish_ci NOT NULL,
  `reputacion` float NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fechahoraregistro` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_username_un` (`username`),
  UNIQUE KEY `usuario_email_un` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'thegunterhe','123','Hellrigl','Gunter Denis','thegunterhe@gmail.com','3764587561',0,1,'2020-01-29 21:34:46'),(2,'guni','123','Hellrigl','Gunter','theg2unterhe@gmail.com','12345678',0,1,'2020-01-31 12:18:13');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tesis'
--
/*!50003 DROP PROCEDURE IF EXISTS `aceptarPropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `aceptarPropuesta`(in pPropuestaId int)
begin
	update propuesta set aceptado = 1 
	where id = pPropuestaId;
	
	update trabajo set estado = 'ACEPTADO' 
	where id = (
		select trabajoid 
		from tesis.propuesta 
		where id = pPropuestaId
	);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `calificarcliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `calificarcliente`(in pClienteId int, in pProfesionalId int, in pDsc mediumtext, in pEstrellas int)
begin
	insert into tesis.calificacion_cliente(clienteid, profesionalid, dsc, estrellas, fechahorainsert)
	values(pClienteId, pProfesionalId, pDsc, pEstrellas, now());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `calificarProfesional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `calificarProfesional`(in pDsc mediumtext, in pEsTrabajo int, in pEsTrabajador int, in pEsPrecio int, in pPropuestaId int, in pClienteId int, in pProfesionalId int)
BEGIN
	insert into tesis.calificacion_profesional(
		dsc, 
		estrellas_trabajo, 
		estrellas_trabajador, 
		estrellas_precio, 
		profesionalid, 
		clienteid, 
		propuestaid, 
		fechahorainsert) 
	values(pDsc, pEsTrabajo, pEsTrabajador, pEsPrecio, pProfesionalId, pClienteId, pPropuestaId, now());

	update trabajo set estado = 'FINALIZADO', fechafinalizacion = now() 
	where id = (select trabajoid from propuesta where id = pPropuestaId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteTrabajo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteTrabajo`(in pTrabajoId int)
begin
	update trabajo set estado = 'CANCELADO' where id = pTrabajoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getChats` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getChats`(in pEmisorId int)
begin
	select 
		c.id, 
		c.emisorid,
		e.apellido emisorapellido,
		e.nombre emisornombre,
		c.receptorid, 
		r.apellido receptorapellido,
		r.nombre receptornombre,
		m.emisorid mensajeemisorid,
		m.receptorid mensajereceptorid,
		m.mensaje,
		m.leido,
		m.fechahorainsert
	from chat c
	join usuario e on e.id = c.emisorid
	join usuario r on r.id = c.receptorid 
	join (
		select max(id) max_id, chatid
		from mensaje 
		group by chatid
	) ult_msg on ult_msg.chatid = c.id 
	join mensaje m on m.id = ult_msg.max_id
	where c.emisorid = pEmisorId or c.receptorid = pEmisorId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMensajes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getMensajes`(in pChatId int)
begin
	select mensaje, emisorid, receptorid, leido, fechahorainsert 
	from mensaje 
	where chatid = pChatId
	order by fechahorainsert;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMisPropuestas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getMisPropuestas`(in pUsuarioId int)
begin
	select 
		p.id,
		p.profesionalid,
		t.titulo 
	from tesis.propuesta p
	join trabajo t on t.id = p.trabajoid 
	where p.profesionalid = pUsuarioId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMisTrabajos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getMisTrabajos`(in pUsuarioId int)
begin
	select 
		t.id,
		t.titulo,
		t.fechahorapublicacion,
		t.cantidadpropuestas,
		t.preciodesde,
		t.preciohasta,
		t.profesiones,
		t.estado 
	from tesis.trabajo t
	where t.usuarioid = pUsuarioId
	order by t.estado desc, t.fechahorapublicacion desc, t.titulo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getMiTrabajo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getMiTrabajo`(in pTrabajoId int)
begin
	select 
		t.id, 
		titulo, 
		profesiones, 
		preciodesde, 
		preciohasta, 
		fechahorapublicacion,
		cantidadpropuestas, 
		estado,
		dsc
	from tesis.trabajo t 
	where t.id = pTrabajoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPerfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPerfil`(in pUsuarioId int)
begin
	select * from tesis.usuario where id = pUsuarioId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPerfilProfesional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPerfilProfesional`(in pUsuarioId int)
begin
	select u.id, u.apellido, u.nombre, u.email, u.telefono, u.username, u.reputacion, pp.id ppId, pp.cono_habi, pp.profesiones 
	from tesis.usuario u 
	join tesis.perfil_profesional pp on pp.usuarioid = u.id
	where u.id = pUsuarioId and u.activo = 1 and pp.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProfesionales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProfesionales`(in pQuery longtext, in pUsuarioId int)
begin
	select 
		u.id, 
		u.username,
		u.apellido, 
		u.nombre, 
		u.reputacion,
		pl.profesiones
	from tesis.perfil_profesional pl
	join usuario u on u.id = pl.usuarioid
	where 
		match(pl.cono_habi, pl.profesiones) against(pQuery in boolean mode) 
		and u.activo = 1 and pl.usuarioid <> pUsuarioId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProfesiones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProfesiones`(
	in pQuery text
)
begin
	select id, dsc from tesis.profesion where activo = 1 and dsc like concat('%', pQuery, '%');
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPropuesta`(
	in pProfesionalId int,
	in pTrabajoId int
)
BEGIN
	select profesionalid, trabajoid, dsc, precio 
	from propuesta 
	where profesionalid = pProfesionalId and trabajoid = pTrabajoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPropuestasPorTrabajo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPropuestasPorTrabajo`(in pTrabajoId int)
begin
	select p.trabajoid, p.profesionalid, p.dsc, p.precio, p.aceptado from tesis.propuesta p where trabajoid = pTrabajoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getReputacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getReputacion`(in pUsuarioId int)
begin
	select reputacion from usuario where id = pUsuarioId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTrabajo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTrabajo`(in pTrabajoId int)
begin
	select 
		t.id, 
		titulo, 
		profesiones, 
		preciodesde, 
		preciohasta, 
		fechahorapublicacion,
		cantidadpropuestas, 
		estado,
		dsc, 
		t.usuarioid,
		u.apellido,
		u.nombre,
		u.reputacion 
	from tesis.trabajo t 
	join usuario u on u.id = t.usuarioid 
	where t.id = pTrabajoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTrabajoConPropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTrabajoConPropuesta`(in pTrabajoId int, in pProfesionalId int)
begin
	select 
		t.id, 
		titulo, 
		profesiones, 
		preciodesde, 
		preciohasta, 
		fechahorapublicacion,
		cantidadpropuestas, 
		estado,
		t.dsc, 
		t.usuarioid,
		u.apellido,
		u.nombre,
		u.reputacion,
		p.id propuestaid,
		p.dsc propuestadsc,
		p.precio propuestaprecio
	from tesis.trabajo t 
	join usuario u on u.id = t.usuarioid
	left join propuesta p on p.trabajoid = t.id and p.profesionalid = pProfesionalId
	where t.id = pTrabajoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTrabajos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTrabajos`(in pQuery longtext, in pUsuarioId int)
begin
	select 
		t.id,
		t.titulo,
		t.fechahorapublicacion,
		t.cantidadpropuestas,
		t.preciodesde,
		t.preciohasta,
		t.profesiones
	from tesis.trabajo t
	where match(t.titulo, t.profesiones, t.dsc) against(pQuery in boolean mode) 
	and t.estado = 'PENDIENTE' and t.usuarioid <> pUsuarioId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUsuario`(in pUsuarioId int)
begin
	select 
		u.id, 
		u.username, 
		u.apellido, 
		u.nombre, 
		u.email, 
		u.telefono, 
		u.reputacion, 
		u.activo,
		pp.activo perfilProfesionalActivo,
		pp.profesiones,
		pp.cono_habi 
	from tesis.usuario u
	left join tesis.perfil_profesional pp on pp.usuarioid = u.id
	where u.id = pUsuarioId and u.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertChat` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertChat`(in pEmisorId int, in pReceptorId int)
begin
	insert into tesis.chat(emisorid, receptorid) values(pEmisorId, pReceptorId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertMensaje` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertMensaje`(in pChatId int, in pEmisorId int, in pReceptorId int, in pMensaje longtext)
begin
	insert into tesis.mensaje(chatid, emisorid, receptorid, mensaje, leido, fechahorainsert)
	values(pChatId, pEmisorId, pReceptorId, pMensaje, 0, now());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertPerfilProfesional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPerfilProfesional`(
	in pUsuarioId int, 
	in pConoHabi longtext, 
	in pProfesiones longtext
)
begin
	DECLARE tmp longTEXT;
	DECLARE i INT DEFAULT 1 ;
	DECLARE profesionDsc VARCHAR(255);
	declare perfilProfesionalId int;

	SET tmp = pProfesiones;
	select tmp;

	insert into tesis.perfil_profesional(usuarioid, cono_habi, profesiones, activo) 
	values(pUsuarioId, pConoHabi, pProfesiones, 1);
	
	set perfilProfesionalId = last_insert_id();

	WHILE CHAR_LENGTH(tmp) > 0 AND i > 0 DO
		SET i = INSTR(tmp, ',');

		IF i = 0 THEN
			SET profesionDsc = tmp;
		ELSE
			SET profesionDsc = LEFT(tmp, i - 1);
		END IF;

		IF TRIM(profesionDsc) != '' THEN
			call tesis.insertprofesion(profesionDsc, @profesionId);
			call tesis.insertPerfilProfesionalProfesion(perfilProfesionalId, @profesionId);
		END IF;

		SET tmp = SUBSTRING(tmp, i + 1);
	END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertPerfilProfesionalProfesion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPerfilProfesionalProfesion`(
	in pPerfilProfesionalId int, 
	in pProfesionId int
)
begin
	insert into tesis.perfil_profesional_profesiones 
	values(pPerfilProfesionalId, pProfesionId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertProfesion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertProfesion`(in pDsc varchar(255), out pId int)
begin
	declare profId int;

	select id 
	into profId
	from tesis.profesion 
	where dsc = pDsc;
	
	if profId is not null then
		set pId = profId;
	else
		insert into tesis.profesion values(0, pDsc, 1);
		set pId = last_insert_id();
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertPropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPropuesta`(
	in pTrabajoId int, 
	in pProfesionalId int, 
	in pDsc longtext,
	in pPrecio double
)
begin
	insert into tesis.propuesta(trabajoid, profesionalid, dsc, precio, fechahorainsert, aceptado)
	values(pTrabajoId, pProfesionalId, pDsc, pPrecio, now(), 0);

	if last_insert_id() > 0 then
		update trabajo set cantidadpropuestas = cantidadpropuestas + 1 where id = pTrabajoId;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertTrabajo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertTrabajo`(
	in pUsuarioId int,
	in pTitulo varchar(255), 
	in pProfesiones longtext,
	in pDsc longtext,
	in pPrecioDesde double,
	in pPrecioHasta double
)
begin
	declare trabajoId int;
	declare tmp longtext;
	declare i int default 1 ;
	declare profesionDsc varchar(255);

	SET tmp = pProfesiones;

	insert into tesis.trabajo(
		usuarioid, 
		titulo,
		profesiones, 
		dsc, 
		preciodesde,
		preciohasta,
		fechahorapublicacion
	) values(
		pUsuarioId, 
		pTitulo,
		pProfesiones,
		pDsc, 
		pPrecioDesde,
		pPrecioHasta,
		now()
	);

	set trabajoId = last_insert_id();

	while char_length(tmp) > 0 and i > 0 do
		set i = instr(tmp, ',');

		if i = 0 then
			set profesionDsc = tmp;
		else
			set profesionDsc = left(tmp, i - 1);
		end if;

		if trim(profesionDsc) != '' then
			call tesis.insertprofesion(profesionDsc, @profesionId);
			call tesis.insertTrabajoProfesion(trabajoId, @profesionId);
		end if;

		set tmp = substring(tmp, i + 1);
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertTrabajoProfesion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertTrabajoProfesion`(in pTrabajoId int, in pProfesionId int)
begin
	insert into tesis.trabajo_profesiones values(pTrabajoId, pProfesionId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(in pUsername varchar(255), in pPwd text)
begin
	select 
		u.id, 
		u.username, 
		u.apellido, 
		u.nombre, 
		u.email, 
		u.telefono, 
		u.reputacion, 
		u.activo,
		pp.activo perfilProfesionalActivo,
		pp.profesiones,
		pp.cono_habi 
	from tesis.usuario u
	left join tesis.perfil_profesional pp on pp.usuarioid = u.id
	where u.username = pUsername and u.pwd = pPwd and u.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registro` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro`(in pUsername varchar(255), in pPwd text, in pApellido text, in pNombre text, in pEmail text, in pTelefono text)
begin
	
	insert into tesis.usuario values(0, pUsername, pPwd, pApellido, pNombre, pEmail, pTelefono, 0, 1, now());
	select 1 as ok, last_insert_id() as id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updatePerfilProfesional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePerfilProfesional`(
	in pPerfilProfesionalId int, 
	in pConoHabi longtext, 
	in pProfesiones longtext,
	in pActivo tinyint
)
begin
	declare tmp longtext;
	declare i int default 1 ;
	declare profesionDsc varchar(255);

	SET tmp = pProfesiones;

	delete from tesis.perfil_profesional_profesiones where perfilprofesionalid = pPerfilProfesionalId;

	while char_length(tmp) > 0 and i > 0 do
		set i = instr(tmp, ',');

		if i = 0 then
			set profesionDsc = tmp;
		else
			set profesionDsc = left(tmp, i - 1);
		end if;

		if trim(profesionDsc) != '' then
			call tesis.insertprofesion(profesionDsc, @profesionId);
			call tesis.insertPerfilProfesionalProfesion(pPerfilProfesionalId, @profesionId);
		end if;

		set tmp = substring(tmp, i + 1);
	end while;

	update tesis.perfil_profesional pp set pp.cono_habi = pConoHabi, pp.profesiones = pProfesiones, pp.activo = pActivo
	where pp.id = pPerfilProfesionalId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updatePropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePropuesta`(
	in pProfesionalId int, 
	in pTrabajoId int,
	in pDsc longtext,
	in pPrecio double
)
begin
	update propuesta set 
		dsc = pDsc,
		precio = pPrecio,
		fechahoraupdate = now() 
	where profesionalid = pProfesionalId and trabajoid = pTrabajoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateTrabajo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateTrabajo`(
	in pTrabajoId int, 
	in pTitulo varchar(255),
	in pProfesiones longtext,
	in pPrecioDesde double,
	in pPrecioHasta double,
	in pDsc longtext 
)
begin
	declare tmp longtext;
	declare i int default 1 ;
	declare profesionDsc varchar(255);

	SET tmp = pProfesiones;

	delete from tesis.trabajo_profesiones where trabajoid = pTrabajoId;

	while char_length(tmp) > 0 and i > 0 do
		set i = instr(tmp, ',');

		if i = 0 then
			set profesionDsc = tmp;
		else
			set profesionDsc = left(tmp, i - 1);
		end if;

		if trim(profesionDsc) != '' then
			call tesis.insertprofesion(profesionDsc, @profesionId);
			call tesis.insertTrabajoProfesion(pTrabajoId, @profesionId);
		end if;

		set tmp = substring(tmp, i + 1);
	end while;

	update tesis.trabajo t set 
		t.titulo = pTitulo, 
		t.dsc = pDsc, 
		t.profesiones = pProfesiones, 
		t.preciodesde = pPrecioDesde, 
		t.preciohasta = pPrecioHasta 
	where t.id = pTrabajoId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUsuario`(
	in pUsuarioId int, 
	in pApellido text, 
	in pNombre text, 
	in pEmail varchar(255), 
	in pTelefono text,
	in pPerfilActivo tinyint,
	in pProfesiones longtext,
	in pConoHabi longtext
)
begin
	declare vPerfilProfesionalId int;

	select id into vPerfilProfesionalId from tesis.perfil_profesional where usuarioid = pUsuarioId;

	update tesis.usuario set 
		apellido = pApellido, 
		nombre = pNombre, 
		email = pEmail, 
		telefono = pTelefono
	where id = pUsuarioId;

	if vPerfilProfesionalId is null then
		if pPerfilActivo = 1 then 
			call tesis.`insertPerfilProfesional`(pUsuarioId, pConoHabi, pProfesiones); 
		end if;
	else
		call tesis.`updatePerfilProfesional`(vPerfilProfesionalId, pConoHabi, pProfesiones, pPerfilActivo); 
	end if;

	select 1 ok;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-02 22:35:08
