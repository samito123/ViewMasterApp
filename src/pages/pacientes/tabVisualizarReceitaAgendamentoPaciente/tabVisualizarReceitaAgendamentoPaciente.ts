import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavParams } from 'ionic-angular';

import { VisualizarPacientesPage } from '../visualizarPacientes/visualizarPacientes';

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

	//url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.idPaciente = navParams.get("idPaciente");

		this.tab1 = VisualizarPacientesPage;
		this.tab2 = VisualizarPacientesPage;
		
		this.titulo = "Paciente";
	}

}
