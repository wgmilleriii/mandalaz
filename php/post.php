<?php
session_start();

if (!isset($_SESSION["userid"])) $_SESSION["userid"]=0;
//print_r($_SERVER);
// Step 1. Connect to the database.

$link = mysqli_init();

$host="localhost";
$user="root";
$password="root";
$db="mandalaz";
$port=3306;

if ($_SERVER["SERVER_NAME"]=="piano.interlochen.org") {
$user="mandalaz";
$password="mandalaz11!!";

}
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
	case "publish":
		publish();
		break;
	case "heart":
		heart();
		break;

	case "delete":
		delete();
		break;

	case "saveStep":
		saveStep();
		break;

	case "loaddetails":
		loaddetails();
		break;

	case "load":
		load();
		break;

	case "newmandala":
		newmandala();
		break;
	case "login":
		login(0);
		break;
	case "remember":
		login(1);
		break;
	case "logout":
		logout();
		break;
	case "create":
		create();
		break;
	case "listmandalas":
		listmandalas();
		break;
	case "community":
		community();
		break;
}



// Step 3. Do the stuff.

function logout() {
	session_destroy();
	?>
<script>
logout();
</script>

	<?
}


function heart() {
	
	$mandalaid=$_GET["mandalaid"];
	$userid=$_SESSION["userid"];
	$heart=$_GET["hearted"];

	$muserid=getordinal("select userid from mandala where mandalaid=$mandalaid");

	if ($muserid==$userid) {
		// it's mine.
		$sql="update mandala set is_favorite=%s where mandalaid=%s and userid=%s";
		$sql=sprintf($sql, $heart, $mandalaid, $userid);
		$result=dosql($sql);
	} else {
		// it's not mine;
		$sql="delete from user_favorite where mandalaid=%s and userid=%s";
		$sql=sprintf($sql, $mandalaid, $userid);
		$result=dosql($sql);

		if ($heart==1) {
			$sql="insert into user_favorite (mandalaid, userid) values (%s, %s)";
			$sql=sprintf($sql, $mandalaid, $userid);
			$result=dosql($sql);
			
		}
		$result=1;

	}
	// $detail=str_replace("'","''",$detail);
	
	
	
	if ($result==1) {
		?>
<script>
makeHeart(<? echo $mandalaid ?>, <? echo $heart ?>); 
</script>
		<?
	}

}


function saveStep() {
	$mandalaid=$_SESSION["mandalaid"];
	$detail=$_GET["detail"];
	// $detail=str_replace("'","''",$detail);
	$sql="insert into mandala_details (mandalaid, details)
	values (%s, '%s') ";
	$sql=sprintf($sql,  $mandalaid, $detail);
	$result=dosql($sql);
	echo $result;

}

function publish() {
	$mandalaid=$_SESSION["mandalaid"];
	$svg=$_POST["svg"];
	$sql="update mandala set is_published=1, svg='%s' where mandalaid=%s";
	$sql=sprintf($sql,  $svg, $mandalaid);
	$result=dosql($sql);
	?>
<script>
	<?
	if ($result==1) {
?>
isPublished();
<?
	} else {
?>
isNotPublished();
<?
	}
	

?>
</script>
<?
}



function loaddetails() {
	?>
<script>
	<?

	$mandalaid=$_SESSION["mandalaid"];
	$sql="select * from mandala  where  mandalaid=%s  ";
	$sql=sprintf($sql,  $mandalaid);
	$result=dosql($sql);
	while($row = mysqli_fetch_array($result)) { 
		if ($row["is_published"]==1) {
		?>isPublished();
		<?
		}
	}


	$sql="select * from mandala_details where  mandalaid=%s order by mandala_detailsid ";
	$sql=sprintf($sql,  $mandalaid);
	$result=dosql($sql);
	while($row = mysqli_fetch_array($result)) { 
		?>addHistory('<? echo $row['details'] ?>');
		<?
	}

?>
scrollHistory();
</script>
<?
}



function delete() {
	$userid=$_SESSION["userid"];
	$mandalaid=$_GET["mandalaid"];
	$sql="update mandala set is_trash=1 where userid=%s and mandalaid=%s ";
	$sql=sprintf($sql, $userid, $mandalaid);
	$result=dosql($sql);
	?>		
<script>
listMyMandalas();
</script>
		<?
	}

function load() {
	$userid=$_SESSION["userid"];
	$mandalaid=$_GET["mandalaid"];
	$sql="select * from mandala where userid=%s and mandalaid=%s ";
	$sql=sprintf($sql, $userid, $mandalaid);
	$result=dosql($sql);
	?>		
<script>
<?
	while($row = mysqli_fetch_array($result)) { 
		$_SESSION["mandalaid"]=$row["mandalaid"];
		?>launch()<?
	}

?>
</script>
		<?
	}

