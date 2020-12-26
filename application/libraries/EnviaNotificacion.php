<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class EnviaNotificacion {
	public $url = 'https://android.googleapis.com/gcm/send';
	public $indentificadorServidor = "AIzaSyCDL2p662EPyFoN9aWdMc_DCQGBybJRHaA";
	public $dispositivos = array();
	public $mensaje = "";

	function setDispositivos($listaDispositivos){	
		if(is_array($listaDispositivos)){
			$this->dispositivos = $listaDispositivos;
		} else {
			$this->dispositivos = array($listaDispositivos);
		}
	}

	function enviar($mensaje, $tipo, $serie, $folio){

		if(!is_array($this->dispositivos) || count($this->dispositivos) == 0){
			$this->error("No indicó ningun dispositivo");
		}
		
		if(strlen($this->indentificadorServidor) < 8){
			$this->error("llave del servidor no establecida");
		}
		
		$fields = array(
			'registration_ids'  => $this->dispositivos,
			'data'              => array(	"title" => "Autorizaciones Silsa", 
											"message" => $mensaje, 
											"tipo" => $tipo,
											"serie" => $serie,
											"folio" => $folio
										),
		);
		
		$headers = array( 
			'Authorization: key=' . $this->indentificadorServidor,
			'Content-Type: application/json'
		);

		$ch = curl_init();
		
		curl_setopt( $ch, CURLOPT_URL, $this->url );
		
		curl_setopt( $ch, CURLOPT_POST, true );
		curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		
		curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $fields ) );
			
		curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false);
		
		$result = curl_exec($ch);

		curl_close($ch);
		
		return $result;
	}
	
	function error($msg) {
		echo "Error al enviar notificacion";
	}
}
