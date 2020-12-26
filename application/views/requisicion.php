 
<style>
.panel {
    background: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: none;
    width: 90%;
    /* height: 80%; */
    margin-left: 7%;
}
</style>

<body onload="">
    <section class="body">
        <!-- start: page --> 
        <section class="panel">
            <header class="panel-heading">
                <div class="panel-actions">
                    <a href="#" class="fa fa-caret-down"></a>
                </div>
                <h2 class="panel-title"><?= $titulo ?></h2>
            </header>
            <div class="panel-body">
                <div class="row"> 
                    <div class="mb-md">
                        <label class="col-sm-1 control-label"></label>
                        <label class="col-sm-1 control-label">Sucursal: </label>
                        <div class="col-sm-3">
                            <select class="form-control" id="idsucursal">
                                <option selected="selected" value="0"> Seleccione la sucursal </option>
                            </select>
                        </div>
                        <label class="col-sm-2 control-label">Fecha Vencimiento: </label>
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                                <input type="text" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA" value="<?= $fecha ?>" id="fecha">
                            </div>
                        </div> 
                    </div> 
                </div>
                <br>
                <div class="row"> 
                    <div class="mb-md">
                        <label class="col-sm-1 control-label"></label>
                        <label class="col-sm-1 control-label">Serie:</label>
                        <div class="col-sm-3">
                            <select class="form-control" id="serie" onchange="set_folio();">
                                <option selected="selected" value="0">Selecciones serie</option>
                                <option value="1">RQ</option>
                            </select>
                        </div>
                        <label class="col-sm-2 control-label">Folio</label>
                        <div class="col-sm-3">
                            <div class="input-group"> 
                                <input type="text" id="folio" class="form-control" placeholder="Folio" disabled/>
                             </div>
                        </div>
                    </div> 
                </div>
                <br>
                <div class="col-md-12 form-group">
                    <label>Observaciones</label>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="fa fa-eye"></i></span>
                        <textarea id="observaciones" class="form-control" data-plugin-textarea-autosize="" rows="3" style="overflow: hidden; word-wrap: break-word; resize: none; height: 91px;"></textarea>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-md">
                            <a href="#Guardar" name="nueva compra" class="btn btn-primary modal-with-form" style="transform: translateX(330%)">Agregar Producto<i class="fa fa-plus"></i></a>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered table-striped mb-none" id="datatable-editable">
                    <thead>
                        <tr>  
                        <!-- 0 -->    <th>Clave</th>
                        <!-- 1 -->    <th>Nombre</th>
                        <!-- 2 -->    <th style="width: 70px;">Cantidad</th> 
                        <!-- 3 -->    <th style="width: 40px;">Acciones</th> 
                        <!-- 4 -->    <th style="display:none;">id</th>
                        </tr>
                    </thead>
                    <tbody id="tabla">
                    </tbody>
                </table>
                <a href="#guardando" class="btn btn-primary modal-with-form" style="transform: translateX(298%)" onclick="guardar_rq();">Guardar Requisición<i class="fa fa-plus"></i></a>
            </div>
            <!-- end: page --> 
        </section>
    </section>
    <div id="Guardar" name="Guardar" class="modal-block-primary mfp-hide">
        <section class="panel">
            <header id="tituloDlg" class="panel-heading">
            </header>
            <div class="panel-body">
                <section class="panel">
                    <div class="form-group mt-lg" id="nopartediv">
                        <label class="col-sm-3 control-label">No. parte</label>
                        <div class="col-sm-7">
                            <input id="inputbuscar" type="text" class="form-control" placeholder="buscar producto...">
                        </div>
                        <a class="btn btn-primary" id="buscar" onclick="buscarProductos();">Buscar</a>
                    </div>
                    <div class="form-group mt-lg" id="productosdiv" style="display:none">
                        <div class=" col-sm-offset-3 col-sm-7">
                            <select class="form-control populate select2-offscreen" data-plugin-selecttwo="" tabindex="-1" title="" id="productos">
                                <option value="0">Seleccione producto </option>
                            </select>
                        </div>
                        <BR></BR>
                        <br>
                        <div class="form-group mt-lg">
                            <label class="col-sm-3 control-label">Cantidad:</label>
                            <div class="col-sm-7">
                                <input type="number" step="any" id="cantidad" class="form-control" placeholder="Cantidad" value="" min="1" required />
                            </div>
                        </div>
                        <div class=" text-right">
                            <div class="row">
                                <button class="btn btn-primary" id="insertar" onclick="insertar_producto()">Insertar</button>
                                <button class="btn btn-default modal-dismiss">Cancelar </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
    <div id="dialog" class="modal-block mfp-hide">
        <section class="panel">
            <header class="panel-heading">
                <h2 class="panel-title">¿Estas seguro?</h2>
            </header>
            <div class="panel-body">
                <div class="modal-wrapper">
                    <div class="modal-icon">
                        <i class="fa fa-warning"></i>
                    </div>
                    <div class="modal-text">
                        <p>¿Estas seguro de eliminar este renglón?</p>
                    </div>
                </div>
            </div>
            <footer class="panel-footer">
                <div class="row">
                    <div class="col-md-12 text-right">
                        <button id="dialogConfirm" class="btn btn-primary" onclick="eliminar_producto()">Confirmar</button>
                        <button id="dialogCancel" class="btn btn-default">Cancelar</button>
                    </div>
                </div>
            </footer>
        </section>
    </div>
    <!-- icono cargando -->
    <div id="guardando" class="modal-block modal-block-primary mfp-hide">
        <div id="LoadingOverlayApi" class="loading-overlay-showing" data-loading-overlay="" style=" border-radius: 80px; height: 80px; line-height: 80px; margin: 0px auto; text-align: center; width: 80px; position: relative;">
            <div class="loading-overlay" style="">
                <div class="loader white"></div>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript">
    var accion = "agregando";
    $(document).ready(function() {
       var serie_parametro = '<?= $serie_parametro ?>';
        var folio_parametro = '<?= $folio_parametro ?>';
        cargar_sucursal('', 'S', '');
        if (serie_parametro && folio_parametro){
            accion = "editando";
            cargar_edicion(serie_parametro, folio_parametro);
        } 
    });
    function cargar_edicion(serie, folio){
        jQuery.ajaxSetup({ async: false });
        $.ajax({
            url: dirapi + "/get_requisicionm",
            dataType: 'json',
            type: 'post',
            async: false,
            data: {
                serie: serie,
                folio: folio
            },
            success: function(data) {
                if (data){
                    $("#idsucursal").val(data[0].idsucursal);
                    $("#idsucursal").change();
                    $("#serie").val(1);
                    $("#serie").change();
                    $("#serie").attr("disabled",true);
                    $("#folio").val(data[0].folio);
                    $("#observaciones").val(data[0].observaciones);
                   
                    var fecha = [];
                    fecha[0] = data[0].fechavencimiento.slice(0, 4);
                    fecha[1] = data[0].fechavencimiento.slice(5, 7);
                    fecha[2] = data[0].fechavencimiento.slice(8, 10);
                    var fechaprog = fecha[2] + "/" + fecha[1] + "/" + fecha[0];
                    $("#fecha").datepicker("setDate", fechaprog);
                    cargar_tabla(data[0].id);
                }
            }
        });
        jQuery.ajaxSetup({ async: true });
    }
    function cargar_tabla(idrequisicion) {
        $("#datatable-editable").DataTable();
        var table = $('#datatable-editable').DataTable();
        table.row().remove().draw( false );
        $("#datatable-editable").DataTable().destroy(); 
        $('#datatable-editable').DataTable({
            createdRow: function(row, data, index) { 
                $(row).find('td').eq(4).attr("style", "display:none");
                $(row).attr('id',data[4]);  
            },
            "destroy": true,
            "order": [
                [0, "asc"]
            ],
            "iDisplayLength": 100,
            "ajax": {
                "url": dirapi + "/get_requisiciond",
                "type": "POST",
                "data": {
                    "idrequisicion": idrequisicion
                },
            },
            "sAjaxDataProp": "",
            "deferRender": true,
            'bAutoWidth': false,
            "paging": false
        });
    }
    function set_folio(){
        $.ajax({
            url: dirapi + "/set_folio",
            dataType: 'json',
            type: 'post',
            async: false,
            data: {
                tabla : 'requisicionm',
                serie: $("#serie option:selected").text()
            },
            success: function(data) {
                if (data){
                    $("#folio").val(data)
                    document.getElementById("serie").disabled = true;
                } 
            }
        });
    }
    function insertar_producto(){
        var aux = false;
        var id = $("#productos option:selected").attr("idproducto");
        $('#datatable-editable tbody').find("tr").each(function () {
            if ($(this).find('td').eq(4).html() == id) {
                aux = true;
            }
        });
        if(aux){
            $("#"+id+" td").eq(2).html($('#cantidad').val());
            $('#Guardar').magnificPopup('close');
        } else {
            var actions = [`
                <td class="actions">
                    <input type="radio" checked="true" id="opcion" value="`+id+`" name="opcion">
                    <label>
                        <font color="white">Es</font>
                    </label>
                    <a class="on-default remove-row" name="eliminar" href="javascript:void(0)" onclick="select_option(this)">
                        <i class="fa fa-trash-o"></i>
                    </a>
                </td>`].join(' ');
            var actions2 = [`
                <input type="number" step="any" id="input_cantidad" class="form-control" placeholder="Cantidad" value="`+$('#cantidad').val()+`" min="1" required />
            `].join(' ');
            var tabla = null;
            tabla = $("#datatable-editable").DataTable();
            var nodo = tabla.row.add([
                $("#productos option:selected").attr("clave"),
                $("#productos option:selected").attr("nombre"),
                actions2,
                actions,
                id
            ]).draw().node();
            $(nodo).attr('onclick', 'obtenerIndex(this)');
            $(nodo).attr('id', "" + id + "");
            $(nodo).find('td').eq(4).attr("style", "display:none");
            $(nodo).addClass('gradeX');
            nodo.click();
            $('#Guardar').magnificPopup('close');
        }
    }
    function select_option(obj){
        $(obj).parent().find("input").click();
    }
    function eliminar_producto(){
        var id = $("input:radio[name=opcion]:checked").val();
        $("#datatable-editable").DataTable().row($("#"+ id)).remove().draw();
    }
    function guardar_rq(){
        var reqm = [];
        var reqd = [];
        try {
            if ($("#serie option:selected").text() == "Seleccione la serie") {
                throw "Se debe seleccionar Serie";
            }
            if (!$("#folio").val()) {
                throw "No se ha generado el folio correctamente, intente nuevamente";
            }
            if ($("#datatable-editable tbody tr").text() == "No hay datos disponibles en la tabla") {
                throw "No hay datos disponibles en la tabla";
            }
            fecha = $("#fecha").datepicker('getDate');
            fechavencimiento = fechasMysql(fecha);
            reqm.push({  
                'accion': accion,
                'serie': $("#serie option:selected").text(),
                'folio': $("#folio").val(),
                'estado': 'RQ',
                'observaciones': $("#observaciones").val(),
                'fechavencimiento': fechavencimiento,
                'idsucursal': $("#idsucursal").val()
            });
            $("#datatable-editable tbody tr").each(function(index, value) {
                var cantidad_req = $(this).find("td").eq(2).find('input').val();
                if(cantidad_req > 0){ 
                    reqd.push({   
                        'clave': $(this).find("td").eq(0).html(),
                        'nombre': $(this).find("td").eq(1).html(),
                        'cantidad': cantidad_req,
                        'idproducto': $(this).find("td").eq(4).html()
                    });
                }
            });
            reqm = JSON.stringify(reqm);
            reqd = JSON.stringify(reqd);
            $.ajax({
                url: dirapi + "/set_requisicion",
                dataType: 'json',
                type: 'post',
                async: false,
                data: {
                    reqm: reqm,
                    reqd: reqd
                },
                success: function(data) {
                    if (data){
                        var loacation = window.location;
                        loacation.replace(dirrq);
                    } 
                }
            });
        } catch (err) {
            setTimeout(function () {
                $('#guardando').magnificPopup('close');
            }, 500);
            alertify.error("<h4>" + err + "</h4>");
        }
    }
</script>