import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-viewmedicamento',
  templateUrl: './viewmedicamento.page.html',
  styleUrls: ['./viewmedicamento.page.scss'],
})
export class ViewmedicamentoPage implements OnInit {
  Datainicio: Date;
  doses: number;
  Medicacao: string;
  repitir: number;
  carencia: number;
  Datafim: string;

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
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.goBack();
    })
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }
  ionViewWillLeave() {
  }
  ionViewDidLeave() {
  }
  goBack() {
    this.navCtrl.navigateRoot('/novotratamento');
  }
 


  MostraDados() {
    let Codigomedicamento = sessionStorage.getItem('Codigomedicamento')
    Codigomedicamento = atob(Codigomedicamento)
    console.log('vlue of Codigomedicamento :', Codigomedicamento);
    let params = {
      'StatusCRUD': 'Monstradados_Medicamento',
      'formValues': Codigomedicamento,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {

          this.Datainicio = JSON.parse(resultado.results)[0].Datainicio;
          this.Medicacao  = JSON.parse(resultado.results)[0].Medicacao;
          this.doses      = JSON.parse(resultado.results)[0].doses;
          this.repitir    = JSON.parse(resultado.results)[0].repitir;
          this.Datafim    = JSON.parse(resultado.results)[0].Datafim;
          this.carencia   = JSON.parse(resultado.results)[0].carencia;
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Medicamento', pMessage: 'Nenhum dados' });
        }
      } catch (err) {
      }
    });
  }
  async cancelar() {
    let Codigomedicamento = sessionStorage.getItem('Codigomedicamento')
    Codigomedicamento = atob(Codigomedicamento)
    console.log('vlue of Codigomedicamento :', Codigomedicamento);
    console.log(Codigomedicamento)
    const alert = await this.alertController.create({
      header: 'Excluindo Medicamento...',
      message: 'Deseja excluir o Medicamento?',
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
            console.log('aaa', Codigomedicamento)
            this.delete(Codigomedicamento);
            await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }
  delete(Codigomedicamento) {
   
    let params = {
      'StatusCRUD': 'Delete_Medicamento',
      'formValues': Codigomedicamento,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spAnimal", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Excluindo Medicamento..', pSubtitle: '', pMessage: 'Medicamento excluído com sucesso!' });
          this.goBack();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este Medicamento!' });
          //this.navCtrl.navigateRoot('/login');
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Medicamento', pMessage: 'Nenhum usuário!' });
      }
    });


  }
}




