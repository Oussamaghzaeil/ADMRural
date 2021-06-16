import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-saidaestoqueanimaistransf',
  templateUrl: './saidaestoqueanimaistransf.page.html',
  styleUrls: ['./saidaestoqueanimaistransf.page.scss'],
})
export class SaidaestoqueanimaistransfPage implements OnInit {
  // @ViewChild('inputcamera') cameraInput: ElementRef;
  public a: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController
  ) { }
  ngOnInit() {
    //this.imageFileBase64 = "ssets/imgs/user.jpg";
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/saidaestoqueanimais');
    })
  }
  goToo(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/underviewsaidaestoqueanimaistransf', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }

  goBack() {
    this.navCtrl.navigateRoot('/saidaestoqueanimais');
  }
  ionViewDidEnter() { }
  MostraDados() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    let params = {
      'StatusCRUD': 'Pesquisar_Transferred',
      'formValues': CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Não há animais transferidos nesta fazenda' });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        // this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Paciente', pMessage: 'Nenhum usuário!' });
      }
    });
  }

}











