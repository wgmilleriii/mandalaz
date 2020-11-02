<?php

// Step 1. Connect to the database.

$link = mysqli_init();

$host="localhost";
$user="root";
$password="root";
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
	echo "Error connecting.";
	die();
} 


// Step 2. Determine the action
$action="";
if (isset($_GET["action"])) {
	$action=$_GET["action"];	
} 

switch ($action) {
	case "login":
		login();
		break;
	case "createUser":
		createUser();
		break;
}

// Step 3. Do the stuff.

function dosql($sql) {
	global $link;
	$result=mysqli_query($link,$sql);
	
	return $result;

}

function login() {
	$username=safe($_GET["username"]);
	$password=safe($_GET["password"]);

	$sql="select * from users where username='%s' and password='%s'";
	$sql=sprintf($sql, $username, $password);
	$result=dosql($sql);
	$userid=0;
	while($row = mysqli_fetch_array($result)) { 
		$userid=$row["userid"];
		$fullname=$row["fullname"];
	}
	
	if ($userid>0) {
		?>
<script>
goodLogin(<? echo $userid ?>, "<? echo $fullname ?>");
</script>
		<?
	} else {
		?>
<script>
badLogin();
</script>
		<?
	}

}



// useful functions
function safe($s) {
	
	$s=str_replace("'","",$s);
	return $s;
}