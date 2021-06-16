import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-alimentacaoanimal',
  templateUrl: './alimentacaoanimal.page.html',
  styleUrls: ['./alimentacaoanimal.page.scss'],
})
export class AlimentacaoanimalPage implements OnInit {
  // @ViewChild('inputcamera') cameraInput: ElementRef;
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
  goToEdit(id) {
    console.log("Codigo item", id);
    this.navCtrl.navigateRoot('/editalimentacaoanimal', id);
    sessionStorage.setItem("id", btoa(id))
  }
  ngOnInit() {
    this.MostraDadosInfo();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/animaisin');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/animaisin');
  }
  goTo() {
    this.navCtrl.navigateRoot('/alimentacao');
  }
  ionViewDidEnter() { }
  MostraDadosInfo() {
    // paramStatus: Pesquisando, Editando, Deletando    

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_Alim_Animal',
      'formValues': atob(CodigoFazenda),
      'CodigoAnimal': atob(CodigoAnimal),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAlimentacao', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
          for (let i = 0; i <= this.a.length; i++) {
            let b = this.a
  
            let month = b[i].Datadealimentacaoinicial.split('-')[2];
            let day = b[i].Datadealimentacaoinicial.split('-')[1];
            let year = b[i].Datadealimentacaoinicial.split('-')[0];
            b[i].Datadealimentacaoinicial = day + '/' + month + '/' + year;
            let month1 = b[i].Datadealimentacaofinal.split('-')[2];
            let day1 = b[i].Datadealimentacaofinal.split('-')[1];
            let year1 = b[i].Datadealimentacaofinal.split('-')[0];
            b[i].Datadealimentacaofinal = day1 + '/' + month1 + '/' + year1;
  
          }
        } else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Alimentação', pMessage: 'Não há alimentação nesta animal' });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        // this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Paciente', pMessage: 'Nenhum usuário!' });
      }
    });
  }
  async cancelar(id) {
    console.log(id)
    const alert = await this.alertController.create({
      header: 'Excluindo Alimentação...',
      message: 'Deseja excluir o Alimentação?',
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
            console.log('Confirm Ok');
            console.log('aaa', id)
            this.delete(id);
            await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }
  delete(id) {
    let params = {
      'StatusCRUD': 'Delete_alim_animal',
      'formValues': id,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spAlimentacao", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Excluindo item..', pSubtitle: '', pMessage: 'Alimentação excluído com sucesso!' });
          this.alertService.showLoader(resultado.message, 500);
          this.MostraDadosInfo();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este Alimentação!' });
          //this.navCtrl.navigateRoot('/login');
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Item', pMessage: 'Nenhum usuário!' });
      }
    });
  }
}


