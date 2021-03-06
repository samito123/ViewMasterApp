import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';

import { App } from 'ionic-angular';
import { TabVisualizarReceitaAgendamentoPacientePage } from '../tabVisualizarReceitaAgendamentoPaciente/tabVisualizarReceitaAgendamentoPaciente';

@Component({
	selector: 'page-lista-pacientes',
	templateUrl: 'listaPacientes.html'
})
export class ListaPacientesPage {

	pesquisar;
	listaDePacientes = [];
	imagemExpandida;
	offset = 0;
	idUsuario;

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public http: Http, private app: App, public events: Events) {
		
		events.subscribe('BuscarPacientesPorFiltro', () => {
		  this.BuscarPacientesPorFiltro();
		});
		this.SetIdUsuario();
		this.CarregaLista();
	}

	SetIdUsuario(){
		var usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
		this.idUsuario = usuario[0].id;
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

	VisualizarPaciente(id){
		//this.app.getRootNavs()[0].push(VisualizarPacientesPage, {idPaciente: id});
		this.app.getRootNavs()[0].push(
		TabVisualizarReceitaAgendamentoPacientePage, {idPaciente: id});
	}

	LimparCampoDePesquisa(){
		this.pesquisar = "";
	}

	BuscarPacientesPorFiltro(){
		this.InicializarLoading();
		this.offset = 0;
		this.listaDePacientes = [];
		this.BuscaListaDePacientes();
	}

	/*ExpandirImagem(imagem){
		this.imagemExpandida = imagem;
		this.FadeIn(document.querySelector(
			'.divImagemExpandidaPacientes'), "inline-block");
	}

	FecharImagemExpandida(){
		this.FadeOut(document.querySelector('.divImagemExpandidaPacientes'));
	}

	FadeOut(elemento){
		elemento.style.opacity = 1;
		(function fade() {
			if ((elemento.style.opacity -= .1) < 0) {
				elemento.style.display = "none";
			} else {
				requestAnimationFrame(fade);
			}
		})();
	}

	FadeIn(elemento, display){
		elemento.style.opacity = 0;
		elemento.style.display = display || "block";
		(function fade() {
			var val = parseFloat(elemento.style.opacity);
			if (!((val += .1) > 1)) {
				elemento.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	}*/

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
