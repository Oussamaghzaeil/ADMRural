import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-saidaestoqueanimaismorte',
  templateUrl: './saidaestoqueanimaismorte.page.html',
  styleUrls: ['./saidaestoqueanimaismorte.page.scss'],
})
export class SaidaestoqueanimaismortePage implements OnInit {
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

  ) {}
  goToo(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/viewmorteestoquesaida', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }
  ngOnInit() {
    //this.imageFileBase64 = "assets/imgs/user.jpg";
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/saidaestoqueanimais');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/saidaestoqueanimais');
  }

  ionViewDidEnter() { }

  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando    

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_Morte',
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
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Não há animais morte nesta fazenda' });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        // this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Paciente', pMessage: 'Nenhum usuário!' });
      }
    });
  }

}








