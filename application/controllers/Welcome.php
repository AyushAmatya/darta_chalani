<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

    public function __construct() {
        parent::__construct();
		$this->load->helper('html');
		$this->load->model('UserModel');
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
			redirect('dashboard');
		}else{
			// If login request submitted 
			if($this->input->post('loginSubmit')){
				$this->form_validation->set_rules('username', 'username', 'required'); 
            	$this->form_validation->set_rules('password', 'password', 'required');
				if($this->form_validation->run() == true){  
					$cred['username'] = $this->input->post('username');
					$cred['password'] = $this->input->post('password');
					$checkLogin = $this->UserModel->checkLogInCred($cred);
					if ($checkLogin) {
						$this->session->set_userdata('isUserLoggedIn', TRUE); 
                    	$this->session->set_userdata('userId', $checkLogin['EMPLOYEE_ID']); 
						
						$this->session->set_userdata('name', $checkLogin['FIRST_NAME']);
						redirect('dashboard');
					} else {
						$this->session->set_flashdata('msg',$this->lang->line('unmatched_cred')); 
						redirect('welcome');
					}
				}else{
					$this->session->set_flashdata('msg',$this->lang->line('cred_required')); 
					redirect('welcome');
				}
				
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

	public function logout()
    {
        $this->session->unset_userdata('isUserLoggedIn');
        $this->session->unset_userdata('userId');
        $this->session->unset_userdata('name');
        $this->session->sess_destroy();
        redirect('welcome');
    }
}
