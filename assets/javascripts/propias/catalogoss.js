
function get_administrador() {
    $("#obra option:selected").each(function () {
        $.post("http://localhost/api/empleados",
                {
                    accion: "get_administrador",
                    obra: $("#obra").val(),
                    puesto: 1
                }, function (data) {
            $("#solicitante").html(data);
        });
    });
}
;
//Generales
function tituloDlg(titulo) {
    tagTitulo = "<h2 id='titulo' class='panel-title'>" + titulo + "</h2>";
    $("#tituloDlg").html(tagTitulo);
    if (titulo == "Editar Proveedor") {
        buscarProveedor();
    }
}

function get_folio() {
    $("#obra option:selected").each(function () {
        if ($("#tiporequisicion").val()) {
            $.post("http://localhost/api/serie",
                    {
                        accion: "get_folio",
                        obra: $("#obra").val(),
                        tipo: $("#tiporequisicion").val()
                    }, function (data) {
                $("#fc_inputmask_1").val(data);
            });
        }
        ;
    });
}
function get_seriefolio() {
    limpiarmaquinaria();
    $("#obra option:selected").each(function () {
        if ($("#obra").val())
            $.post("http://localhost/api/serie",
                    {
                        accion: "get_serieyfolio",
                        obra: $("#obra").val()
                    }, function (data) {
                $("#fc_inputmask_1").html(data);
            });
    });
}
;
function obtenerIndex(row) {
    tabla = $("#datatable-editable").DataTable();
    renglon = row;
    index = row.rowIndex;
    //salert(index);
}
function iniciar() {
    $('#datatable-editable').addClass('table table-bordered table-striped mb-none');
}
//Proveedores
function limpiarDlgProveedor() {
    $("#nombre").val("");
    $("#calle").val("");
    $("#numeroint").val("");
    $("#numeroext").val("");
    $("#pais option[value=" + 0 + "]").attr("selected", true);
    $('#estado').empty();
    $('#municipio').empty();
    $('#localidad').empty();
    $('#colonia').empty();
    $("#giro").val(0);
    $("#rfc").val("");
    $("#cp").val("");
    $('#activo').prop('checked', false);
}

function clic_resultado_autocompletado_maquinaria(info) {
    $.post('http://localhost/api/maquinaria', {info: info}, function (data) {
        if (data != '')
        {
            $("#contenedorserie").attr("style", "display:none");
            var json_obj = $.parseJSON(data);
            for (var i in json_obj)
            {
                var valores = json_obj[i, 0];
                for (var x in valores)
                {
                    $("#neco").val(valores[x].id);
                    $("#marca").val(valores[x].marca);
                    $("#modelo").val(valores[x].modelo);
                    $("#serie").val(valores[x].serie);
                    $("#motor").val(valores[x].motor);
                    $("#seriemotor").val(valores[x].seriemotor);
                }
            }
            $("#contenedorserie").attr("style", "display:none");
        } else {
            $("#contenedorserie").attr("style", "display:none");
        }
    });
}
function clic_resultado_autocompletado_producto(info) {
    $.post('http://localhost/api/producto', {info: info}, function (data) {
        if (data != '')
        {
            $("#contenedornparte").attr("style", "display:none");
            var json_obj = $.parseJSON(data);
            for (var i in json_obj)
            {
                var valores = json_obj[i, 0];
                for (var x in valores)
                {
                    $("#nopar").val(valores[x].clave);
                    $("#descr").val(valores[x].nombre);
                }
            }
            $("#contenedornparte").attr("style", "display:none");
        } else {
            $("#contenedornparte").attr("style", "display:none");
        }
    });
}

function limpiarmaquinaria() {
    $("#neco").val("");
    $("#marca").val("");
    $("#modelo").val("");
    $("#serie").val("");
    $("#motor").val("");
    $("#seriemotor").val("");
    $("#contenedorserie").attr("style", "display:none");
}
function limpiarproducto() {
    $("#nopar").val("");
    $("#descr").val("");
    $("#canti").val("");
    $("#contenedornparte").attr("style", "display:none");
}

