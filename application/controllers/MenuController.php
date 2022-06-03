<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MenuController extends CI_Controller {
    public function __construct() {
        parent::__construct();
		$this->load->helper('html');
		$this->load->model('MenuModel');
		$this->lang->load('content','english');
        $this->load->library('form_validation'); 
        $data['globalMenu'] =  $this->MenuModel->getGlobalMenu();
		$this->isUserLoggedIn = $this->session->userdata('isUserLoggedIn');
    }
    public function index()
    {
        if($this->isUserLoggedIn){ 
            $data['menu'] = $this->MenuModel->getMenus();
            $data['roles'] = $this->MenuModel->getRoles();
            // var_dump($data['menu']['MENU_CODE']); die;
			$this->load->view('templates/header');
            $this->load->view('templates/nav');
            $this->load->view('templates/sidebar',$data);
            $this->load->view('Menu/index',$data);
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
    public function add()
    {
        if($this->isUserLoggedIn){ 
            if($this->input->post('addMenu')){
                $this->form_validation->set_rules('menu_code', 'menu_code', 'required'); 
            	$this->form_validation->set_rules('menu_name', 'menu_name', 'required');
            	$this->form_validation->set_rules('route', 'route', 'required');
            	$this->form_validation->set_rules('action', 'action', 'required');
            	$this->form_validation->set_rules('menu_index', 'menu_index', 'required');
            	$this->form_validation->set_rules('icon_class', 'icon_class', 'required');
                if($this->form_validation->run() == true){  

                // list the column name in order
                    $menuId   = $this->MenuModel->getMaxIds('MENU_ID','DC_MENUS');
                    
                    $data = array(
                        'MENU_CODE' => $this->input->post('menu_code'),
                        'MENU_ID' => $menuId['MAXID'] + 1,
                        'MENU_NAME' => $this->input->post('menu_name'),
                        'ROUTE' => $this->input->post('route'),
                        'ACTION' => $this->input->post('action'),
                        'PARENT_MENU' => $this->input->post('parent_menu'),
                        'MENU_INDEX' => $this->input->post('menu_index'),
                        'ICON_CLASS' => $this->input->post('icon_class'),
                        'MENU_DESCRIPTION' => $this->input->post('description'),
                        'IS_VISIBLE' => $this->input->post('visible'),
                        'CREATED_BY' => $this->session->userdata('userId'),
                        'CREATED_DT' => date('d-M-Y'),
                        'STATUS' => 'E',
                    );
                }else{
					$this->session->set_flashdata('msg',$this->lang->line('required_field')); 
					redirect($_SERVER['HTTP_REFERER']);
				}
                $insert = $this->MenuModel->insertMenu($data);
                $this->session->set_flashdata('success', 'Menu Added');
                redirect($_SERVER['HTTP_REFERER']);
            }
		}else{
            $this->session->set_flashdata('msg',$this->lang->line('login_cred')); 
			redirect('welcome');
        }
    }
    public function editMenu()
    {
        $id = $this->input->post('menu_id');
        $menu['detail'] = $this->MenuModel->editMenu($id);
        $menu['menuRolePer'] = $this->MenuModel->getMenuRole($id);
        
        echo json_encode($menu);
    }
    public function updateMenu()
    {
        // var_dump('die'); die;
        $id = $this->input->post('menu_id');
        if($this->isUserLoggedIn){ 
            if($this->input->post('deleteMenu')){
                $data = array(
                    'STATUS' => 'D',
                    'MODIFIED_BY' => $this->session->userdata('userId'),
                    'MODIFIED_DT' => date('d-M-Y'),
                );
                $menu = $this->MenuModel->updateMenu($data,$id);
                $this->session->set_flashdata('success', 'Menu Deleted');
            }else{
                $data = array(
                    'MENU_CODE' => $this->input->post('menu_code'),
                    'MENU_NAME' => $this->input->post('menu_name'),
                    'ROUTE' => $this->input->post('route'),
                    'ACTION' => $this->input->post('action'),
                    'MENU_INDEX' => $this->input->post('menu_index'),
                    'ICON_CLASS' => $this->input->post('icon_class'),
                    'MENU_DESCRIPTION' => $this->input->post('description'),
                    'IS_VISIBLE' => $this->input->post('visible'),
                    'MODIFIED_BY' => $this->session->userdata('userId'),
                    'MODIFIED_DT' => date('d-M-Y'),
                );
                $menu = $this->MenuModel->updateMenu($data,$id);
                $this->session->set_flashdata('success', 'Menu Updated');
            }
            
            redirect($_SERVER['HTTP_REFERER']);
        }else{
            $this->session->set_flashdata('msg',$this->lang->line('login_cred')); 
			redirect('welcome');
        }
    }
    public function assignMenu()
    {
        $roleId = $this->input->post('menu_id');
        $menuId = $this->input->post('role_id');
        $checked = $this->input->post('checked');
        // var_dump($roleId);
        // var_dump($menuId);
        // var_dump($checked); die;

        $menu = $this->MenuModel->menuRoleAssign($menuId, $roleId, $checked == 'true' ? 'Y' : 'N');
        // $this->session->set_flashdata('success', 'Menu Assigned');
    }
}