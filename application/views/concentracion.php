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
                        <label class="col-sm-1 control-label">Fecha Inico: </label>
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                                <input type="text" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA" value="<?= $fechaini ?>" id="fechaini">
                            </div>
                        </div>
                        <label class="col-sm-1 control-label">Fecha Final: </label>
                        <div class="col-sm-3">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                                <input type="text" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA" value="<?= $fechafin ?>" id="fechafin">
                            </div>
                        </div>
                        <label class="col-sm-1 control-label">Sucursal: </label>
                        <div class="col-sm-3">
                            <select class="form-control" id="idsucursal">sucursales
                              
                            </select>
                        </div>
                    </div> 
                </div>
                <br>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-md"> 
                            <a href="#filtrar" name="filtrar" class="btn btn-primary" style="transform: translateX(298%)" onclick="Filtro_RQ()">Filtrar <i class="fa fa-pencil"></i></a> 
                        </div>
                    </div>
                </div>
                <table class="table table-bordered table-striped mb-none" id="datatable-editable">
                    <thead>
                        <tr>   
                        <!-- 0 -->    <th>Serie</th>
                        <!-- 1 -->    <th>Folio</th> 
                        <!-- 2 -->    <th>Sucursal</th>
                        <!-- 3 -->    <th>Estado</th>
                        <!-- 4 -->    <th>Observaciones</th>
                        <!-- 5 -->    <th>Fecha Creación</th>
                        <!-- 6 -->    <th>Fecha Vencimiento</th>
                        <!-- 7 -->    <th>Acciones</th>
                        <!-- 8 -->    <th style="display:none;">id</th>
                        <!-- 9 -->    <th style="display:none;">idsucursal</th>
                        </tr>
                    </thead>
                    <tbody id="tabla">
                    </tbody>
                </table>
            </div>
            <!-- end: page --> 
        </section>
    </section>
  
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
                        <button id="dialogConfirm" class="btn btn-primary" onclick="eliminar_producto();">Confirmar</button>
                        <button id="dialogCancel" class="btn btn-default">Cancelar</button>
                    </div>
                </div>
            </footer>
        </section>
    </div>
    <a id="btnAbrirModal" href="#modalHistorialEstado" type="button" class="mt-lg btn btn-primary modal-with-form hide"><i class="fa fa-list-alt"></i> </a>
    <div id="modalHistorialEstado" name="modalHistorialEstado" style="" class="modal-block modal-block-primary mfp-hide">
            <section class="panel">
                <header id="tituloDlg" class="panel-heading">
                    <h2 id='titulo' class='panel-title'>Historial de Estado</h2>
                </header>
                <div class="panel-body">
                    <table class="table table-bordered table-striped mb-none" id="datatable-editable2">
                        <thead>
                            <tr>  
                            <!-- 0 -->    <th>Clave</th>
                            <!-- 1 -->    <th>Nombre</th>
                            <!-- 2 -->    <th style="width: 70px;">Cantidad Requisición</th> 
                            <!-- 3 -->    <th style="width: 70px;">Cantidad Entrada</th> 
                            <!-- 4 -->    <th style="display:none;">id</th>
                            <!-- 5 -->    <th style="display:none;">idrequisicion</th>
                            </tr>
                        </thead>
                        <tbody id="tabla">
                        </tbody>
                    </table>
                    <div class="form-group">
                        <div class="col-md-12 text-right">
                            <button class="btn btn-primary" id="insertar" onclick="guardar_entradas()">Guardar</button>
                            <button class="btn btn-default modal-dismiss">Cancelar </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
