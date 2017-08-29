import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';

@Component({
	selector: 'page-listar-receitas',
	templateUrl: 'listarReceitas.html'
})
export class ListarReceitasPage {

	pesquisar;
	listaDePacientes = [];
	imagemExpandida;
	offset = 0;
	idUsuario;

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public http: Http, public events: Events) {
		
		
	}

	CarregaLista(){
		this.InicializarLoading();
		this.BuscaListaDePacientes();	
	}

	BuscaListaDePacientes() {
	    var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_vm_app', senha: 'kD91(w0E1VlM', banco: 'appot240_view_master_app', 
			pesquisar: this.pesquisar, offset: this.offset, limit: false,
			fk_usuario: this.idUsuario
	    }
	    
		this.http.post(this.url+'pacientes/consulta_lista_de_pacientes.php', postParams, options)
			.subscribe(data => {
				this.TrataRetornoServidor(data)
			}, error => {
				console.log(error);
		});
	}

	TrataRetornoServidor(data){
		this.listaDePacientes = JSON.parse(data['_body']);
		this.offset = this.listaDePacientes.length;
		this.EncerraLoading();
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
