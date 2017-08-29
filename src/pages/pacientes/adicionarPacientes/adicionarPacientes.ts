import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
//import { Platform } from 'ionic-angular';

@Component({
	selector: 'page-adicionar-pacientes',
	templateUrl: 'adicionarPacientes.html',
})
export class AdicionarPacientesPage {

	pacienteForm = {};
	
	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public http: Http, public toastCtrl: ToastController, 
		public events: Events) {
		
		//this.pacienteForm['img'] = "./assets/icon/perfil.png";
	}

	/*TirarFoto(){
		var width;
		var heigth;

		if(this.platform.is('core')){
			width = 200;
			heigth = 200;
		}else{
			width = 1000;
			heigth = 1000;
		}

		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.PNG,
			mediaType: this.camera.MediaType.PICTURE,
			targetWidth: 350,
		}

		this.camera.getPicture(options).then((imageData) => {
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.pacienteForm['img'] = base64Image;
		}, (err) => {

		});
	}*/

	SalvarPaciente(){
		this.InicializarLoading();
		this.SetFkUsuarioPaciente();
		//this.TrataImagemDePerfil();
		this.TransformaDataParaFormatoDoBancoDeDados();
		this.InserePaciente();
	}

	SetFkUsuarioPaciente(){
		var usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
		this.pacienteForm['fk_usuario'] = usuario[0].id;
	}

	/*TrataImagemDePerfil(){
		if(this.pacienteForm['img'] === "./assets/icon/perfil.png"){
			this.pacienteForm['imagemPacienteBase64'] = "perfil"; 
		}else {
			this.pacienteForm['imagemPacienteBase64'] = this.pacienteForm['img'];
		}
	}*/

	TransformaDataParaFormatoDoBancoDeDados(){
		try{
			this.pacienteForm['dataDeNascimentoBanco'] = new Date(
			this.pacienteForm['dataDeNascimento'].substring(6,10),
			this.pacienteForm['dataDeNascimento'].substring(3,5) - 1,
			this.pacienteForm['dataDeNascimento'].substring(0,2));
		} catch(e){

		}
	}

	InserePaciente(){
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_vm_app', senha: 'kD91(w0E1VlM', banco: 'appot240_view_master_app', 
			paciente: JSON.stringify(this.pacienteForm)
	    }
	    
		this.http.post(this.url+'pacientes/insere_paciente.php', postParams, options)
			.subscribe(data => {
				this.TrataRetornoServidor(data['_body']);
			}, error => {
				console.log(error);
				this.EncerraLoading();
		});
	}

	TrataRetornoServidor(data){
		this.Toast(data);
		if(data !== "Paciente com nome e sobrenome informado já está cadastrado!")
		this.LimpaFormulario();
		this.EncerraLoading();
		this.events.publish('BuscarPacientesPorFiltro');
	}

	LimpaFormulario(){
		//this.LimparImagem();
		this.LimparCampoForm('nome');
		this.LimparCampoForm('sobrenome');
		this.LimparCampoForm('telefone');
		this.LimparCampoForm('dataDeNascimento');
		this.LimparCampoForm('email');

		this.LimparCampoForm('rua');
		this.LimparCampoForm('bairro');
		this.LimparCampoForm('numero');
		this.LimparCampoForm('complemento');
		this.LimparCampoForm('cep');
		this.LimparCampoForm('cidade');
		this.LimparCampoForm('estado');
	}

	/*LimparImagem(){
		this.pacienteForm['img'] = "./assets/icon/perfil.png";
	}*/

	LimparCampoForm(campo){
		this.pacienteForm[campo] = "";
	}

	FormataTelefone(campo, texto){
		try{
			this.pacienteForm[campo] = texto.replace( /\D/g, '' )
	       	.replace( /^(\d\d)(\d)/g, '($1) $2' )
	       	.replace( /(\d{5})(\d)/, '$1-$2' );
   		}catch(e){

		}
	}

	FormataData(campo, texto){
		try{
			this.pacienteForm[campo] = texto.replace( /\D/g, '' )
	       	.replace( /^(\d\d)(\d)/g, '$1/$2' )
	       	.replace( /(\d\d)(\d)/, '$1/$2' );
   		}catch(e){

		}
	}

	FormataCep(campo, texto){
		try{
			this.pacienteForm[campo] = texto.replace( /\D/g, '' )
	       	.replace( /^(\d{5})(\d)/g, '$1-$2')
   		}catch(e){

		}
	}

	FormataNome(campo, texto) {
		try{
			var words = texto.toLowerCase().split(" ");
		    for (var a = 0; a < words.length; a++) {
		        var w = words[a];
		        if(words[a].length> 2){
		        	words[a] = w[0].toUpperCase() + w.slice(1);
		        }
		    }
		    this.pacienteForm[campo] = words.join(" ");
	    }catch(e){

		}
	}

	FormataSigla(campo, texto){
		try{
			this.pacienteForm[campo] = texto.toUpperCase();
		}catch(e){

		}
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

	Toast(mensagem) {
		let toast = this.toastCtrl.create({
			message: mensagem,
			showCloseButton: true,
      		closeButtonText: 'Ok'
		});
		toast.present();
	}

}
