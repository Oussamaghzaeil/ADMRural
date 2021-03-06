import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-perdido',
  templateUrl: './perdido.page.html',
  styleUrls: ['./perdido.page.scss'],
})
export class PerdidoPage implements OnInit {
  public a: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    public formBuilder: FormBuilder,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public alertController: AlertController
  ) { }
  ngOnInit() {
    //this.imageFileBase64 = "assets/imgs/user.jpg";
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/situacaoanimal');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/situacaoanimal');
  }
  ionViewDidEnter() { }
  goToo(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/viewperdido', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }

  MostraDados() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_Perdido',
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
          //this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATEN????O', pSubtitle: 'Fazenda', pMessage: 'N??o h?? animais perdidos nesta fazenda' });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        // this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Paciente', pMessage: 'Nenhum usu??rio!' });
      }
    });

  }

  async cancelar(CodigoAnimal) {
    console.log(CodigoAnimal)
    const alert = await this.alertController.create({
      header: 'Excluindo Animal...',
      message: 'Deseja excluir o Animal?',
      buttons: [
        {
          text: 'N??O',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIM',
          handler: async () => {
            console.log('Confirm Ok');
            console.log('aaa', CodigoAnimal)
            this.delete(CodigoAnimal);
            await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }

  delete(CodigoAnimal) {
    console.log(CodigoAnimal)
    //create form 
    let myForm: FormGroup;
    // ------ NEW FORM WITH EDIT DATA
    myForm = this.formBuilder.group({
      CodigoAnimal: CodigoAnimal
    });
    let params = {
      'StatusCRUD': 'Deleteanimal',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };

    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spAnimal", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Excluindo Animal..', pSubtitle: '', pMessage: 'Animal exclu??do com sucesso!' });
          this.MostraDados();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATEN????O', pSubtitle: 'Erro', pMessage: 'Voc?? n??o pode excluir este Animal!' });
          //this.navCtrl.navigateRoot('/login');
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Nenhum usu??rio!' });
      }
    });
    this.MostraDados();
  }
}


