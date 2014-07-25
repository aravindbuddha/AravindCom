<?php
class Loader {
	private $controller;
	private $action;
	private $urlvalues;
	
	//store the URL values on object creation
	public function __construct($urlvalues) {
		$this->urlvalues = $urlvalues;
		if ($this->urlvalues['controller'] == "") {
			$this->controller = "home";
		} else {
			$this->controller = $this->urlvalues['controller'];
			$this->loadClass();
		}
		if ($this->urlvalues['action'] == "") {
			$this->action = "index";
		} else {
			$this->action = $this->urlvalues['action'];
		}
	}
	public function loadClass(){
		$class=strtolower($this->controller);
	  $path='../controllers/'.$class.'/'.ucfirst($class).'.php';
		if(file_exists('init.php')){
			include($path);
		}
		
	}
	//establish the requested controller as an object
	public function CreateController() {
		//does the class exist?
		if (class_exists($this->controller)) {
			$parents = class_parents($this->controller);
			//does the class extend the controller class?
			if (in_array("BaseController",$parents)) {
				//does the class contain the requested method?
				if (method_exists($this->controller,$this->action)) {
					return new $this->controller($this->action,$this->urlvalues);
				} else {
					//bad method error
					return new Error("badUrl",$this->urlvalues);
				}
			} else {
				//bad controller error
				return new Error("badUrl",$this->urlvalues);
			}
		} else {
			//bad controller error
			//return new Error("badUrl",$this->urlvalues);
			echo "class don't not exits";
		}
	}
}