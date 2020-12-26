/*
|-------------------------------------------------------------------------
| Copyright (c) 2013 
| This script may be used for non-commercial purposes only. For any
| commercial purposes, please contact the author at sammkaranja@gmail.com
|-------------------------------------------------------------------------
*/
var threadChat = true;
/*
|-------------------------------------------------------------------------
| Funtion to trigger the refresh event
|-------------------------------------------------------------------------
*/

/*----------------------------------------------------------------------
| Function to display individual chatbox
------------------------------------------------------------------------*/

$(document).on('click', '[data-toggle="popover"]', function () {
    $(this).popover('hide');
    $('ul.chat-box-body').empty();
    user = $(this).find('input[name="user_id"]').val();
    grupo = $(this).find('input[name="grupo_id"]').val();
    if (user != undefined) {
        $(this).find('span[rel="' + user + '"]').text('');

        load_thread(user);
        $('#miembros').qtip({
            style: {
                classes: 'qtip-bootstrap'
            },
            content: {
                text: user
            },
            position: {
                my: 'center left',
                at: 'center right',
                target: $('#miembros')
            }
        });
        var offset = $(this).offset();
        var h_main = $('#chat-container').height();
        var h_title = $("#chat-box > .chat-box-header").height();
        var top = ($('#chat-box').is(':visible') ? (offset.top - h_title - 40) : (offset.top + h_title - 20));
        if ((top + $('#chat-box').height()) > h_main) {
            top = h_main - $('#chat-box').height();
        }
        $('#chat-box').css({
            'top': top
        });
        if (!$('#chat-box').is(':visible')) {
            $('#chat-box').toggle('slide', {
                direction: 'right'
            }, 500);
        }
        $('.chat-box-body').slimScroll({
            height: '300px'
        });
        // FOCUS INPUT TExT WHEN CLICK
        $("#chat-box .chat-textarea input").focus();
    } else if (grupo != undefined) {
        $(this).find('span[rel="' + grupo + '"]').text('');

        load_thread_grupo(grupo);
        obtenerMiembrosGrupo();
        var offset = $(this).offset();
        var h_main = $('#chat-container').height();
        var h_title = $("#chat-box > .chat-box-header").height();
        var top = ($('#chat-box').is(':visible') ? (offset.top - h_title - 40) : (offset.top + h_title - 20));
        if ((top + $('#chat-box').height()) > h_main) {
            top = h_main - $('#chat-box').height();
        }
        $('#chat-box').css({
            'top': top
        });
        if (!$('#chat-box').is(':visible')) {
            $('#chat-box').toggle('slide', {
                direction: 'right'
            }, 500);
        }
        $('.chat-box-body').slimScroll({
            height: '300px'
        });
        // FOCUS INPUT TExT WHEN CLICK
        $("#chat-box .chat-textarea input").focus();
    }
});
/*----------------------------------------------------------------------
| Function to send message
------------------------------------------------------------------------*/
$(document).on('keypress', '.chat-textarea input', function (e) {
    var txtarea = $(this);
    var message = txtarea.val();
    var adjunto = $('#adjunto').val();
    var tipo = $('#tipoarchivo').val();
    if (e.which == 13) {
        if ((adjunto != "" && message == "") || (adjunto != "" && message !== "")) {
            var link = '';
            if (tipo == "jpg" || tipo == "png" || tipo == "jpeg") {
                link = '<a href="' + adjunto + '" target="_blank"><img src="' + adjunto + '"  width="100px" height="150px"/></a>';
            } else {
                link = '<a href="' + adjunto + '" target="_blank">Descargar archivo <i class="fa fa-download" aria-hidden="true"></i></a>';
            }
            var mensaje = message + " " + link;
            message = mensaje;
            $('#adjunto').val("");
            $('#tipo').val("");
            $('#drop-area').removeAttr("style");
        } else if (message == "") {
            return;
        }
        txtarea.val('');
        $('#drop-text').html("");
        // save the message 
        if (user != undefined) {
            $.ajax({
                type: "POST",
                url: base + "chat/save_message",
                data: {
                    message: message,
                    user: user
                },
                cache: false,
                success: function (response) {
                    msg = response.message;
                    li = '<li class=" bubble ' + msg.type + '"><img src="assets/images/thumbs/no-image.jpg" class="avt img-responsive">\
                    <div class="message">\
                    <span class="chat-arrow"></span>\
                    <a href="javascript:void(0)" class="chat-name">' + msg.name + '</a>&nbsp;\
                    <span class="chat-datetime">fecha ' + msg.time + '</span>\
                    <span class="chat-body">' + msg.body + '</span></div></li>';

                    $('ul.chat-box-body').append(li);

                    $('ul.chat-box-body').animate({
                        scrollTop: $('ul.chat-box-body').prop("scrollHeight")
                    }, 500);
                }
            });
        } else if (grupo != undefined) {
            $.ajax({
                type: "POST",
                url: base + "chat/save_message_grupo",
                data: {
                    message: message,
                    grupo: grupo
                },
                cache: false,
                success: function (response) {
                    msg = response.message;
                    li = '<li class=" bubble ' + msg.type + '"><img src="assets/images/thumbs/no-image.jpg" class="avt img-responsive">\
                    <div class="message">\
                    <span class="chat-arrow"></span>\
                    <a href="javascript:void(0)" class="chat-name">' + msg.name + '</a>&nbsp;\
                    <span class="chat-datetime">fecha ' + msg.time + '</span>\
                    <span class="chat-body">' + msg.body + '</span></div></li>';

                    $('ul.chat-box-body').append(li);

                    $('ul.chat-box-body').animate({
                        scrollTop: $('ul.chat-box-body').prop("scrollHeight")
                    }, 500);
                    threadChat = true;
                }
            });
        }
    }
});

