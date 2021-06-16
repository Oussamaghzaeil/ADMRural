import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService, } from 'src/app/services/alert.service';
@Component({
  selector: 'app-aplicacaomedicamento',
  templateUrl: './aplicacaomedicamento.page.html',
  styleUrls: ['./aplicacaomedicamento.page.scss'],
})
export class AplicacaomedicamentoPage implements OnInit {
  public Dataaplicacao: Date;
  public Situacao: String;
  public selected : boolean = false;

  public CodigoTratamento : number;
  
  constructor(private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService, ) { }
  ngOnInit() {
     this.MostraDados();
  }
  goBack() {
    this.navCtrl.navigateRoot('/edittratamento');
  }
  MostraDados() {
    let CodigoAplicacao= sessionStorage.getItem('CodigoAplicacao')
    console.log('vlue of CodigoTratamento :', atob(CodigoAplicacao)); 
    let params = {
      'StatusCRUD': 'Pesquisar_edit_aplicacao',
      'formValues': atob(CodigoAplicacao),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spTratamentosAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.Dataaplicacao = JSON.parse(resultado.results)[0].Data;
          let a: any = JSON.parse(resultado.results)[0].Situacao;
          if (typeof (a) == 'undefined')
            a = '';
          if (a == null)
            a = '';
          if (a != '')
            this.Situacao = a;
          if (this.Situacao == 'Aguardando aplicação'){
            this.selected = true;
          }
        }
      } catch (err) {
      }
    });
  }

  atualizar(form: NgForm) {
    // paramStatus: Pesquisando, Editando, Deletando 
    let CodigoAplicacao= sessionStorage.getItem('CodigoAplicacao')
    console.log('vlue of CodigoTratamento :', atob(CodigoAplicacao)); 
    
      form.value.CodigoAplicacao = atob(CodigoAplicacao);   
      let params = {
        'StatusCRUD': 'Gravar_Aplicacao',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      console.log('formm: ', form)
      console.log("gravar:", params);
      this.Authorizer.QueryStoreProc('Executar', 'spTratamentosAnimal', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
            //this.navCtrl.navigateRoot('/login');
          }
        } catch (err) {

        }
      });
  }

 
 

}

