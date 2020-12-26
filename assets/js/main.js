var stillWork = false;
var grupo = undefined;
var user = undefined;
var tlTipHtml = "Para mostrar la lista de usarios haga clic";
$(document).ready(function () {
    /*----------------------------------------------------------------------
    | Iniatiating the chat window with the appropriate HTML
    ------------------------------------------------------------------------*/
    var chat_init = function () {
        $("#chat-container").load(base + "chat/usuarios/");
    }

    chat_init();

    /*----------------------------------------------------------------------
    | Login function
    ------------------------------------------------------------------------*/
    $(document).on('click', '#login', function () {
        dataString = $('#login-frm').serialize();
        $.ajax({
            type: "POST",
            url: base + "chat/auth",
            data: dataString,
            cache: false,
            beforeSend: function () {
                $("#login").html('<img src="assets/images/ajax-loader.gif" /> Connecting...');
            },
            success: function (response) {
                if (response.success) {
                    $(".message").html(success(response.message));
                    $('#login-frm')[0].reset();
                    chat_init();
                } else {
                    $(".message").html(error(response.message));
                }
                $("#login").html('<i class="fa fa-lock"></i> Login');
                highlightFields(response.errors);
            }
        });
        return false;
    });

    $(document).on('click', '.goback', function () {
        chat_init();
    });
    /*----------------------------------------------------------------------
    | logout function
    ------------------------------------------------------------------------*/
    $(document).on('click', '#logout', function () {
        $.ajax({
            type: "POST",
            url: base + "chat/auth/logout",
            cache: false,
            beforeSend: function () {},
            success: function (response) {
                chat_init();
            }
        });
        return false;
    });

    /*----------------------------------------------------------------------
    | Close the chat container
    ------------------------------------------------------------------------*/
    $(document).on('click', '.chat-form-close', function () {
        $('#chat-container').toggle('slide', {
            direction: 'right'
        }, 500);
        stillWork = false;
        cerrado = true;
        sinAbrir = 0;
        obtenerSinLeer();
        $('#chat-box').hide();
    });

    /*----------------------------------------------------------------------
    | Close the chat box window
    ------------------------------------------------------------------------*/
    $(document).on('click', '.chat-box-close', function () {
        $('#chat-box').hide();
        $('#chat-container .chat-group a').removeClass('active');
        grupo = undefined;
        user = undefined;
    });

    /*----------------------------------------------------------------------
    | Display the chat container
    ------------------------------------------------------------------------*/
    $('.btn-chat').click(function () {
        if ($('#chat-box').is(':visible')) {
            $('#chat-container').toggle('slide', {
                direction: 'right'
            }, 500);
            $('#chat-box').hide();
            stillWork = true;
            cerrado = false;
            sinAbrir = 0;
            bootChat();
            refreshUserList();
            clearInterval(refrescar);
        } else {
            $('#chat-container').toggle('slide', {
                direction: 'right'
            }, 500);
            stillWork = true;
            cerrado = false;
            sinAbrir = 0;
            bootChat();
            refreshUserList();
            clearInterval(refrescar);
            chat_init();
        }
    });
    /*----------------------------------------------------------------------
    | change status Function
    ------------------------------------------------------------------------*/
    $(document).on('click', '.status-btn-group', function () {
        $(this).find('.btn').toggleClass('active');
        if ($(this).find('.btn-success').size() > 0) {
            $(this).find('.btn').toggleClass('btn-success');
            $.ajax({

                url: base + "chat/usuarios/toggle_status",
                success: function (response) {
                    if (response.status == 1) {
                        $('#current_status').html('Online');
                        $('#current_status').removeClass('btn-danger').addClass('btn-success');
                    } else {
                        $('#current_status').html('Offline');
                        $('#current_status').removeClass('btn-success').addClass('btn-danger');
                    }
                }
            });
        }
        if ($(this).find('.btn-danger').size() > 0) {
            $(this).find('.btn').toggleClass('btn-danger');
            $.ajax({

                url: base + "chat/usuarios/toggle_status",
                success: function (response) {
                    if (response.status == 1) {
                        $('#current_status').html('Online');
                        $('#current_status').removeClass('btn-danger').addClass('btn-success');
                    } else {
                        $('#current_status').html('Offline');
                        $('#current_status').removeClass('btn-success').addClass('btn-danger');
                    }
                }
            });
        }
        $(this).find('.btn').toggleClass('btn-default');
    });
    /*----------------------------------------------------------------------
    | Registration Process
    ------------------------------------------------------------------------*/
    $(document).on('click', '#create-account', function () {
        $("#chat-container").load(base + "chat/auth/register/");
        return false;
    });
    $(document).on('click', '#register', function () {
        dataString = $('#register-frm').serialize();
        $.ajax({
            type: "POST",
            url: base + "chat/auth/register",
            data: dataString,
            cache: false,
            beforeSend: function () {
                $("#register").html('<img src="assets/images/ajax-loader.gif" /> Connecting...');
            },
            success: function (response) {
                if (response.success) {
                    $(".message").html(success(response.message));
                    $('#register-frm')[0].reset();
                } else {
                    $(".message").html(error(response.message));
                }
                $("#register").html('<i class="fa fa-plus-circle"></i> Register');
                highlightFields(response.errors);
            }
        });
        return false;
    });

    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    /*----------------------------------------------------------------------
    | Editing profile process
    ------------------------------------------------------------------------*/
    $(document).on('click', '#edit-profile', function () {
        $("#chat-inner").load(base + "chat/usuarios/editProfile/");
        $('[data-toggle="dropdown"]').parent().removeClass('open');
        return false;
    });

    $(document).on("submit", "#profile-frm", function (e) {
        e.preventDefault();
        dataString = new FormData(this);
        $.ajax({
            type: "POST",
            url: base + "chat/usuarios/editProfile",
            data: dataString,
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function () {
                $("#update-profile").html('<img src="assets/images/ajax-loader.gif" /> Connecting...');
            },
            success: function (response) {
                if (response.success) {
                    if (response.errors.avatar_error)
                        $(".message").html(error(response.errors.avatar_error));
                    else {
                        $(".message").html(success(response.message));
                        $("#chat-inner").load(base + "chat/usuarios/editProfile/");
                    }
                } else {
                    $(".message").html(error(response.message));
                }
                $("#update-profile").html('<i class="fa fa-plus-circle"></i> Update Profile');
                highlightFields(response.errors);

            }
        });
    });

    /*----------------------------------------------------------------------
    | change password process
    ------------------------------------------------------------------------*/
    $(document).on('click', '#change-password', function () {
        $("#chat-inner").load(base + "chat/usuarios/changePassword/");
        $('[data-toggle="dropdown"]').parent().removeClass('open');
        return false;
    });
    $(document).on('click', '#update-password', function () {
        dataString = $('#changepassword-frm').serialize();
        $.ajax({
            type: "POST",
            url: base + "chat/usuarios/changePassword",
            data: dataString,
            cache: false,
            beforeSend: function () {
                $("#update-password").html('<img src="assets/images/ajax-loader.gif" /> Connecting...');
            },
            success: function (response) {
                if (response.success) {
                    $(".message").html(success(response.message));
                    $('#changepassword-frm')[0].reset();
                } else {
                    $(".message").html(error(response.message));
                }
                $("#update-password").html('<i class="fa fa-plus-circle"></i> Change Password');
                highlightFields(response.errors);
            }
        });
        return false;
    });
    /*----------------------------------------------------------------------
    | Show Pop overs
    ------------------------------------------------------------------------*/
    var popOverSettings = {
        container: 'body',
        trigger: 'hover',
        selector: '[data-toggle="popover"]',
        placement: 'left',
        html: true,
        content: function () {
            return $('#popover-content').html();
        }
    }

    $(document).on("mouseenter", '[data-toggle="popover"]', function () {
        image = $(this).find('.profile-img').html();
        name = $(this).find('.user-name').html();
        status = $(this).find('.user_status').html();
        $('#contact-image').empty().html(image);
        $('#contact-user-name').empty().html(name);
        $('#contact-user-status').empty().html(status);

        $(this).popover({
            placement: 'left',
            trigger: 'hover',
            container: 'body',
            selector: '[data-toggle="popover"]',
            html: true,
            content: function () {
                return $('#popover-content').html();
            }
        });

    }).on('mouseleave', '[data-toggle="popover"]', function () {
        $(this).popover('hide');
    });
});