/*----------------------------------------------------------------------------------------------------
| Function to load messages
-------------------------------------------------------------------------------------------------------*/
function bootChat() {
    grupo = undefined;
    refresh = setInterval(function () {
        if (!stillWork) {
            clearInterval(refresh);
        }
        $.ajax({
            type: 'GET',
            url: base + "chat/updates/",
            async: true,
            cache: false,
            success: function (data) {
                if (data.success) {
                    thread = data.messages;
                    senders = data.senders;
                    $.each(thread, function () {
                        if ($("#chat-box").is(":visible")) {
                            chatbuddy = $("#chat_buddy_id").val();
                            if (this.sender == chatbuddy) {
                                li = '<li class="' + this.type + '"><img src="assets/images/thumbs/no-image.jpg" class="avt img-responsive">\
                                <div class="message">\
                                <span class="chat-arrow"></span>\
                                <a href="javascript:void(0)" class="chat-name">' + this.name + '</a>&nbsp;\
                                <span class="chat-datetime">fecha ' + this.time + '</span>\
                                <span class="chat-body">' + this.body + '</span></div></li>';
                                $('ul.chat-box-body').append(li);
                                $('ul.chat-box-body').animate({
                                    scrollTop: $('ul.chat-box-body').prop("scrollHeight")
                                }, 500);
                                //Mark this message as read
                                $.ajax({
                                    type: "POST",
                                    url: base + "chat/mark_read",
                                    data: {
                                        id: this.msg
                                    }
                                });
                            } else {
                                from = this.sender;
                                $.each(senders, function () {
                                    if (this.user == from) {
                                        $(".chat-group").find('span[rel="' + from + '"]').text(this.count);
                                    }
                                });
                            }
                        } else {
                            from = this.sender;
                            $.each(senders, function () {
                                if (this.user == from) {
                                    $("#ocultoID_" + from + "").removeClass("hidden");
                                    $(".chat-group").find('span[rel="' + from + '"]').text(this.count);
                                }
                            });

                        }
                    });
                    var audio = new Audio('assets/notify/notify.mp3').play();
                } else {
                    if (grupo != undefined && threadChat) {
                        load_thread_grupo(grupo, 5);
                    }
                }
                /*
                if(user != undefined){
                    load_thread(user, 5);
                }*/
            },
            error: function (XMLHttpRequest, textstatus, error) {
                console.log(error);
            }
        });

    }, 3500);
}

