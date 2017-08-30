import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-adicionar-receita',
	templateUrl: 'adicionarReceita.html'
})
export class AdicionarReceitaPage {

	receitaForm = {};
	titulo;

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public alertCtrl: AlertController) {
		this.titulo = "Nova Receita";
		this.receitaForm['nome'] = "Samuel";
		this.receitaForm['sobrenome'] = "Pinheiro";
		this.receitaForm['rx'] = "Não";
	}

	LimparCampoForm(campo){
		this.receitaForm[campo] = "";
	}

	ConfirmacaoLimparTabela(){
		let prompt = this.alertCtrl.create({
			title: 'Limpar Tabela',
			message: "Deseja realmente limpar os campos da tabela?",
	      	buttons: [
				{
					text: 'Não'
				},
        		{
					text: 'Sim',
					handler: data => {
						this.LimparCamposTabela();
					}
				}
	      	]
	    });
	    prompt.present();
	}

	LimparCamposTabela(){
		this.receitaForm['odEsf'] = "";
		this.receitaForm['odCil'] = "";
		this.receitaForm['odEixo'] = "";
		this.receitaForm['odAv'] = "";

		this.receitaForm['oeEsf'] = "";
		this.receitaForm['oeCil'] = "";
		this.receitaForm['oeEixo'] = "";
		this.receitaForm['oeAv'] = "";
	}

	FormataData(campo, texto){
		try{
			this.receitaForm[campo] = texto.replace( /\D/g, '' )
	       	.replace( /^(\d\d)(\d)/g, '$1/$2' )
	       	.replace( /(\d\d)(\d)/, '$1/$2' );
   		}catch(e){

		}
	}

	FormataNome(campo, texto) {
		try{
			var words = texto.toLowerCase().split(" ");
		    for (var a = 0; a < words.length; a++) {
		        var w = words[a];
		        if(words[a].length> 2){
		        	words[a] = w[0].toUpperCase() + w.slice(1);
		        }
		    }
		    this.receitaForm[campo] = words.join(" ");
	    }catch(e){

		}
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
