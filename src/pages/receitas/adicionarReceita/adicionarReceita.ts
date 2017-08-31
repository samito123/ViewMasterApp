import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';

@Component({
	selector: 'page-adicionar-receita',
	templateUrl: 'adicionarReceita.html'
})
export class AdicionarReceitaPage {

	idPaciente;
	receitaForm = {};
	titulo;

	url = 'http://br400.teste.website/~appot240/view_master_app/';
	loader;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
		public alertCtrl: AlertController, public http: Http, public navParams: NavParams,
		public toastCtrl: ToastController,) {
		
		this.idPaciente = this.navParams.data.idPaciente;
		this.titulo = "Nova Receita";
		this.InicializaAdicionarReceita();
	}

	InicializaAdicionarReceita(){
		this.InicializarLoading();
		this.BuscaPacienteId();
	}

	BuscaPacienteId(){
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
		this.SetDadosReceita();
		this.EncerraLoading();
	}

	SetDadosPaciente(data){
		this.receitaForm['nome'] = data[0].nome;
		this.receitaForm['sobrenome'] = data[0].sobrenome;
	}

	SetDadosReceita(){
		this.receitaForm['fk_paciente'] = this.idPaciente;
		this.receitaForm['rx'] = "Não";
		this.SetDataDeNascimento();
	}

	SetDataDeNascimento(){
		try{
			var data = new Date();
			this.receitaForm['dataConsulta'] = data.toLocaleDateString();
		}catch(e){

		}
	}

	LimparCampoForm(campo){
		if(campo !== 'rx'){
			this.receitaForm[campo] = "";
		}else{
			this.receitaForm[campo] = "Não";
		}
		
	}

	ConfirmacaoLimparTabela(){
		let prompt = this.alertCtrl.create({
			title: 'Limpar Tabela',
			message: "Deseja realmente limpar os campos da tabela?",
	      	buttons: [
				{
					text: 'Não',
					handler: data => {
						
					}
				},
        		{
					text: 'Sim',
					handler: data => {
						this.LimparCamposTabela();
					}
				}
	      	]
	    });
	    prompt.present();
	}

	LimparCamposTabela(){
		this.receitaForm['odEsf'] = "";
		this.receitaForm['odCil'] = "";
		this.receitaForm['odEixo'] = "";
		this.receitaForm['odAv'] = "";

		this.receitaForm['oeEsf'] = "";
		this.receitaForm['oeCil'] = "";
		this.receitaForm['oeEixo'] = "";
		this.receitaForm['oeAv'] = "";
	}

	ConfirmaLimparFormulario(){
		let prompt = this.alertCtrl.create({
			title: 'Limpar Formulário',
			message: "Deseja realmente limpar todos os campos do "+
			"formulário de receita?",
	      	buttons: [
				{
					text: 'Não',
					handler: data => {
						
					}
				},
        		{
					text: 'Sim',
					handler: data => {
						this.LimparFormulario();
					}
				}
	      	]
	    });
	    prompt.present();
	}

	LimparFormulario(){
		this.LimparCampoForm('sintomas');
		this.LimparCampoForm('antecedentes');
		this.LimparCampoForm('dataConsulta');
		this.LimparCampoForm('rx');
		
		this.LimparCampoForm('odEsf');
		this.LimparCampoForm('odCil');
		this.LimparCampoForm('odEixo');
		this.LimparCampoForm('odAv');

		this.LimparCampoForm('oeEsf');
		this.LimparCampoForm('oeCil');
		this.LimparCampoForm('oeEixo');
		this.LimparCampoForm('oeAv');

		this.LimparCampoForm('adicao');
		this.LimparCampoForm('tipoDeLente');
		this.LimparCampoForm('cor');
	}

	FormataData(campo, texto){
		try{
			this.receitaForm[campo] = texto.replace( /\D/g, '' )
	       	.replace( /^(\d\d)(\d)/g, '$1/$2' )
	       	.replace( /(\d\d)(\d)/, '$1/$2' );
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
		    this.receitaForm[campo] = words.join(" ");
	    }catch(e){

		}
	}

	ConfirmaSalvarReceita(){
		let prompt = this.alertCtrl.create({
			title: 'Salvar Receita',
			message: "Deseja realmente salvar a receita do paciente "+
			this.receitaForm['nome']+" "+this.receitaForm['sobrenome']+"?",
	      	buttons: [
				{
					text: 'Cancelar',
					handler: data => {
						
					}
				},
        		{
					text: 'Editar',
					handler: data => {
						this.InicializarLoading();
						this.SalvarReceita();
					}
				}
	      	]
	    });
	    prompt.present();
	}

	SalvarReceita(){
		var headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded');
	    let options = new RequestOptions({ headers: headers });
	 
	    let postParams = {
			usuario: 'appot240_vm_app', senha: 'kD91(w0E1VlM', banco: 'appot240_view_master_app', 
			receita: JSON.stringify(this.receitaForm)
	    }
	    
		this.http.post(this.url+'receitas/insere_receita.php', postParams, options)
			.subscribe(data => {
				this.TrataRetornoServidor(data['_body']);
			}, error => {
				console.log(error);
		});
	}

	TrataRetornoServidor(data){
		this.Toast(data);
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

	Toast(mensagem) {
		let toast = this.toastCtrl.create({
			message: mensagem,
			showCloseButton: true,
      		closeButtonText: 'Ok'
		});
		toast.present();
	}

}
