import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

@Component({
	selector: 'page-adicionar-receita',
	templateUrl: 'adicionarReceita.html'
})
export class AdicionarReceitaPage {

	receitaForm = {};
	titulo;

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
		this.titulo = "Nova Receita";
		this.receitaForm['nome'] = "Samuel";
		this.receitaForm['sobrenome'] = "Pinheiro";
		this.receitaForm['rx'] = "Não";
	}

	SalvarReceita(){

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
