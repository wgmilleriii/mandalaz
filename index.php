<?
$r=rand()*100000;
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Post</title>
		<script src="js/jquery-2.1.4.min.js"></script>
		<link rel="stylesheet" href="css/post.css?r=<? echo $r ?>" />
		<link rel="stylesheet" href="css/svg.css?r=<? echo $r ?>" />
		<script src="js/svgs.js?r=<? echo $r ?>"></script>
		<script src="js/post.js?r=<? echo $r ?>"></script>

<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">

	</head>
	<body>
         <div id="nonprint">
          
          

		<div id="nav" style="width:100%; position:relative; ">
			<div class="logins menu active"   nav="loginUser">Login</div>
			<div class="logins menu inactive" nav="createUser">Create Account</div>
			<div class="mymenu menu inactive" nav="myAccount">My Account</div>
			<div class="mymenu menu inactive" nav="myMandalas">My Mandalaz</div>
			<div class="mymenu menu inactive" nav="community" id="btnCommunity">Community</div>

			<div style="position:absolute; top:-30px; right:0px">
			<span id="message3">
				
			</span>
			</div>
		</div>

		<div id="loginUser">
			<div>
				<label><span>Username:</span><input type="text" id="username" value="" /></label>
			</div>
			<div>
				<label><span>Password:</span><input type="password" id="password" value="" /></label>
			</div>
			<div>
				<input type="button" class="btnAction" id="btnLogin" value="Login" /> <span id="message" class="feedback"></span>
			</div>
		</div>


		<div id="createUser">
			<div>
				<label><span>Username:</span><input type="text" id="username2" value="" /></label>
			</div>
			<div class="smaller">
				<label><span>Password:</span><input type="password" id="password2" value="" /></label>
			</div>
			<div class="smaller">
				<label><span>Password again:</span><input type="password" value="" id="password3" /></label>
			</div>			
			<div class="normal">
				<label><span>Full name or screen name:</span><input value="" type="text" id="fullname" /></label>
			</div>			
			<div>
				<input type="button"  class="btnAction" id="btnCreate" value="Create" /> <span id="message2" class="feedback"></span>
			</div>
		</div>

		<div id="myAccount">

			<div id="myInfo">
Last logged in: Yesterday<BR>
Member since: June 4, 2010<BR>
Mandalas created: 104<BR>
Average rating: 4.5<BR>

			</div>
		</div>

		<div id="myMandalas">
			<div id="newMandala">
				<label><span>New Mandala</span><input value="" placeholder="New Mandala Name" type="text" id="mandalaname" /></label>

			</div>
			<div>
				<input type="button"  class="btnAction" id="btnNewMandala" value="Create" /> <span id="message4" class="feedback"></span>
			</div>
			<div id="myTitle">
				My mandalas
			</div>
			<div id="listMandalas">123</div>
		</div>

		<div id="community">
			loading...
		</div>
		<div id="scriptResults">
		</div>

	</div>
		<div id="printable">
		</div>

	</body>
</html>