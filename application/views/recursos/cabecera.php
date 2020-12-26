<section role="main" class="content-body">
    <header class="page-header" style="top: 0px;">
        <h2><?= $titulo ?></h2>

        <div class="right-wrapper pull-right">
            <ol class="breadcrumbs">
                <li style="text-indent:-1.8cm">
                    <a href=" panel">
                        <i  class="fa fa-home" style="text-indent:-0.5cm"></i>
                    </a>
                </li>
                <li style="text-indent:-1cm"><span style="text-indent:-2cm"><?= $titulo ?></span></li>
            </ol>
            <div class="header-right">
                <div id="userbox" class="userbox">
                    <a data-toggle="dropdown" href="#"  >
                        <figure class="profile-picture">
                            <img src="<?= base_url() ?>assets/images/!logged-user.jpg" alt="Joseph Doe" class="img-circle" data-lock-picture="<?= base_url() ?>assets/images/!logged-user.jpg" />
                        </figure>
                        <div class="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">
                            <span class="name"> </span>
                            <span class="role"> </span>
                        </div>
                        <i class="fa custom-caret" style="color: #44aed6;"></i>
                    </a>
                    <div class="dropdown-menu" >
                        <ul class="list-unstyled">
                            <li class="divider"></li>
                            <!-- <li>
                                <a role="menuitem" tabindex="-1" href="pages-user-profile.html"><i class="fa fa-user"></i> My Profile</a>
                            </li> -->
                            <li>
                                <a role="menuitem" target="_blank" tabindex="-1" href="" data-lock-screen="false"><i class="fa fa-book"></i> Manual</a>
                            </li>
                            <li>
                                <a role="menuitem" tabindex="-1" onclick="cerrar()"><i class="fa fa-power-off"></i> Salir</a>
                            </li>
                        </ul>
                    </div>
                </div> 
            </div> 
        </div> 
        </header>
</section>
<script type="text/javascript">

</script>