function eliminarGpo(IDGrupo) {
    alertify.confirm('Estas seguro de querer eliminar este grupo?',
        function (e) {
            if (e) {
                $.ajax({
                    type: "POST",
                    data: {
                        'IDGrupo': IDGrupo
                    },
                    url: base + "chat/eliminarGpo",
                    cache: false,
                    beforeSend: function () {},
                    success: function (response) {
                        if (response) {
                            new PNotify({
                                title: 'HECHO',
                                text: 'Se ha eliminado el grupo con exito..',
                                type: 'success'
                            });
                            obtenerGruposUsuario();
                            $('#chat-box').hide();
                            $('#chat-container .chat-group a').removeClass('active');
                        } else {
                            new PNotify({
                                title: 'ERROR',
                                text: 'No se ha podido borrar el grupo.',
                                type: 'error'
                            });
                        }
                    }
                });
            } else {}
        }).set('modal', true);
}

function editCargar(IDGrupo) {
        $("#IDGrupoEdit").val(IDGrupo);
        $.ajax({
            type: "POST",
            data: {
                'IDGrupo': IDGrupo
            },
            url: base + "chat/obtenerMiembrosGrupo",
            cache: false,
            beforeSend: function () {},
            success: function (response) {
                var resp = JSON.parse(response);
                var selectedItems = [];
                $.each(resp, function (key, data) {
                    selectedItems.push(data.IDUsuario);
                });
                //$("#edit-grupousuarios").val(selectedItems);
                $("#edit-grupousuarios").select2({
                    width: '100%',
                    placeholder: "Seleccione los miembros"
                });
                $("#edit-grupousuarios").val(selectedItems);
                $("#edit-grupousuarios").trigger('change');
                $("#edit-grupousuarios2").select2({
                    width: '100%',
                    placeholder: "Seleccione los miembros"
                });
                $("#edit-grupousuarios2").val(selectedItems);
                $("#edit-grupousuarios2").trigger('change');
            }
        });
        $.ajax({
            type: "POST",
            data: {
                'IDGrupo': IDGrupo
            },
            url: base + "chat/obtenerNombreGrupo",
            cache: false,
            beforeSend: function () {},
            success: function (response) {
                var resp = JSON.parse(response);
                var selectedItems = [];
                $.each(resp, function (key, data) {
                    $("#edit-nombreGrupo").val(data.Nombre);
                });
            }
        });
}

function editarGpo() {
    var IDGrupo = $("#IDGrupoEdit").val();
    var adminID = $('#usuarioID').val();
    var nombreGpo = $('#edit-nombreGrupo').val();
    var miembrosIniciales = [];
    var $el=$("#edit-grupousuarios2");
    $el.find('option:selected').each(function(){
        miembrosIniciales.push($(this).val());
    });
    miembrosIniciales.push(adminID);
    var miembrosNuevos=[];
    var $el=$("#edit-grupousuarios");
    $el.find('option:selected').each(function(){
        miembrosNuevos.push($(this).val());
    });
    miembrosNuevos.push(adminID);
    var arr = getDiff(miembrosIniciales,miembrosNuevos);
    $.ajax({
        type: "POST",
        data: {
            'remove':  JSON.stringify(arr.remove),
            'add':  JSON.stringify(arr.add),
            'IDGrupo': IDGrupo,
            'NombreGpo': nombreGpo
        },
        url: base + "chat/modificarMiembrosGrupo",
        cache: false,
        beforeSend: function () {},
        success: function (response) {
            if(response){
                new PNotify({
                    title: 'HECHO',
                    text: 'Se han actualizado los miembros del grupo.',
                    type: 'success'
                });
            }else{ 
                new PNotify({
                    title: 'ERROR',
                    text: 'No se han podido actualizado los miembros del grupo.',
                    type: 'error'
                }); 
            }
            
        }
    });
}
function getDiff(past, now) {
        let ret = { add: [], remove: [] };
        for (var i = 0; i < now.length; i++) {
          if (past.indexOf(now[i]) < 0)
            ret['add'].push(now[i]);
        }
        for (var i = 0; i < past.length; i++) {
          if (now.indexOf(past[i]) < 0)
            ret['remove'].push(past[i]);
        }
        return ret;
      }
