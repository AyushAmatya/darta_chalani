<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

    public function __construct() {
        parent::__construct();
		$this->load->helper('html');
		$this->lang->load('content','english');
		$this->load->library('form_validation'); 
		$this->isUserLoggedIn = $this->session->userdata('isUserLoggedIn');
    }
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
	public function index()
	{
		// var_dump('here'); die;
		if($this->isUserLoggedIn){ 
			// var_dump('loggedin'); die;
		}else{
			// Get messages from the session 
			if($this->session->userdata('success_msg'))
			{ 
				$data['success_msg'] = $this->session->userdata('success_msg'); 
				$this->session->unset_userdata('success_msg'); 
			} 
			if($this->session->userdata('error_msg'))
			{ 
				$data['error_msg'] = $this->session->userdata('error_msg'); 
				$this->session->unset_userdata('error_msg'); 
			}
			// If login request submitted 
			if($this->input->post('loginSubmit')){
				$this->form_validation->set_rules('username', 'username', 'required'); 
            	$this->form_validation->set_rules('password', 'password', 'required');
				if($this->form_validation->run() == true){  
					$this->session->set_flashdata('error_msg','Username and Password both are required'); 
				}else{
					$this->session->set_flashdata('error_msg','Username and Password both are required'); 
				}
				// echo '<pre>'; print_r($this->session->flashdata('')); die;
				$this->session->set_flashdata('msg', 'MAtched ');
				
				redirect('welcome');
			}
			$this->load->view('templates/header');
			$this->load->view('login/login');
			$this->load->view('templates/footer');
		}
		
	}
	public function switchLang($language = "") {
		$language = ($language != "") ? $language : "english";
        $this->session->set_userdata('site_lang', $language);
		redirect($_SERVER['HTTP_REFERER']);
	}
	public function test()
	{
		// var_dump('here'); die;
		$this->load->view('test');
	}
	  
}
