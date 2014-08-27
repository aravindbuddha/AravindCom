<?php
$app->post('/auth', function () use ($app,$dhxCon) {
	$username=$app->request->post('username');
 	// if(empty($username)){
 	// 	fail("username can not be empty");
 	// 	return;
 	// }
 	
 	echo  $app->request->isXhr();
  //$dhxCon->render_complex_sql("exec usp_findusers 'John'", "id","name,surname,age,address,phone");

});