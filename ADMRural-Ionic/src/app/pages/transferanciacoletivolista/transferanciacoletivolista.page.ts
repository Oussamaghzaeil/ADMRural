import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EnvService } from 'src/app/services/env.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-transferanciacoletivolista',
  templateUrl: './transferanciacoletivolista.page.html',
  styleUrls: ['./transferanciacoletivolista.page.scss'],
})
export class TransferanciacoletivolistaPage implements OnInit {
  // @ViewChild('inputcamera') cameraInput: ElementRef;
  public Nome: String;
  public TipodeEntrada: String;
  public DatadeEntrada: Date;
  public HoradeEntrada: Date;
  public Quantidade: number;
  public Unidad: String;
  public ValorTotal: number;
  public id: number;
  public a: any;
  public alim: any = "assets/imgs/alimento.png";
  public tra: any = "assets/imgs/vacina.png";
  public gra: any = "assets/imgs/animal.png";
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
    private env: EnvService,
    private alertService: AlertService,
  ) { }
  ngOnInit() {
    this.MostraDadosInfo();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/coletivoopcoes');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/coletivoopcoes');
  }
  goToCreate() {
    this.navCtrl.navigateRoot('/transferadoscoletivo');
  }
  goToo(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/viewtransferedcoletivo', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }
  ionViewDidEnter() { }
  MostraDadosInfo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    let params = {
      'StatusCRUD': 'Pesquisar_Transferancia_Coletivo',
      'formValues': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
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
  async cancelar(CodigoAnimal) {
    console.log(CodigoAnimal)
    const alert = await this.alertController.create({
      header: 'Excluindo Animal...',
      message: 'Deseja excluir o Animal?',
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
          this.alertService.presentAlert({ pTitle: 'Excluindo Animal..', pSubtitle: '', pMessage: 'Animal excluído com sucesso!' });
          this.MostraDadosInfo();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este Animal!' });
          //this.navCtrl.navigateRoot('/login');
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Nenhum usuário!' });
      }
    });
    this.MostraDadosInfo();
  }
}


