<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class notificationsfcm {
	public $url = 'https://fcm.googleapis.com/fcm/send';
	public $identificadorServidor = "AAAAFiVbC5s:APA91bGUYbhd6-dkXL924ANGoKv_D2yI9BB52vtBFWm4D4ua7qIdXWTE0CZEp6u6fEfE7WeC7p-UsVAXIW0qnQUH71IJr78f5FGuVObs-SIA9RhnhwabOIzidA3Z8QI2W4V2dj7V1-MP";
	//public $identificadorServidor = "AAAAXrCCUAg:APA91bFxbedj8PPgs4GPhKFrysuqlDDWxwyPwmd5icJeU5T18SN3T5HNt0WD8WorNWLoEv5T-AlkKxZ6uHvjrDlXPEKrrGZXzjC8NxfTN1AvYA8gfayTjFBCx-9gP3jilC4y6-juf6uU";
	public $dispositivos = array();
	public $mensaje = "";

	function setDispositivos($listaDispositivos){	
		if(is_array($listaDispositivos)){
			$this->dispositivos = $listaDispositivos;
		} else {
			$this->dispositivos = array($listaDispositivos);
		}
	}

	function enviar($dispositivos){
		if(!is_array($dispositivos) || count($dispositivos) == 0){
			$this->error("No indicó ningun dispositivo");
		}

		if(strlen($this->identificadorServidor) < 8){
			$this->error("llave del servidor no establecida");
		}
		
		$message = [
			"title" => "Autorizaciones Silsa Ingenieria",
			"body" => "Nueva requisición sin autorizar."
		];

		$fields = array(
			'registration_ids'  => $dispositivos,
			'notification'      => array(	"title" => "Autorizaciones Silsa Ingenieria", 
											"body" => "Nueva requisición sin autorizar."
										),
		);
		
		$headers = array(
			'Authorization: key=' . $this->identificadorServidor,
			'Content-Type: application/json'
		);

		$ch = curl_init();
		
		curl_setopt($ch, CURLOPT_URL, $this->url);
   	 	curl_setopt($ch, CURLOPT_POST, true);
    	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
		
		
			
		curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false);
		
		$result = curl_exec($ch);
		if($result === FALSE){
			die('FCM Send Error: ' . curl_error($ch));
		}
		curl_close($ch);
		echo json_encode($result);
	}
	
	function error($msg) {
		echo "Error al enviar notificacion";
	}
}
