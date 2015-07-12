<?php
	session_start();
	if(!isset($_SESSION['login']) and empty($_SESSION['login'])){
		header('Location:login.php');
	}

?>