<style>
    ul.nav-main > li.nav-active > a {
        box-shadow: 2px 0 0 #0d232b inset;
    }
</style>
<aside id="sidebar-left" class="sidebar-left" style="top: 0px;">
    <div class="sidebar-header">
        <div class="sidebar-title">
            Navegación
        </div>
        <div class="sidebar-toggle hidden-xs" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
            <i class="fa fa-bars" aria-label="Toggle sidebar"></i>
        </div>
    </div>
    <div class="nano">
        <div class="nano-content">
            <nav id="menu" class="nav-main" role="navigation">
                <ul class="nav nav-main">
                    <li class="nav-active">
                        <a href="<?= base_url(); ?>">
                            <i class="fa fa-home" aria-hidden="true"></i>
                            <span>Inicio</span>
                        </a>
                    </li>  
                    <li class="nav-active">
                        <a href="<?= base_url(); ?>requisiciones">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            <span>Requisiciones</span>
                        </a>
                    </li>  
                    <li class="nav-active">
                        <a href="<?= base_url(); ?>concentracion">
                            <i class="fa fa-building-o" aria-hidden="true"></i> <!-- fa fa-bar-chart -->
                            <span>Concentración</span>
                        </a>
                    </li>   
                </ul>
            </nav> 
        </div>
    </div>
</aside>
<a href="<?= base_url(); ?>compras/compras" class="hide">Compras</a>
<!-- end: sidebar -->
<script type="text/javascript">
$(document).ready(function () {
   
});
function evento(accion){
    console.log(accion);
}

$('#reqnuevo').qtip({
        style: { classes: 'qtip-bootstrap' },
        content: 'Crear una requisición con los productos y/o servicios que desee solicitar',
        position: {
            my: 'center left',  
            at: 'center right', 
            target: $('#reqnuevo')
         }
     });
</script>