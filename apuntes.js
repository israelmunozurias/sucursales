README.md
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

cambiar a eloquen
docker-compose.yml
inbox no hacer pdf usar la parte de abajp 
ben@hawky.tech
        public function ejemplos(){ 
            $this->load->model('Productos_sql_model', 'productos2');
            $users = $this->productos2->get_productos();
            echo json_encode($users);

            $this->load->model('Productos_model', 'productos');
                // SELECT
            /* $users = Productos_model::all(); */
            /* $users = $this->productos->all(); */
            /* $users = Productos_model::get(); */
            /* $users = Productos_model::find(27928); SOLO SI EN LA TABLA TIENE EL NOMBRE id*/
            /* $users = Productos_model::where('activo', 'S')->where('clave', 'CASA')->orderBy('nombre', 'desc')->take(2)->get(); */
            /* $users = Productos_model::select("SELECT * FROM productos"); */
            /* echo json_encode($users); */
            /* 
                // ADD
            Productos_model::create([
                
                'clave' => "CASA",
                'nombre' => "CASA",
                'idlinea' => 274,
                'idsublinea' => 454,
                'idunidad' => 8,
                'fechaalta' => "2020-12-22 00:00:00",
                'tipo' => "CASA",
                'stockmax' => 0,
                'stockmin' => 0,
                'activo' => "CASA",
                'idmarca' => 1,
                'url_imagen' => "CASA"
            ]); 
            */
            /* 
                // EDITAR
            $users = Productos_model::find(2);
            $users->update([
                'tipo' => "w"
            ]);
            $users->save();
            */
            /*
                // BORRAR
            Productos_model::destroy(2);
            */
                // OTROS
            /* 
                $users = User::where("estado","=",1)
                ->whereNotNull('updated_at')
                ->whereNull('email')
                ->whereIn('id', [1, 2, 3])
                ->whereBetween('edad', [1, 30])
                ->where('username','like','%ad%')
                ->orderBy('username')
                ->orderBy('created_at','desc')
                ->skip(10)->take(5)
                ->get();
            */ 
        }