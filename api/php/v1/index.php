<?php
require '../lib/Slim/Slim.php';
require '../includes/helper.php';
require "../lib/dhx/data_connector.php";
require "../lib/dhx/db_mssql.php";
\Slim\Slim::registerAutoloader();
$dhxCon="";

$app = new \Slim\Slim(array(
    'http.version' => '1.1',
    'mode' => 'development',//enum{production,development}
    'debug' => true
));
//get database
$db=$app->request->get('database');

if($db==""){
   fail("batabase must not be empty");
}else{
    define('DB_NAME', 'MAPTEST');
    include '../includes/db.php';
    $dhxCon = new JSONDataConnector($connection,"MsSQL");
    //$dhxCon->render_complex_sql("exec usp_findusers 'John'", "id","name,surname,age,address,phone");
}



$resource=$app->request->getResourceUri();
$arr=explode("/", $resource);
$router=$arr[1];
include 'routers/'.$router.'.php';
$app->run();

