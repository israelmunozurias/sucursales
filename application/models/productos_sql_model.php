<?php
class Productos_sql_model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
        $this->db1 = $this->load->database('default', TRUE); 
    }
    function get_productos($idproducto, $clave, $nombre){
        $this->db1->select('*');
        $this->db1->from('productos');
        if ($idproducto) {
            $this->db1->where('id', $idproducto);
        }
        if ($clave) {
            $this->db1->or_like('clave', $clave);
        }
        if ($nombre) {
            $this->db1->or_like('nombre', $nombre);
        }
        $query = $this->db1->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            false;
        }
    }
}