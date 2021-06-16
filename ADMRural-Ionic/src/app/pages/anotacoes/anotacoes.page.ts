import { Component, OnInit } from '@angular/core';

import { Anotacoes } from '../anotacoes-list/anotacoes-list.page'
import { Platform, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-anotacoes',
  templateUrl: './anotacoes.page.html',
  styleUrls: ['./anotacoes.page.scss'],
})
export class AnotacoesPage implements OnInit {

  public anotacao = new Anotacoes();


  constructor(public platform: Platform,
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private alertService: AlertService, ) {


    // this.anotacao.Data = 
  }

  ngOnInit() {

    if (sessionStorage.getItem('CodigoAnotacao')) {
      this.anotacao.Codigo = atob(sessionStorage.getItem('CodigoAnotacao'));
      this.CRUDAnotacoes('Pesquisar', null, this.anotacao.Codigo);
    }


    if (this.anotacao.Codigo)

      this.platform.backButton.subscribe(() => {
        this.navCtrl.navigateRoot('/anotacoes-list');
      })
  }

  save(formAnotacoes: NgForm) {
    if (this.anotacao.Codigo) {
      this.CRUDAnotacoes('Salvar', formAnotacoes, this.anotacao.Codigo);
    }
    else {
      this.CRUDAnotacoes('Criar', formAnotacoes, null);
    }
  }

  CRUDAnotacoes(StatusCRUD: string, formAnotacoes: NgForm, CodigoAnotacao: string) {

    let params = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': StatusCRUD,
      'CodigoAnotacao': (CodigoAnotacao) ? CodigoAnotacao : "",
      'formValues': (formAnotacoes) ? formAnotacoes.value : "",

    };

    this.Authorizer.QueryStoreProc('Executar', 'spCRUDAnotacoes', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {

          switch (StatusCRUD) {
            case 'Criar':
              this.navCtrl.navigateRoot('/anotacoes-list');
              break;
              case 'Salvar':
                this.navCtrl.navigateRoot('/anotacoes-list');
                break;
            case 'Pesquisar':
              if (resultado.results) {

                this.anotacao.Data = JSON.parse(resultado.results)[0].Data;
                this.anotacao.Anotacao = JSON.parse(resultado.results)[0].Anotacao;

              } else {
                this.anotacao = new Anotacoes();
              }
              break;
            default:
            // code block
          }
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: resultado.message });
          this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: resultado.message });
        this.navCtrl.navigateRoot('/login');
      }
    });

  }

  goBack() {
    this.navCtrl.navigateRoot('/anotacoes-list');
  }




}
