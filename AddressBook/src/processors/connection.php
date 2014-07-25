<?php
require_once("../../../../../userhome/\$ettings.php");
require_once($path["serloc"]."header.php");

include ($path["serloc"]."modules/codebase4.0/connectors/data_connector.php");
include ($path["serloc"]."modules/codebase4.0/connectors/db_mssql.php");

$res=mssql_connect($db["CentralDatabaseHost"],$db["CentralDatabaseUsername"],$db["CentralDatabasePassword"]);
