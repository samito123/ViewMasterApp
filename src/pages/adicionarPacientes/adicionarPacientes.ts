import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
	selector: 'page-adicionar-pacientes',
	templateUrl: 'adicionarPacientes.html',
})
export class AdicionarPacientesPage {

	pacienteForm = {};
	imagemPaciente = "./assets/icon/perfil.png";
	
	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public http: Http, public camera: Camera) {
		
	}

	TirarFoto(){
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.PNG,
			mediaType: this.camera.MediaType.PICTURE,
			targetWidth: 350,
		}

		this.camera.getPicture(options).then((imageData) => {
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.imagemPaciente = base64Image;
		}, (err) => {

		});
	}

	SalvarImagemServidor(){
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_vm_app', senha: 'kD91(w0E1VlM', banco: 'appot240_view_master_app', 
			foto: this.imagemPaciente 
	    }
	    
		this.http.post(this.url+'pacientes/salvar_img_paciente.php', postParams, options)
			.subscribe(data => {	
				this.EncerraLoading();
			}, error => {
				console.log(error);// Error getting the data
		});
	}

	SalvarPaciente(){
		this.InicializarLoading();
		this.TrataImagemDePerfil();
		this.TransformaDataParaFormatoDoBancoDeDados();
		this.InserePaciente();
	}

	TrataImagemDePerfil(){
		if(this.imagemPaciente === "./assets/icon/perfil.png"){
			this.imagemPaciente = "perfil"; 
		}
	}

	TransformaDataParaFormatoDoBancoDeDados(){
		try{
			this.pacienteForm['dataDeNascimento'] = new Date(
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
			foto: this.imagemPaciente, paciente: JSON.stringify(this.pacienteForm)
	    }
	    
		this.http.post(this.url+'pacientes/insere_paciente.php', postParams, options)
			.subscribe(data => {
				//console.log(data['_body']);
				this.TrataRetornoServidor(data['_body']);
				//this.EncerraLoading();
			}, error => {
				console.log(error);// Error getting the data
				this.EncerraLoading();
		});
	}

	TrataRetornoServidor(data){
		console.log(data);
		this.LimpaFormulario();
		this.EncerraLoading();
	}

	LimpaFormulario(){
		this.LimparImagem();
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

	LimparImagem(){
		this.imagemPaciente = "./assets/icon/perfil.png";
	}

	LimparCampoForm(campo){
		this.pacienteForm[campo] = "";
	}

	onFocusMethod(text){
		console.log(text);
	}

	MaskTelefone(campo, texto){
		try{
			this.pacienteForm[campo] = texto.replace( /\D/g, '' )
	       	.replace( /^(\d\d)(\d)/g, '($1) $2' )
	       	.replace( /(\d{5})(\d)/, '$1-$2' );
   		}catch(e){

		}
	}

	MaskData(campo, texto){
		try{
			this.pacienteForm[campo] = texto.replace( /\D/g, '' )
	       	.replace( /^(\d\d)(\d)/g, '$1/$2' )
	       	.replace( /(\d\d)(\d)/, '$1/$2' );
   		}catch(e){

		}
	}

	MaskCep(campo, texto){
		try{
			this.pacienteForm[campo] = texto.replace( /\D/g, '' )
	       	.replace( /^(\d{5})(\d)/g, '$1-$2')
   		}catch(e){

		}
	}

	FormataNomes(campo, texto) {
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

	FormataUpperCase(campo, texto){
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

}
