-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 07 août 2022 à 16:31
-- Version du serveur : 5.7.36
-- Version de PHP : 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `electron_projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_deb` datetime DEFAULT NULL,
  `date_fin` datetime DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  `statut` varchar(10) DEFAULT NULL,
  `description` text,
  `transparence` varchar(15) DEFAULT NULL,
  `nbMaj` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `date_deb`, `date_fin`, `titre`, `location`, `categorie`, `statut`, `description`, `transparence`, `nbMaj`) VALUES
(7, '2022-08-08 00:00:00', '2022-08-10 00:00:00', 'marche en famille', 'Bretagne', 'randonnee', 'statut', 'balade en famille blabla super les vacances', 'transparence', 1),
(14, '2022-07-10 00:00:00', '2022-07-12 00:00:00', 'test_titre', 'paris', 'saut en parachute', 'jsp', 'saut en parachute pour la premiere fois blabla', 'transp', 1),
(23, '2022-08-14 00:00:00', '2022-08-20 00:00:00', 'eavgt', 'tegte', 'taggetege', 'teg', 'etg', 'htehte', 1),
(24, '2022-08-03 00:00:00', '2022-08-07 00:00:00', 'Voyage on sait pas où', 'gaaaa', 'gzzzzz', 'rrrrrrr', 'ggggerherhrehrehrehehehehrehrehrehrehre', 'ggyjyj', 19),
(28, '2022-09-21 00:00:00', '2022-09-23 00:00:00', 'efeaf', 'ggr', 'gar', 'age', 'eag', 'gra', 1),
(30, '2022-09-15 00:00:00', '2022-09-17 00:00:00', 'aefe', 'rth', 'zrth', 'zrh', 'zrh', 'zrh', 1),
(31, '2022-08-07 00:00:00', '2022-08-08 00:00:00', 'test 12345', 'tg', 'tg', 'tg', 'tgehtaeath', 'ahte', 1),
(35, '2022-07-31 00:00:00', '2022-08-06 00:00:00', 'aeggzrgyh', 'ae', 'tytjjteuy', 'jtejtej', 'etjt', 'tyej', 1),
(36, '2022-08-01 00:00:00', '2022-08-06 00:00:00', 'ilulmili', 'ui', 'liuf', 'filu', 'fli', 'fli', 1),
(42, '2022-12-01 00:00:00', '2022-12-04 00:00:00', 'ikikiki', '', '', '', '', '', 1),
(43, '2022-08-11 00:00:00', '2022-08-12 00:00:00', 'test 11 aout', 'teh', 'yje', 'yejdw', 'jeyiyl', 'uou', 2),
(46, '2022-08-01 00:00:00', '2022-08-14 00:00:00', 'thyrjrjyrjyrjyr', 'ety', 'etj', 'yi', 'oll', 'lo', 1),
(47, '2022-08-01 00:00:00', '2022-08-16 00:00:00', 'zrg', 'zgr', 'grz', 'rzg', 'rgz', 'rz', 1),
(56, '2022-08-01 00:00:00', '2022-08-03 00:00:00', 'il', 'uil', 'ilo', 'iùp', 'iùp', 'umi', 1),
(57, '2022-08-13 00:00:00', '2022-08-05 00:00:00', 'ththq', 'qeth', 'qeh', 'qyr', 'jqyr', 'qrytj', 1),
(58, '2022-08-05 00:00:00', '2022-08-20 00:00:00', 'teteette', 'ytrj', 'rjy', 'jry', 'rjy', 'yjr', 1),
(59, '2022-08-05 00:00:00', '2022-08-13 00:00:00', 'mpm', 'mp', 'pm', 'pm', 'pm', 'pm', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
