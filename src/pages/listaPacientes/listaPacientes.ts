import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
	selector: 'page-lista-pacientes',
	templateUrl: 'listaPacientes.html'
})
export class ListaPacientesPage {

	titulo;
	listaDePacientes = [];
	offset = 0;

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public http: Http) {
		
		this.titulo = "Pacientes";
		this.CarregaLista();
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
			offset: this.offset, limit: false
	    }
	    
		this.http.post(this.url+'pacientes/consulta_lista_de_pacientes.php', postParams, options)
			.subscribe(data => {
				this.listaDePacientes = JSON.parse(data['_body']);
				this.offset = this.listaDePacientes.length;
				this.EncerraLoading();
			}, error => {
				console.log(error);// Error getting the data
		});
	}

	VisualizarPaciente(id){
		console.log(id);
	}

	AbrirCampoDePesquisa(){
		console.log("Abriu");
	}

	AbrirModalNovoPaciente(){
		console.log("AbriuModal");
	}

	aaa(){
		console.log("Pesquisou");
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
