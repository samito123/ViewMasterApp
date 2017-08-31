import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { VisualizarPacientesPage } from '../visualizarPacientes/visualizarPacientes';
import { ListarReceitasPage } from '../../receitas/listarReceitas/listarReceitas';
import { AdicionarReceitaPage } from '../../receitas/adicionarReceita/adicionarReceita';

@Component({
	selector: 'page-tab-visualizar-receita-agendamento-paciante',
	templateUrl: 'tabVisualizarReceitaAgendamentoPaciente.html'
})
export class TabVisualizarReceitaAgendamentoPacientePage {

	titulo;

	tab1: any;
	tab2: any;
	tab3: any;

	idPaciente;
	
	constructor(public navCtrl: NavController, public navParams: NavParams,
		public events: Events, public alertCtrl: AlertController,
		public toastCtrl: ToastController, private app: App) {
		
		events.subscribe('SetTituloVisualizarReceitaAgendamentoPaciente', (titulo) => {
		  this.SetTituloVisualizarReceitaAgendamentoPaciente(titulo);
		});

		this.idPaciente = navParams.get("idPaciente");
		this.tab1 = VisualizarPacientesPage;
		this.tab2 = ListarReceitasPage;
	}

	SetTituloVisualizarReceitaAgendamentoPaciente(titulo){
		this.titulo = titulo;
	}

	HabilitaAdicionarNovaReceita(){
		document.getElementById("btnAddReceita").style.display = "block";
	}

	DesabilitaAdicionarNovaReceita(){
		document.getElementById("btnAddReceita").style.display = "none";
	}

	ConfirmaAdicionarNovaReceita(){
		let prompt = this.alertCtrl.create({
			title: 'Nova Receita',
			message: "Deseja realmente adicionar uma nova receita?",
	      	buttons: [
				{
					text: 'Não',
					handler: data => {
						
					}
				},
        		{
					text: 'Sim',
					handler: data => {
						this.ChamarAdicionarReceita();
					}
				}
	      	]
	    });
	    prompt.present();
	}

	ChamarAdicionarReceita(){
		this.app.getRootNavs()[0].push(AdicionarReceitaPage, 
		{idPaciente: this.idPaciente});
	}

	Toast(mensagem) {
		let toast = this.toastCtrl.create({
			message: mensagem,
			showCloseButton: true,
      		closeButtonText: 'Ok'
		});
		toast.present();
	}

}
