import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Platform } from '@ionic/angular';

import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-saidaestoqueanimais',
  templateUrl: './saidaestoqueanimais.page.html',
  styleUrls: ['./saidaestoqueanimais.page.scss'],
})
export class SaidaestoqueanimaisPage implements OnInit {






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
      this.navCtrl.navigateRoot('/tipoestoquesaida');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/tipoestoquesaida');
  }


 


  goToTransf(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/saidaestoqueanimaistransf', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }

  goToMorte(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/saidaestoqueanimaismorte', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }

  goToPerdidos(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/saidaestoqueanimaisperdidos', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }
  goToVendido(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/saidaestoqueanimaisvendidos', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }



  ionViewDidEnter() { }






}