function listmandalas() {
	$userid=$_SESSION["userid"];
	$sql="select * from mandala where is_trash=0 and userid=%s order by mname";
	$sql=sprintf($sql, $userid);
	$result=dosql($sql);
	while($row = mysqli_fetch_array($result)) { 
		$s="<script>addMandala('%s',%s, %s); </script>";
		$s=sprintf($s,$row["mname"],$row["mandalaid"],$row["is_favorite"]);
		echo $s;
		$sheader='<svg transform="scale(1, -1)" width="800" height="600" id="svgb" viewBox="-400 -300 800 600">';
		$s="<div class=preview mandalaid=%s>%s%s</svg></div>";
		$s=sprintf($s, $row["mandalaid"],$sheader,$row["svg"]);
		echo $s;
	}

}

function community() {
	$userid=$_SESSION["userid"];
	$sql="select mandala.*, users.fullname, 
	ifnull(user_favorite.id,0) as favid, ifnull(user_ranking.ranking,0) as ranking
	from mandala inner join users using(userid) 
	left join user_favorite using(mandalaid)
	left join user_ranking using(mandalaid)
	where is_trash=0 and is_published=1 and mandala.userid<>%s 
		and 
		(user_favorite.userid=%s or user_favorite.userid is null )
		and 
		(user_ranking.userid=%s or user_ranking.userid is null)
	 order by mandala.createddt desc;";
	$sql=sprintf($sql, $userid, $userid, $userid);
	$result=dosql($sql);

	// echo $sql;
	while($row = mysqli_fetch_array($result)) { 
		$s="<script>addComMandala('%s','%s','%s',%s, %s, %s); </script>";

		$s=sprintf($s,$row["mname"],$row["createddt"],$row["fullname"],$row["mandalaid"],$row["favid"],$row["ranking"]);
		echo $s;
		$sheader='<svg transform="scale(1, -1)" width="800" height="600" id="svgb" viewBox="-400 -300 800 600">';
		$s="<div class=preview mandalaid=%s>%s%s</svg></div>";
		$s=sprintf($s, $row["mandalaid"],$sheader,$row["svg"]);
		echo $s;
	}

}

function newmandala() {
	$name=safe($_GET["name"]);
	$userid=$_SESSION["userid"];
	$sql="insert into mandala (mname, userid) values ('%s',%s)";

	$sql=sprintf($sql, $name, $userid);
	$mandalaid=dosql($sql);
	$_SESSION["mandalaid"]=$mandalaid;
		?>
		
<script>
mandalaCreated('<? echo $name ?>');
</script>
		<?
	}



function create() {
	$username=safe($_POST["username"]);
	$password=safe($_POST["password"]);
	$fullname=safe($_POST["fullname"]);

	$sql="select * from users where username='%s'";
	$sql=sprintf($sql, $username);
	echo $sql;
	$result=dosql($sql);
	$userid=0;

	while($row = mysqli_fetch_array($result)) { 
		$userid=$row["userid"];
		$fullname=$row["fullname"];
	}
	
	if ($userid>0) {
		?>
		
<script>
accountExists();
</script>
		<?
	} else {
		$sql="insert into users (username, password, fullname) values ('%s','%s','%s')";

	$sql=sprintf($sql, $username, $password, $fullname);
	$userid=dosql($sql);
	$_SESSION["userid"]=$userid;
	$_SESSION["fullname"]=$fullname;
	$_SESSION["username"]=$username;

		?>
		
<script>
welcome("<? echo $fullname ?>");
</script>
		<?
	}

}

function login($remember) {

	if ($remember==1) {
		$sql="select * from users where userid=" . $_SESSION["userid"];
		
	} else {
		$username=safe($_POST["username"]);
		$password=safe($_POST["password"]);

		$sql="select * from users where username='%s' and password='%s'";
		$sql=sprintf($sql, $username, $password);

	}
	$result=dosql($sql);
	$userid=0;

	while($row = mysqli_fetch_array($result)) { 
		$userid=$row["userid"];
		$fullname=$row["fullname"];

	}
	
	if ($userid>0) {
		$_SESSION["userid"]=$userid;
		?>
		
<script>
welcome("<? echo $fullname ?>");
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


function getordinal($sql) {

		$result=dosql($sql);
		$val="";
		while ($row = $result->fetch_array()) {
			    $val=$row[0];
			}
			
		return $val;
	}

function dosql($sql) {
	global $link;
	$result=mysqli_query($link,$sql);
	
	if (strpos($sql,"insert")===0) {
		if (!$result) {
			return mysqli_error($link);
		}
		return mysqli_insert_id($link);
	} elseif (strpos($sql,"update")===0) { 
		if (!$result) {
			return mysqli_error($link);
		}
		return 1;
	} else {
		return $result;
	}
}
