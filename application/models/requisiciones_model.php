<?php
class Requisiciones_model extends CI_Model
{

    function __construct()
    {
        parent::__construct();
        $this->db1 = $this->load->database('default', TRUE); 
    }
    function Get_requisiciones($id, $serie, $folio, $idsucursal, $estado, $fechaini, $fechafin){
        $this->db1->select('*');
        $this->db1->from('requisicionm');
        if ($id && $id != "T") {
            $this->db1->where('id =', $id);
        }
        if ($serie) {
            $this->db1->where('serie =', $serie);
        }
        if ($folio) {
            $this->db1->where('folio =', $folio);
        }
        if ($idsucursal && $idsucursal != "T") {
            $this->db1->where('idsucursal =', $idsucursal);
        }
        if ($estado && $estado != "T") {
            $this->db1->where('estado =', $estado);
        }
        if ($fechaini && $fechaini != "NaN-NaN-NaN") {
            $this->db1->where('fechacaptura >=', $fechaini." 00:00:00");
        }
        if ($fechafin && $fechafin != "NaN-NaN-NaN") {
            $this->db1->where('fechacaptura <=', $fechafin." 23:00:00");
        }
        $query = $this->db1->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            false;
        }
    }
    function get_requisiciond($idrequisicion){
        $this->db1->select('*');
        $this->db1->from('requisiciond');
        if ($idrequisicion) {
            $this->db1->where('idrequisicion ', $idrequisicion);
        }
        $query = $this->db1->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }
    function get_folio($tabla,$serie) {
        $this->db1->select_max('folio');
        $this->db1->from($tabla);
        $this->db1->where('serie', $serie);
        $this->db1->limit(1);
        $variable = $this->db1->get();
        return $variable->row();
    } 
    function set_folio($tabla, $serie, $folio) {
		$data = array(
			'serie' => $serie,
			'folio' => $folio + 1,
			'estado' => 'C',
		);
		$this->db1->insert($tabla, $data);
	}  
    function set_requisicion($reqm, $reqd){
        try {
            $data = array(
                'serie' => $reqm[0]['serie'],
                'folio' => $reqm[0]['folio'],
                'idsucursal' => $reqm[0]['idsucursal'],
                'estado' => 'RQ',
                'observaciones' => $reqm[0]['observaciones'],
                'fechacaptura' => date('Y-m-d H:i:s'),
                'fechavencimiento' => $reqm[0]['fechavencimiento'], 
            );
        
            $this->db1->where('serie ', $reqm[0]['serie']);
            $this->db1->where('folio ', $reqm[0]['folio']);
            $this->db1->update('requisicionm', $data);

            $requisicionm = $this->Get_requisiciones(false, $reqm[0]['serie'], $reqm[0]['folio'], false, false, false, false);
            $requisiciond = $this->get_requisiciond($requisicionm[0]->id);
            if ($requisiciond){
                $this->db1->where('idrequisicion', $requisicionm[0]->id);
                $this->db1->delete('requisiciond');
            }
            
            for ($i = 0; $i < count($reqd); $i++) {
                $data = array(
                    'idrequisicion' => $requisicionm[0]->id,
                    'idproducto' => $reqd[$i]['idproducto'],
                    'cantidad' => $reqd[$i]['cantidad'],
                    'cantidad_recivido' => 0
                );
                $this->db1->insert('requisiciond', $data);
            }
            return true;
        }
        catch (PDOException $pe) {
            return false;
        }
    }
    function delete_requisicion($idrequisicion){
        $this->db1->where('id', $idrequisicion);
        $this->db1->delete('requisicionm');
        
        $this->db1->where('idrequisicion', $idrequisicion);
        $this->db1->delete('requisiciond');
        return true;
    }
    function set_entrada($reqd){
        for ($i = 0; $i < count($reqd); $i++) {
            $data = array(
                'cantidad_recivido' =>$reqd[$i]['cantidad_ec']
            );
            $this->db1->where('idrequisicion', $reqd[$i]['idrequisicion']);
            $this->db1->where('idproducto', $reqd[$i]['idproducto']);
            $this->db1->update('requisiciond', $data);
        }
        $res = $this->get_entrada($reqd[0]['idrequisicion']);
        $estado = 'RQ';
        if($res[0]->cantidad_recivido >= $res[0]->cantidad){
            $estado = 'E';
        }
        if($res[0]->cantidad_recivido > 0 && $res[0]->cantidad_recivido < $res[0]->cantidad){
            $estado = 'EP';
        }
        $data = array(
            'estado' => $estado
        );
        $this->db1->where('id', $reqd[0]['idrequisicion']);
        $this->db1->update('requisicionm', $data);
    }
    function get_entrada($idrequisicion){
        $this->db1->select('SUM(cantidad) as cantidad, SUM(cantidad_recivido) as cantidad_recivido');
        $this->db1->from('requisiciond');
        if ($idrequisicion) {
            $this->db1->where('idrequisicion ', $idrequisicion);
        }
        $query = $this->db1->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }
}