</body>
<script type="text/javascript">
    
    $(document).ready(function() {
        cargar_sucursal('', 'S', '');
        Filtro_RQ();
    }); 
    function Filtro_RQ() {
        var fechaI = $("#fechaini").datepicker('getDate');
        var fechainicial = fechasMysql(fechaI);
        var fechaF = $("#fechafin").datepicker('getDate');
        var fechafinal = fechasMysql(fechaF);
        
        $("#datatable-editable").DataTable();
        var table = $('#datatable-editable').DataTable();
        table.row().remove().draw( false );
        $("#datatable-editable").DataTable().destroy(); 
        $('#datatable-editable').DataTable({
            createdRow: function(row, data, index) { 
                $(row).find('td').eq(8).attr("style", "display:none");
                $(row).find('td').eq(9).attr("style", "display:none");

                obs = data[4].substr(0, 26);
                var o = data[4].substr(27, 28);
                if (o) {
                    obs = obs + "[...]";
                    $(row).find('td').eq(4).attr("title", data[4]);
                    $(row).find('td').eq(4).text(obs); 
                }   
                $(row).attr('id',data[8]);  

            },
            "destroy": true,
            "order": [
                [0, "asc"]
            ],
            "iDisplayLength": 10,
            "ajax": {
                "url": dirapi + "/get_concentracion",
                "type": "POST",
                "data": {
                    /* "id": false, */
                    "idsucursal": $("#idsucursal").val(),
                    /* "estado": false */
                    "fechaini": fechainicial,
                    "fechafin": fechafinal
                },
            },
            "sAjaxDataProp": "",
            "deferRender": true,
        });
    }
    function accion(elemento){
        var id = $("input:radio[name=opcion]:checked").val();
        var serie = $("#" + id).find('td').eq(0).html();
        var folio = $("#" + id).find('td').eq(1).html();
        if(elemento == 'N'){
            window.open(dirrq + "/nueva");
        } else if(elemento == 'E'){
            if (id === undefined) {
                alertify.error("<h4> Seleccione una requisicion </h4>");
            } else if ($("#" + id).find('td').eq(3).html() != 'En requisición') {
                alertify.error("<h4> Solo las requisiciones en estado REQUISICIÓN se puden editar </h4>");
            } else {
                window.open(dirrq + "/editar/" + serie + "/" + folio);
            }
        }
    }
    function select_option(obj){
        $(obj).parent().find("input").click();
    }
    function eliminar_producto(){
        var id = $("input:radio[name=opcion]:checked").val();
        if($("#" + id).find('td').eq(3).text() == "En requisición"){
            $.ajax({
                url: dirapi + "/delete_requisicion",
                dataType: 'json',
                type: 'post',
                async: false,
                data: {
                    idrequisicion: id
                },
                success: function(data) {
                    if(data){
                        $("#datatable-editable").DataTable().row($("#"+ id)).remove().draw();
                    }
                }
            });
        } else {
            alertify.error("<h4> La requisicion tiene movimientos </h4>");
        }
        
    }
    function COM_abrirModal(idrequisicion){
        $("#btnAbrirModal").trigger('click');
        $("#datatable-editable2").DataTable();
        var table = $('#datatable-editable2').DataTable();
        table.row().remove().draw( false );
        $("#datatable-editable2").DataTable().destroy(); 
        $('#datatable-editable2').DataTable({
            createdRow: function(row, data, index) { 
                $(row).find('td').eq(4).attr("style", "display:none");
                $(row).find('td').eq(5).attr("style", "display:none");
                $(row).attr('id',data[4]);  
            },
            "destroy": true,
            "order": [
                [0, "asc"]
            ],
            "iDisplayLength": 100,
            "ajax": {
                "url": dirapi + "/get_concentraciond",
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
    function guardar_entradas(){
        var reqd = [];
        $("#datatable-editable2 tbody tr").each(function(index, value) {
            reqd.push({   
                'idrequisicion': $(this).find("td").eq(5).html(),
                'idproducto': $(this).find("td").eq(4).html(),
                'cantidad_ec': $(this).find("td").eq(3).find('input').val()
            });
        });
        reqd = JSON.stringify(reqd);
        $.ajax({
            url: dirapi + "/set_entrada",
            dataType: 'json',
            type: 'post',
            async: false,
            data: {
                reqd: reqd
            },
            success: function(data) {
                $('#modalHistorialEstado').magnificPopup('close');
            }
        });
    }
</script>