import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavParams } from 'ionic-angular';

import { ListaPacientesPage } from '../../listaPacientes/listaPacientes';
import { AdicionarPacientesPage } from '../../adicionarPacientes/adicionarPacientes';

@Component({
	selector: 'page-tab-lista-add-pacientes',
	templateUrl: 'tabListaAddPacientes.html'
})
export class TabListaAddPacientesPage {

	titulo;

	tab1: any;
	tab2: any;
	tab3: any;

	//url = 'http://br400.teste.website/~appot240/for_you_to_remember_me/';
	loader;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.tab1 = ListaPacientesPage;
		this.tab2 = AdicionarPacientesPage;
		
		this.titulo = "Pacientes";
	}

}
