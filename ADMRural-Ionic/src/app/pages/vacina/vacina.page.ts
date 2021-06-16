import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.page.html',
  styleUrls: ['./vacina.page.scss'],
})
export class VacinaPage implements OnInit {
  public a: any;
  public b: any;
  masks: any;
  public ishidden: boolean = true;
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
  ngOnInit() {
    this.MostraDadosCurrent();
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/animaisin');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/animaisin');
  }
  goTo() {
    this.navCtrl.navigateRoot('/novotratamento');
  }
  goToo(CodigoTratamento) {
    console.log(" Codigo Tratamento", CodigoTratamento);
    this.navCtrl.navigateRoot('/edittratamento', CodigoTratamento);
    sessionStorage.setItem("CodigoTratamento", btoa(CodigoTratamento))
  }
  ionViewDidEnter() { }
  async cancelar(CodigoTratamento) {
    console.log(CodigoTratamento)
    const alert = await this.alertController.create({
      header: 'Excluindo Tratamento...',
      message: 'Deseja excluir o Tratamento?',
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
            console.log('aaa', CodigoTratamento)
            this.delete(CodigoTratamento);
            await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }
  delete(CodigoTratamento) {
    console.log(CodigoTratamento)
    let myForm: FormGroup;
    myForm = this.formBuilder.group({
      CodigoTratamento: CodigoTratamento
    });
    let params = {
      'StatusCRUD': 'Delete_tratamento',
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
          this.alertService.presentAlert({ pTitle: 'Excluindo Tratamento..', pSubtitle: '', pMessage: 'Tratamento excluído com sucesso!' });
          this.MostraDados();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este Tratamento!' });
          //this.navCtrl.navigateRoot('/login');
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Tratamento', pMessage: 'Nenhum usuário!' });
      }
    });
    this.MostraDados();
  }
  MostraDados() {
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    CodigoAnimal = atob(CodigoAnimal)
    console.log('vlue of CodigoAnimal :', CodigoAnimal);
    let params = {
      'StatusCRUD': 'Pesquisar_tratemento_old',
      'formValues': CodigoAnimal,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)

      if (resultado.success) {
        this.a = JSON.parse(resultado.results);
        for (let i = 0; i <= this.a.length; i++) {
          let b = this.a
         
          let month = b[i].DataTratamento.split('-')[2];
          let day = b[i].DataTratamento.split('-')[1];
          let year = b[i].DataTratamento.split('-')[0];
          b[i].DataTratamento = day + '/' + month + '/' + year;
          let month1 = b[i].DataTratamentofinal.split('-')[2];
          let day1 = b[i].DataTratamentofinal.split('-')[1];
          let year1 = b[i].DataTratamentofinal.split('-')[0];
          b[i].DataTratamentofinal = day1 + '/' + month1 + '/' + year1;
 
        }
      }

    });
  }
  MostraDadosCurrent() {
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    CodigoAnimal = atob(CodigoAnimal)
    console.log('vlue of CodigoAnimal :', CodigoAnimal);
    let params = {
      'StatusCRUD': 'Pesquisar_current_tratemento',
      'formValues': CodigoAnimal,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)

      if (resultado.success) {
        this.b = JSON.parse(resultado.results);
      }

    });
  }

}

