<?php
	$signData = $_POST["ctlSignature_data"]; // the image data that comes from client side
	//$fileName = $_POST["ctlSignature_file"]; // the name of file for reference that comes from client side
	$saving_image_path = $_POST["saving_image_path"]; // the name of file for reference that comes from client side
	
	
	$user_name = $_POST["user_name"]; // the name of file for reference that comes from client side
	$file_name = $_POST["file_name"]; // the name of file for reference that comes from client side
	$user_id = $_POST["user_id"]; // the name of file for reference that comes from client side
	$agency_id = $_POST["agency_id"]; // the name of file for reference that comes from client side
	
	
	// //filename_agencyID_customerID_CustomerName
	
	$fileName = 'drew_' . time() . '_' . $file_name . '_'. $agency_id . '_'. $user_id . '_'. $user_name . '.jpg';
	
	
	if( !is_dir( $saving_image_path ) )
	{
		mkdir( $saving_image_path, 0777 );
	}	
	if ( strlen( $signData ) > 0) 
	{
		include 'license.php';
		$im = GetSignatureImage($signData);
		if($im != null)
		{
			if(strlen($fileName) > 0)
			{
			   // Process the $im object here on your server you can save, email, store in DB etc.
				imagejpeg($im, $saving_image_path . $fileName, 75);
				$arr = array('status' => 'success', 'response' => 'Signature saved', 'base64_image' => $signData, 'filename' => $fileName);
				echo json_encode($arr);
			}
			else
			{
				$arr = array('status' => 'err', 'response' => 'Invalid or missing file name.');
				echo json_encode($arr);
			}
		}
		else
		{
			$arr = array('status' => 'err', 'response' => 'Error generating signature. Check license.');
			echo json_encode($arr);
		}
	}
	else
	{
	  
	  $arr = array('status' => 'err', 'response' => 'Invalid or missing signature data.');
	  echo json_encode($arr);
	}
?>
