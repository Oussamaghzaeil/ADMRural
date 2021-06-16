import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Platform } from '@ionic/angular';

import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-situacaoanimal',
  templateUrl: './situacaoanimal.page.html',
  styleUrls: ['./situacaoanimal.page.scss'],
})
export class SituacaoanimalPage implements OnInit {






  public ishidden: boolean = true;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public alertController: AlertController


  ) {

  }

  public CodigoFazenda :any;

  ngOnInit() {
    //this.imageFileBase64 = "assets/imgs/user.jpg";

    let i = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of i :', atob(i));
    this.CodigoFazenda =  atob(i);

    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/animais');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/animais');
  }


  goToSaldo(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/animaisin', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }


  goToTransf(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/viewtransfered', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }

  goToMorte(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/morte', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }

  goToPerdidos(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/perdido', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }
  goToVendido(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/vendido', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }



  ionViewDidEnter() { }






}

