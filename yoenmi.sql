-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 12-04-2023 a las 15:43:42
-- Versión del servidor: 8.0.31
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `yoenmi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `post_id` bigint NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `user_FK` (`user_id`),
  KEY `post_FK` (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`ID`, `user_id`, `post_id`, `date`) VALUES
(25, 19, 33, '2023-04-12 13:52:45'),
(24, 19, 30, '2023-04-12 13:52:45'),
(26, 19, 27, '2023-04-12 13:52:45'),
(21, 19, 32, '2023-04-12 13:52:45'),
(23, 19, 29, '2023-04-12 13:52:45'),
(18, 17, 29, '2023-04-12 13:52:45'),
(17, 17, 30, '2023-04-12 13:52:45'),
(44, 17, 27, '2023-04-12 14:51:50'),
(27, 19, 31, '2023-04-12 13:52:45'),
(47, 17, 33, '2023-04-12 15:16:22'),
(42, 20, 32, '2023-04-12 14:51:17'),
(48, 22, 33, '2023-04-12 15:17:06'),
(46, 21, 33, '2023-04-12 15:15:59'),
(43, 20, 35, '2023-04-12 14:51:26'),
(40, 20, 33, '2023-04-12 14:50:20'),
(49, 22, 35, '2023-04-12 15:17:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `posts_fk` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`ID`, `user_id`, `content`, `image`, `date`) VALUES
(21, 17, 'Ahora voy a subir un post con foto', 'http://localhost/yoenmi/media/user-uploads/11.04.2023.09.26.33.png', '2023-04-11 09:26:33'),
(20, 17, 'Que pasa que ahora siempre saca la misma foto XD', '', '2023-04-11 09:09:12'),
(19, 17, 'Ahora sin foto', '', '2023-04-11 09:08:51'),
(18, 17, 'Probemos otra vez', 'http://localhost/yoenmi/media/user-uploads/11.04.2023.09.08.22.jpg', '2023-04-11 09:08:22'),
(22, 17, 'Y ahora otro post SIN foto', '', '2023-04-11 09:26:43'),
(23, 17, 'Ultima actualizacion', '', '2023-04-11 09:29:58'),
(24, 18, 'Hola!', '', '2023-04-11 09:32:28'),
(25, 17, 'Va esto bien o que jajajaja', '', '2023-04-11 10:55:02'),
(26, 17, 'Post con foto', 'http://localhost/yoenmi/media/user-uploads/11.04.2023.10.55.26.jpg', '2023-04-11 10:55:26'),
(27, 17, 'Ole oleeeeeeeee', '', '2023-04-11 10:55:36'),
(28, 17, 'Vaya hombre primo', '', '2023-04-11 11:05:33'),
(29, 17, 'Hola Diego', '', '2023-04-11 13:10:04'),
(30, 17, 'Wow esto va fino!', '', '2023-04-11 15:28:27'),
(31, 19, 'LLegó el carlitros!! El mejor supija', '', '2023-04-12 11:58:10'),
(32, 19, 'Que se cuenta el Leo jajaja', '', '2023-04-12 11:58:26'),
(33, 17, 'Pues na aqui estamos mano', '', '2023-04-12 13:05:09'),
(34, 19, 'Va bien esto o que', '', '2023-04-12 13:07:44'),
(35, 19, 'aqui con la yaya que maquina jajajaa', 'http://localhost/yoenmi/media/user-uploads/12.04.2023.13.44.50.jpg', '2023-04-12 13:44:50'),
(36, 20, 'Bueno no esta mal', '', '2023-04-12 13:56:40'),
(37, 22, 'Mi primera publicación. ¿Qué tal estáis?', '', '2023-04-12 15:23:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`ID`, `Nombre`, `password`, `avatar`, `username`) VALUES
(20, 'Miguel Hermida', '$2y$12$.QaLGM4a7qjc84ii1k9i6etUgvdiaJga2HXdaVF15vgxsSnp52Gyi', 'http://localhost/yoenmi/media/user-uploads/12.04.2023.13.55.33.jpg', 'miki'),
(19, 'Carlos Sanchez', '$2y$12$HAbC.OHOzLnEieYBgVU1POQaRswDkQfPD2U/lO2flja4pSPs4njEi', 'http://localhost/yoenmi/media/user-uploads/12.04.2023.11.57.47.jpg', 'carlitros'),
(17, 'Leo', '$2y$12$n4NbQ221KGqHHlOh6FGWDeehieJaxnQ0CYpz.E83jVia/oRTS3xgW', 'http://localhost/yoenmi/media/user-uploads/7G364PMCSFGIHFZNHHJLNQL4SU.avif', 'messi'),
(16, 'Pablo', '$2y$12$tPIq8wKEIr0bcdrL80Ke7uvY5ZTojogXap389br1nGPvzzftgb7MW', 'http://localhost/yoenmi/media/user-uploads/imagen_perfil.webp', 'pau'),
(21, 'Diego', '$2y$12$TjvuJ7rvSAyZl7RItXbLX.T6k6VpvuYgigOVOOtfz9FOf.lbUGuma', 'http://localhost/yoenmi/media/user-uploads/12.04.2023.15.15.35.jpg', 'diego'),
(22, 'Freddie Mercury', '$2y$12$hh2ZqoVLc8bGvDtFDU2FLeNeV3ztOciHkdLq1DDcmDA0rRSpRqxuy', 'http://localhost/yoenmi/media/user-uploads/12.04.2023.15.16.50.webp', 'freddie');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
