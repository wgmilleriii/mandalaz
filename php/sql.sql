CREATE TABLE `mandalaz`.`users` (
	`userid` INT NOT NULL AUTO_INCREMENT ,
	`username` VARCHAR(50) NOT NULL ,
	`password` VARCHAR(50) NOT NULL ,
	`fullname` VARCHAR(50) NOT NULL ,
	PRIMARY KEY (`userid`)) ENGINE = InnoDB;


CREATE TABLE `mandalaz`.`mandala` (
	`mandalaid` INT NOT NULL AUTO_INCREMENT ,
	 `userid` INT NOT NULL ,
	 `mname` VARCHAR(50) NOT NULL ,
	 PRIMARY KEY (`mandalaid`)) ENGINE = InnoDB;



DROP TABLE if exists mandala_details;
CREATE TABLE `mandalaz`.`mandala_details` (
	`mandala_detailsid` INT NOT NULL AUTO_INCREMENT ,
 	`mandalaid` INT NOT NULL ,
 	`details` varchar(255) not null,
	INDEX `ix_mandala_details_mandalaid` (mandalaid), 	

 PRIMARY KEY (`mandala_detailsid`)) ENGINE = InnoDB;


ALTER TABLE mandala 
ADD	INDEX `ix_mandala_userid` (userid);

ALTER TABLE mandala 
ADD	COLUMN is_published tinyint DEFAULT 0,
ADD	COLUMN is_trash tinyint DEFAULT 0,
ADD	COLUMN is_favorite tinyint DEFAULT 0;



ALTER TABLE mandala 
ADD	COLUMN svg TEXT NULL;


CREATE TABLE `mandalaz`.`user_favorite` (
	`id` INT NOT NULL AUTO_INCREMENT ,
	 `userid` INT NOT NULL ,
	 `mandalaid` INT NOT NULL ,
	 INDEX `ix_user_favorite_userid` (userid), 	
	 INDEX `ix_user_favorite_mandalaid` (mandalaid), 
	 createddt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,	
	 PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `mandalaz`.`user_ranking` (
	`id` INT NOT NULL AUTO_INCREMENT ,
	 `userid` INT NOT NULL ,
	 `mandalaid` INT NOT NULL ,
	 `ranking` tinyint NOT NULL,
	 INDEX `ix_user_ranking_userid` (userid), 	
	 INDEX `ix_user_ranking_mandalaid` (mandalaid), 
	 createddt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,	
	 PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE users
ADD	COLUMN lastlogin DATETIME,
ADD	COLUMN createddt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


ALTER TABLE mandala 
ADD	COLUMN createddt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


ALTER TABLE mandala 
MODIFY	COLUMN svg MEDIUMTEXT NULL;