function datosmaquinaria() {
    var valorCambiado = $("#tiporequisicion option:selected").html();
    if (valorCambiado == 'Maquinaria') {
        $('#maquinaria').removeAttr("hidden");
    }
    else {
        $('#maquinaria').attr("hidden", "true");
    }
}
function buscarProveedor() {
    $.post("http://localhost:8080/api/proveedores",
            {
                accion: "buscarproveedor",
                idproveedor: $("input:radio[name=opcion]:checked").val()
            }, function (data) {
        var json_obj = $.parseJSON(data);
        for (var i in json_obj)
        {
            var valores = json_obj[i, 0];
            for (var x in valores)
            {
                $("#nombre").val(valores[x].nombre);
                $("#calle").val(valores[x].calle);
                $("#numeroint").val(valores[x].numeroint);
                $("#numeroext").val(valores[x].numeroext);
                $("#pais option[value=" + valores[x].idpais + "]").attr("selected", true);
                cbEstados(valores[x].idestado, false);
                cbMunicipios(valores[x].idmunicipio);
                cbLocalidades(valores[x].idlocalidad);
                cbColonias(valores[x].idcolonia);
                $("#giro").val(valores[x].idgiro);
                $("#rfc").val(valores[x].rfc);
                $("#cp").val(valores[x].cp);
                if (valores[x].activo == "S")
                    $('#activo').prop('checked', true);
                else
                    $('#activo').prop('checked', false);
            }
        }


    });
}

function autocompletarserie() {
    $("#neco").keyup(function () {
        var info = $(this).val();
        $.post('http://localhost/api/autocompletar', {accion: "get_serie", info: info}, function (data) {
            if (data != '')
            {
                $("#contenedorserie").attr("style", "display:block");
                $("#contenedorserie").html(data);

            } else {
                $("#contenedorserie").html('');
                $("#contenedorserie").attr("style", "display:none");
            }
        });
    });

}

function autocompletarnparte() {
    $("#nopar").keyup(function () {
        var info = $(this).val();
        $.post('http://localhost/api/autocompletar', {accion: "get_nparte", info: info}, function (data) {
            if (data != '')
            {
                $("#contenedornparte").attr("style", "display:block");
                $("#contenedornparte").html(data);
            } else {
                $("#contenedornparte").html('');
                $("#contenedornparte").attr("style", "display:none");
            }
        });
    });
}

function cargarTablaProveedores() {
    var id;
    alert("");
    $.post("http://localhost:8080/api/proveedores",
            {
                accion: "cargarid"
            }, function (data) {
        id = data;
        var actions = [
            "<input type='radio' checked='true'  id='opcion' value='" + id + "' name='opcion'>",
            "<label><font color='white'>Es</font></label>",
            "<a class='on-default remove-row' name='eliminar' href='javascript:void(0)'><i class='fa fa-trash-o'></i></a>"
        ].join(' ');
        if ($("#activo:checked").val())
            activo = "Si";
        else
            activo = "No";
        var tabla = null;
        var colonia = $("#colonia").html();
        var localidad = $("#localidad").html();
        tabla = $("#datatable-editable").DataTable();
        var nodo = tabla.row.add([
            nombre,
            calle,
            numeroint,
            colonia,
            localidad,
            rfc,
            activo,
            actions
        ]).draw().node();
        $(nodo).attr('onclick', 'obtenerIndex(this)');
        $(nodo).attr('id', "" + id + "");
        $(nodo).attr('name', "proveedor");
        $(nodo).addClass('gradeX');
        $(nodo).find('td').addClass('actions');
    });

}