function resetValues() {
    $("#edit-grupousuarios").select2("val", "");
    $("#edit-nombreGrupo").val("");
    $("#IDGrupoEdit").val("");
}

function obtenerGruposUsuario() {
    var usuarioID = $('#usuarioID').val();
    $.ajax({
        type: "POST",
        data: {
            'IDUsuario': usuarioID
        },
        url: base + "chat/obtenerGruposUsuario",
        cache: false,
        beforeSend: function () {},
        success: function (response) {
            if (response != null) {
                var resp = JSON.parse(response);
                var linkGrupo = "";
                $.each(resp, function (key, data) {
                    if (data.IDAdmin == usuarioID) {
                        linkGrupo += '<a href="javascript: void(0)" data-toggle="popover"><div class="contact-wrap"><input type="hidden" value="' + data.IDGrupo + '" name="grupo_id" /><div class="contact-profile-img"><div class="profile-img">            <img src="' + base + 'assets/images/thumbs/no-image.jpg" class="img-responsive">           </div>       </div>        <span class="contact-name">            <small class="user-name">' + data.Nombre.toUpperCase() + '</small>            </i><span class="badge progress-bar-danger" rel="' + data.IdGrupo + '"></span>        </span>       <span style="display: table-cell;vertical-align: middle;"><i onClick="editCargar(' + data.IDGrupo + ');" class="fa fa-pencil-square-o" aria-hidden="true" data-toggle="modal" data-target="#myEdit"  data-id="' + data.IDGrupo + '" alt="Editar Grupo"></i> <i id="eliminarGpo" class="fa fa-trash" aria-hidden="true" onClick="eliminarGpo(' + data.IDGrupo + ');"></i></div>    </a>';
                        //linkGrupo += '<a href="javascript: void(0)" data-toggle="popover"><div class="contact-wrap"><input type="hidden" value="' + data.IDGrupo + '" name="grupo_id" /><div class="contact-profile-img"><div class="profile-img">            <img src="' + base + 'assets/images/thumbs/no-image.jpg" class="img-responsive">           </div>       </div>        <span class="contact-name">            <small class="user-name">' + data.Nombre.toUpperCase() + '</small>            </i><span class="badge progress-bar-danger" rel="' + data.IdGrupo + '"></span>        </span>       <span style="display: table-cell;vertical-align: middle;"></i> <i id="eliminarGpo" class="fa fa-trash" aria-hidden="true" onClick="eliminarGpo(' + data.IDGrupo + ');"></i></div>    </a>';
                    } else {
                        linkGrupo += '<a href="javascript: void(0)" data-toggle="popover"><div class="contact-wrap"><input type="hidden" value="' + data.IDGrupo + '" name="grupo_id" /><div class="contact-profile-img"><div class="profile-img">            <img src="' + base + 'assets/images/thumbs/no-image.jpg" class="img-responsive">           </div>       </div>        <span class="contact-name">            <small class="user-name">' + data.Nombre.toUpperCase() + '</small>            </i><span class="badge progress-bar-danger" rel="' + data.IdGrupo + '"></span>        </span>       <span style="display: table-cell;vertical-align: middle;"> </div>    </a>';
                    }
                });
                $('.chat-grupo2').html();
                $('.chat-grupo2').html(linkGrupo);
                $('#eliminarGpo').qtip({
                    style: {
                        classes: 'qtip-bootstrap'
                    },
                    content: {
                        text: 'Eliminar este grupo'
                    }
                });
            }
        }
    });
}

