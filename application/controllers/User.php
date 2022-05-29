<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

    public function __construct() {
        parent::__construct();
		$this->load->helper('html');
		$this->lang->load('content','english');
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
		if($this->isUserLoggedIn){ 
			var_dump('loggedin'); die;
		}else{
			if($this->input->post('loginSubmit')){
				$this->session->set_flashdata('msg', 'Please verify your Email before enter!');
				redirect('../adminView');
			}
			// var_dump('sdmcksdm');die;
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
	public function adminView()
	{
		$this->load->view('test');
	}
	  
}
