<?php
class Sucursal_model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
        $this->db1 = $this->load->database('default', TRUE); 
    }
    function Get_sucursales($sucursal, $activo){
        $this->db1->select('*');
        $this->db1->from('sucursal');
        if ($sucursal) {
            $this->db1->where('id ', $sucursal);
        }
        if ($activo) {
            $this->db1->where('activo ', $activo);
        }
        $query = $this->db1->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            false;
        }
    }
}