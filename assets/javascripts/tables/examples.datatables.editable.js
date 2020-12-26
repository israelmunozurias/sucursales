/*
 Name: 			Tables / Editable - Examples
 Written by: 	Okler Themes - (http://www.okler.net)
 Theme Version: 	1.3.0
 */
var dirapi = window.location.origin + "/silsaingenieria/api";
(function ($) {

    'use strict';

    var EditableTable = {
        options: {
            addButton: '#addToTable',
            table: '#datatable-editable',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);

            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable();

            window.dt = this.datatable;

            return this;
        },
        events: function () {
            var _self = this;

            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();

                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();

                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();

                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    e.preventDefault();

                    var $row = $(this).closest('tr');

                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();
                                    var catalogoDocumento = $row.attr('name');
                                    var id = $row.attr('id');

                                    var mensaje = "";
                                    if (catalogoDocumento == 'tipogastos') {
                                        $.post(dirapi + "/tipogastos",
                                            {
                                                accion: "eliminar",
                                                idtipogastos: id //es la variable que enviamos hacia la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Tipo de gasto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el tipo de gasto </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'proveedor') {
                                        $.post(dirapi + "/proveedores",
                                            {
                                                accion: "eliminar",
                                                idProveedor: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Proveedor eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar proveedor </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'derechoasignado') {

                                        $.post(dirapi + "/derechos",
                                            {
                                                accion: "eliminarDerechoAsignado",
                                                idderechosasignados: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Derechos eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar derechos </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'salida') {
                                        $.post(dirapi + "/salidas",
                                            {
                                                accion: "eliminar",
                                                idSalida: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Salida eliminada con éxito </h4>");
                                                    //_self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar salida </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'salidad') {
                                        $.post(dirapi + "/salidas",
                                            {
                                                accion: "eliminardetalle",
                                                idSalida: id,
                                                serie: serie,
                                                folio: folio
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Producto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el producto </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'entradad') {
                                        //alert("Eliminar");
                                        //   console.log("entradas eliminardetalle");
                                        $.post(dirapi + "/entradas",
                                            {
                                                accion: "eliminardetalle",
                                                idEntrada: id,
                                                serie: serie,
                                                folio: folio
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Producto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el producto </h4>");
                                                }

                                            });
                                    }
                                    ;


                                    if (catalogoDocumento == 'viaticos') {
                                        $.post(dirapi + "/viaticos",
                                            {
                                                accion: "eliminardetalle",
                                                idViatico: id,
                                                serie: serie,
                                                folio: folio
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Solicitud eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la solicitud </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'entradas') {
 
                                        $.post(dirapi + "/entradas",
                                            {
                                                accion: "eliminar",
                                                idEntrada: id
                                            }, function (data) {
                                                if (data) {
                                                    if(data!='CS'){
                                                        alertify.success("<h4> Entrada eliminada con éxito </h4>");
                                                        //_self.rowRemove($row);
                                                    }
                                                    else{
                                                        alertify.error("<h4> No se pudo eliminar entrada ya tiene salidas realizadas</h4>");
                                                    }
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar entrada </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'traspasos') {
                                        $.post(dirapi + "/traspasos",
                                            {
                                                accion: "eliminar",
                                                idTraspaso: id
                                            }, function (data) {
                                                if (data) {
                                                    if(data!='CS'){
                                                        alertify.success("<h4> Traspaso eliminado con éxito </h4>");
                                                       // _self.rowRemove($row);
                                                    }
                                                    else{
                                                        alertify.error("<h4> No se pudo eliminar traspaso ya tiene salidas realizadas</h4>");
                                                    }
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar traspaso </h4>");
                                                }


                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'pais') {
                                        $.post(dirapi + "/paises",
                                            {
                                                accion: "eliminar",
                                                idpais: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> País eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar pais </h4>");

                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'producto') {
                                        $.post(dirapi + "/productos",
                                            {
                                                accion: "eliminar",
                                                idProducto: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Producto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar producto </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'servicio') {
                                        $.post(dirapi + "/productos",
                                            {
                                                accion: "eliminar",
                                                idProducto: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Servicio eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar servicio </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'maquinaria') {
                                        $.post(dirapi + "/maquinaria",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Maquinaria eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la maquinaria </h4>");

                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'departamento') {
                                        $.post(dirapi + "/departamentos",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Departamento eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el departamento </h4>");

                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'puesto') {
                                        $.post(dirapi + "/puestos",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Puesto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el puesto </h4>");

                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'empleado') {
                                        $.post(dirapi + "/empleados",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    if (data == 2) {
                                                        alertify.error("<h4> No se pudo eliminar el empleado por estar ligado a un usuario</h4>");
                                                    } else {
                                                        alertify.success("<h4> Empleado eliminado con éxito </h4>");
                                                        _self.rowRemove($row);
                                                    }
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el empleado </h4>");

                                                }
                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'obra') {
                                        $.post(dirapi + "/obras",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Obra eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> no se pudo eliminar la obra </h4>");

                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'moneda') {
                                        $.post(dirapi + "/monedas",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Moneda eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la moneda </h4>");

                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'cuenta') {

                                        $.post(dirapi + "/cuentas",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Cuenta eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la cuenta </h4>");

                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'derecho') {

                                        $.post(dirapi + "/derechos",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Dercho eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la derecho </h4>");

                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'unidad') {
                                        //  console.log("entro a eliminar");
                                        $.post(dirapi + "/unidades",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Unidad eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la unidad </h4>");

                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'colonia') {
                                        //   console.log("entro a eliminar");
                                        $.post(dirapi + "/colonias",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Colonia eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la colonia </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'estado') {
                                        //       console.log("entro a eliminar");
                                        alertify.error("<h4> No es posible eliminar, se encuentra en uso </h4>");
                                        $.post(dirapi + "/estados",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    _self.rowRemove($row);
                                                    alertify.success("<h4> Estado eliminado con éxito </h4>");

                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el estado </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'localidad') {
                                        //        console.log("entro a eliminar");
                                        $.post(dirapi + "/localidades",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Localidad eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la localidad </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'municipio') {
                                        //          console.log("entro a eliminar");
                                        $.post(dirapi + "/municipios",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Municipio eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el municipio </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'giro') {
                                        //         console.log("entro a eliminar");
                                        $.post(dirapi + "/giros",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Giro eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el giro </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'almacen') {
                                        //         console.log("entro a eliminar");
                                        $.post(dirapi + "/almacenes",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Almacen eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el almacen </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'serie') {
                                        //         console.log("entro a eliminar");
                                        $.post(dirapi + "/series",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success('<h4> Serie eliminada con éxito <i class="fa fa-check-circle"></i></h4>');
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error('<h4> No se pudo eliminar la serie <i class="fa fa-times-circle"></i></h4>');
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'linea') {
                                        //           console.log("entro a eliminar");
                                        $.post(dirapi + "/linea",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Linea eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la linea </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'sublinea') {
                                        //           console.log("entro a eliminar");
                                        $.post(dirapi + "/sublinea",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Sublinea eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la sublinea </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'tipodocumento') {
                                        //          console.log("entro a eliminar");
                                        $.post(dirapi + "/tipodocumentos",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Tipo de documento eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el tipo de documento </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'conceptodocumento') {
                                        //         console.log("entro a eliminar");
                                        $.post(dirapi + "/conceptodocumentos",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Concepto del documento eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el concepto del documento </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'empresa') {
                                        //         console.log("entro a eliminar");
                                        $.post(dirapi + "/empresas",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Empresa eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la empresa </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'tipoentrada') {
                                        //        console.log("entro a eliminar");
                                        $.post(dirapi + "/tipoentradas",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Tipo de entrada eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el tipo de entrada </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'banco') {
                                        alertify.error("<h4> No es posible eliminar, se encuentra en uso </h4>");
                                        //   console.log("entro a eliminar");
                                        $.post(dirapi + "/bancos",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Banco eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el banco </h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'descuento') {
                                        // console.log("entro a eliminar");
                                        $.post(dirapi + "/descuentos",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Descuento eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el descuento </h4>");
                                                }

                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'autorizacion') {
                                        //    console.log("entro a eliminar");
                                        $.post(dirapi + "/autorizaciones",
                                            {
                                                accion: "eliminar",
                                                id: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4>Autorizacion eliminada correctamente</h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4>No se pudo eliminar la autorizacion</h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'impuesto') {
                                        $.post(dirapi + "/impuestos",
                                            {
                                                accion: "eliminar",
                                                idimpuesto: id
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Impuesto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el impuesto </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'gastos') {
                                        $.post(dirapi + "/gastos",
                                            {
                                                accion: "eliminar",
                                                idgasto: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Gasto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Gasto </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'paqueteria') {
                                        $.post(dirapi + "/paqueterias",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Paqueteria eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Paqueteria </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'marcas') {
                                        $.post(dirapi + "/marcas",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Marca eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Marca </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'marcaproducto') {
                                        $.post(dirapi + "/marcas",
                                            {
                                                accion: "eliminarprod",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Producto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Producto </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'concepto2') {
                                        $.post(dirapi + "/conceptos",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    ActualizarTablaConcepto();
                                                    alertify.success("<h4> Concepto eliminado con éxito </h4>");
                                                  //  _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Concepto </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'conceptoAt') {
                                        $.post(dirapi + "/conceptosAt",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    ActualizarTablaConceptoAt();
                                                    alertify.success("<h4> Concepto eliminado con éxito </h4>");
                                                   // _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Concepto </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'proyecto') {
                                        $.post(dirapi + "/proyectos",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Proyecto eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Proyecto </h4>");
                                                }
                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'perfil') {
                                        $.post(dirapi + "/perfil",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Perfil eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Perfil </h4>");
                                                }
                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'sistemas') {

                                        $.post(dirapi + "/sistemas",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Sistema eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Sistema </h4>");
                                                }
                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'accesos') {

                                        $.post(dirapi + "/accesos",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Acceso eliminado con éxito. </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Acceso. </h4>");
                                                }
                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'accesosasignados') {

                                        $.post(dirapi + "/accesosasignados",
                                            {
                                                accion: "eliminar",
                                                id: id //es la variable que enviamos desde la API
                                            }, function (data) {
                                                if (data) {
                                                    alertify.success("<h4> Acceso Asignado eliminado con éxito. </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar el Acceso Asignado. </h4>");
                                                }
                                            });
                                    }
                                    ;
                                    if (catalogoDocumento == 'entradacompra') {
                                        $.post(dirapi + "/ordencompras",
                                            {
                                                accion: "eliminarec",
                                                idEntradacompra: id
                                            }, function (data) {
                                                if (data) {
                                                    if(data!='CS'){
                                                        alertify.success("<h4> Entrada eliminada con éxito </h4>");
                                                       // _self.rowRemove($row);
                                                    }
                                                    else{
                                                        alertify.error("<h4> No se pudo eliminar entrada ya tiene salidas realizadas</h4>");
                                                    }
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar la entrada por compra</h4>");
                                                }

                                            });
                                    }
                                    ;

                                    if (catalogoDocumento == 'tarjeta') {
                                        //alertify.success("<h4> Tarjeta de maquinaria eliminada con éxito </h4>");
                                        _self.rowRemove($row);
                                    };

                                    if (catalogoDocumento == 'productoreq') {
                                        //       console.log("entro a eliminar");
                                        var restaimpuesto = $(renglon).find('td').eq(7).html();
                                        var restadescuento = $(renglon).find('td').eq(8).html();
                                        var restaimporte = $(renglon).find('td').eq(5).html();
                                        var restasubtotal = $("#subtotal").text();
                                        var restatotal = $("#total").text();
                                        var restadescuentos = $("#descuento").text();
                                        var restaimpuestos = $("#impuestos").text();
                                        restatotal = parseFloat(restatotal) - parseFloat(restaimporte) - parseFloat(restaimpuesto) + parseFloat(restadescuento);
                                        restasubtotal = restasubtotal - restaimporte;
                                        restaimpuestos = restaimpuestos - restaimpuesto;
                                        restadescuentos = restadescuentos - (restadescuento);
                                        $("#subtotal").text(parseFloat(restasubtotal).toFixed(2));
                                        $("#total").text(parseFloat(restatotal).toFixed(2));
                                        $("#descuento").text(parseFloat(restadescuentos).toFixed(2));
                                        $("#impuestos").text(parseFloat(restaimpuestos).toFixed(2));
                                        _self.rowRemove($row);

                                    }
                                    var url = window.location.pathname;
                                    var direccion = url.split("/");
                                    var vista = direccion[3];

                                    if (catalogoDocumento == 'productordencompra') {
                                        if($("#UUIDFP").val() != "" && vista != "entradacompracap") { 
                                            alertify.error("<h4> Hay facturas de proveedor ligadas, si decea continuar porfavor deslige para actualizar los saldos al eliminar el producto</h4>");
                                        }else{
                                            //console.log("entro a eliminar con la cantidad");
                                            var restaimpuesto = $(renglon).find('td').eq(7).html();
                                            var restadescuento = $(renglon).find('td').eq(8).html();
                                            var restaimporte = $(renglon).find('td').eq(5).html();
                                            var restaretiva = $(renglon).find('td').eq(12).html();
                                            var restaretisr = $(renglon).find('td').eq(13).html();
                                            var cantidad = $(renglon).find('td').eq(0).html();
                                            var restasubtotal = $("#subtotal").text();
                                            var restatotal = $("#total").text();
                                            var restadescuentos = $("#descuento").text();
                                            var restaimpuestos = $("#impuestos").text();
                                            var restaretivam = $("#retenidoivam").text();
                                            var restaretisrm = $("#retenidoisrm").text();
                                            var restadescuentoreal = parseFloat(restaimporte) + (parseFloat(restaimpuesto)) - (parseFloat(restadescuento) * parseFloat(cantidad)) - (parseFloat(restaretiva) * parseFloat(cantidad)) - (parseFloat(restaretisr) * parseFloat(cantidad));
                                            restatotal = parseFloat(restatotal) - parseFloat(restadescuentoreal);
                                            restasubtotal = restasubtotal - parseFloat(restaimporte);
                                            restaimpuestos = restaimpuestos - (parseFloat(restaimpuesto));
                                            restadescuentos = restadescuentos - (parseFloat(restadescuento) * parseFloat(cantidad));
                                            restaretivam = restaretivam - (parseFloat(restaretiva) * parseFloat(cantidad));
                                            restaretisrm = restaretisrm - (parseFloat(restaretisr) * parseFloat(cantidad));
                                            $("#subtotal").text(restasubtotal.toFixed(2));
                                            $("#total").text(restatotal.toFixed(2));
                                            $("#descuento").text(restadescuentos.toFixed(2));
                                            $("#impuestos").text(restaimpuestos.toFixed(2));
                                            $("#retenidoivam").text(restaretivam.toFixed(2));
                                            $("#retenidoisrm").text(restaretisrm.toFixed(2));

                                            $("#totaloc").text(restatotal.toFixed(2));
                                            $("#saldooc").text(restatotal.toFixed(2));
                                            _self.rowRemove($row);
                                        }
                                        

                                    }
                                    if (catalogoDocumento == 'tarjetamaq') {
                                        var id = $("input:radio[name=opcion]:checked").val();
                                        var combustibleant = $("#" + id).find('td').eq(2).html();
                                        var lubricanteant = $("#" + id).find('td').eq(4).html();
                                        var grasant = $("#" + id).find('td').eq(6).html();
                                        var totalcombustible = $("#totalcombus").html();
                                        var totalubricante = $("#totalub").html();
                                        var totalgrasa = $("#totalgrasa").html();
                                        totalcombustible = parseFloat(totalcombustible) - parseFloat(combustibleant);
                                        totalubricante = parseFloat(totalubricante) - parseFloat(lubricanteant);
                                        totalgrasa = parseFloat(totalgrasa) - parseFloat(grasant);
                                        $("#totalcombus").html(totalcombustible);
                                        $("#totalub").html(totalubricante);
                                        $("#totalgrasa").html(totalgrasa);
                                        _self.rowRemove($row);
                                    }

                                    if (catalogoDocumento == 'ordencompra') { //Eliminar factura proveedor si no tiene orden de compra adjunta
                                        $.post(dirapi + "/facturasproveedor",
                                            {
                                                accion: "validarDelete",
                                                id: id
                                            }, function (data) {
                                                if (data == 1) {
                                                    alertify.success("<h4> Factura eliminada con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    //console.log(data);
                                                    alertify.error("<h4> No se pudo eliminar factura porque esta ligada a una orden de compra </h4>");
                                                }

                                            });
                                    }

                                    if (catalogoDocumento == 'roles') { //Eliminar Rol si no fue asignado a algun empleado
                                        var direapi = window.location.origin + "/silsa/recursoshumanos";
                                        $.post(direapi + "/roles_CRUD",
                                            {
                                                accion: "validarDelete",
                                                idrol: id
                                            }, function (data) {
                                                if (data == 1) {
                                                    alertify.success("<h4> Rol eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    //console.log(data);
                                                    alertify.error("<h4> No se pudo eliminar rol porque esta ligado a un empleado </h4>");
                                                }

                                            });
                                    }

                                    if (catalogoDocumento == 'horarios') {
                                        var direapi = window.location.origin + "/silsa/recursoshumanos";
                                        $.post(direapi + "/horario_CRUD",
                                            {
                                                accion: "validarDelete",
                                                idhorario: id
                                            }, function (data) {
                                                console.log("Data : " + data);
                                                if(data == 1) {
                                                    alertify.success("<h4> Horario eliminado con éxito </h4>");
                                                    _self.rowRemove($row);
                                                }
                                                else {
                                                    alertify.error("<h4> No se pudo eliminar horario porque esta ligado a un empleado </h4>");
                                                }

                                            });
                                    }

                                     if (catalogoDocumento == 'conceptoestimacioncliente') {
                                        //console.log("entro a eliminar con la cantidad");
                                        var restaimpuesto = $(renglon).find('td').eq(8).html();
                                        var restaimporte = $(renglon).find('td').eq(4).html();
                                        var cantidad = $(renglon).find('td').eq(2).html();

                                        var restasubtotal = $("#subtotal").text();
                                        var restatotal = $("#total").text();
                                        var restaimpuestos = $("#impuestos").text();

                                        var restadescuentoreal = parseFloat(restaimporte) + (parseFloat(restaimpuesto) * parseFloat(cantidad));
                                        restatotal = parseFloat(restatotal) - parseFloat(restadescuentoreal);

                                        restasubtotal = restasubtotal - parseFloat(restaimporte);
                                        restaimpuestos = restaimpuestos - (parseFloat(restaimpuesto) * parseFloat(cantidad));
                                        
                                        $("#subtotal").text(restasubtotal.toFixed(2));
                                        $("#total").text(restatotal.toFixed(2));
                                        $("#impuestos").text(restaimpuestos.toFixed(2));
                                        _self.rowRemove($row);

                                    }

                                    $.magnificPopup.close();
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                });

            this.$addButton.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd();
            });

            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });

            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
        rowAdd: function () {
            this.$addButton.attr({ 'disabled': 'disabled' });

            var actions,
                data,
                $row;

            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');

            data = this.datatable.row.add(['', '', '', '', '', '', '', actions]);
            $row = this.datatable.row(data[0]).nodes().to$();

            $row
                .addClass('adding')
                .find('td:last')
                .addClass('actions');

            this.rowEdit($row);

            this.datatable.order([0, 'asc']).draw(); // always show fields
        },
        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;

            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {

                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);

                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {
            var _self = this,
                data;

            data = this.datatable.row($row.get(0)).data();

            $row.children('td').each(function (i) {
                var $this = $(this);

                if ($this.hasClass('actions')) {
                    _self.rowSetActionsEditing($row);
                } else {
                    $this.html('<input type="text" id="' + data[i] + '" class="form-control input-block" value="' + data[i] + '"/>');
                }
            });
        },
        rowSave: function ($row) {
            var _self = this,
                $actions,
                values = [];

            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
                $row.removeClass('adding');
            }

            values = $row.find('td').map(function () {
                var $this = $(this);

                if ($this.hasClass('actions')) {
                    _self.rowSetActionsDefault($row);
                    return _self.datatable.cell(this).data();
                } else {
                    return $.trim($this.find('input').val());
                }
            });
            $.get("http://localhost/compras/test/modificar", function (data) {
                $(".result").html(data);
                alert("Load was performed.");
            });

            $.post("http://localhost/compras/test/agregar", { cantidad: values[0] }, function (data) {
                alert("Guardado " + values[1]);
            });

            this.datatable.row($row.get(0)).data(values);

            $actions = $row.find('td.actions');
            if ($actions.get(0)) {
                this.rowSetActionsDefault($row);
            }

            this.datatable.draw();
        },
        rowRemove: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }

    };

    $(function () {
        EditableTable.initialize();
    });

}).apply(this, [jQuery]);

//datatable editable 2
(function ($) {

    'use strict';

    var EditableTable2 = {
        options: {
            addButton: '#addToTable',
            table: '#datatable-editable2',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);

            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable();

            window.dt = this.datatable;

            return this;
        },
        events: function () {
            var _self = this;

            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();

                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();

                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();

                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    e.preventDefault();

                    var $row = $(this).closest('tr');
                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();


                                    $.magnificPopup.close();
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                });

            this.$addButton.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd();
            });

            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });

            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
        rowAdd: function () {
            this.$addButton.attr({ 'disabled': 'disabled' });

            var actions,
                data,
                $row;

            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');

            data = this.datatable.row.add(['', '', '', '', '', '', '', actions]);
            $row = this.datatable.row(data[0]).nodes().to$();

            $row
                .addClass('adding')
                .find('td:last')
                .addClass('actions');

            this.rowEdit($row);

            this.datatable.order([0, 'asc']).draw(); // always show fields
        },
        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;

            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {

                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);

                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {
            var _self = this,
                data;

            data = this.datatable.row($row.get(0)).data();

            $row.children('td').each(function (i) {
                var $this = $(this);

                if ($this.hasClass('actions')) {
                    _self.rowSetActionsEditing($row);
                } else {
                    $this.html('<input type="text" id="' + data[i] + '" class="form-control input-block" value="' + data[i] + '"/>');
                }
            });
        },
        rowSave: function ($row) {
            var _self = this,
                $actions,
                values = [];

            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
                $row.removeClass('adding');
            }

            values = $row.find('td').map(function () {
                var $this = $(this);

                if ($this.hasClass('actions')) {
                    _self.rowSetActionsDefault($row);
                    return _self.datatable.cell(this).data();
                } else {
                    return $.trim($this.find('input').val());
                }
            });
            $.get("http://localhost/compras/test/modificar", function (data) {
                $(".result").html(data);
                alert("Load was performed.");
            });

            $.post("http://localhost/compras/test/agregar", { cantidad: values[0] }, function (data) {
                alert("Guardado " + values[1]);
            });

            this.datatable.row($row.get(0)).data(values);

            $actions = $row.find('td.actions');
            if ($actions.get(0)) {
                this.rowSetActionsDefault($row);
            }

            this.datatable.draw();
        },
        rowRemove: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }

    };

    $(function () {
        EditableTable2.initialize();
    });

}).apply(this, [jQuery]);

// datatable editable 3
(function ($) {

    'use strict';

    var EditableTable3 = {
        options: {
            addButton: '#addToTable',
            table: '#datatable-editable3',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);

            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable();

            window.dt = this.datatable;

            return this;
        },
        events: function () {
            var _self = this;

            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();

                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();

                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();

                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    e.preventDefault();

                    var $row = $(this).closest('tr');
                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();
                                    var catalogoDocumento = $row.attr('name');
                                    var id = $row.attr('id');
                                    var mensaje = "";
                                    if (catalogoDocumento == 'productordencompra') {
                                        if($("#UUIDFP").val() != "") { 
                                            alertify.error("<h4> Hay facturas de proveedor ligadas, si decea continuar porfavor deslige para actualizar los saldos al eliminar el producto</h4>");
                                        }else{
                                            var restaimpuesto = $(renglon).find('td').eq(7).html();
                                            var restadescuento = $(renglon).find('td').eq(8).html();
                                            var restaimporte = $(renglon).find('td').eq(5).html();
                                            var restaretiva = $(renglon).find('td').eq(12).html();
                                            var restaretisr = $(renglon).find('td').eq(13).html();
                                            var cantidad = $(renglon).find('td').eq(0).html();
                                            var restasubtotal = $("#subtotaledit").text();
                                            var restatotal = $("#totaledit").text();
                                            var restadescuentos = $("#descuentoedit").text();
                                            var restaimpuestos = $("#impuestosedit").text();
                                            var restaretivam = $("#retenidoivamedit").text();
                                            var restaretisrm = $("#retenidoisrmedit").text();
                                            var restadescuentoreal = parseFloat(restaimporte) + (parseFloat(restaimpuesto)) - (parseFloat(restadescuento) * parseFloat(cantidad)) - (parseFloat(restaretiva) * parseFloat(cantidad)) - (parseFloat(restaretisr) * parseFloat(cantidad));
                                            restatotal = parseFloat(restatotal) - parseFloat(restadescuentoreal);
                                            restasubtotal = restasubtotal - parseFloat(restaimporte);
                                            restaimpuestos = restaimpuestos - (parseFloat(restaimpuesto));
                                            restadescuentos = restadescuentos - (parseFloat(restadescuento) * parseFloat(cantidad));
                                            restaretivam = restaretivam - (parseFloat(restaretiva) * parseFloat(cantidad));
                                            restaretisrm = restaretisrm - (parseFloat(restaretisr) * parseFloat(cantidad));
                                            $("#subtotaledit").text(restasubtotal.toFixed(2));
                                            $("#totaledit").text(restatotal.toFixed(2));
                                            $("#descuentoedit").text(restadescuentos.toFixed(2));
                                            $("#impuestosedit").text(restaimpuestos.toFixed(2));
                                            $("#retenidoivamedit").text(restaretivam.toFixed(2));
                                            $("#retenidoisrmedit").text(restaretisrm.toFixed(2));

                                            $("#saldooc").text(restatotal.toFixed(2));
                                            $("#totaloc").text(restatotal.toFixed(2));
                                            _self.rowRemove($row);
                                        }
                                    }
                                    ;
                                    $.magnificPopup.close();
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                });

            this.$addButton.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd();
            });

            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });

            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
        rowAdd: function () {
            this.$addButton.attr({ 'disabled': 'disabled' });

            var actions,
                data,
                $row;

            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');

            data = this.datatable.row.add(['', '', '', '', '', '', '', actions]);
            $row = this.datatable.row(data[0]).nodes().to$();

            $row
                .addClass('adding')
                .find('td:last')
                .addClass('actions');

            this.rowEdit($row);

            this.datatable.order([0, 'asc']).draw(); // always show fields
        },
        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;

            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {

                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);

                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {
            var _self = this,
                data;

            data = this.datatable.row($row.get(0)).data();

            $row.children('td').each(function (i) {
                var $this = $(this);

                if ($this.hasClass('actions')) {
                    _self.rowSetActionsEditing($row);
                } else {
                    $this.html('<input type="text" id="' + data[i] + '" class="form-control input-block" value="' + data[i] + '"/>');
                }
            });
        },
        rowSave: function ($row) {
            var _self = this,
                $actions,
                values = [];

            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
                $row.removeClass('adding');
            }

            values = $row.find('td').map(function () {
                var $this = $(this);

                if ($this.hasClass('actions')) {
                    _self.rowSetActionsDefault($row);
                    return _self.datatable.cell(this).data();
                } else {
                    return $.trim($this.find('input').val());
                }
            });
            $.get("http://localhost/compras/test/modificar", function (data) {
                $(".result").html(data);
                alert("Load was performed.");
            });

            $.post("http://localhost/compras/test/agregar", { cantidad: values[0] }, function (data) {
                alert("Guardado " + values[1]);
            });

            this.datatable.row($row.get(0)).data(values);

            $actions = $row.find('td.actions');
            if ($actions.get(0)) {
                this.rowSetActionsDefault($row);
            }

            this.datatable.draw();
        },
        rowRemove: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }

    };

    $(function () {
        EditableTable3.initialize();
    });

}).apply(this, [jQuery]);

//datatable editable 4
(function ($) {

    'use strict';

    var EditableTable4 = {
        options: {
            addButton: '#addToTable4',
            table: '#datatable-editable4',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);

            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable();

            window.dt = this.datatable;

            return this;
        },
        events: function () {
            var _self = this;

            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();

                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();

                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();

                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    e.preventDefault();

                    var $row = $(this).closest('tr');
                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();

                                    $.magnificPopup.close();
                                    _self.rowRemove($row);
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                });

            this.$addButton.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd();
            });

            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });

            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
        rowAdd: function () {
            this.$addButton.attr({ 'disabled': 'disabled' });


            var actions,
                data,
                $row;

            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');

            //se define cuantos input va a tener el renglon que se esta modificando/capturando
            data = this.datatable.row.add(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', actions, '', '', '']);
            $row = this.datatable.row(data[0]).nodes().to$();



            $row
                .addClass('adding')
                .find('td').eq(15)
                .addClass('actions');
            //se ocultan los ultimos campos de idproducto, idproyecto e idconcepto para que no se puedan modificar    
            $row
                .find('td').eq(16)
                .addClass('hidden');
            $row
                .find('td').eq(17)
                .addClass('hidden');
            $row
                .find('td').eq(18)
                .addClass('hidden');


            this.rowEdit($row);

            this.datatable.order([0, 'asc']).draw(); // always show fields
        },
        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;

            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {

                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);

                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {
            var _self = this,
                data;

            data = this.datatable.row($row.get(0)).data();
            //obtiene los valores ocultos
            var idproducto = $row.find('td').eq(16).html();
            var idproyecto = $row.find('td').eq(17).html();
            var idconcepto = $row.find('td').eq(18).html();

            var n = 0;

            $row.children('td').each(function (i) {
                var $this = $(this);

                if ($this.hasClass('actions')) {
                    _self.rowSetActionsEditing($row);
                } else {
                    // crea el select de proyecto
                    if ($this.hasClass('proyecto-select')) {
                        $this.html('<select id="proyecto1" onchange="get_conceptoproytm(false)"></select>');
                        get_proyectotm(idproyecto, idconcepto);
                        //setTimeout(function(){$("#proyecto1").val(idproyecto); get_conceptoproytm();},500);
                    }
                    else {
                        //crea el select de concepto
                        if ($this.hasClass('concepto-select')) {
                            $this.html('<select id="conceptoproy1" ></select>');
                            //setTimeout(function(){$("#conceptoproy1").val(idconcepto)},1000);
                        } else {
                            //crea el select de productos
                            if ($this.hasClass('combustible-select')) {
                                $this.html('<select id="productos" ></select>');
                                get_combustibletm(idproducto);
                                //setTimeout(function(){$("#productos").val(idproducto)},1000);
                            } else {
                                $this.html('<input type="text" id="' + n + '" class="form-control input-block" value="' + data[i] + '"/>');
                            }
                        }
                    }
                }
                n = n + 1;
            });
            //agrega el attributo disabled al tiempo de operacion
            $row.find('td:eq(7) input').attr('disabled', true);
            //se agrega la funcion del calculo del horometro a los horometros y al tiempo muerto renti
            if ($row.hasClass('adding')) {
                $row.find('td:eq(3) input').attr('oninput', 'calculohorometro(false)').attr('type', 'number').attr('min', '0').attr('step', '0.01');
                $row.find('td:eq(4) input').attr('oninput', 'calculohorometro(false)').attr('type', 'number').attr('min', '0').attr('step', '0.01');
                $row.find('td:eq(5) input').attr('oninput', 'calculohorometro(false)').attr('type', 'number').attr('min', '0').attr('step', '0.01');
            } else {
                var idrenglon = $row.attr('id');
                //       console.log('idrenglon', idrenglon);
                $row.find('td:eq(3) input').attr('oninput', 'calculohorometro(' + 3 + ')').attr('type', 'number').attr('min', '0').attr('step', '0.01');
                $row.find('td:eq(4) input').attr('oninput', 'calculohorometro(' + 4 + ')').attr('type', 'number').attr('min', '0').attr('step', '0.01');
                $row.find('td:eq(5) input').attr('oninput', 'calculohorometro(' + 5+ ')').attr('type', 'number').attr('min', '0').attr('step', '0.01');
            }

            if ($row.hasClass('adding')) {
                $row.find('td:eq(11) input').attr('oninput', 'validaCantidad(false,1)').attr('type', 'number').attr('min', '0').attr('step', '0.01');
                $row.find('td:eq(12) input').attr('oninput', 'validaCantidad(false,2)').attr('type', 'number').attr('min', '0').attr('step', '0.01');
                $row.find('td:eq(13) input').attr('oninput', 'validaCantidad(false,3)').attr('type', 'number').attr('min', '0').attr('step', '0.001');
            } else {
                 var idrenglon = $row.attr('id');
                 $row.find('td:eq(11) input').attr('oninput', 'validaCantidad(' + 11 + ',1)').attr('type', 'number').attr('min', '0').attr('step', '0.01');
                 $row.find('td:eq(12) input').attr('oninput', 'validaCantidad(' + 12 + ',2)').attr('type', 'number').attr('min', '0').attr('step', '0.01');
                 $row.find('td:eq(13) input').attr('oninput', 'validaCantidad(' + 13 + ',3)').attr('type', 'number').attr('min', '0').attr('step', '0.001');
            }
            //se agrga el attributo numero para validar los campos numericos
            $row.find('td:eq(6) input').attr('type', 'number').attr('min', '0').attr('step', '0.01');
            $row.find('td:eq(8) input').attr('type', 'number').attr('min', '0').attr('step', '0.01');
            $row.find('td:eq(10) input').attr('type', 'number').attr('min', '0').attr('step', '0.01');

            $row.find('td:eq(14) input').attr('type', 'number').attr('min', '0').attr('step', '0.001');

            if ($('#estadomaq').val() == 5) {

                $row.find('td:eq(11) input').attr('disabled', true);
                $row.find('td:eq(12) input').attr('disabled', true);
                $row.find('td:eq(13) input').attr('disabled', true);
            }
            else
                $row.find('td:eq(14) input').attr('disabled', true);


        },
        rowSave: function ($row) {
            var _self = this,
                $actions,
                values = [];
            //      horasdisptm();
            var toperacion = $row.find('td:eq(7) input').val();
            var tmuerto = $row.find('td:eq(6) input').val();
            var tmrenti = $row.find('td:eq(5) input').val();
            var horastabla = parseFloat(toperacion) + parseFloat(tmuerto) + parseFloat(tmrenti);
            var obra = $("#obra").val();
            var horasdisponibles = 0;
            /*$.post(dirapi + "/obras",
            {
                accion: 'horasturno',
                obra: obra
            },
              function(data) {
                if (data){
                    var json_obj = $.parseJSON(data);
                    $("#horasdisp").val(json_obj[0].horasturno);

                 }*/
            horasdisponibles = $("#horasturno").val();
            horasdisponibles = parseInt(horasdisponibles);

            //      alertify.success("horasdisponibles " + (horasdisponibles));
            //       alertify.error("horastabla " + horastabla);
            if (horasdisponibles == horastabla) {
                //obtiene los valores de los selects de la tabla
                var proyectoval = $("#proyecto1").val();
                var conceptoval = $("#conceptoproy1").val();
                var combustibleval = $("#productos").val();
                //obtiene el texto de los selects de la tabla
                var proyectotext = $("#proyecto1 option:selected").text();
                var conceptotext = $("#conceptoproy1 option:selected").text();
                var combustibletext = $("#productos option:selected").text();

                if ($row.hasClass('adding')) {
                    this.$addButton.removeAttr('disabled');
                    $row.removeClass('adding');
                }

                values = $row.find('td').map(function () {
                    var $this = $(this);



                    if ($this.hasClass('actions')) {
                        _self.rowSetActionsDefault($row);
                        return _self.datatable.cell(this).data();
                    } else {
                        return $.trim($this.find('input').val());
                    }
                });
                //agrega la clase selects al renglon que se esta editando/capturando
                $row.addClass('selects');

                /*$.get("http://localhost/compras/test/modificar", function (data) {
                    $(".result").html(data);
                    alert("Load was performed.");
                });

                $.post("http://localhost/compras/test/agregar", {cantidad: values[0]}, function (data) {
                    alert("Guardado " + values[1]);
                });*/

                this.datatable.row($row.get(0)).data(values);

                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
                if ($row.hasClass('selects')) {
                    //agrega el texto de los select a la tabla y le agrega la clase al td
                    $(".selects").find('td').eq(0).html(proyectotext).addClass('proyecto-select');
                    $(".selects").find('td').eq(1).html(conceptotext).addClass('concepto-select');
                    $(".selects").find('td').eq(9).html(combustibletext).addClass('combustible-select');
                    //agrega el valor de los select a la tabla y los oculta
                    $(".selects").find('td').eq(16).html(combustibleval).addClass('hidden');
                    $(".selects").find('td').eq(17).html(proyectoval).addClass('hidden');
                    $(".selects").find('td').eq(18).html(conceptoval).addClass('hidden');
                    $row.removeClass('selects');
                }
            } else {
                alertify.error("<h4> El tiempo de operación no coincide con las horas del turno </h4>")
            }
            //});   

        },
        rowRemove: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }

    };

    $(function () {
        EditableTable4.initialize();
    });

}).apply(this, [jQuery]);

//datatable editable 5
(function ($) {

    'use strict';

    var EditableTable5 = {
        options: {
            addButton: '#addToTable5',
            table: '#datatable-editable5',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);

            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable();

            window.dt = this.datatable;

            return this;
        },
        events: function () {
            var _self = this;

            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();

                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();

                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();

                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    e.preventDefault();

                    var $row = $(this).closest('tr');
                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();

                                    $.magnificPopup.close();
                                    _self.rowRemove($row);
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                });

            this.$addButton.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd();
            });

            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });

            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
        rowAdd: function () {
            this.$addButton.attr({ 'disabled': 'disabled' });

            var actions,
                data,
                $row;

            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');

            //se define cuantos input va a tener el renglon que se esta modificando/capturando
            data = this.datatable.row.add(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', actions, '', '', '', '', '', '', '']);
            $row = this.datatable.row(data[0]).nodes().to$();

            $row
                .addClass('adding')
                .find('td').eq(15)
                .addClass('actions');
            //se ocultan los ultimos campos de idtipocombustible, idtipolubricante, idtipograsa, idcombustible, idlubricante, idgrasa para que no se puedan modificar    
            //$row
            // .find('td').eq(15)
            //.addClass('hidden');
            $row
                .find('td').eq(16)
                .addClass('hidden');
            $row
                .find('td').eq(17)
                .addClass('hidden');
            $row
                .find('td').eq(18)
                .addClass('hidden');
            $row
                .find('td').eq(19)
                .addClass('hidden');
            $row
                .find('td').eq(20)
                .addClass('hidden');
            $row
                .find('td').eq(21)
                .addClass('hidden');
            $row
                .find('td').eq(22)
                .addClass('hidden');


            /*$row.find('td').eq(0).html('<select id="tipocombustible" onchange=""> '+
                                            '<option value="0"> Seleccione tipo de combustible </option>'+
                                            '<option value="1"> Diesel </option>'+
                                            '<option value="2"> Gasolina  </option>'+
                                        '</select>');
            $row.find('td').eq(1).html('<select id="combustible"></select>');
            $row.find('td').eq(3).html('<select id="tipolubricante"></select>');
            $row.find('td').eq(4).html('<select id="lubricante"></select>');
            $row.find('td').eq(6).html('<select id="tipograsa"></select>');
            $row.find('td').eq(7).html('<select id="grasa"></select>');*/

            this.rowEdit($row);

            this.datatable.order([0, 'asc']).draw(); // always show fields
            tipostmant();
        },
        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;

            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {

                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);
                var cantcombant = $row.find('td').eq(3).html();
                var cantlubant = $row.find('td').eq(7).html();
                var cantgrasant = $row.find('td').eq(11).html();
                var cantanticont = $row.find('td').eq(14).html();
                var totalcombustible = $("#totalcombus").html();
                var totalubricante = $("#totalub").html();
                var totalgrasa = $("#totalgrasa").html();
                var totalanticon = $("#totalanticongelante").html();
                if (!cantcombant) {
                    cantcombant = 0;
                }
                if (!cantlubant) {
                    cantlubant = 0;
                }
                if (!cantgrasant) {
                    cantgrasant = 0;
                }
                if (!cantanticont) {
                    cantanticont = 0;
                }
                totalcombustible = parseFloat(totalcombustible) + parseFloat(cantcombant);
                totalubricante = parseFloat(totalubricante) + parseFloat(cantlubant);
                totalgrasa = parseFloat(totalgrasa) + parseFloat(cantgrasant);
                totalanticon = parseFloat(totalanticon) + parseFloat(cantanticont);
                $("#totalcombus").html(totalcombustible);
                $("#totalub").html(totalubricante);
                $("#totalgrasa").html(totalgrasa);
                $("#totalanticongelante").html(totalanticon);
                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {
            var _self = this,
                data;

            data = this.datatable.row($row.get(0)).data();
            //obtiene los valores ocultos
            var idtipocombustible = $row.find('td').eq(15).html();
            var idtipolubricante = $row.find('td').eq(16).html();
            var idtipograsa = $row.find('td').eq(17).html();
            var idcombustible = $row.find('td').eq(18).html();
            var idlubricante = $row.find('td').eq(19).html();
            var idgrasa = $row.find('td').eq(20).html();
            var cantcombant = $row.find('td').eq(3).html();
            var cantlubant = $row.find('td').eq(7).html();
            var cantgrasant = $row.find('td').eq(11).html();
            var cantanticonge = $row.find('td').eq(14).html();
            var totalcombustible = $("#totalcombus").html();
            var totalubricante = $("#totalub").html();
            var totalgrasa = $("#totalgrasa").html();
            var totalanticonge = $("#totalanticongelante").html();
            if (!cantcombant) {
                cantcombant = 0;
            }
            if (!cantlubant) {
                cantlubant = 0;
            }
            if (!cantgrasant) {
                cantgrasant = 0;
            }
            if (!cantanticonge) {
                cantanticonge = 0;
            }
            totalcombustible = parseFloat(totalcombustible) - parseFloat(cantcombant);
            totalubricante = parseFloat(totalubricante) - parseFloat(cantlubant);
            totalgrasa = parseFloat(totalgrasa) - parseFloat(cantgrasant);
            totalanticonge = parseFloat(totalanticonge) - parseFloat(cantanticonge);
            $("#totalcombus").html(totalcombustible);
            $("#totalub").html(totalubricante);
            $("#totalgrasa").html(totalgrasa);
            $("#totalanticongelante").html(totalanticonge);

            $row.children('td').each(function (i) {
                var $this = $(this);

                if ($this.hasClass('actions')) {
                    _self.rowSetActionsEditing($row);
                } else {
                    // crea el select de tipo de combustible
                    if ($this.hasClass('tipocombustible-select')) {
                        $this.html('<select id="tipocombustible" onchange="selectcombustible(false)"> ' +
                            '<option value="0"> Seleccione  tipo de combustible </option>' +
                            '<option value="1"> Diesel </option>' +
                            '<option value="2"> Gasolina  </option>' +
                            '</select>');
                        $("#tipocombustible").val(idtipocombustible);
                        selectcombustible(idcombustible);
                    }
                    else {
                        //crea el select de combustibles
                        if ($this.hasClass('combustible-select')) {
                            $this.html('<select id="combustible" ></select>');

                        } else {
                            //crea el select de tipo de lubricante
                            if ($this.hasClass('tipolubricante-select')) {
                                $this.html('<select id="tipolubricante" onchange="selectlubricante(false)">' +
                                    '<option value="0"> Seleccione  tipo de lubricante</option>' +
                                    '<option value="1"> Aceite de motor</option>' +
                                    '<option value="2"> Aceite hidráulico</option>' +
                                    '<option value="3"> Aceite de transmisión</option>' +
                                    '<option value="4"> Aceite de diferencial</option>' +
                                    '<option value="5"> Aceite de barrenación</option>' +
                                    '<option value="6"> Aceite de unidad compresora</option>' +
                                    '</select>');
                                $("#tipolubricante").val(idtipolubricante);
                                selectlubricante(idlubricante);
                            } else {
                                //crea el select de lubricantes
                                if ($this.hasClass('lubricante-select')) {
                                    $this.html('<select id="lubricante" ></select>');
                                } else {
                                    //crea el select de tipo de grasa
                                    if ($this.hasClass('tipograsa-select')) {
                                        $this.html('<select id="tipograsa" onchange="selectgrasa(false)">' +
                                            '<option value="0"> Seleccione  tipo de grasa </option>' +
                                            '<option value="1"> Grasa </option>' +
                                            '</select>');
                                        $("#tipograsa").val(idtipograsa);
                                        selectgrasa(idgrasa);
                                    } else {
                                        //crea el select de grasa
                                        if ($this.hasClass('grasa-select')) {
                                            $this.html('<select id="grasa" ></select>');
                                        } else {
                                            if ($this.hasClass('prodanticongelante-select')) {
                                                $this.html('<select id="prodanticongelante" ></select>');
                                                cargarCbAnticon();



                                            } else {
                                                $this.html('<input type="text" id="' + data[i] + '" class="form-control input-block" value="' + data[i] + '"/>');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            //se agrega la validacion de los que son numericos para que solo se capturen numeros
            $row.find('td:eq(0) input').attr('type', 'number').attr('min', '0');
            $row.find('td:eq(3) input').attr('type', 'number').attr('step', '0.01').attr('min', '0');
            $row.find('td:eq(4) input').attr('type', 'number').attr('min', '0');
            $row.find('td:eq(7) input').attr('type', 'number').attr('step', '0.01').attr('min', '0');
            $row.find('td:eq(8) input').attr('type', 'number').attr('min', '0');
            $row.find('td:eq(11) input').attr('type', 'number').attr('step', '0.01').attr('min', '0');
            $row.find('td:eq(12) input').attr('type', 'number').attr('min', '0');
            $row.find('td:eq(14) input').attr('type', 'number').attr('step', '0.01').attr('min', '0');

            var value = $("#almacen :selected").text();

            //BLOQUEAR COMBUSTIBLE
            if (value.toLowerCase().indexOf("pipa") >= 0) {
                $row.find('td:eq(4) input').attr('disabled', true);
                $row.find('td:eq(7) input').attr('disabled', true);
                $row.find('td:eq(8) input').attr('disabled', true);
                $row.find('td:eq(11) input').attr('disabled', true);
                $row.find('td:eq(12) input').attr('disabled', true);
                $row.find('td:eq(14) input').attr('disabled', true);
            }
            else {
                if (value.toLowerCase().indexOf("orquesta") >= 0){

                }else{
                    $row.find('td:eq(0) input').attr('disabled', true);
                    $row.find('td:eq(3) input').attr('disabled', true);
                } 
               
            }
            //tipostmant();

        },
        rowSave: function ($row) {
            var _self = this,
                $actions,
                values = [];

            //obtiene los valores de los selects de la tabla
            var tipocombustibleval = $("#tipocombustible").val();
            var combustibleval = $("#combustible").val();
            var tipolubricanteval = $("#tipolubricante").val();
            var lubricanteval = $("#lubricante").val();
            var tipograsaval = $("#tipograsa").val();
            var grasaval = $("#grasa").val();
            var anticongelanteval = $("#prodanticongelante").val();
            //obtiene el texto de los selects de la tabla
            var tipocombustibletext = $("#tipocombustible option:selected").text();
            var combustibletext = $("#combustible option:selected").text();
            var tipolubricantetext = $("#tipolubricante option:selected").text();
            var lubricantetext = $("#lubricante option:selected").text();
            var tipograsatext = $("#tipograsa option:selected").text();
            var grasatext = $("#grasa option:selected").text();
            var anticongelantetext = $("#prodanticongelante option:selected").text();

            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
                $row.removeClass('adding');
            }

            values = $row.find('td').map(function () {
                var $this = $(this);



                if ($this.hasClass('actions')) {
                    _self.rowSetActionsDefault($row);
                    return _self.datatable.cell(this).data();
                } else {
                    return $.trim($this.find('input').val());
                }
            });
            //agrega la clase selects al renglon que se esta editando/capturando
            $row.addClass('selects');
            //calcula los totales de las cantidades
            var cantcombustible = $(".selects").find('td:eq(3) input').val();
            var cantlubricante = $(".selects").find('td:eq(7) input').val();
            var cantgrasa = $(".selects").find('td:eq(11) input').val();
            var cantanticonge = $(".selects").find('td:eq(14) input').val();
            var totalcombustible = $("#totalcombus").html();
            var totalubricante = $("#totalub").html();
            var totalgrasa = $("#totalgrasa").html();
            var totalanticonge = $("#totalanticongelante").html();
            if (cantcombustible == "")
                totalcombustible = totalcombustible;
            else
                totalcombustible = parseFloat(totalcombustible) + parseFloat(cantcombustible);

            if (cantlubricante == "")
                totalubricante = totalubricante;
            else
                totalubricante = parseFloat(totalubricante) + parseFloat(cantlubricante);

            if (cantgrasa == "")
                totalgrasa = totalgrasa;
            else
                totalgrasa = parseFloat(totalgrasa) + parseFloat(cantgrasa);

            if (cantanticonge == "")
                totalanticonge = totalanticonge;
            else
                totalanticonge = parseFloat(totalanticonge) + parseFloat(cantanticonge);
            $("#totalcombus").html(totalcombustible);
            $("#totalub").html(totalubricante);
            $("#totalgrasa").html(totalgrasa);
            $("#totalanticongelante").html(totalanticonge);
            /*$.get("http://localhost/compras/test/modificar", function (data) {
                $(".result").html(data);
                alert("Load was performed.");
            });

            $.post("http://localhost/compras/test/agregar", {cantidad: values[0]}, function (data) {
                alert("Guardado " + values[1]);
            });*/

            this.datatable.row($row.get(0)).data(values);

            $actions = $row.find('td.actions');
            if ($actions.get(0)) {
                this.rowSetActionsDefault($row);
            }

            this.datatable.draw();
            if ($row.hasClass('selects')) {
                //agrega el texto de los select a la tabla y le agrega la clase al td
                $(".selects").find('td').eq(1).html(tipocombustibletext).addClass('tipocombustible-select');
                $(".selects").find('td').eq(2).html(combustibletext).addClass('combustible-select');
                $(".selects").find('td').eq(5).html(tipolubricantetext).addClass('tipolubricante-select');
                $(".selects").find('td').eq(6).html(lubricantetext).addClass('lubricante-select');
                $(".selects").find('td').eq(9).html(tipograsatext).addClass('tipograsa-select');
                $(".selects").find('td').eq(10).html(grasatext).addClass('grasa-select');
                $(".selects").find('td').eq(13).html(anticongelantetext).addClass('prodanticongelante-select');
                //agrega el valor de los select a la tabla y los oculta
                $(".selects").find('td').eq(16).html(tipocombustibleval).addClass('hidden');
                $(".selects").find('td').eq(17).html(tipolubricanteval).addClass('hidden');
                $(".selects").find('td').eq(18).html(tipograsaval).addClass('hidden');
                $(".selects").find('td').eq(19).html(combustibleval).addClass('hidden');
                $(".selects").find('td').eq(20).html(lubricanteval).addClass('hidden');
                $(".selects").find('td').eq(21).html(grasaval).addClass('hidden');
                $(".selects").find('td').eq(22).html(anticongelanteval).addClass('hidden');

                $row.removeClass('selects');
            }

        },
        rowRemove: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }
            var cantcombustible = $row.find('td').eq(3).html();
            var cantlubricante = $row.find('td').eq(7).html();
            var cantgrasa = $row.find('td').eq(11).html();
            var cantanticonge = $row.find('td').eq(14).html();
            var totalcombustible = $("#totalcombus").html();
            var totalubricante = $("#totalub").html();
            var totalgrasa = $("#totalgrasa").html();
            var totalanticonge = $("#totalanticongelante").html();
            totalcombustible = parseFloat(totalcombustible) - parseFloat(cantcombustible);
            totalubricante = parseFloat(totalubricante) - parseFloat(cantlubricante);
            totalgrasa = parseFloat(totalgrasa) - parseFloat(cantgrasa);
            totalanticonge = parseFloat(totalanticonge) - parseFloat(cantanticonge);
            $("#totalcombus").html(totalcombustible);
            $("#totalub").html(totalubricante);
            $("#totalgrasa").html(totalgrasa);
            $("#totalanticongelante").html(totalanticonge);
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }

    };

    $(function () {
        EditableTable5.initialize();
    });

}).apply(this, [jQuery]);



//datatable editable 6
(function ($) {

    'use strict';

    var EditableTable6 = {
        options: {
            addButton: '#addToTable6',
            addButton2: '#addToTable62',
            table: '#datatable-editable6',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            this.$addButton2 = $(this.options.addButton2);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);

            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable();

            window.dt = this.datatable;

            return this;
        },
        events: function () {
            var _self = this;

            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();

                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();

                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();

                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    e.preventDefault();
                    var $row = $(this).closest('tr');
                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();

                                    $.magnificPopup.close();
                                    _self.rowRemove($row);
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                })
                .on('click', 'a.quitar-row', function (e) {
                    e.preventDefault();
                    var $row = $(this).closest('tr');
                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();

                                    $.magnificPopup.close();
                                    _self.rowQuitar($row);
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                });

            this.$addButton.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd();
            });
            this.$addButton2.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd2();
            });

            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });

            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
         rowAdd2: function () {
            this.$addButton2.attr({ 'disabled': 'disabled' });

            $.post(dirapi + "/conceptosAt",
            {
                accion: "traerconcepto"
            }, function (dato){
                var json_obj = $.parseJSON(dato);
                for (var i in json_obj)
                {
                    var valores = json_obj[i, 0];
                    for (var x in valores)
                    {
                        

                var actions,
                data,
                $row;

            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');

            //se define cuantos input va a tener el renglon que se esta modificando/capturando
            data = this.datatable.row.add(['', '', '', '', actions, '', '', '', '']);
            $row = this.datatable.row(data[0]).nodes().to$();

            $row
                .addClass('adding')
                .find('td').eq(4)
                .addClass('actions');
            //se ocultan los ultimos campos de idtipocombustible, idtipolubricante, idtipograsa, idcombustible, idlubricante, idgrasa para que no se puedan modificar    

            $row
                .find('td').eq(5)
                .addClass('hidden');
            $row
                .find('td').eq(6)
                .addClass('hidden');
                $row
                .find('td').eq(7)
                .addClass('hidden');
            $row
                .find('td').eq(8)
                .addClass('hidden');

           // this.rowEdit($row);

            this.datatable.order([0, 'asc']).draw(); // always show fields


                        //console.log("nombre unidad: " + valores[x].nombreunidad);
                        $(".adding ").find('td').eq(0).html(valores[x].nombre);
                        $(".adding ").find('td').eq(1).html(valores[x].nombreunidad);
                    }
                }

            });

           


        },
        rowAdd: function () {
            this.$addButton.attr({ 'disabled': 'disabled' });

            var actions,
                data,
                $row;

            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');

            //se define cuantos input va a tener el renglon que se esta modificando/capturando
            data = this.datatable.row.add(['', '', '', '', actions, '', '', '', '']);
            $row = this.datatable.row(data[0]).nodes().to$();

            $row
                .addClass('adding')
                .find('td').eq(4)
                .addClass('actions');
            //se ocultan los ultimos campos de idtipocombustible, idtipolubricante, idtipograsa, idcombustible, idlubricante, idgrasa para que no se puedan modificar    

            $row
                .find('td').eq(5)
                .addClass('hidden');
            $row
                .find('td').eq(6)
                .addClass('hidden');
                $row
                .find('td').eq(7)
                .addClass('hidden');
            $row
                .find('td').eq(8)
                .addClass('hidden');

            this.rowEdit($row);

            this.datatable.order([0, 'asc']).draw(); // always show fields
            //    tipostmant();
            // atpreciostip();
           // $(".adding ").find('td').eq(3).html('<select id="obra" onchange="get_listtm()"></select>');
           /* $(".adding ").find('td').eq(0).html('<select id="concepto-select"></select>');
            $('#concepto-select').select2("val", "0");
            $("#concepto-select").width(300);*/
           /* var f = new Date();
            var mes = (f.getMonth() + 1);
            var dia = f.getDate();
            if (mes < 10) {
                mes = '0' + mes;
            }
            if (dia < 10) {
                dia = '0' + dia;
            }
            fecha = f.getFullYear() + "-" + mes + "-" + dia;

            $(".adding ").find('td').eq(2).html('<input id="fecha" type="date" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA" value="' + fecha + '"/>');*/


        },

        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;

            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {

                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);

                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {
            var _self = this,
                data;

            data = this.datatable.row($row.get(0)).data();
            //obtiene los valores ocultos

            var idobra = $row.find('td').eq(5).html();
            var idconcepto = $row.find('td').eq(4).html();
            $row.children('td').each(function (i) {
                var $this = $(this);


                if ($this.hasClass('actions')) {
                    _self.rowSetActionsEditing($row);
                } else {
                    // crea el select de tipo de combustible

                   // $(".adding ").find('td').eq(3).html('<select id="obra" onchange="get_listtm()"></select>');
                    $(".adding ").find('td').eq(0).html('<select id="concepto-select"></select>');
                   // $(".adding ").find('td').eq(2).html('<input id="fecha" type="text" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA"/>');

                    if ($this.hasClass('obra')) {
                        var idobra = $row.find('td').eq(6).html();
                        $("#idobra").val(idobra);
                        $("#obra").val(idobra);

                        $this.html('<select id="obra" onchange="get_listtm()"></select>');

                        $("#idobra").val(idobra);
                        $("#obra").val(idobra);
                        $.post(dirapi + "/obras",
                            {
                                accion: "cargarcb",
                                idobra: idobra
                            }, function (data) {
                                $("#obra").html(data);


                            });

                      //  $(".adding ").find('td').eq(4).html('<select id="concepto-select"></select>');
                    } else {
                        if ($this.hasClass('concepto-select')) {
                            $this.html('<select id="concepto-select"></select>');
                            var idobra = $row.find('td').eq(6).html();
                            var idconcepto = $row.find('td').eq(5).html();
                            $.post(dirapi + "/proyectos",
                                {
                                    accion: "cbtodosconceptos",
                                    obra: idobra,
                                    idconcepto: idconcepto
                                }, function (data) {
                                    // $(".adding ").find('td').eq(3).html('<select id="concepto"></select>');
                                    // $this.html('<select id="concepto"></select>');
                                    //     console.log(data);
                                    $("#concepto-select").html(data);

                                    $('#concepto-select').select2();

                                });
                        } else {
                            if ($this.hasClass('fecha')) {
                                var fecha = $row.find('td').eq(1).html();
                                fecha = fechasMysql(fecha);
                                $this.html('<input id="fecha" type="date" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA" value="' + fecha + '" />');
                                document.getElementById("fecha").value = fecha;
                            } else {

                                $this.html('<input type="text" id="' + data[i] + '" class="form-control input-block" value="' + data[i] + '"/>');
                            }
                        }



                    }
                }
            });
            //se agrega la validacion de los que son numericos para que solo se capturen numeros
            // $row.find('td:eq(1) input').attr('type','number').attr('min','0');
            $row.find('td:eq(2) input').attr('type', 'number').attr('step', '0.01').attr('min', '0');
            $row.find('td:eq(1) input').attr('type', 'text').attr('disabled','disabled');

        },
        rowSave: function ($row) {
            var _self = this,
                $actions,
                values = [];

            //obtiene los valores de los selects de la tabla
            var idobraval = $row.find('td').eq(6).html();
            var idconceptoval = $row.find('td').eq(5).html();
            var descripcion = $("#descripcion").val();
            var costo = $row.find('td:eq(2) input').val();
            var obra = $("#filtroobras option:selected").val();
            var concepto = $("#concepto-select option:selected").val();
            var moneda = $("#moneda option:selected").val();
            var id = $row.find('td:eq(8) input').val();
            var fecha = $("#fecha").val();
            console.log("fecha: " + $("#fecha").val());
            console.log("obra: " + $("#filtroobras option:selected").val());


            //obtiene el texto de los selects de la tabla
            var monedatext = $("#moneda option:selected").text();
            //       console.log("id ", id, "descripcion ", descripcion, " costo ", costo, " obra ", obra, "concepto ", concepto, "fecha", fecha);
            var conceptotext = $("#concepto-select option:selected").text();

            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
                $row.removeClass('adding');
            }

            values = $row.find('td').map(function () {
                var $this = $(this);



                if ($this.hasClass('actions')) {
                    _self.rowSetActionsDefault($row);
                    return _self.datatable.cell(this).data();
                } else {
                    return $.trim($this.find('input').val());
                }
            });
            //agrega la clase selects al renglon que se esta editando/capturando
            $row.addClass('selects');
            //calcula los totales de las cantidades
            var costotext = $row.find('td').eq(2).html();
            var unidadtext = $row.find('td').eq(1).html();

            //       console.log(porId);
            this.datatable.row($row.get(0)).data(values);

            $actions = $row.find('td.actions');
            if ($actions.get(0)) {
                this.rowSetActionsDefault($row);
            }
            /*$.post(dirapi + "/atlistaprecios",
                {
                    accion: "agregar",
                    idobra: obra,
                    idconcepto: concepto,
                    costo: costo,
                    descripcion: descripcion,
                    id: id,
                    fecha: fecha
                }, function (data) {
                    //    console.log(data);
                    if (data) {
                        alertify.success("<h4>Operación exitosa </h4>");
                    } else {
                        alertify.error("<h4>Ocurrió un problema </h4>");
                    }

                });
*/

            this.datatable.draw();
            if ($row.hasClass('selects')) {
                //agrega el texto de los select a la tabla y le agrega la clase al td
                //      $(".selects").find('td').eq(0).html(descripciontext).addClass('descripcion-select');
                //       $(".selects").find('td').eq(1).html(costotext).addClass('costo-select');
              //  $(".selects").find('td').eq(3).html(obratext).addClass('obra');
                $(".selects").find('td').eq(0).html(conceptotext);
                $(".selects").find('td').eq(1).html(unidadtext);
                $(".selects").find('td').eq(3).html(monedatext);
                //agrega el valor de los select a la tabla y los oculta
                $(".selects").find('td').eq(5).html(concepto).addClass('hidden');
                $(".selects").find('td').eq(6).html(moneda).addClass('hidden');
                $(".selects").find('td').eq(7).html(moneda).addClass('hidden');
                $(".selects").find('td').eq(8).html(concepto).addClass('hidden');

                $row.removeClass('selects');
            }









        },
        rowRemove: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }

            var idobraval = $row.find('td').eq(5).html();
            var idconceptoval = $row.find('td').eq(4).html();
            var costotext = $row.find('td').eq(1).html();
            //     console.log($row.find('td').eq(8).html());
            var id = $row.find('td').eq(8).html();
            $.post(dirapi + "/atlistaprecios",
                {
                    accion: "eliminar",
                    id: id
                }, function (data) {
                    //    console.log(data);
                    if (data) {
                        alertify.success("<h4>Se eliminó precio exitosamente </h4>");
                    } else {
                        alertify.error("<h4>Ocurrió un problema </h4>");
                    }

                });

            //    var descripciontext = $row.find('td').eq(0).html();
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowQuitar: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }

          /*  var idobraval = $row.find('td').eq(5).html();
            var idconceptoval = $row.find('td').eq(4).html();
            var costotext = $row.find('td').eq(1).html();*/
            //     console.log($row.find('td').eq(8).html());
           /* var id = $row.find('td').eq(8).html();
            $.post(dirapi + "/atlistaprecios",
                {
                    accion: "eliminar",
                    id: id
                }, function (data) {
                    //    console.log(data);
                    if (data) {
                        alertify.success("<h4>Se eliminó precio exitosamente </h4>");
                    } else {
                        alertify.error("<h4>Ocurrió un problema </h4>");
                    }

                });*/

            //    var descripciontext = $row.find('td').eq(0).html();
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }

    };

    $(function () {
        EditableTable6.initialize();
    });

}).apply(this, [jQuery]);

//datatable editable 7

(function ($) {
    'use strict';
    var EditableTable7 = {
        options: {
            addButton: '#addToTable7',
            table: '#datatable-editable7',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);
            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable({
                paging: false,
                info: false,
                filter: false,
                order: [],
                aoColumns: [
                    null,
                    null,
                    null,
                    { "bSortable": false }
                ]
            });
            window.dt = this.datatable;
            return this;
        },
        events: function () {
            var _self = this;
            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();
                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();
                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();
                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    var table = $("#datatable-editable7").DataTable();
                        table
                        .row( $(this).parents('tr') )
                        .remove()
                        .draw();
                });
            this.$addButton.on('click', function (e) {
                e.preventDefault();
                _self.rowAdd();
            });
            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });
            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
        rowAdd: function () {
            this.$addButton.attr({ 'disabled': 'disabled' });
            var actions,
                data,
                $row;
            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');
            data = this.datatable.row.add(['', '', '', actions]);
            $row = this.datatable.row(data[0]).nodes().to$();
            $row
                .addClass('adding')
                .find('td:last')
                .addClass('actions');
            this.rowEdit($row);
            this.datatable.order([0, 'asc']).draw(); // always show fields
        },
        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;
            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {
                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);
                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }
                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {
            
            editarhorarioTabla($row["0"].id);
        },
        rowSave: function ($row) {
            var _self = this,
                $actions,
                values = [];
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
                $row.removeClass('adding');
            }
            values = $row.find('td').map(function () {
                var $this = $(this);
                if ($this.hasClass('actions')) {
                    _self.rowSetActionsDefault($row);
                    return _self.datatable.cell(this).data();
                } else {
                    return $.trim($this.find('input').val());
                }
            });
            this.datatable.row($row.get(0)).data(values);
            $actions = $row.find('td.actions');
            if ($actions.get(0)) {
                this.rowSetActionsDefault($row);
            }
            this.datatable.draw();
        },
        rowRemove: function ($row) {
            this.datatable.row($row).remove().draw();
        },
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }
    };
    $(function () {
        EditableTable7.initialize();
    });
}).apply(this, [jQuery]);


(function ($) {

    'use strict';

    var EditableTable8 = {
        options: {
            addButton: '#addToTable8',
            table: '#datatable-editable8',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            this.$addButton2 = $(this.options.addButton2);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);

            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable();

            window.dt = this.datatable;

            return this;
        },
        events: function () {
            var _self = this;

            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();

                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();

                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();

                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    e.preventDefault();
                    var $row = $(this).closest('tr');
                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();

                                    $.magnificPopup.close();
                                    _self.rowRemove($row);
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                });

            this.$addButton.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd();
            });

            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });

            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
        
        rowAdd: function () {
            this.$addButton.attr({ 'disabled': 'disabled' });

            var actions,
                data,
                $row;

            actions = [
                '<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
                '<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
                '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
                '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
            ].join(' ');

            //se define cuantos input va a tener el renglon que se esta modificando/capturando
            data = this.datatable.row.add(['', '', '', '', actions, '', '', '', '']);
            $row = this.datatable.row(data[0]).nodes().to$();

            $row
                .addClass('adding')
                .find('td').eq(4)
                .addClass('actions');
            //se ocultan los ultimos campos de idtipocombustible, idtipolubricante, idtipograsa, idcombustible, idlubricante, idgrasa para que no se puedan modificar    

            $row
                .find('td').eq(5)
                .addClass('hidden');
            $row
                .find('td').eq(6)
                .addClass('hidden');
                $row
                .find('td').eq(7)
                .addClass('hidden');
            $row
                .find('td').eq(8)
                .addClass('hidden');

            this.rowEdit($row);

            this.datatable.order([0, 'asc']).draw(); // always show fields
            //    tipostmant();
            // atpreciostip();
           // $(".adding ").find('td').eq(3).html('<select id="obra" onchange="get_listtm()"></select>');
           /* $(".adding ").find('td').eq(0).html('<select id="concepto-select"></select>');
            $('#concepto-select').select2("val", "0");
            $("#concepto-select").width(300);*/
           /* var f = new Date();
            var mes = (f.getMonth() + 1);
            var dia = f.getDate();
            if (mes < 10) {
                mes = '0' + mes;
            }
            if (dia < 10) {
                dia = '0' + dia;
            }
            fecha = f.getFullYear() + "-" + mes + "-" + dia;

            $(".adding ").find('td').eq(2).html('<input id="fecha" type="date" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA" value="' + fecha + '"/>');*/


        },

        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;

            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {

                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);

                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {
            var _self = this,
                data;

            data = this.datatable.row($row.get(0)).data();
            //obtiene los valores ocultos

            var idobra = $row.find('td').eq(5).html();
            var idconcepto = $row.find('td').eq(4).html();
            $row.children('td').each(function (i) {
                var $this = $(this);


                if ($this.hasClass('actions')) {
                    _self.rowSetActionsEditing($row);
                } else {
                    // crea el select de tipo de combustible

                   // $(".adding ").find('td').eq(3).html('<select id="obra" onchange="get_listtm()"></select>');
                    $(".adding ").find('td').eq(0).html('<select id="concepto-select"></select>');
                   // $(".adding ").find('td').eq(2).html('<input id="fecha" type="text" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA"/>');

                    if ($this.hasClass('obra')) {
                        var idobra = $row.find('td').eq(6).html();
                        $("#idobra").val(idobra);
                        $("#obra").val(idobra);

                        $this.html('<select id="obra" onchange="get_listtm()"></select>');

                        $("#idobra").val(idobra);
                        $("#obra").val(idobra);
                        $.post(dirapi + "/obras",
                            {
                                accion: "cargarcb",
                                idobra: idobra
                            }, function (data) {
                                $("#obra").html(data);


                            });

                      //  $(".adding ").find('td').eq(4).html('<select id="concepto-select"></select>');
                    } else {
                        if ($this.hasClass('concepto-select')) {
                            $this.html('<select id="concepto-select"></select>');
                            var idobra = $row.find('td').eq(6).html();
                            var idconcepto = $row.find('td').eq(5).html();
                            $.post(dirapi + "/proyectos",
                                {
                                    accion: "cbtodosconceptos",
                                    obra: idobra,
                                    idconcepto: idconcepto
                                }, function (data) {
                                    // $(".adding ").find('td').eq(3).html('<select id="concepto"></select>');
                                    // $this.html('<select id="concepto"></select>');
                                    //     console.log(data);
                                    $("#concepto-select").html(data);

                                    $('#concepto-select').select2();

                                });
                        } else {
                            if ($this.hasClass('fecha')) {
                                var fecha = $row.find('td').eq(1).html();
                                fecha = fechasMysql(fecha);
                                $this.html('<input id="fecha" type="date" data-plugin-datepicker="" class="form-control" data-input-mask="31/12/9999" placeholder="DD/MM/AAAA" value="' + fecha + '" />');
                                document.getElementById("fecha").value = fecha;
                            } else {

                                $this.html('<input type="text" id="' + data[i] + '" class="form-control input-block" value="' + data[i] + '"/>');
                            }
                        }



                    }
                }
            });
            //se agrega la validacion de los que son numericos para que solo se capturen numeros
            // $row.find('td:eq(1) input').attr('type','number').attr('min','0');
            $row.find('td:eq(2) input').attr('type', 'number').attr('step', '0.01').attr('min', '0');
            $row.find('td:eq(1) input').attr('type', 'text').attr('disabled','disabled');

        },
        rowSave: function ($row) {
            var _self = this,
                $actions,
                values = [];

            //obtiene los valores de los selects de la tabla
            var idobraval = $row.find('td').eq(6).html();
            var idconceptoval = $row.find('td').eq(5).html();
            var descripcion = $("#descripcion").val();
            var costo = $row.find('td:eq(2) input').val();
            var obra = $("#filtroobras option:selected").val();
            var concepto = $("#concepto-select option:selected").val();
            var moneda = $("#moneda option:selected").val();
            var id = $row.find('td:eq(8) input').val();
            var fecha = $("#fecha").val();
            console.log("fecha: " + $("#fecha").val());
            console.log("obra: " + $("#filtroobras option:selected").val());


            //obtiene el texto de los selects de la tabla
            var monedatext = $("#moneda option:selected").text();
            //       console.log("id ", id, "descripcion ", descripcion, " costo ", costo, " obra ", obra, "concepto ", concepto, "fecha", fecha);
            var conceptotext = $("#concepto-select option:selected").text();

            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
                $row.removeClass('adding');
            }

            values = $row.find('td').map(function () {
                var $this = $(this);



                if ($this.hasClass('actions')) {
                    _self.rowSetActionsDefault($row);
                    return _self.datatable.cell(this).data();
                } else {
                    return $.trim($this.find('input').val());
                }
            });
            //agrega la clase selects al renglon que se esta editando/capturando
            $row.addClass('selects');
            //calcula los totales de las cantidades
            var costotext = $row.find('td').eq(2).html();
            var unidadtext = $row.find('td').eq(1).html();

            //       console.log(porId);
            this.datatable.row($row.get(0)).data(values);

            $actions = $row.find('td.actions');
            if ($actions.get(0)) {
                this.rowSetActionsDefault($row);
            }
            /*$.post(dirapi + "/atlistaprecios",
                {
                    accion: "agregar",
                    idobra: obra,
                    idconcepto: concepto,
                    costo: costo,
                    descripcion: descripcion,
                    id: id,
                    fecha: fecha
                }, function (data) {
                    //    console.log(data);
                    if (data) {
                        alertify.success("<h4>Operación exitosa </h4>");
                    } else {
                        alertify.error("<h4>Ocurrió un problema </h4>");
                    }

                });
*/

            this.datatable.draw();
            if ($row.hasClass('selects')) {
                //agrega el texto de los select a la tabla y le agrega la clase al td
                //      $(".selects").find('td').eq(0).html(descripciontext).addClass('descripcion-select');
                //       $(".selects").find('td').eq(1).html(costotext).addClass('costo-select');
              //  $(".selects").find('td').eq(3).html(obratext).addClass('obra');
                $(".selects").find('td').eq(0).html(conceptotext);
                $(".selects").find('td').eq(1).html(unidadtext);
                $(".selects").find('td').eq(3).html(monedatext);
                //agrega el valor de los select a la tabla y los oculta
                $(".selects").find('td').eq(5).html(concepto).addClass('hidden');
                $(".selects").find('td').eq(6).html(moneda).addClass('hidden');
                $(".selects").find('td').eq(7).html(moneda).addClass('hidden');
                $(".selects").find('td').eq(8).html(concepto).addClass('hidden');

                $row.removeClass('selects');
            }









        },
        rowRemove: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }

            var idMaestro = $("input:radio[name=opcion]:checked").val();
            
            $.post(dirapi + "/atlistaprecios",
                {
                    accion: "eliminar",
                    id: idMaestro
                }, function (data) {
                    if (data) {
                        alertify.success("<h4>Se eliminó la lista de precios exitosamente </h4>");
                        LLenarTablaMaestro();
                    } else {
                        alertify.error("<h4>Ocurrió un problema </h4>");
                    }

                });

            //    var descripciontext = $row.find('td').eq(0).html();
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowQuitar: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }

          /*  var idobraval = $row.find('td').eq(5).html();
            var idconceptoval = $row.find('td').eq(4).html();
            var costotext = $row.find('td').eq(1).html();*/
            //     console.log($row.find('td').eq(8).html());
           /* var id = $row.find('td').eq(8).html();
            $.post(dirapi + "/atlistaprecios",
                {
                    accion: "eliminar",
                    id: id
                }, function (data) {
                    //    console.log(data);
                    if (data) {
                        alertify.success("<h4>Se eliminó precio exitosamente </h4>");
                    } else {
                        alertify.error("<h4>Ocurrió un problema </h4>");
                    }

                });*/

            //    var descripciontext = $row.find('td').eq(0).html();
            this.datatable.row($row.get(0)).remove().draw();
        },
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }

    };

    $(function () {
        EditableTable8.initialize();
    });

}).apply(this, [jQuery]);



