import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
	selector: 'page-visualizar-pacientes',
	templateUrl: 'visualizarPacientes.html',
})
export class VisualizarPacientesPage {

	idPaciente;
	paciente = {};
	imagemPaciente = "./assets/icon/perfil.png";
	
	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
		
		this.idPaciente = navParams.get("idPaciente");
		this.InicializaVisualizacaoDePaciente();
	}

	InicializaVisualizacaoDePaciente(){
		this.InicializarLoading();
		this.BuscaPacienteId();	
	}

	BuscaPacienteId() {
	    var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_vm_app', senha: 'kD91(w0E1VlM', banco: 'appot240_view_master_app', 
			idPaciente: this.idPaciente
	    }
	    
		this.http.post(this.url+'pacientes/consulta_paciente_id.php', postParams, options)
			.subscribe(data => {
				this.TrataRetornoServidorBuscaPacienteId(JSON.parse(data['_body']));
			}, error => {
				console.log(error);
		});
	}

	TrataRetornoServidorBuscaPacienteId(data){
		this.SetDadosPaciente(data);
		this.EncerraLoading();
	}

	SetDadosPaciente(data){
		this.paciente['id'] = data[0].id;
		this.imagemPaciente = data[0].imagem_paciente;
		this.paciente['nome'] = data[0].nome;
		this.paciente['sobrenome'] = data[0].sobrenome;
		this.paciente['telefone'] = data[0].telefone;
		this.paciente['dataDeNascimento'] = data[0].data_de_nascimento;
		this.paciente['email'] = data[0].email;

		this.paciente['rua'] = data[0].rua;
		this.paciente['bairro'] = data[0].bairro;
		this.paciente['numero'] = data[0].numero;
		this.paciente['complemento'] = data[0].complemento;
		this.paciente['cep'] = data[0].cep;
		this.paciente['cidade'] = data[0].cidade;
		this.paciente['estado'] = data[0].estado;
	}

	AlterarDado(campo, exemplo, qtdCaracteres, tipoFormatacao){
		let prompt = this.alertCtrl.create({
			title: 'Editar '+campo,
			message: "Digite o valor que desejado com até "+qtdCaracteres+" caracteres.",
			inputs: [
				{
					name: campo,
					placeholder: exemplo,
				},
			],
	      	buttons: [
				{
					text: 'Cancelar',
					handler: data => {
						
					}
				},
        		{
					text: 'Salvar',
					handler: data => {
						var texto = this.FormataTipo(tipoFormatacao, 
						data[campo].substring(0 , qtdCaracteres));
						this.ConfirmaEdicaoPaciente(campo, qtdCaracteres, texto);
					}
				}
	      	]
	    });
	    prompt.present();
	}

	ConfirmaEdicaoPaciente(campo, qtdCaracteres, texto){
		let confirm = this.alertCtrl.create({
			title: 'Confirmar edição?',
			message: campo+": "+texto,
	      	buttons: [
				{
					text: 'Não',
					handler: data => {
						
					}
				},
        		{
					text: 'Sim',
					handler: data => {
						this.InicializarLoading();
						this.paciente[campo] = texto;
						this.EditarPaciente(campo, texto);
					}
				}
	      	]
	    });
	    confirm.present();
	}

	FormataTipo(tipoFormatacao, texto){
		var textoFormatado;
		switch(tipoFormatacao) {
		    case "FormataNomes":
		        textoFormatado = this.FormataNomes(texto);
		        break;
		}
		return textoFormatado;
	}

	FormataNomes(texto) {
		try{
			var words = texto.toLowerCase().split(" ");
		    for (var a = 0; a < words.length; a++) {
		        var w = words[a];
		        if(words[a].length> 2){
		        	words[a] = w[0].toUpperCase() + w.slice(1);
		        }
		    }
		    return words.join(" ");
	    }catch(e){

		}
	}

	EditarPaciente(campo, texto){
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_vm_app', senha: 'kD91(w0E1VlM', banco: 'appot240_view_master_app', 
			paciente: JSON.stringify(this.paciente)
	    }
	    
		this.http.post(this.url+'pacientes/editar_paciente_id.php', postParams, options)
			.subscribe(data => {
				console.log(data['_body']);
				this.EncerraLoading();
			}, error => {
				console.log(error);// Error getting the data
		});
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
