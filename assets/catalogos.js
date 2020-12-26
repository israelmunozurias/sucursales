
var dirapi = window.location.origin + "/proyecto/api";
var dirrq = window.location.origin + "/proyecto/requisiciones";
    /* LLENADO DE SELECT */
function cargar_sucursal(sucursal, activo, id_select){
    $.ajax({
        url: dirapi + '/get_sucursales',
        dataType: 'html',
        type: 'post',
        async: false,
        data: {
            'sucursal': sucursal,
            'activo': activo,
            'id_select': id_select,
        },
        success: function(data) {
            $("#idsucursal").html(data); 
            $("#idsucursal").select2();
        }
    });
}
    /* FUNCIONES GENERALES */
function fechasMysql(fechaStr) {
    var fecha = new Date(fechaStr);
    var year = fecha.getFullYear(); //el año se puede quitar de este ejemplo
    var mes = fecha.getMonth() + 1; //pero ya que estamos lo ponemos completo
    var dia = fecha.getDate();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    //aquí se hace lo 'importante'
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (hora < 10) {
        hora = '0' + hora;
    }
    if (minutos < 10) {
        minutos = '0' + minutos;
    }
    if (segundos < 10) {
        segundos = '0' + segundos;
    }
    var fechaFormat = year + "-" + mes + "-" + dia;
    return fechaFormat;
}
function buscarProductos() {
    var buscar = $('#inputbuscar').val();
    if (buscar) {
        $.post(dirapi + "/filtrobusqueda",
            {
                buscar: buscar
            }, function (data) {
                    $("#productos").html(data);
                    $('#productos').select2();
                    $('#productosdiv').fadeIn();
                
            });
    }
}
function check(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    // Patron de entrada, en este caso solo acepta numeros y punto
    patron = /[0-9.]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}
function validar(elemento) {
    /* OPERACIONES DE COSOTO */
    var id_elemento = elemento.getAttribute("id");
    var max_elemento = elemento.getAttribute("max");

    if( parseFloat($("#"+id_elemento).val()) > parseFloat(max_elemento) ){
        $("#"+id_elemento).val(max_elemento);
        new PNotify({
            title: '¡Error!',
            text: 'Excedió la cantidad',
            type: 'error'
        });
    } 
}