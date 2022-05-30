<?php 
defined('BASEPATH') OR exit('No direct script access allowed');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

class MenuModel extends CI_Model{ 
    function __construct() 
    { 
        $this->table = 'DC_MENUS';
    } 
    /* 
     * Fetch user data from the database
     * @param array filter data based on the passed parameters 
     */ 
    public function getData()
    {
        $query = $this->db->order_by('MENU_INDEX','ASC')->where('PARENT_MENU',0)->get('DC_MENUS')->result();
        // var_dump($query); die;

        // $result = $query->result_array();
        // echo '<pre>'; print_r($result); die;
        return $query;
    }
    public function checkChild($id)
    {
        $query = $this->db->get_where('DC_MENUS',array('PARENT_MENU'=>$id))->result();
        // $result = $query->result_array();
        return $query;
    }
    public function parentCheck($id)
    {
        $query = $this->db->order_by('MENU_INDEX','ASC')->where('PARENT_MENU',$id)->get('DC_MENUS')->result();
        // $result = $query->result_array();
        return $query;
    }
}