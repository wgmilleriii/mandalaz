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
	case "rate":
		rate();
		break;

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


function rate() {
	$mandalaid=$_POST["mandalaid"];
	$userid=$_SESSION["userid"];
	$ranking=$_POST["ranking"];

	// it's not mine;
	$sql="delete from user_ranking where mandalaid=%s and userid=%s";
	$sql=sprintf($sql, $mandalaid, $userid);
	$result=dosql($sql);

	$sql="insert into user_ranking (mandalaid, userid, ranking) values (%s, %s, %s)";
	$sql=sprintf($sql, $mandalaid, $userid, $ranking);
	// echo $sql;
	$result=dosql($sql);
	if ($result>0) {
		// echo 1;
	}	 else {
		// echo 0;
	}
	
	// $detail=str_replace("'","''",$detail);

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
	$sql="
select mandala.*,
ifnull(a.is_fav,0) as is_fav,
ifnull(b.ranking,0) as ranking,
ifnull(c.cnt,0) as cnt,
ifnull(c.avg_ranking, 0) as avg_ranking
 from mandala 
left join 
( 
select mandalaid, 1 as is_fav
from user_favorite 
where userid=%s
) a
using (mandalaid)
left join 
(
select user_ranking.ranking, mandalaid
from user_ranking
where userid=%s
) b
using (mandalaid)
left join
(
select count(user_ranking.id) as cnt, avg(ranking)  as avg_ranking, mandalaid
from user_ranking
where userid<>%s
group by mandalaid

)
c
using (mandalaid)

where mandala.userid=%s
and mandala.is_trash=0
 order by mandala.createddt desc;

	";

	$sql=sprintf($sql, $userid, $userid, $userid, $userid);

	// echo $sql;

	$result=dosql($sql);
	while($row = mysqli_fetch_array($result)) { 
		$s="<script>addMandala('%s',%s, %s, '%s', %s, %s); </script>";
		$s=sprintf($s,$row["mname"],$row["mandalaid"],$row["is_favorite"], $row["createddt"], $row["cnt"], $row["avg_ranking"]);
		echo $s;

		$ranking=$row["ranking"];
		$sheader='<svg transform="scale(1, -1)" width="800" height="600" id="svgb" viewBox="-400 -300 800 600">';
		$s="<div class=preview mandalaid=%s>%s%s</svg></div>";
		$s=sprintf($s, $row["mandalaid"],$sheader,$row["svg"]);
		$checked5=( $ranking==5 ? "checked" : "" ) ;
		$checked4=( $ranking==4 ? "checked" : "" ) ;
		$checked3=( $ranking==3 ? "checked" : "" ) ;
		$checked2=( $ranking==2 ? "checked" : "" ) ;
		$checked1=( $ranking==1 ? "checked" : "" ) ;

		$s.=sprintf("<div class=cl><div class=rating mandalaid=%s>
<fieldset class=rating>
                                <input type=radio 
                                $checked5
                                class=field1_star5 name=rating1 value=5 /><label class = full for=field1_star5></label>
                                
                                <input type=radio 
                                $checked4
                                class=field1_star4 name=rating1 value=4 /><label class = full for=field1_star4></label>
                                
                                <input type=radio 
                                $checked3
                                class=field1_star3 name=rating1 value=3 /><label class = full for=field1_star3></label>
                                
                                <input type=radio 
                                $checked2
                                class=field1_star2 name=rating1 value=2 /><label class = full for=field1_star2></label>
                                
                                <input type=radio 
                                $checked1
                                class=field1_star1 name=rating1 value=1 /><label class = full for=field1_star1></label>
                                
                            </fieldset>
                            </div></div>",$row["mandalaid"]);
		echo $s;
		$s=sprintf("<script>
highlightstar($('div[mandalaid=%s] .field1_star%s'));
		</script>",$row["mandalaid"], $ranking);
		echo $s;
	}

}

function community() {
	$userid=$_SESSION["userid"];
	$sql="select mandala.*, users.fullname,
ifnull(a.is_fav,0) as favid,
ifnull(b.ranking,0) as ranking,
ifnull(c.cnt,0) as cnt,
ifnull(c.avg_ranking, 0) as avg_ranking
 from mandala 
 inner join users using (userid)
left join 
( 
select mandalaid, 1 as is_fav
from user_favorite 
where userid=%s
) a
using (mandalaid)
left join 
(
select user_ranking.ranking, mandalaid
from user_ranking
where userid=%s
) b
using (mandalaid)
left join
(
select count(user_ranking.id) as cnt, avg(ranking)  as avg_ranking, mandalaid
from user_ranking
group by mandalaid

)
c
using (mandalaid)

where mandala.userid<>%s
and mandala.is_published=1
and mandala.is_trash=0
	 order by mandala.createddt desc;";
	$sql=sprintf($sql, $userid, $userid, $userid);
	$result=dosql($sql);
	

	
	while($row = mysqli_fetch_array($result)) { 
	
		$sheader='<svg transform="scale(1, -1)" width="800" height="600" id="svgb" viewBox="-400 -300 800 600">';
		$s="<div class=preview mandalaid=%s>%s%s</svg></div>";
		$s=sprintf($s, $row["mandalaid"],$sheader,$row["svg"]);
		echo $s;
	$s="<script>addComMandala('%s','%s','%s',%s, %s, %s, %s, %s); </script>";

		$s=sprintf($s,$row["mname"],$row["createddt"],$row["fullname"],$row["mandalaid"],$row["favid"],$row["ranking"], $row["cnt"], $row["avg_ranking"]);
		echo $s;
		$ranking=$row["ranking"];
$checked5=( $ranking==5 ? "checked" : "" ) ;
		$checked4=( $ranking==4 ? "checked" : "" ) ;
		$checked3=( $ranking==3 ? "checked" : "" ) ;
		$checked2=( $ranking==2 ? "checked" : "" ) ;
		$checked1=( $ranking==1 ? "checked" : "" ) ;

		$s=sprintf("<div class=rating mandalaid=%s>
<fieldset class=rating>
                                <input type=radio 
                                $checked5
                                class=field1_star5 name=rating1 value=5 /><label class = full for=field1_star5></label>
                                
                                <input type=radio 
                                $checked4
                                class=field1_star4 name=rating1 value=4 /><label class = full for=field1_star4></label>
                                
                                <input type=radio 
                                $checked3
                                class=field1_star3 name=rating1 value=3 /><label class = full for=field1_star3></label>
                                
                                <input type=radio 
                                $checked2
                                class=field1_star2 name=rating1 value=2 /><label class = full for=field1_star2></label>
                                
                                <input type=radio 
                                $checked1
                                class=field1_star1 name=rating1 value=1 /><label class = full for=field1_star1></label>
                                
                            </fieldset>
                            </div>",$row["mandalaid"]);
		echo $s;
		$s=sprintf("<script>
highlightstar($('div[mandalaid=%s] .field1_star%s'));
		</script>",$row["mandalaid"], $ranking);
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
		if (!$result) {
			echo mysqli_error($link);
		}
		return $result;
	}
}
