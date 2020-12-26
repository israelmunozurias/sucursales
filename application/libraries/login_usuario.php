<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Login_usuario {

    protected $ci;
    
    public function __construct() {

        $this->ci = & get_instance();
    }

     function validar($url) {
        if (!$this->ci->session->userdata('Login')) {
            if ($url) {
                redirect('/login?url=' . $url, 'refresh');
            }
            else{
                redirect('/login?url=', 'refresh');
            }
        }
    }
    
    function salir(){
        $this->ci->session->sess_destroy();
        $this->ci->output->set_header('Last-Modified:' . gmdate('D, d M Y H:i:s') . 'GMT');
        $this->ci->output->set_header('Cache-Control: no-store, no-cache, must-revalidate');
        $this->ci->output->set_header('Cache-Control: post-check=0, pre-check=0', false);
        $this->ci->output->set_header('Pragma: no-cache');
        redirect('/login?url=', 'refresh');
    }

}
