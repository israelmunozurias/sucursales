# sucursales
Examen
 
    Pasos para instalación
1 Descargar el repositorio.
2 Ubicar proyecto en la carpeta de su servidor apache, en caso de WAMPSERVER se llama www
3 configuración de base de datos puede crear los usuario o puede usar el de su preferencia:
  El archivo de configuración esta en la siguiente ubicación  application\config\database.php
    $db['default']['username'] = 'user_principal';
    $db['default']['password'] = 'principal1';
    $db['default']['database'] = 'prueba';
4 Hacer una base de datos en su local llamada prueba y cargar el script db.sql que esta en la raíz del repositorio.
5 Las configuraciones anteriores le permitirán entrar en localhost.
6 Para entrar con medio de ip o dominio configurar estos archivos.
    application\config\config.php
        $config['base_url']	= 'http://SU IP/proyecto/';
    application\config\database.php
        $db['default']['hostname'] = 'SU IP';
