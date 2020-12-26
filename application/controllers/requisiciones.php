<?php  
if (!defined('BASEPATH'))
    exit('No direct script access allowed');  
    class Requisiciones extends CI_Controller {
        
        public function __construct() {
            parent:: __construct();
            $this -> load -> library('ftp');
            $this->load->model('Productos_model', 'productos');
            $this->load->model('Productos_sql_model', 'productos2');
            /* $this->load->model('Sucursal_model', 'sucursales'); */
        }
        public function index() {  
            $this->requisiciones();
        }
        
        public function requisiciones() {
            $datos['collapsed'] = true;
            $datos['titulo'] = "REQUISICIONES";
            $datos['fecha'] = date('d M Y');
            $fechafiltro = mktime(0, 0, 0, date("m") + 1, 0, date("Y"));
            $fechaIni = date("Y") . '-' . date("m") . '-' . '01';
            $fechaFin = strftime("%Y", $fechafiltro) . '-' . strftime("%m", $fechafiltro) . '-' . strftime("%d", $fechafiltro);
            $datos['fechaini'] = '01' . '/' . date("m") . '/' . date("Y");
            $datos['fechafin'] = strftime("%d", $fechafiltro) . '/' . strftime("%m", $fechafiltro) . '/' . strftime("%Y", $fechafiltro);
            
            /* $datos['sucursales'] = $this->sucursales->get_sucursales(FALSE, FALSE, FALSE); */
            $this->load->view('recursos/header', $datos);
            $this->load->view('recursos/sidebar');
            $this->load->view('recursos/cabecera', $datos);
            $this->load->view('requisiciones', $datos);
            /* $this->load->view('recursos/sidebar_oculto'); */
            $this->load->view('recursos/home_jquery');
            $this->load->view('recursos/header_java');
        }
        public function nueva() {
            $datos['collapsed'] = true;
            $datos['titulo'] = "REQUISICIÓN";  
            $datos['fecha'] = date("d") . '/' . date("m") . '/' . date("Y");
            $datos['serie_parametro'] = false;
            $datos['folio_parametro'] = false;
            $this->load->view('recursos/header', $datos);
            $this->load->view('recursos/sidebar');
            $this->load->view('recursos/cabecera', $datos);
            $this->load->view('requisicion', $datos);
            /* $this->load->view('recursos/sidebar_oculto'); */
            $this->load->view('recursos/home_jquery');
            $this->load->view('recursos/header_java');
        }
        public function editar() {
            $datos['collapsed'] = true;
            $datos['titulo'] = "REQUISICIÓN"; 
            $datos['fecha'] = date("d") . '/' . date("m") . '/' . date("Y");
            $datos['serie_parametro'] = $this->uri->segment(3);
            $datos['folio_parametro'] = $this->uri->segment(4);
            $this->load->view('recursos/header', $datos);
            $this->load->view('recursos/sidebar');
            $this->load->view('recursos/cabecera', $datos);
            $this->load->view('requisicion', $datos);
            /* $this->load->view('recursos/sidebar_oculto'); */
            $this->load->view('recursos/home_jquery');
            $this->load->view('recursos/header_java');
        }
    }