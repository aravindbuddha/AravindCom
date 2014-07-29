<?php

function fail($msg){
    echo json_encode(array(
        "status" => 'err', 
        "response" => $msg
    )); 
}
function ok($msg){
    echo json_encode(array(
        "status" => 'ok', 
        "response" => $msg
    )); 
}