/*----------------------------------------------------------------------
| Function to display error messages
------------------------------------------------------------------------*/
function error(message) {
    var alert = '<div style="font-size:12px; margin-top:10px;" class="alert alert-danger alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
                <strong>Error ! </strong> ' + message + ' </div>';
    return alert;
}

/*----------------------------------------------------------------------
| Function to display success messages
------------------------------------------------------------------------*/

function success(message) {
    var alert = '<div style="font-size:12px; margin-top:10px;" class="alert alert-success alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
                <strong>Success ! </strong> ' + message + ' </div>';
    return alert;
}
/*----------------------------------------------------------------------
| Function to highlight incorrect fields 
------------------------------------------------------------------------*/
function highlightFields(message) {
    $('.form-group').removeClass('has-error');
    $('.error').remove();
    for (var key in message) {
        $('input[name="' + key + '"]').parent().addClass('has-error');
        $('input[name="' + key + '"]').after('<span class="error">' + message[key] + '</span>');
    }
}

/*----------------------------------------------------------------------
| Function to showdropdown
------------------------------------------------------------------------*/
function abrirVentana() {
    document.getElementById("drop-grupo").classList.toggle("show");
}

function fillCBListaUsuario() {
    var options = document.getElementById('grupousuarios');
    var options2 = document.getElementById('edit-grupousuarios');
    var options3 = document.getElementById('edit-grupousuarios2');
    var usuarioID = $('#usuarioID').val();
    $.ajax({
        type: "POST",
        url: base + "chat/usuarios/getUsersConnection",
        cache: false,
        beforeSend: function () {},
        success: function (response) {
            var resp = JSON.parse(response);
            //console.log(resp);
            //FIND USER DATA..
            var puestoUser;
            $.each(resp, function (key, data) {
                if(usuarioID == data.IdUsuario){

                }
            });
            $.each(resp, function (key, data) {
                if(data.IdUsuario != usuarioID){
                    options.appendChild(new Option(data.Nombre + ' ' + data.Apellido, data.IdUsuario));
                    options2.appendChild(new Option(data.Nombre + ' ' + data.Apellido, data.IdUsuario));
                    options3.appendChild(new Option(data.Nombre + ' ' + data.Apellido, data.IdUsuario));
                }
            })
        }
    });
}
/*----------------------------------------------------------------------
| Function to create new groups
------------------------------------------------------------------------*/
function createNewGroup() {
    if ($('#nombreGrupo').val() == "") {
        new PNotify({
                title: 'ERROR',
                text: 'El nombre del grupo no debe estar vacio..',
                type: 'error'
            });
    } else if ($('#grupousuarios').val() == null) {
        new PNotify({
                title: 'ERROR',
                text: 'No ha seleccionado a ningun miembro para el grupo..',
                type: 'error'
            });
    } else {
        var nombreGrupo = $('#nombreGrupo').val();
        var adminID = $('#usuarioID').val();
        var miembros = $('#grupousuarios').val();
        miembros.push(adminID);
        if (miembros.length < 3) {
            new PNotify({
                title: 'ERROR',
                text: 'Un grupo debe constar de tres o mas personas..',
                type: 'error'
            });
        } else {
            var nuevoGrupo = [];
            var objeto = {
                'nombreGrupo': nombreGrupo,
                'usuarios': miembros,
                'adminID': adminID,
            }
            nuevoGrupo.push(objeto);
            $.ajax({
                type: "POST",
                data: {
                    'datos': JSON.stringify(nuevoGrupo)
                },
                url: base + "chat/crearGrupo",
                cache: false,
                beforeSend: function () {},
                success: function (response) {
                    if (response) {
                        $('#nombreGrupo').val("");
                        $('#grupousuarios').select2("val", "");
                        abrirVentana();
                        new PNotify({
                            title: 'HECHO',
                            text: 'Se ha creado el grupo de forma correcta..',
                            type: 'success'
                        });
                        obtenerGruposUsuario();
                    } else {
                        new PNotify({
                            title: 'ERROR',
                            text: 'Algo salio mal, contacte con el administrador..',
                            type: 'error'
                        });
                    }
                }
            });
        }
    }
}