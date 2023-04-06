<?php

//////////////////////  Database connection.  /////////////////////////////////////////

require("classes\class_DB.php");

// Database connection config

define('dbhost','localhost');
define('dbname','yoenmi');
define('dbuser','yoenmi');
define('dbpass', 'OA!7WInC8qBu3TGw');


// Creating new database connection

$conn = new DB(dbhost,dbname,dbuser,dbpass);

$conn->dbconn();

?>