<!doctype html>
<?php
if ($collapsed) {
?>
<html class="fixed sidebar-left-collapsed">
    <?php
    } else {
    ?>
    <html class="fixed ">
        <?php
        }
        ?>
        <head>
            <!-- Basic -->
            <!--  <meta charset="UTF-8"> -->
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>Sucursales</title>
            
            <meta name="keywords" content="HTML5 Admin Template" />
            <meta name="description" content="Porto Admin - Responsive HTML5 Template">
            <meta name="author" content="okler.net">
            <!-- Mobile Metas -->
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="shortcut icon" href="<?= base_url() ?>assets/images/favicon.png">
            <!-- Web Fonts  -->
            <!-- <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css"> -->
            <!-- Vendor CSS -->
            <script src="https://cdn.rawgit.com/zenorocha/clipboard.js/v1.5.3/dist/clipboard.min.js"></script> 
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap/css/bootstrap.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/font-awesome/css/font-awesome.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/magnific-popup/magnific-popup.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-datepicker/css/datepicker3.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/dropzone/css/dropzone.css" />
            <!-- Specific Page Vendor CSS -->
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-ui/css/ui-lightness/jquery-ui-1.10.4.custom.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/morris/morris.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/select2/select2.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-datatables-bs3/assets/css/datatables.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-tagsinput/bootstrap-tagsinput.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-switch/bootstrap-switch.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/alertify/alertify.core.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/alertify/alertify.default.css" />
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/bootstrap-timepicker/css/bootstrap-timepicker.css" />
            <!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-upload/css/jquery.fileupload.css"/>
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-upload/css/jquery.fileupload-ui.css"/>
            <!-- <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-upload/css/style.css"> -->
            <link rel="stylesheet" href="<?= base_url() ?>assets/vendor/jquery-qtip2/jquery.qtip.css">
            <!-- Theme CSS -->
            <link rel="stylesheet" href="<?= base_url() ?>assets/stylesheets/theme.css" />
            <!-- Skin CSS -->
            <link rel="stylesheet" href="<?= base_url() ?>assets/stylesheets/skins/default.css" />
            <!-- Theme Custom CSS -->
            <link rel="stylesheet" href="<?= base_url() ?>assets/stylesheets/theme-custom.css"/>
             <!-- CHAT CSS -->
            <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/chat.css" rel="stylesheet">
            <!-- jqwidgets -->
            <link rel="stylesheet" href="<?= base_url() ?>assets/jqwidgets/styles/jqx.base.css"/>
            <link rel="stylesheet" href="<?= base_url() ?>assets/jqwidgets/styles/jqx.bootstrap.css"/>
            <!-- Head Libs -->
            <script src="<?= base_url() ?>assets/vendor/jquery/jquery.js"></script>
            <script src="<?= base_url() ?>assets/vendor/select2/select2.js"></script>
            <script src="<?= base_url() ?>assets/vendor/bootstrap/js/bootstrap.js"></script>
            <script src="<?= base_url() ?>assets/vendor/modernizr/modernizr.js"></script>
            <script src="<?= base_url() ?>assets/vendor/ios7-switch/ios7-switch.js"></script>
            <script src="<?= base_url() ?>assets/vendor/dropzone/dropzone.js"></script>
            <script src="<?= base_url() ?>assets/vendor/bootstrap-multiselect/bootstrap-multiselect.js"></script>
            <script src="<?= base_url() ?>assets/vendor/bootstrap-tagsinput/bootstrap-tagsinput.js"></script>
            <script src="<?= base_url() ?>assets/vendor/bootstrap-switch/bootstrap-switch.js"></script>
            <script src="<?= base_url() ?>assets/vendor/alertify/alertify.js"></script>
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/vendor/jquery.ui.widget.js"></script>
            <script src="<?= base_url() ?>assets/vendor/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
            <script src="<?= base_url() ?>assets/vendor/jquery-qtip2/jquery.qtip.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/pnotify/pnotify.custom.min.js"></script>
            <link href="<?= base_url() ?>assets/pnotify/pnotify.custom.min.css" media="all" rel="stylesheet" type="text/css" />
            <!--<script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.fileupload-jquery-ui.js"></script>  -->
            <!-- The Templates plugin is included to render the upload/download listings -->
            <script src="http://blueimp.github.io/JavaScript-Templates/js/tmpl.min.js"></script>
            <!-- The Load Image plugin is included for the preview images and image resizing functionality -->
            <script src="http://blueimp.github.io/JavaScript-Load-Image/js/load-image.all.min.js"></script>
            <!-- The Canvas to Blob plugin is included for image resizing functionality -->
            <script src="http://blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
            <!-- blueimp Gallery script -->
            <script src="http://blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>
            <!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.iframe-transport.js"></script>
            <!-- The basic File Upload plugin -->
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.fileupload.js"></script>
            <!-- The File Upload processing plugin -->
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.fileupload-process.js"></script>
            <!-- The File Upload image preview & resize plugin -->
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.fileupload-image.js"></script>
            <!-- The File Upload audio preview plugin -->
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.fileupload-audio.js"></script>
            <!-- The File Upload video preview plugin -->
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.fileupload-video.js"></script>
            <!-- The File Upload validation plugin -->
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.fileupload-validate.js"></script>
            <!-- The File Upload user interface plugin -->
            <script src="<?= base_url() ?>assets/vendor/jquery-upload/js/jquery.fileupload-ui.js"></script>
            <!-- tabla tipo excel  jqwidgets-->
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxcore.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxbuttons.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxscrollbar.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxlistmenu.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxdata.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxdata.export.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.export.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.edit.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.selection.js"></script> 
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.columnsresize.js"></script> 
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.filter.js"></script> 
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.sort.js"></script> 
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.pager.js"></script> 
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxgrid.grouping.js"></script> 
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxdropdownlist.js"></script> 
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxlistbox.js"></script> 
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxnumberinput.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxdatetimeinput.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxcalendar.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxcombobox.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxmenu.js"></script>
            <!-- autorizaciones viaticos -->
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxsortable.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxkanban.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxexpander.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxinput.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxcolorpicker.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxradiobutton.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxdropdownbutton.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxbuttons.js"></script>
            <!-- panel combustible -->
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxdraw.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxbargauge.js"></script>
            <script type="text/javascript" src="<?= base_url() ?>assets/jqwidgets/jqxchart.core.js"></script>
            
            <!--auto complete -->
            <script type="text/javascript" src="<?= base_url() ?>assets/autocomplete/bootstrap3-typeahead.min.js"></script>
            
        </head>
        <body>