function obtenerMiembrosGrupo() {
    var IdGrupo = $('#chat_buddy_id').val();
    $.ajax({
        type: "POST",
        data: {
            'IDGrupo': IdGrupo
        },
        url: base + "chat/obtenerMiembrosGrupo",
        cache: false,
        beforeSend: function () {},
        success: function (response) {
            if (response != null) {
                var resp = JSON.parse(response);
                var Nombres = "";
                $.each(resp, function (key, data) {
                    Nombres += data.Nombre + ' ' + data.Apellidos + '<br>';
                });
                $('#miembros').qtip({
                    style: {
                        classes: 'qtip-bootstrap'
                    },
                    content: {
                        text: Nombres
                    },
                    position: {
                        my: 'center left',
                        at: 'center right',
                        target: $('#miembros')
                    }
                });
            }
        }

    });
}

function refreshUserList() {
    refresh2 = setInterval(function () {
        if (!stillWork) {
            clearInterval(refresh2);
        }
        $.ajax({
            type: "POST",
            url: base + "chat/usuarios/getUsersConnection",
            cache: false,
            beforeSend: function () {},
            success: function (response) {
                var resp = JSON.parse(response);
                var usuarioID = $('#usuarioID').val();
                var ocultoID = $('#ocultoID').val();
                var linkOnline = "<strong>Usuarios en linea</strong>";
                var linkOffline = "<strong>Usuarios fuera de linea</strong>";
                $.each(resp, function (key, data) {
                    if ((usuarioID != data.IdUsuario)) {
                        var oculto = "";
                        if (ocultoID == 1 && data.IdUsuario == 11 && data.unread < 1) {
                            oculto = 'class="hidden"';
                        } else {
                            oculto = "";
                        }
                        if (data.online == 1) {
                            linkOnline += '<a href="javascript: void(0)" id="ocultoID_' + data.IdUsuario + '" data-toggle="popover" ' + oculto + '><div class="contact-wrap"><input type="hidden" value="' + data.IdUsuario + '" name="user_id" /><div class="contact-profile-img"><div class="profile-img">            <img src="' + base + 'assets/images/thumbs/no-image.jpg" class="img-responsive">           </div>       </div>        <span class="contact-name">            <small class="user-name">' + data.Nombre + ' ' + data.Apellido + '</small>            <span class="badge progress-bar-danger" rel="' + data.IdUsuario + '">';
                            if (data.unread != null) {
                                linkOnline += '' + data.unread + '</span>        </span>       <span style="display: table-cell;vertical-align: middle;" class="user_status">                        <span class="user-status is-online"></span>    </div>    </a>';
                            } else {
                                linkOnline += '</span>        </span>       <span style="display: table-cell;vertical-align: middle;" class="user_status">                        <span class="user-status is-online"></span>    </div>    </a>';
                            }
                        } else {
                            linkOffline += '<a href="javascript: void(0)" id="ocultoID_' + data.IdUsuario + '" data-toggle="popover" ' + oculto + '><div class="contact-wrap"><input type="hidden" value="' + data.IdUsuario + '" name="user_id" /><div class="contact-profile-img"><div class="profile-img">            <img src="' + base + 'assets/images/thumbs/no-image.jpg" class="img-responsive">           </div>       </div>        <span class="contact-name">            <small class="user-name">' + data.Nombre + ' ' + data.Apellido + '</small>            <span class="badge progress-bar-danger" rel="' + data.IdUsuario + '">';
                            if (data.unread != null) {
                                linkOffline += '' + data.unread + '</span>        </span>       <span style="display: table-cell;vertical-align: middle;" class="user_status">                        <span class="user-status is-offline"></span>    </div>    </a>';
                            } else {
                                linkOffline += '</span>        </span>       <span style="display: table-cell;vertical-align: middle;" class="user_status">                        <span class="user-status is-offline"></span>    </div>    </a>';
                            }
                        }
                    }
                })
                $('.chat-group').html();
                $('.chat-group').html(linkOnline + linkOffline);
            }
        });
    }, 10000);
}
/*----------------------------------------------------------------------
| Function to load threaded messages or user conversation
------------------------------------------------------------------------*/
var limit = 1;

