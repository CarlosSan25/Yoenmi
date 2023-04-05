<?php

require("class_password.php");

// Database Class

class DB{

    private $host;
    private $dbname;
    private $dbuser;
    private $dbpasswd;
    private $conn;

    public function __construct($h, $n, $u, $p){
        $this->host = $h;
        $this->dbname = $n;
        $this->dbuser = $u;
        $this->dbpasswd = $p;
    }

    public function dbconn(){
        if(isset($this->host) && isset($this->dbname) && isset($this->dbuser) && isset($this->dbpasswd)){
            try{
                $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname","$this->dbuser","$this->dbpasswd");
            }catch(PDOException $e){
                echo "Error: $e";
            }
        }else{
            echo "Error Database connection";
        }
    }

    public function query($statement){
        $stmt = $this->conn->prepare($statement);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getPass($username){
        $stmt = $this->conn->prepare("SELECT password FROM users WHERE username='$username';");
        $stmt->execute();
        $password = $stmt->fetch(PDO::FETCH_ASSOC);
        return $password;
    }

    public function insertUser($n, $u, $p, $i){
        $phash = new Password;
        $password = $phash->hash($p);
        $stmt = $this->conn->prepare("INSERT INTO users (nombre, username, password, image) VALUES ('$n','$u','$password', '$i');");
        return $stmt->execute();
    }
}

?>