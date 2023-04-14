-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-04-2023 a las 15:44:13
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
-- Estructura de tabla para la tabla `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `content` varchar(280) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `image` varchar(200) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `post_FK` (`post_id`) USING BTREE,
  KEY `users_FK` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`ID`, `post_id`, `user_id`, `content`, `image`, `date`) VALUES
(1, 39, 17, 'comentario de prueba', '', '2023-04-13 10:18:40'),
(2, 39, 20, 'Otrooo comentario oleee', '', '2023-04-13 11:16:40'),
(3, 39, 17, 'Hola!', '', '2023-04-13 11:40:08'),
(4, 30, 17, 'Pues si va bien si jajaajaj', '', '2023-04-13 11:41:26'),
(121, 19, 17, 'sizeof', '', '2023-04-14 09:00:05'),
(120, 19, 17, 'nice', '', '2023-04-14 08:59:48'),
(119, 19, 17, 'vaquerooo', '', '2023-04-14 08:59:31'),
(9, 19, 17, 'Pues si, está sin foto jajaja', '', '2023-04-13 11:52:44'),
(10, 28, 17, 'no va como yo quiero', '', '2023-04-13 11:57:01'),
(118, 20, 17, 'a ver esto', '', '2023-04-14 08:58:10'),
(147, 36, 16, 'Nice nicolas', '', '2023-04-14 15:39:30'),
(51, 33, 17, 'tio no asi no', '', '2023-04-13 15:08:44'),
(114, 26, 17, 'vaya vaya', '', '2023-04-14 08:56:18'),
(113, 28, 17, 'nailed it', '', '2023-04-14 08:55:06'),
(41, 37, 17, 'true', '', '2023-04-13 15:03:41'),
(37, 27, 17, 'pisale', '', '2023-04-13 14:25:12'),
(117, 22, 17, 'a ver', '', '2023-04-14 08:57:32'),
(116, 22, 17, 'Pues tampoco XD', '', '2023-04-14 08:57:20'),
(115, 23, 17, 'ahora sii coooño', '', '2023-04-14 08:56:57'),
(106, 28, 17, 'sionooo', '', '2023-04-14 08:40:27'),
(146, 43, 16, 'Pero que AJAJAJAJ', '', '2023-04-14 15:37:46'),
(107, 25, 17, 'vaya', '', '2023-04-14 08:42:53'),
(59, 42, 17, 'ahora como va', '', '2023-04-13 15:15:01'),
(112, 29, 17, 'navío', '', '2023-04-14 08:54:18'),
(111, 29, 17, 'niña', '', '2023-04-14 08:53:11'),
(110, 30, 17, 'viva piñata', '', '2023-04-14 08:51:32'),
(109, 33, 17, 'como va esto', '', '2023-04-14 08:49:41'),
(108, 42, 17, 'París', '', '2023-04-14 08:46:46'),
(66, 25, 17, 'ye', '', '2023-04-13 15:21:00'),
(68, 23, 17, 'no entiendo', '', '2023-04-13 15:21:34'),
(83, 30, 17, 'Hola a ti tambien', '', '2023-04-14 07:56:18'),
(82, 39, 17, 'macadamia', '', '2023-04-14 07:55:41'),
(80, 18, 17, 'viva españa', '', '2023-04-13 15:42:15'),
(81, 33, 17, 'como va esto jajajaja', '', '2023-04-14 07:50:53'),
(124, 21, 17, 'Por fin funciona!', '', '2023-04-14 09:01:31'),
(76, 42, 17, 'aaaaa', '', '2023-04-13 15:38:47'),
(145, 43, 16, 'Muy bien Diego! Que tal tú?', '', '2023-04-14 15:37:34'),
(122, 18, 17, 'valiente', '', '2023-04-14 09:01:02'),
(125, 18, 17, 'parsed', '', '2023-04-14 09:02:20'),
(126, 37, 17, 'perfecto', '', '2023-04-14 09:02:58'),
(132, 36, 21, 'niiiiñoooo', '', '2023-04-14 09:41:36'),
(131, 43, 21, 'va perfe', '', '2023-04-14 09:36:36'),
(130, 43, 21, 'comentario sin imagen', '', '2023-04-14 09:36:31'),
(142, 45, 17, 'Puffa', '', '2023-04-14 12:55:02'),
(134, 36, 21, 'pa ti no esta mal', '', '2023-04-14 09:42:49'),
(141, 35, 21, 'Fresca como una lechuga siono', '', '2023-04-14 09:44:58'),
(137, 37, 21, 'pipas pal pajaro', '', '2023-04-14 09:43:56'),
(140, 35, 21, 'Irala que maquina jaja', '', '2023-04-14 09:44:51'),
(143, 28, 17, 'pipas', '', '2023-04-14 14:12:23'),
(144, 27, 17, 'mikael', '', '2023-04-14 14:13:07'),
(150, 37, 16, 'filtrar por grupo', '', '2023-04-14 15:42:31');

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
) ENGINE=MyISAM AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

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
(54, 17, 33, '2023-04-13 07:47:10'),
(42, 20, 32, '2023-04-12 14:51:17'),
(48, 22, 33, '2023-04-12 15:17:06'),
(46, 21, 33, '2023-04-12 15:15:59'),
(43, 20, 35, '2023-04-12 14:51:26'),
(40, 20, 33, '2023-04-12 14:50:20'),
(49, 22, 35, '2023-04-12 15:17:16'),
(65, 17, 39, '2023-04-13 11:44:01'),
(66, 17, 42, '2023-04-13 12:00:19'),
(69, 21, 42, '2023-04-14 09:33:40'),
(70, 21, 35, '2023-04-14 09:46:00'),
(71, 17, 26, '2023-04-14 12:57:19'),
(73, 20, 42, '2023-04-14 14:38:36'),
(74, 16, 42, '2023-04-14 14:42:00'),
(75, 16, 33, '2023-04-14 14:42:03'),
(76, 16, 35, '2023-04-14 14:42:04'),
(77, 16, 30, '2023-04-14 14:42:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(280) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `user_FK` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

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
(35, 19, 'aqui con la yaya que maquina jajajaa', 'http://localhost/yoenmi/media/user-uploads/12.04.2023.13.44.50.jpg', '2023-04-12 13:44:50'),
(36, 20, 'Bueno no esta mal', '', '2023-04-12 13:56:40'),
(37, 22, 'Mi primera publicación. ¿Qué tal estáis?', '', '2023-04-12 15:23:37'),
(46, 17, 'funciona chicha', '', '2023-04-14 14:37:23'),
(47, 20, 'Salud y republica!', '', '2023-04-14 14:38:55'),
(48, 16, 'Ostias no me acordaba de la contraseña jajajaja', '', '2023-04-14 14:41:55'),
(41, 0, 'ah bueno', '', '2023-04-13 11:27:49'),
(42, 17, 'nina montes', '', '2023-04-13 12:00:04'),
(43, 21, 'Como va estoooo', '', '2023-04-14 09:33:24');

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
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

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
