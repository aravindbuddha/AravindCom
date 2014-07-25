<?php

/**
* Main API Class
*/
class API{
	function __construct(){
		$this->setHeaders();
	}
	//SET NORMAL HEADER
	function setHeaders(){
		header('Content-Type: application/json');
		header('Access-Control-Allow-Origin:*');
		header('Access-Control-Allow-Methods : GET, POST, PUT, DELETE, OPTIONS');
		header('Keep-Alive:timeout=2, max=100');
		header('Connection:Keep-Alive');
		header('Cache-Control:max-age=0, must-revalidate, no-cache, no-store');
		header('Vary:Accept-Encoding');
	  header('X-Server:Starman');
		header('X-Server-Time: '.time());
		header('Expires:Thu, 01 Jan 1970 00:00:00');
		header('X-FRAME-OPTIONS:DENY');
		header('X-XSS-Protection:1; mode=block');
	}


	function optionsHeader(){
		header ("content-type: text/xml");
		header('Access-Control-Allow-Origin:*');
		header('Access-Control-Allow-Methods : GET, POST, PUT, DELETE, OPTIONS');
		header('Access-Control-Allow-Headers:Access-Control-Request-Headers');
		header('Vary:Accept-Encoding');
		header('Keep-Alive:timeout=2, max=100');
		header('Connection:Keep-Alive');
		header('X-Server:Starman');
		header('X-Server-Time: '.time());
	}

	


}
new API();
?>


