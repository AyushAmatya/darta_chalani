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
        $query = $this->db->order_by('MENU_INDEX','ASC')->where('PARENT_MENU',0)->where('STATUS','E')->get('DC_MENUS')->result();
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
        $query = $this->db->order_by('MENU_INDEX','ASC')->where('PARENT_MENU',$id)->where('STATUS','E')->get('DC_MENUS')->result();
        // $result = $query->result_array();
        return $query;
    }
    public function getMaxIds($id_name,$table)
    {
        $query = $this->db->query("SELECT MAX($id_name) AS MAXID FROM $table");
        $result = $query->row_array();
        return $result;
    }
    public function insertMenu($data)
    {
        // echo '<pre>'; print_r($data); die;
        $this->db->insert('DC_MENUS',$data);
        return true;
    }
    public function getMenus()
    {
        $query = $this->db->query("SELECT * FROM DC_MENUS where MENU_ID = 3086 ");

        $result = ($query->num_rows() > 0)?$query->result_array():FALSE;
        // echo '<pre>'; print_r($result); die;
        return $result;
    }
    public function editMenu($id)
    {
        $query = $this->db->query("SELECT * FROM DC_MENUS where MENU_ID = $id");

        $result = $query->row_array();
        // echo '<pre>'; print_r($result); die;
        return $result;
    }
    public function updateMenu($data,$id)
    {
        $this->db->where('MENU_ID', $id);
        $this->db->update('DC_MENUS', $data) ;
        return true;
    }
    public function getRoles()
    {
        $query = $this->db->query("SELECT * FROM DC_ROLES where STATUS = 'E' ");

        $result = ($query->num_rows() > 0)?$query->result_array():FALSE;
        // echo '<pre>'; print_r($result); die;
        return $result;
    }
    public function getMenuRole($id)
    {
        $query = $this->db->query("SELECT * FROM DC_ROLE_PERMISSIONS where MENU_ID = $id");

        $result = ($query->num_rows() > 0)?$query->result_array():FALSE;
        // echo '<pre>'; print_r($result); die;
        return $result;
    }
    public function menuRoleAssign($menuId, $roleId, $assignFlag) {
        
        $statement = $this->db->query("BEGIN DC_MENU_ROLE_ASSIGN($menuId,$roleId,'{$assignFlag}'); END;");
        return $statement;
    }
    public function getGlobalMenu()
    {
        
    }
}