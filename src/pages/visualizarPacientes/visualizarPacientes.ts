import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Events } from 'ionic-angular';

@Component({
	selector: 'page-visualizar-pacientes',
	templateUrl: 'visualizarPacientes.html',
})
export class VisualizarPacientesPage {

	idPaciente;
	paciente = {};
	
	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public navParams: NavParams, public http: Http, 
		public camera: Camera, public alertCtrl: AlertController,
		public toastCtrl: ToastController, public events: Events) {
		
		this.paciente['img'] = "./assets/icon/perfil.png";
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
		this.paciente['img'] = data[0].imagem_paciente;
		this.paciente['imagemPaciente'] = data[0].imagem_paciente;

		this.paciente['caminhoFoto'] = 
		'http://br400.teste.website/~appot240/view_master_app/pacientesImg/';
		this.paciente['nomeFoto'] = data[0].imagem_paciente.replace(
			'http://br400.teste.website/~appot240/view_master_app/pacientesImg/',"");

		this.paciente['nomeFotoFinal'] = data[0].imagem_paciente.replace(
			'http://br400.teste.website/~appot240/view_master_app/pacientesImg/',"");

		this.paciente['nome'] = data[0].nome;
		this.paciente['sobrenome'] = data[0].sobrenome;
		this.paciente['telefone'] = data[0].telefone;
		this.paciente['dataDeNascimento'] = 
		this.SetDataDeNascimento(data[0].data_de_nascimento);
		this.paciente['email'] = data[0].email;

		this.paciente['rua'] = data[0].rua;
		this.paciente['bairro'] = data[0].bairro;
		this.paciente['numero'] = data[0].numero;
		this.paciente['complemento'] = data[0].complemento;
		this.paciente['cep'] = data[0].cep;
		this.paciente['cidade'] = data[0].cidade;
		this.paciente['estado'] = data[0].estado;
	}

	SetDataDeNascimento(valor){
		if(valor !== "0000-00-00"){
			return valor.substring(8, 10)+'/'+valor.substring(5,7)
			+'/'+valor.substring(0, 4);
		}else{
			return "0000-00-00";
		}
	}

	TirarFoto(){
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.PNG,
			//mediaType: this.camera.MediaType.PICTURE,
			targetWidth: 1000,
			targetHeight: 1000
		}

		this.camera.getPicture(options).then((imageData) => {
			let base64Image = 'data:image/png;base64,' + imageData;
			this.paciente['img'] = base64Image;
			this.FormaNovoCaminhoFoto();
			
		}, (err) => {
			this.FormaNovoCaminhoFoto();
		});
	}

	LimparImagem(){
		this.paciente['img'] = "./assets/icon/perfil.png";
		this.paciente['nomeFotoFinal'] = "perfil.png";
	}

	FormaNovoCaminhoFoto(){
		var data = new Date();
		var stringData = data.toLocaleString();
		stringData = stringData.replace('/', '-').replace('/', '-')
		.replace('/', '-').replace(' ', '');

		this.paciente['nomeFotoFinal'] = this.paciente['nome']+stringData+".png";
	}

	EditarDado(campo, exemplo, qtdCaracteres, Formatacao, tipo){
		let prompt = this.alertCtrl.create({
			title: 'Editar '+campo,
			message: "Digite o valor que desejado com até "+qtdCaracteres+" caracteres.",
			inputs: [
				{
					name: campo,
					placeholder: exemplo,
					//value: this.paciente[campo],
					type: tipo,
					max: '3'
				},
			],
	      	buttons: [
				{
					text: 'Cancelar',
					handler: data => {
						
					}
				},
        		{
					text: 'Editar',
					handler: data => {
						this.ValidaEdicaoDeDado(campo, exemplo, 
						qtdCaracteres, Formatacao, tipo, data[campo]);
					}
				}
	      	]
	    });
	    prompt.present();
	}

	ValidaEdicaoDeDado(campo, exemplo, qtdCaracteres, Formatacao, tipo, data){
		if(campo === "nome" && data.length == 0){
			this.Toast('O campo nome não pode ser vazio!');
			this.EditarDado(campo, exemplo, qtdCaracteres, Formatacao, tipo);
		}else if(campo === "sobrenome" && data.length == 0){
			this.Toast('O campo sobrenome não pode ser vazio!');
			this.EditarDado(campo, exemplo, qtdCaracteres, Formatacao, tipo);
		}else if(data.length > qtdCaracteres){
			this.Toast('A quantidade de caracteres ultrapassou o '+
				'limite permitido. Limite: '+qtdCaracteres+' caracteres.');
			this.EditarDado(campo, exemplo, qtdCaracteres, Formatacao, tipo);
		}else {
			var texto
			if(data.length > 1){
				texto = this.FormataTipo(Formatacao, data);
			}else{
				texto = 'Não Informado';
			}	
			this.ConfirmaEdicaoDeDadosPaciente(campo, qtdCaracteres, texto);
		}
	}

	ConfirmaEdicaoDeDadosPaciente(campo, qtdCaracteres, texto){
		let confirm = this.alertCtrl.create({
			title: 'Confirmar edição?',
			message: this.FormataMensagemDeConfirmacao(campo, texto),
	      	buttons: [
				{
					text: 'Não',
					handler: data => {
						
					}
				},
        		{
					text: 'Sim',
					handler: data => {
						this.paciente[campo] = texto;
					}
				}
	      	]
	    });
	    confirm.present();
	}

	FormataMensagemDeConfirmacao(campo, texto){
		var textoFormatado;
		switch(campo) {
		    case "nome":
		        textoFormatado = 'Nome: '+texto;
		        break;

	        case "sobrenome":
		        textoFormatado = 'Sobrenome: '+texto;
		        break;

	        case "telefone":
		        textoFormatado = 'Telefone: '+texto;
		        break;

	        case "dataDeNascimento":
		        textoFormatado = 'Dt. Nascimento: '+texto;
		        break;

	        case "email":
		        textoFormatado = 'Email: '+texto;
		        break;

	        case "rua":
		        textoFormatado = 'Rua/Avenida: '+texto;
		        break;

	        case "bairro":
		        textoFormatado = 'Bairro: '+texto;
		        break;

	        case "numero":
		        textoFormatado = 'Número: '+texto;
		        break;

	        case "complemento":
		        textoFormatado = 'Complemento: '+texto;
		        break;

	        case "cep":
		        textoFormatado = 'Cep: '+texto;
		        break;

	        case "cidade":
		        textoFormatado = 'Cidade: '+texto;
		        break;

        	case "estado":
		        textoFormatado = 'Estado: '+texto;
		        break;
	    }
	    return textoFormatado;
	}

	FormataTipo(Formatacao, texto){
		var textoFormatado;
		switch(Formatacao) {
		    case "FormataNome":
		        textoFormatado = this.FormataNome(texto);
		        break;

	        case "FormataTelefone":
		        textoFormatado = this.FormataTelefone(texto);
		        break;

		    case "FormataData":
		        textoFormatado = this.FormataData(texto);
		        break;
		        
	        case "FormataCep":
		        textoFormatado = this.FormataCep(texto);
		        break;   

	        case "FormataSigla":
		        textoFormatado = this.FormataSigla(texto);
		        break; 
		}
		return textoFormatado;
	}

	FormataNome(texto) {
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

	FormataTelefone(texto){
		try{
			return texto.replace( /\D/g, '' )
	       	.replace( /^(\d\d)(\d)/g, '($1) $2' )
	       	.replace( /(\d{5})(\d)/, '$1-$2' );
   		}catch(e){

		}
	}

	FormataData(texto){
		try{
			return texto.replace( /\D/g, '' )
	       	.replace( /^(\d\d)(\d)/g, '$1/$2' )
	       	.replace( /(\d\d)(\d)/, '$1/$2' );
   		}catch(e){

		}
	}

	FormataCep(texto){
		try{
			return texto.replace( /\D/g, '' )
	       	.replace( /^(\d{5})(\d)/g, '$1-$2')
   		}catch(e){

		}
	}

	FormataSigla(texto){
		try{
			return texto.toUpperCase();
		}catch(e){

		}
	}

	ConfirmaEditarPaciente(){
		let confirm = this.alertCtrl.create({
			title: 'Alterar dados',
			message: 'Deseja realmente alterar os dados do paciente?',
	      	buttons: [
				{
					text: 'Não',
					handler: data => {
						
					}
				},
        		{
					text: 'Sim',
					handler: data => {
						this.PreparaAlterarPaciente();
					}
				}
	      	]
	    });
	    confirm.present();
	}

	PreparaAlterarPaciente(){
		this.InicializarLoading();
		this.FormataPacienteParaServidor();
		this.EditarPaciente();
	}

	FormataPacienteParaServidor(){	
		this.FormataFoto();	
		this.FormataEspacos('nome');
		this.FormataEspacos('sobrenome');
		this.FormataEspacos('telefone');
		this.FormataEspacos('dataDeNascimento');
		this.TransformaDataParaFormatoDoBancoDeDados();
		this.FormataEspacos('email');
		
		this.FormataEspacos('rua');
		this.FormataEspacos('bairro');
		this.FormataEspacos('numero');
		this.FormataEspacos('complemento');
		this.FormataEspacos('cep');
		this.FormataEspacos('cidade');
		this.FormataEspacos('estado');
	}

	FormataFoto(){
		if(this.paciente['img'] === this.paciente['imagemPaciente']){
			this.paciente['imagemPacienteBase64'] = '0';
		}else {
			this.paciente['imagemPacienteBase64'] = this.paciente['img'];
		}
	}

	FormataEspacos(campo){
		this.paciente[campo] = this.paciente[campo].trim();
	}

	TransformaDataParaFormatoDoBancoDeDados(){
		try{
				if(this.paciente['dataDeNascimento'] !== "Não Informado"){
					this.paciente['dataDeNascimentoBanco'] = new Date(
					this.paciente['dataDeNascimento'].substring(6,10),
					this.paciente['dataDeNascimento'].substring(3,5) - 1,
					this.paciente['dataDeNascimento'].substring(0,2));
				} else{
					this.paciente['dataDeNascimentoBanco'] = '0000-00-00';
				}	
		} catch(e){

		}
	}

	EditarPaciente(){
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_vm_app', senha: 'kD91(w0E1VlM', banco: 'appot240_view_master_app', 
			paciente: JSON.stringify(this.paciente)
	    }
	    
		this.http.post(this.url+'pacientes/editar_paciente_id.php', postParams, options)
			.subscribe(data => {
				this.TrataRetornoServidorEditarPaciente(data['_body']);
			}, error => {
				console.log(error);
		});
	}

	TrataRetornoServidorEditarPaciente(data){
		this.Toast(data);
		this.paciente['nomeFoto'] = this.paciente['nomeFotoFinal'];
		this.EncerraLoading();
		this.events.publish('BuscarPacientesPorFiltro');
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
			duration: 3500
		});
		toast.present();
	}

}
