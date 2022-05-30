<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DashboardController extends CI_Controller {
    public function __construct() {
        parent::__construct();
		$this->load->helper('html');
		$this->lang->load('content','english');
		$this->isUserLoggedIn = $this->session->userdata('isUserLoggedIn');
    }
    public function index()
    {
        if($this->isUserLoggedIn){ 
			$this->load->view('templates/header');
            $this->load->view('templates/nav');
            $this->load->view('templates/sidebar');
            $this->load->view('Dashboard/dashboard');
            $this->load->view('templates/footer');
		}else{
            $this->session->set_flashdata('msg',$this->lang->line('login_cred')); 
			redirect('welcome');
        }
    }
}