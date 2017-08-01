import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { PacientesPage } from '../pacientes/pacientes';

@Component({
	selector: 'page-principal',
	templateUrl: 'principal.html'
})
export class PrincipalPage {

	rootPage;

	usuarioLogado;
	nome;
	sobrenome;

	//Variaveis de Menu
	agendaAtivo = false;
	pacientesAtivo = true;

	agendaNaoAtivo = true;
	pacientesNaoAtivo = false;

	constructor(public navCtrl: NavController) {
		this.VerificaUsuarioLogado();
	}

	VerificaUsuarioLogado(){
		if(sessionStorage.getItem('usuarioLogado') == null){
			this.rootPage = LoginPage;
		}else{
			this.SetDadosUsuarioMenu();
			this.rootPage = PacientesPage;
		}
	}

	SetDadosUsuarioMenu(){
		this.usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));
		this.nome = this.usuarioLogado[0].nome;
		this.sobrenome = this.usuarioLogado[0].sobrenome;
		//this.emailUsuario = this.usuarioLogado[0].email_usuario;
	}

}