(function ($) {

    'use strict';

    var EditableTable9 = {
        options: {
            addButton: '#addToTable9',
            table: '#datatable-editable9',
            dialog: {
                wrapper: '#dialog',
                cancelButton: '#dialogCancel',
                confirmButton: '#dialogConfirm',
            }
        },
        initialize: function () {
            this
                .setVars()
                .build()
                .events();
        },
        setVars: function () {
            this.$table = $(this.options.table);
            this.$addButton = $(this.options.addButton);
            // dialog
            this.dialog = {};
            this.dialog.$wrapper = $(this.options.dialog.wrapper);
            this.dialog.$cancel = $(this.options.dialog.cancelButton);
            this.dialog.$confirm = $(this.options.dialog.confirmButton);

            return this;
        },
        build: function () {
            this.datatable = this.$table.DataTable();

            window.dt = this.datatable;

            return this;
        },
        events: function () {
            var _self = this;

            this.$table
                .on('click', 'a.save-row', function (e) {
                    e.preventDefault();

                    _self.rowSave($(this).closest('tr'));
                })
                .on('click', 'a.cancel-row', function (e) {
                    e.preventDefault();

                    _self.rowCancel($(this).closest('tr'));
                })
                .on('click', 'a.edit-row', function (e) {
                    e.preventDefault();

                    _self.rowEdit($(this).closest('tr'));
                })
                .on('click', 'a.remove-row', function (e) {
                    e.preventDefault();
                    var $row = $(this).closest('tr');
                    $.magnificPopup.open({
                        items: {
                            src: '#dialog',
                            type: 'inline'
                        },
                        preloader: false,
                        modal: true,
                        callbacks: {
                            change: function () {
                                _self.dialog.$confirm.on('click', function (e) {
                                    e.preventDefault();

                                    $.magnificPopup.close();
                                    _self.rowRemove($row);
                                });
                            },
                            close: function () {
                                _self.dialog.$confirm.off('click');
                            }
                        }
                    });
                });

            this.$addButton.on('click', function (e) {
                e.preventDefault();

                _self.rowAdd();
            });

            this.dialog.$cancel.on('click', function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });

            return this;
        },
        // ==========================================================================================
        // ROW FUNCTIONS
        // ==========================================================================================
        
        rowAdd: function () {
           
        },

        rowCancel: function ($row) {
            var _self = this,
                $actions,
                i,
                data;

            if ($row.hasClass('adding')) {
                this.rowRemove($row);
            } else {

                data = this.datatable.row($row.get(0)).data();
                this.datatable.row($row.get(0)).data(data);

                $actions = $row.find('td.actions');
                if ($actions.get(0)) {
                    this.rowSetActionsDefault($row);
                }

                this.datatable.draw();
            }
        },
        rowEdit: function ($row) {        

        },
        rowSave: function ($row) {
            
        },
        rowRemove: function ($row) {
            if ($row.hasClass('adding')) {
                this.$addButton.removeAttr('disabled');
            }

            //var idMaestro = $("input:radio[name=opcion2]:checked").val();
            var idMaestro = $row.attr('id');
            
            $.post(dirapi + "/atestimacioncliente",
                {
                    accion: "eliminar",
                    id: idMaestro
                }, function (data) {
                    if (data) {
                        alertify.success("<h4>Se eliminó la estimacion del cliente exitosamente </h4>");

                        estimacioncliente('ActualizarTablaMaestro');
                        $("#accion").val("");
                        estimacioncliente('limpiar');

                    } else {
                        alertify.error("<h4>Ocurrió un problema </h4>");
                    }

                });

            //    var descripciontext = $row.find('td').eq(0).html();
            this.datatable.row($row.get(0)).remove().draw();
        },
        
        rowSetActionsEditing: function ($row) {
            $row.find('.on-editing').removeClass('hidden');
            $row.find('.on-default').addClass('hidden');
        },
        rowSetActionsDefault: function ($row) {
            $row.find('.on-editing').addClass('hidden');
            $row.find('.on-default').removeClass('hidden');
        }

    };

    $(function () {
        EditableTable9.initialize();
    });

}).apply(this, [jQuery]);