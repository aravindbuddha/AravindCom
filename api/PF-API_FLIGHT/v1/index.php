<?php
require '../lib/flight/Flight.php';



// class Greeting {
//     public static function hello() {
//         echo 'hello world!';
//     }
// }

// Flight::route('/', array('Greeting','hello'));
Flight::route('/', function($routes){
     // echo "HI $name";

     echo $routes;
     
});
Flight::start();



?>
