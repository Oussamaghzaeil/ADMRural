import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-stockfinalizadoalim',
  templateUrl: './stockfinalizadoalim.page.html',
  styleUrls: ['./stockfinalizadoalim.page.scss'],
})
export class StockfinalizadoalimPage implements OnInit {
  // @ViewChild('inputcamera') cameraInput: ElementRef;
  public Nome: string;
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

  ) { }
  goToView(id) {
    console.log("Codigo item", id);
    this.navCtrl.navigateRoot('/editfinalizadoalim', id);
    sessionStorage.setItem("Codigoitem", btoa(id))
  }
  ngOnInit() {
    this.MostraDadosInfo();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/tipoestoque');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/tipoestoque');
  }
  goTo() {
    this.navCtrl.navigateRoot('/novoitemalim');
  }
  goToAndamento() {
    this.navCtrl.navigateRoot('/stockalim');
  }
  ionViewDidEnter() { }
  MostraDadosInfo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_Finalizado_Alim',
      'formValues': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      if (resultado.success) {
        this.a = JSON.parse(resultado.results);
        for (let i = 0; i <= this.a.length; i++) {
          let b = this.a
          let hours = b[i].HoradeEntrada.split(':')[0];
          let min = b[i].HoradeEntrada.split(':')[1];
          b[i].HoradeEntrada = hours + ':' + min;
          this.a = b;
          let month = b[i].DatadeEntrada.split('-')[2];
          let day = b[i].DatadeEntrada.split('-')[1];
          let year = b[i].DatadeEntrada.split('-')[0];
          b[i].DatadeEntrada = day + '/' + month + '/' + year;
        }
      }
    });
  }
}


