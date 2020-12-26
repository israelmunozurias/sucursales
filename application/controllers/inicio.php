<?php  
if (!defined('BASEPATH'))
    exit('No direct script access allowed');  
    class Inicio extends CI_Controller {
        
        public function __construct() {
            parent:: __construct();
            $this -> load -> library('ftp');
            $this->load->model('Productos_model', 'productos');
            $this->load->model('Productos_sql_model', 'productos2');
        }
        public function index() {
            $datos['collapsed'] = true;
            $datos['titulo'] = "INICIO"; 
            $this->load->view('recursos/header', $datos);
            $this->load->view('recursos/sidebar');
            $this->load->view('recursos/cabecera', $datos);
            /* $this->load->view('inicio', $datos); */
            /* $this->load->view('recursos/sidebar_oculto'); */
            $this->load->view('recursos/home_jquery');
            $this->load->view('recursos/header_java');
        }
    }