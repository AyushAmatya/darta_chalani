<?php 
defined('BASEPATH') OR exit('No direct script access allowed');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

class UserModel extends CI_Model{ 
    function __construct() 
    { 
        $this->table = 'DC_EMPLOYEES';
    } 
    /* 
     * Fetch user data from the database
     * @param array filter data based on the passed parameters 
     */ 
    public function checkLogInCred($cred)
    {
        // var_dump('sdkcsd'); die;
        $query = $this->db->query("SELECT * FROM DC_EMPLOYEES where user_name = '{$cred['username']}' and password = '{$cred['password']}' and status = 'E' ");

        $result = $query->row_array();
        // echo '<pre>'; print_r($result); die;
        return $result;
    }
}