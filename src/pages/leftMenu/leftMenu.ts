import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Events } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { TabListaAddPacientesPage } from '../pacientes/tabListaAddPacientes/tabListaAddPacientes';

@Component({
	selector: 'page-left-menu',
	templateUrl: 'leftMenu.html'
})
export class LeftMenuPage {

	rootPage;

	usuarioLogado;
	imagem;
	nome;
	sobrenome;

	//Variaveis de Menu
	agendaAtivo = false;
	pacientesAtivo = true;
	perfilAtivo = false;
	subUsuariosAtivo = false;
	configuracoesAtivo = false;

	constructor(public navCtrl: NavController, public events: Events) {
		events.subscribe('SetDadosUsuarioMenu', () => {
	      this.SetDadosUsuarioMenu();
	    });

		this.VerificaUsuarioLogado();
	}

	VerificaUsuarioLogado(){
		if(sessionStorage.getItem('usuarioLogado') == null){
			this.rootPage = LoginPage;
		}else{
			this.SetDadosUsuarioMenu();
			this.rootPage = TabListaAddPacientesPage;
		}
	}

	SetDadosUsuarioMenu(){
		this.usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
		this.imagem = this.usuarioLogado[0].imagem_perfil;
		this.nome = this.usuarioLogado[0].nome;
		this.sobrenome = this.usuarioLogado[0].sobrenome;
	}

	LogoutUsuario(){
		sessionStorage.clear();
		if(this.rootPage == LoginPage){
			this.rootPage = LeftMenuPage;
		}else{
			this.rootPage = LoginPage;
		}
	}

}
