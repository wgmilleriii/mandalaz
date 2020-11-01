<?php

		$link = mysqli_init();
		
		$host="localhost";
		$user="root";
		$password="";
		$db="mandalaz";
		$port=3306;




		@ $exists = mysqli_real_connect(
		   $link, 
		   $host, 
		   $user, 
		   $password, 
		   $db,
		   $port
		) ;

		if (!$exists) {
			echo "DB doesn't exist<BR>" + mysqli_error($link);
		} else {
			echo "Connected";
		}