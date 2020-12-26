<?php  
if (!defined('BASEPATH'))
    exit('No direct script access allowed');  
    class Api extends CI_Controller {
        
        public function __construct() {
            parent:: __construct();
            $this -> load -> library('ftp');
            $this->load->model('Productos_model', 'productos');
            $this->load->model('Productos_sql_model', 'productos2');
            $this->load->model('Sucursal_model', 'sucursales');
            $this->load->model('Requisiciones_model', 'requisicion');
        }
        public function index() {
             
        }
        public function get_sucursales(){
            $sucursal = $this->input->post('sucursal');
            $activo = $this->input->post('activo');
            $id_select = $this->input->post('id_select');
            $sucursales = $this->sucursales->Get_sucursales($sucursal, $activo);
            ?><option value="0">Seleccione la sucursal</option><?php
            if ($sucursales) {
                foreach ($sucursales as $sucursal):
                    if ($sucursal->id == $id_select) {
                        ?>
                        <option selected="selected" value="<?= $sucursal->id ?>"><?= $sucursal->nombre?></option>
                        <?php
                    } else {
                        ?>
                        <option value="<?= $sucursal->id ?>"><?= $sucursal->nombre?></option>
                        <?php
                    }
                endforeach;
            }
        }
        public function get_requisiciones(){
            $id = $this->input->post('id');
            $serie = $this->input->post('serie');
            $folio = $this->input->post('folio');
            $idsucursal = $this->input->post('idsucursal');
            $estado = $this->input->post('estado');
            $fechaini = $this->input->post('fechaini');
            $fechafin = $this->input->post('fechafin');
            $requisiciones = $this->requisicion->Get_requisiciones($id, $serie, $folio, $idsucursal, $estado, $fechaini, $fechafin);
            $array = array();
            if($requisiciones){
                foreach ($requisiciones as $requisicion) {
                    $res = $this->sucursales->Get_sucursales($requisicion->idsucursal, FALSE);
                    $array[] = [
                        $requisicion->serie,
                        $requisicion->folio,
                        $res[0]->nombre,
                        $this->Gen_Estados_seguimientos($requisicion->estado),
                        $requisicion->observaciones,
                        date('d/m/Y',strtotime($requisicion->fechacaptura)),
                        date('d/m/Y',strtotime($requisicion->fechavencimiento)),
                        '<td class="actions">
                            <input type="radio" checked="true" id="opcion" value="'.$requisicion->id.'" name="opcion">
                            <label><font color="white">Es</font></label>
                            <a class="on-default remove-row" name="eliminar" href="javascript:void(0)" onclick="select_option(this)"><i class="fa fa-trash-o"></i></a>
                        </td>',
                        $requisicion->id,
                        $requisicion->idsucursal
                    ];
                }
                echo json_encode($array);
            }
            else{
                echo json_encode($array);
            }
        }
        public function get_requisicionm(){
            $id = $this->input->post('id');
            $serie = $this->input->post('serie');
            $folio = $this->input->post('folio');
            $idsucursal = $this->input->post('idsucursal');
            $estado = $this->input->post('estado');
            $fechaini = $this->input->post('fechaini');
            $fechafin = $this->input->post('fechafin');
            $sucursales = $this->requisicion->Get_requisiciones($id, $serie, $folio, $idsucursal, $estado, $fechaini, $fechafin);
            if($sucursales){
                echo json_encode($sucursales);
            }
            else{
                echo json_encode(false);
            }
        }
        public function set_folio(){
            $tabla = $this->input->post('tabla');
            $serie = $this->input->post('serie');
            $folio = $this->requisicion->get_folio($tabla, $serie);
            $this->requisicion->set_folio($tabla, $serie, $folio->folio);
            echo json_encode($folio->folio + 1);
        }
        public function get_requisiciond(){
            $idrequisicion = $this->input->post('idrequisicion');
            $requisiciond = $this->requisicion->get_requisiciond($idrequisicion);
            $array = array();
            if($requisiciond){
                foreach ($requisiciond as $producto) {
                    $res = $this->productos2->get_productos($producto->idproducto, false, false);
                    $array[] = [
                        $res[0]->clave,
                        $res[0]->nombre,
                        '<input type="number" step="any" id="input_cantidad" class="form-control" placeholder="Cantidad" value="'.$producto->cantidad.'" min="1" required />',
                        '<td class="actions">
                            <input type="radio" checked="true" id="opcion" value="'.$producto->idproducto.'" name="opcion">
                            <label><font color="white">Es</font></label>
                            <a class="on-default remove-row" name="eliminar" href="javascript:void(0)" onclick="select_option(this)"><i class="fa fa-trash-o"></i></a>
                        </td>',
                        $producto->idproducto
                    ];
                }
                echo json_encode($array);
            }
            else{
                echo json_encode($array);
            }
        }
        public function delete_requisicion(){
            $idrequisicion = $this->input->post('idrequisicion');
            $res = $this->requisicion->delete_requisicion($idrequisicion);
            echo json_encode($res);
        }
    /* FUNCIONES GENERALES */
        function Gen_Estados_seguimientos($estado) {
            switch ($estado) {
                case 'C': $Estado = "Capturando"; break;
                case 'RQ': $Estado = "En requisición"; break;
                case 'PE': $Estado = "Pendiente de entregar"; break;
                case 'EP': $Estado = "Entrada Parcial"; break;
                case 'E': $Estado = "Entrada"; break;
                default : $Estado = "";
            } 
            return $Estado;
        }
        function filtrobusqueda() {
            $buscar = $this->input->post('buscar');
            $producto = $this->productos2->get_productos(false, $buscar, $buscar);
            
            if ($producto) {
                    ?>
                    <option value="T">Todos los productos </option>
                    <?php
                foreach ($producto as $producto1) {
                        ?>
                        <option idproducto="<?= $producto1->id ?>"
                                nombre="<?= $producto1->nombre ?>"
                                clave="<?= $producto1->clave ?>"> 
                            <?= $producto1->clave ?> | <?= $producto1->nombre ?>
                        </option>
                        <?php
                }
            }
        }
        function set_requisicion(){
            $reqm = $this->input->post('reqm');
            $reqd = $this->input->post('reqd');
            $reqm = json_decode($reqm, true);
            $reqd = json_decode($reqd, true);
            $res = $this->requisicion->set_requisicion($reqm, $reqd);
            echo json_encode($res);
        }
        public function get_concentracion(){
            $id = $this->input->post('id');
            $serie = $this->input->post('serie');
            $folio = $this->input->post('folio');
            $idsucursal = $this->input->post('idsucursal');
            $estado = $this->input->post('estado');
            $fechaini = $this->input->post('fechaini');
            $fechafin = $this->input->post('fechafin');
            $requisiciones = $this->requisicion->Get_requisiciones($id, $serie, $folio, $idsucursal, $estado, $fechaini, $fechafin);
            $array = array();
            if($requisiciones){
                foreach ($requisiciones as $requisicion) {
                    $res = $this->sucursales->Get_sucursales($requisicion->idsucursal, FALSE);
                    $aux = "onclick='COM_abrirModal(`".$requisicion->id."`)'";
                    $array[] = [
                        $requisicion->serie,
                        $requisicion->folio,
                        $res[0]->nombre,
                        $this->Gen_Estados_seguimientos($requisicion->estado),
                        $requisicion->observaciones,
                        date('d/m/Y',strtotime($requisicion->fechacaptura)),
                        date('d/m/Y',strtotime($requisicion->fechavencimiento)),
                        '<td class="actions"> 
                            <a id="btnHistorialEstado" href="#modalHistorialEstado" type="button" class="btn btn-primary modal-with-form" title="Muestra el historial" onclick="COM_abrirModal(`'.$requisicion->id.'`)">
                                <i class="fa fa-list-alt"></i> 
                            </a>
                        </td>',
                        $requisicion->id,
                        $requisicion->idsucursal
                    ];
                }
                echo json_encode($array);
            }
            else{
                echo json_encode($array);
            }
        }
        public function get_concentraciond(){
            $idrequisicion = $this->input->post('idrequisicion');
            $requisiciond = $this->requisicion->get_requisiciond($idrequisicion);
            $array = array();
            if($requisiciond){
                foreach ($requisiciond as $producto) {
                    $res = $this->productos2->get_productos($producto->idproducto, false, false);
                    $array[] = [
                        $res[0]->clave,
                        $res[0]->nombre,
                        $producto->cantidad,
                        '<input type="number" min="0" max="'.$producto->cantidad.'" onkeypress="return check(event)" onkeyup="validar(this);" step="any" id="input_cantidad" class="form-control" placeholder="Cantidad" value="'.$producto->cantidad_recivido.'" min="1" required />',
                        $producto->idproducto,
                        $idrequisicion
                    ];
                }
                echo json_encode($array);
            }
            else{
                echo json_encode($array);
            }
        }
        function set_entrada(){
            $reqd = $this->input->post('reqd');
            $reqd = json_decode($reqd, true);
            $res = $this->requisicion->set_entrada($reqd);
            echo json_encode($res);
        }
        function envio_email($idrequisicion){
            /* $idrequisicion = $this->input->post('idrequisicion'); */
            $emailempleado = "elchilo_333@hotmail.com";
            $email = array("israel.munoz.urias@gmail.com");
            $accion = "email"; /* email pdf */ 
            
            /* $cotizacionpdf = $this->crearpdf($idrequisicion, $accion); */
            usleep(250000);

            try {
                require_once 'application/libraries/swiftmailer/swift_required.php';
                $transport = Swift_SmtpTransport::newInstance('smtpout.secureserver.net', $this->config->item('puertoCorreo'))
                            ->setUsername('elchilo_333@hotmail.com')
                            ->setPassword('silobistes333');
                $mailer = Swift_Mailer::newInstance($transport);
                $message = Swift_Message::newInstance('Solicitud de precios. ' . 'serie' . " " . 'folio');
                $message->setFrom($emailempleado);
                $TO  = array(); 
                foreach ($email as $email):
                    array_push($TO, $email); 
                endforeach;
                
                $message->setBcc($TO);
                $message->setBody(' <h3>Solicitud de precios. ' . 'serie' . " " . 'folio' . '</h3>
                <hr/>
                <h4> Buen día,   <br> <br>'
                    . 'Permita presentarnos, nosotros somos la empresa Avila, Abarrotera. <br> <br>'
                    . ' Por este medio nos permitimos solicitarles los precios de los diversos productos adjuntos en archivo PDF a este correo. <br> <br>'
                    . ' Sin mas por el momento quedamos en la espera de su información, para proceder a formalizar el pedido. <br> <br> '
                    . ' Saludos. <br> <br> <br> </h4>'
                    . 'Departamento de Cotizaciones. <br> Corporativo, Sinaloa <br> Tel.: (668)1658754 y 1658405 <br> elchilo_333@hotmail.com <br><br>'
                    . '<strong> Favor de confirmar de recibido a este correo </strong>', 'text/html'); 
                /* $attachment = new Swift_Attachment($cotizacionpdf, 'serie' ."-".'folio'.".pdf", 'application/pdf'); 
                $message->attach($attachment); */
                $mailer->send($message, $fallidos);
            }
            catch(Exception $e){
                echo "error: " . $e;

            }
        }
        function crearpdf($requisicion, $accion) { /* email */
            $this->load->library('Pdf2');
            // Establecemos el contenido para imprimir 
            $requisiciones = $this->requisicion->Get_requisiciones($requisicion, false, false, false, false, false, false);
            $requisiciond = $this->requisicion->get_requisiciond($requisicion);
            $pdf = new Pdf2('L', 'mm', 'letter', true, 'UTF-8', false);
            $pdf->SetCreator(PDF_CREATOR);
            $pdf->SetAuthor('Departamento De Requisición');
            $pdf->SetTitle('Requisición');
            $pdf->SetSubject('Requisición');
            $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
           // datos por defecto de cabecera, se pueden modificar en el archivo tcpdf_config_alt.php de libraries/config
           $datos="RFC: ASDDE3445454545 CALLE LA ANCHA NUMERO DESCONOCIDO CIUDAD PERDIDA ESTA SINALOA";
    
            $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, "Avila", $datos, array(0, 0, 0), array(0, 64, 128));
            $pdf->setFooterData($tc = array(0, 64, 0), $lc = array(0, 64, 128)); 
            $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
            $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA)); 
            $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED); 
            $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
            $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
            $pdf->SetFooterMargin(PDF_MARGIN_FOOTER); 
            $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM); 
            $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);  
            $pdf->setFontSubsetting(true); 
            $pdf->SetFont('helvetica', '', 10, '', false); 
            $pdf->AddPage(); 
            $pdf->setTextShadow(array('enabled' => true, 'depth_w' => 0.2, 'depth_h' => 0.2, 'color' => array(196, 196, 196), 'opacity' => 1, 'blend_mode' => 'Normal'));
     
             $html = '';  
         
            $html .= '<br><br>
            <h1 style="text-align: center;">Solicitud de precios</h1> 
            <table style="width: 100%;">
                <tr style="border-top: 0.3px solid rgb(231, 178, 3); min-height: 30px;">
                    <td style="width: 25%; min-height: 20px; float: center; text-align: left;">
                        <b><h4>Requisición:</h4></b><br>
                        <b>Serie:</b> '.$requisiciones[0]->serie.'<br>
                        <b>Folio :</b> '.$requisiciones[0]->folio.'<br>
                        <b>Creada:</b> '.date("d/m/Y", strtotime($requisiciones[0]->fechacaptura)).'<br>
                        <b>Programada:</b> '.date("d/m/Y", strtotime($requisiciones[0]->fechavencimiento)).'<br> 
                    </td>
                    <td style="width: 40%; min-height: 20px; float: center; text-align: left;">
                        <b><h4>Datos:</h4></b><br><br>
                        <b >Solicitante:</b> Israel muñoz urias<br>
                        <b>Sucursal:</b> sucursal 1 <br>';
                        
                        
            $html .= '</td> 
                </tr>
            </table>
            <br>
            <h3 style="text-align: center;">Productos Solicitados</h3>
            <br><br>
            <table id="prueba" style="width: 100%; border-top: 3px solid orange;">
                <tr>
                    <th style="width: 30%; border-bottom: 3px solid orange; height: 20px;"><b>Clave</b></th>
                    <th style="width: 30%; border-bottom: 3px solid orange; height: 20px;"><b>Producto</b></th>
                    <th style="width: 20%; border-bottom: 3px solid orange; height: 20px;"><b>Cantidad</b></th>
                </tr>';
            foreach ($$requisiciond as $$requisiciond1):
            $html .= '<tr>
                    <td style="border-bottom: 1px solid orange; height: 30px;">'.$requisiciond1->clave.'</td>
                    <td style="border-bottom: 1px solid orange; height: 30px;">'.$requisiciond1->idproducto.'</td>
                    <td style="border-bottom: 1px solid orange; height: 30px;">'.$requisiciond1->cantidad.'</td>
                </tr>';
            endforeach;
            $html .= '</table>
            <br><br>
            <div id="firmas">
                <h6 style="font-size:13px; font-family: Arial, serif; margin-top: 20px; text-align:center;">Sin más por el momento extendemos un cordial saludo y quedamos en espera de su información para proceder a formalizar el pedido.</h4>
                        <br><br><br>
                <h6 style="text-align:center; margin-top: 15px;">__________________________________</h6> 
                <h6 style="text-align:center; margin-top: 15px;">Director de zona</h6> 
            </div>';
    
            $pdf->writeHTMLCell($w = 0, $h = 0, $x = '', $y = '', $html, $border = 0, $ln = 1, $fill = 0, $reseth = true, $align = '', $autopadding = true);  
            $nombre_archivo = utf8_decode("serie"."-"."serie".".pdf");
             
            if ($accion == "email"){
                return $pdf = $pdf->Output($nombre_archivo, 'S');
            } else {
                $pdf = $pdf->Output($nombre_archivo, 'I');
            }  
        }
}