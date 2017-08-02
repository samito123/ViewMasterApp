import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
	selector: 'page-adicionar-pacientes',
	templateUrl: 'adicionarPacientes.html'
})
export class AdicionarPacientesPage {

	pacienteForm = {};

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public http: Http) {
		
	}

	LimparCampoForm(campo){
		this.pacienteForm[campo] = "";
	}

	LogarUsuario(){
		console.log("ya");
	}

	InicializarLoading() { 
		this.loader = this.loadingCtrl.create({
			content: "Carregando..."
		}); 
		this.loader.present()
	}

	EncerraLoading(){
		this.loader.dismiss();
	}

}
