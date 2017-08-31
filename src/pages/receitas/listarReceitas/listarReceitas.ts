import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';

@Component({
	selector: 'page-listar-receitas',
	templateUrl: 'listarReceitas.html'
})
export class ListarReceitasPage {

	idPaciente;

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public loadingCtrl: LoadingController,public http: Http, 
		public events: Events) {
		
		this.idPaciente = this.navParams.data;
		//console.log(this.idPaciente);
	}

	CarregaLista(){
		this.InicializarLoading();
		//this.BuscaListaDePacientes();	
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
