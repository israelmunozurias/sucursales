<?php
use \Illuminate\Database\Eloquent\Model as Eloquent;

class Productos_model extends Eloquent{
    protected $table = 'productos';

    protected $fillable = [
        'id',
        'clave',
        'nombre',
        'idlinea',
        'idsublinea',
        'idunidad',
        'fechaalta',
        'tipo',
        'stockmax',
        'stockmin',
        'activo',
        'idmarca',
        'url_imagen'
    ];
}