function load_thread(user, limit) {
    //send an ajax request to get the user conversation 
    $.ajax({
        type: "POST",
        url: base + "chat/messages",
        data: {
            user: user,
            limit: limit
        },
        cache: false,
        success: function (response) {
            if (response.success) {
                buddy = response.buddy;
                status = buddy.status == 1 ? 'Online' : 'Offline';
                statusClass = buddy.status == 1 ? 'user-status is-online' : 'user-status is-offline';

                $('#chat_buddy_id').val(buddy.id);
                $('.display-name', '#chat-box').html(buddy.name);
                $('#chat-box > .chat-box-header > small').html(status);
                $('#chat-box > .chat-box-header > span.user-status').removeClass().addClass(statusClass);

                $('ul.chat-box-body').html('');
                if (buddy.more) {
                    $('ul.chat-box-body').append('<li id="load-more-wrap" style="text-align:center"><a onclick="javascript: load_thread(\'' + buddy.id + '\', \'' + buddy.limit + '\')" class="btn btn-xs btn-info" style="width:100%">Ver mensajes anteriores(' + buddy.remaining + ')</a></li>');
                }


                thread = response.thread;
                $.each(thread, function () {
                    li = '<li class="' + this.type + '"><img src="assets/images/thumbs/no-image.jpg" class="avt img-responsive">\
                <div class="message">\
                <span class="chat-arrow"></span>\
                <a href="javascript:void(0)" class="chat-name">' + this.name + '</a>&nbsp;\
                <span class="chat-datetime">fecha ' + this.time + '</span>\
                <span class="chat-body">' + this.body + '</span></div></li>';

                    $('ul.chat-box-body').append(li);
                });
                if (buddy.scroll) {
                    $('ul.chat-box-body').animate({
                        scrollTop: $('ul.chat-box-body').prop("scrollHeight")
                    }, 500);
                }

            }
        }
    });
}

function load_thread_grupo(user, limit) {
    //send an ajax request to get the user conversation 
    $.ajax({
        type: "POST",
        url: base + "chat/messages_grupo",
        data: {
            user: user,
            limit: limit
        },
        cache: false,
        success: function (response) {
            if (response.success) {
                buddy = response.buddy;
                status = buddy.status == 1 ? 'Online' : 'Offline';
                statusClass = buddy.status == 1 ? 'user-status is-online' : 'user-status is-offline';
                $('#chat_buddy_id').val(buddy.id);
                $('.display-name', '#chat-box').html(buddy.name);
                $('#chat-box > .chat-box-header > small').html(status);
                $("#miembros").removeClass("hidden");
                $('#chat-box > .chat-box-header > span.user-status').removeClass().addClass(statusClass);

                $('ul.chat-box-body').html('');
                if (buddy.more) {
                    $('ul.chat-box-body').append('<li id="load-more-wrap" style="text-align:center"><a onclick="javascript: load_thread_grupo(\'' + buddy.id + '\', \'' + buddy.limit + '\');stopThread();" class="btn btn-xs btn-info" style="width:100%">Ver mensajes anteriores(' + buddy.remaining + ')</a></li>');
                }


                thread = response.thread;
                $.each(thread, function () {
                    li = '<li class="' + this.type + '"><img src="assets/images/thumbs/no-image.jpg" class="avt img-responsive">\
                <div class="message">\
                <span class="chat-arrow"></span>\
                <a href="javascript:void(0)" class="chat-name">' + this.name + '</a>&nbsp;\
                <span class="chat-datetime">fecha ' + this.time + '</span>\
                <span class="chat-body">' + this.body + '</span></div></li>';

                    $('ul.chat-box-body').append(li);
                });
                if (buddy.scroll) {
                    $('ul.chat-box-body').animate({
                        scrollTop: $('ul.chat-box-body').prop("scrollHeight")
                    }, 500);
                }

            }
        }
    });
}

function stopThread() {
    threadChat = false;
}
/*
|----------------------------------------------------------------------------
| End of file
|----------------------------------------------------------------------------
*/