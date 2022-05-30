<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MenuController extends CI_Controller {
    public function __construct() {
        parent::__construct();
		$this->load->helper('html');
		$this->load->model('MenuModel');
		$this->lang->load('content','english');
		$this->isUserLoggedIn = $this->session->userdata('isUserLoggedIn');
    }
    public function index()
    {
        if($this->isUserLoggedIn){ 
			$this->load->view('templates/header');
            $this->load->view('templates/nav');
            $this->load->view('templates/sidebar');
            $this->load->view('Menu/index');
            $this->load->view('templates/footer');
		}else{
            $this->session->set_flashdata('msg',$this->lang->line('login_cred')); 
			redirect('welcome');
        }
    }
    public function get_data()
    {
        $get_data = $this->MenuModel->getData();
        // echo '<pre>'; print_r($get_data); die;
        $data_menu = array();
        foreach ($get_data as $rs) {
            // echo '<pre>'; print_r($rs['MENU_ID']); die;
            $check = $this->check($rs->MENU_ID);
            if ($check == true) {
                
                $data_menu[] = array(
                    'id' => $rs->MENU_ID,
                    'text' => $rs->MENU_NAME,
                    'url_menu' => $rs->ROUTE,
                    'children' => $this->get_parent($rs->MENU_ID),
                );
            } else {
                $data_menu[] = array(
                    'id' => $rs->MENU_ID,
                    'text' => $rs->MENU_NAME,
                    'url_menu' => $rs->ROUTE,
                    'icon' => 'jstree-file',
                );
            }
        }
        // echo '<pre>'; print_r($data_menu); die;
        echo json_encode($data_menu);
    }
    public function check($id)
    {
        $get_check = $this->MenuModel->checkChild($id);
        if (!empty($get_check)) {
            return true;
        } else {
            return false;
        }
        
    }
    public function get_parent($id)
    {
        $get_data = $this->MenuModel->parentCheck($id);
        $data_menu = array();
        foreach ($get_data as $rs) {
            $check = $this->check($rs->MENU_ID);
            if ($check == true) {
                
                $data_menu[] = array(
                    'id' => $rs->MENU_ID,
                    'text' => $rs->MENU_NAME,
                    'url_menu' => $rs->ROUTE,
                    'children' => $this->get_parent($rs->MENU_ID),
                    'icon' => ($rs->ROUTE != '')? 'jstree-file':'',
                );
            } else {
                $data_menu[] = array(
                    'id' => $rs->MENU_ID,
                    'text' => $rs->MENU_NAME,
                    'url_menu' => $rs->ROUTE,
                    'icon' => 'jstree-file',
                );
            }
            
        }
        return $data_menu;
    }
}