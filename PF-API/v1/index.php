<?php
// require '../lib/Slim/Slim.php';
// // require '../includes/helper.php';
// // require "../lib/dhx/data_connector.php";
// // require "../lib/dhx/db_mssql.php";
// \Slim\Slim::registerAutoloader();
// // $dhxCon="";

// $app = new \Slim\Slim(array(
//     'http.version' => '1.1',
//     'mode' => 'development',//enum{production,development}
//     'debug' => true
// ));


// $app->get('/', function ($name) {
//     echo "Hello";
// });
// $app->run();


//get database
// $db=$app->request->get('database');

// if($db==""){
//    fail("batabase must not be empty");
// }else{
//     define('DB_NAME', 'MAPTEST');
//     include '../includes/db.php';
//     $dhxCon = new JSONDataConnector($connection,"MsSQL");
//     //$dhxCon->render_complex_sql("exec usp_findusers 'John'", "id","name,surname,age,address,phone");
// }


// $resource=$app->request->getResourceUri();
// $arr=explode("/", $resource);
// $router=$arr[1];
// if(empty($router)){
// 	$router = 'home';
// }
// include 'routers/'.$router.'.php';
// $app->run();

class App { 

  // singleton instance 
  // private static $instance; 

  // // private constructor function 
  // // to prevent external instantiation 
  // // private __construct() { } 

  // // getInstance method 
  // public static function getInstance() { 

  //   if(!self::$instance) { 
  //     self::$instance = new self(); 
  //   } 

  //   return self::$instance; 

  // } 
	public $hi="hi";
  
  public function get($request,$call){
  	 $request;
  	 $call($request);
  }
  public function start(){

  }

} 
echo $_GET['resource'];

$app= new App();
$app->get('home:controller:method:v1:v2',function($name){

	// echo $name;
});
// $app->get();