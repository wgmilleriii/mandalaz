CREATE TABLE `mandalaz`.`users` ( `userid` INT NOT NULL AUTO_INCREMENT , `username` VARCHAR(50) NOT NULL , `password` VARCHAR(50) NOT NULL , `fullname` VARCHAR(50) NOT NULL , PRIMARY KEY (`userid`)) ENGINE = InnoDB;

CREATE TABLE `mandalaz`.`mandala` ( `mandalaid` INT NOT NULL AUTO_INCREMENT , `userid` INT NOT NULL , `mname` VARCHAR(50) NOT NULL , PRIMARY KEY (`mandalaid`)) ENGINE = InnoDB;

