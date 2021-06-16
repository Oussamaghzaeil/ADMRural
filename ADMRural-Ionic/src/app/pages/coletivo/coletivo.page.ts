import { Component, OnInit } from '@angular/core';
import { NavController,  ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormBuilder } from '@angular/forms';
import {  Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-coletivo',
  templateUrl: './coletivo.page.html',
  styleUrls: ['./coletivo.page.scss'],
})
export class ColetivoPage implements OnInit {
  public a: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController

  ) {

  }
  ngOnInit() {
    //this.imageFileBase64 = "assets/imgs/user.jpg";
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/menu/options/tabs/main');
  }


  goToo(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/coletivoopcoes', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }
  ionViewDidEnter() { }

  MostraDados() {    
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Você ainda não cadastrou um Coletivo'});
        }
      } catch (err) {  }
    });
  }
}

