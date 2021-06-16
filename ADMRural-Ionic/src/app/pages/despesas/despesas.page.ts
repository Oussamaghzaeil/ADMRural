import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {
  public imageFileBase64: any = "assets/imgs/fazenda.jpg";
  public photopath: String;
  public a: any;
  constructor(
    private navCtrl: NavController,
    public platform: Platform,
    private Authorizer: AuthService,
    private env: EnvService,
    private alertService: AlertService,
    public alertController: AlertController
  ) { }
  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }

  MostraDados() {   
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      //console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.photopath = JSON.parse(resultado.results)[0].ImgFazenda;
          let path = this.env.API_HOST + '/Rural/';
          this.imageFileBase64 = path + JSON.parse(resultado.results)[0].ImgFazenda;
          this.a = JSON.parse(resultado.results);
          for (let i = 0; i <= this.a.length; i++) {
            let b = this.a
            if (b[i].ImgFazenda) {
              b[i].ImgFazenda = path + this.a[i].ImgFazenda;
              this.a = b;
            }
            else {
              b[i].ImgFazenda = "assets/imgs/fazenda.jpg";
              this.a = b;
            }
          }
          //this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Você ainda não cadastrou um' });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        // this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Paciente', pMessage: 'Nenhum usuário!' });
      }
    });
  }
  goToo(CodigoFazenda) {
    //console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/despesasfazenda', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }

  goBack() {
    this.navCtrl.navigateRoot('/menu/options/tabs/main');
  }

}
