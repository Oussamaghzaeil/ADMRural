import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Platform } from '@ionic/angular';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-anotacoes-list',
  templateUrl: './anotacoes-list.page.html',
  styleUrls: ['./anotacoes-list.page.scss'],
})
export class AnotacoesListPage implements OnInit {
  public anotacoes: Array<Anotacoes> = [];
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController

  ) { }
  ngOnInit() {
    this.CRUDAnotacoes('Pesquisar', null, null);
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/menu/options/tabs/main');
  }
  create() {
    this.navCtrl.navigateRoot('/anotacoes');
    sessionStorage.removeItem("CodigoAnotacao");
  }
  edit(id) {
    this.navCtrl.navigateRoot('/anotacoes');
    sessionStorage.setItem("CodigoAnotacao", btoa(id));
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
          console.log(resultado.message);

          if (resultado.results) {
            let results = JSON.parse(resultado.results);

            // Better Way to get 'result' data

            this.anotacoes = results.map(function callback(value) {

              let anotacao = new Anotacoes();
              anotacao.Codigo = value.Codigo;
              anotacao.Data = value.Data.substring(0, 10);
              anotacao.Anotacao = value.Anotacao.substring(0, 15);
              return anotacao;
            });
          } else {
            this.anotacoes = [];
          }
          if (StatusCRUD == 'Apagar') {
            this.alertService.presentToast(resultado.message);
            this.CRUDAnotacoes('Pesquisar', null, null);
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


  async delete(id) {

    console.log(id)

    const alert = await this.alertController.create({
      header: 'Excluindo Item...',
      message: 'Deseja excluir o Item?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIM',
          handler: async () => {
            this.CRUDAnotacoes('Apagar', null, id);
            await alert.remove();
          }
        }
      ]
    });

    await alert.present();

  }

}

export class Anotacoes {
  Codigo: string;
  Data: string;
  Anotacao: string;

}
