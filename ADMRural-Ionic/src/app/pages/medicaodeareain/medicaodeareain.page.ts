import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-medicaodeareain',
  templateUrl: './medicaodeareain.page.html',
  styleUrls: ['./medicaodeareain.page.scss'],
})
export class MedicaodeareainPage implements OnInit {
  public Nome: String;
  public a: any;
  public id: number;
  public CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
  public ishidden: boolean = true;
  constructor(
    private navCtrl: NavController,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private alertService: AlertService,
    private env: EnvService,
  ) { }
  ngOnInit() {
    this.MostraDadosInfo();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/medicoesdeareas');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/medicoesdeareas');
  }
  goToCreate() {
    this.navCtrl.navigateRoot('/novomedicaodearea');
  }
 
  goToEdit(Codigo) {
    console.log("Codigo item", Codigo);
    this.navCtrl.navigateRoot('/editmedicaodearea', Codigo);
    sessionStorage.setItem("Codigoitem", btoa(Codigo))
  }
  ionViewDidEnter() { }
  MostraDadosInfo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    let params = {
      'StatusCRUD': 'Pesquisar_Medicao',
      'formValues': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spMedicao', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      if (resultado.success) {
        this.a = JSON.parse(resultado.results);
      }
    });
  }
  async cancelar(id) {
    const alert = await this.alertController.create({
      header: 'Excluindo Item...',
      message: 'Deseja excluir o Item?',
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
  //delete(form: NgForm)
  delete(id) {
    console.log('test for the id', id)
    //create form 
    let myForm: FormGroup;
    // ------ NEW FORM WITH EDIT DATA
    myForm = this.formBuilder.group({
      id: id
    });
    let params = {
      'StatusCRUD': 'Delete_Medicao',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spMedicao", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Excluindo item..', pSubtitle: '', pMessage: 'Item excluído com sucesso!' });
          this.MostraDadosInfo();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este item!' });
          //this.navCtrl.navigateRoot('/login');
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Item', pMessage: 'Nenhum usuário!' });
      }
    });

  }
}