function guardarProveedor() {
    var idProveedor = $("input:radio[name=opcion]:checked").val();
    if ($("#tituloDlg").text() == "Agregar Proveedor") {
        accion = "agregar";
    }
    else {
        accion = "modificar";
    }
    if ($("#activo:checked").val())
        activo = "S";
    else
        activo = "N";

    nombre = $("#nombre").val();
    calle = $("#calle").val();
    numeroint = $("#numeroint").val();
    rfc = $("#rfc").val();
    $.post("http://localhost:8080/api/proveedores",
            {
                accion: accion,
                idproveedor: $("input:radio[name=opcion]:checked").val(),
                nombre: $("#nombre").val(),
                calle: $("#calle").val(),
                numeroint: $("#numeroint").val(),
                numeroext: $("#numeroext").val(),
                idpais: $("#pais").val(),
                idestado: $("#estado").val(),
                idmunicipio: $("#municipio").val(),
                idlocalidad: $("#localidad").val(),
                idcolonia: $("#colonia").val(),
                idgiro: $("#giro").val(),
                rfc: $("#rfc").val(),
                cp: $("#cp").val(),
                activo: activo
            }, function (data) {

        if ($("#tituloDlg").text() == "Agregar Proveedor") {
            if (data) {
                cargarTablaProveedores();
                mensaje = "<div class='alert alert-success'>" +
                        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>" +
                        "<strong>Excelente!</strong>Proveedor gurdado con exito" +
                        "</div>";
            }
            else {
                mensaje = "<div class='alert alert-danger'>" +
                        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>" +
                        "<strong>Excelente!</strong>No se pudo guardar proveedor" +
                        "</div>";
            }
            $("#mensaje").html(mensaje);
        }
        else {
            if (data) {
                mensaje = "<div class='alert alert-success'>" +
                        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>" +
                        "<strong>Excelente!</strong>Proveedor modificado con exito" +
                        "</div>";

                tabla = $("#datatable-editable").DataTable();
                alert(renglon);
                alert(tabla.rows(renglon).nombre);
                tabla.rows(renglon).remove().draw();

                var actions = [
                    "<input type='radio' checked='true'  id='opcion' value='" + idProveedor + "' name='opcion'>",
                    "<label><font color='white'>Es</font></label>",
                    "<a class='on-default remove-row' name='eliminar' href='javascript:void(0)'><i class='fa fa-trash-o'></i></a>"
                ].join(' ');
                if ($("#activo:checked").val())
                    activo = "Si";
                else
                    activo = "No";
                var tabla = null;
                var colonia = $("#colonia").html();
                var localidad = $("#localidad").html();
                tabla = $("#datatable-editable").DataTable();
                alert($("#nombre").val());
                var nodo = tabla.row.add([
                    nombre,
                    calle,
                    numeroint,
                    colonia,
                    localidad,
                    rfc,
                    activo,
                    actions
                ]).draw().node();
                $(nodo).attr('onclick', 'obtenerIndex(this)');
                $(nodo).attr('id', "" + idProveedor + "");
                $(nodo).attr('name', "proveedor");
                $(nodo).addClass('gradeX');
                $(nodo).find('td').addClass('actions');

            }
            else {
                mensaje = "<div class='alert alert-danger'>" +
                        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>" +
                        "<strong>Excelente!</strong>No se pudo modificar proveedor" +
                        "</div>";
            }
            $("#mensaje").html(mensaje);
        }

    });
}
function cbEstados(idEstado, estado) {
    //  $("#pais option:selected").each(function () {
    $.post("http://localhost:8080/api/estados",
            {
                accion: "cargarcb",
                idestado: idEstado,
                estado: estado,
                idpais: $("#pais").val()
            }, function (data) {
        $("#estado").html(data);
    });
    // });
    return true;
}
function cbMunicipios(idMunicipio) {
    //$("#estado option:selected").each(function () {
    $.post("http://localhost:8080/api/municipios",
            {
                accion: "cargarcb",
                idestado: $("#estado").val(),
                idmunicipio: idMunicipio
            }, function (data) {
        $("#municipio").html(data);
    });
    //});
}

function cbLocalidades(idLocalidad) {
    // $("#municipio option:selected").each(function () {
    $.post("http://localhost:8080/api/localidades",
            {
                accion: "cargarcb",
                idmunicipio: $("#municipio").val(),
                idlocalidad: idLocalidad
            }, function (data) {
        $("#localidad").html(data);
    });
    //});
}

function cbColonias(idColonia) {
    // $("#localidad option:selected").each(function () {
    $.post("http://localhost:8080/api/colonias",
            {
                accion: "cargarcb",
                idmunicipio: $("#municipio").val(),
                idcolonia: idColonia
            }, function (data) {
        $("#colonia").html(data);
    });
    // });
}

function get_maquinaria() {
    var json_obj = $.parseJSON(data);
    for (var i in json_obj)
    {
        var valores = json_obj[i, 0];
        for (var x in valores)
        {
            $("#nombre").val(valores[x].nombre);
            $("#calle").val(valores[x].calle);
            $("#numeroint").val(valores[x].numeroint);
            $("#numeroext").val(valores[x].numeroext);
            $("#pais option[value=" + valores[x].idpais + "]").attr("selected", true);
            cbEstados(valores[x].idestado, false);
            cbMunicipios(valores[x].idmunicipio);
            cbLocalidades(valores[x].idlocalidad);
            cbColonias(valores[x].idcolonia);
            $("#giro").val(valores[x].idgiro);
            $("#rfc").val(valores[x].rfc);
            $("#cp").val(valores[x].cp);
            if (valores[x].activo == "S")
                $('#activo').prop('checked', true);
            else
                $('#activo').prop('checked', false);
        }
    }
}
function cerrar(){
    $('#guardar').magnificPopup('close');
}
