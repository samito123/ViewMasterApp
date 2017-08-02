import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

//import { PacientesPage } from '../tabs/pacientes/pacientes';
//import { ListaPacientesPage } from '../listaPacientes/listaPacientes';
import { TabListaAddPacientesPage } from '../tabs/tabListaAddPacientes/tabListaAddPacientes';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	usuarioForm = {login: '', senha: ''};
	usuarioRetornado: any;	

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;
	alert;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
		public http: Http, public alertCtrl: AlertController, public events: Events) {
		
	}

	LogarUsuario(){
		this.InicializarLoading();
		this.VerificaLoginUsuario();
	}

	VerificaLoginUsuario(){
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_vm_app', senha: 'kD91(w0E1VlM', banco: 'appot240_view_master_app', 
			loginUsuario: this.usuarioForm.login, senhaUsuario: this.usuarioForm.senha
	    }
	    
		this.http.post(this.url+'usuarios/verifica_login.php', postParams, options)
			.subscribe(data => {
				this.TrataRetornoServidor(data);
			}, error => {
				this.ShowAlert("Ocorreu um erro!", "Erro: "+error);
				this.EncerraLoading();
		});
	}

	TrataRetornoServidor(data){
		try {
		    this.usuarioRetornado = JSON.parse(data['_body']);
			this.VerificaUsuarioRetornado();
		}catch(err) {
		   	this.ShowAlert("Login incorreto!", 
				"Verifique se o usuário está correto é digite novamente a sua senha");
			this.usuarioForm.senha = "";
			this.EncerraLoading();
			console.log("Erro - TrataRetornoServidor: "+ err);
		}
	}

	VerificaUsuarioRetornado(){
		if(this.usuarioRetornado.length == 0){
			this.ShowAlert("Login incorreto!", 
				"Verifique se o usuário está correto é digite novamente a sua senha");
			this.usuarioForm.senha = "";
			this.EncerraLoading();
		}else{
			this.SalvaSessaoDeUsuario();
		}
	}

	SalvaSessaoDeUsuario(){
		sessionStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioRetornado));
		this.EncerraLoading();
		this.events.publish('SetDadosUsuarioMenu');
		this.RedirecionaParaListaDePacientes();
	}

	RedirecionaParaListaDePacientes(){
  		this.navCtrl.setRoot(TabListaAddPacientesPage);
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

	ShowAlert(titulo, subTitulo) {
		this.alert = this.alertCtrl.create({
			title: titulo,
			subTitle: subTitulo,
			buttons: ['OK']
			});
		this.alert.present();
	}

}
