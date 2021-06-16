import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-stockalim',
  templateUrl: './stockalim.page.html',
  styleUrls: ['./stockalim.page.scss'],
})
export class StockalimPage implements OnInit {
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
  goToFinalizado() {
    this.navCtrl.navigateRoot('/stockfinalizadoalim');
  }
  goToEdit(id) {
    console.log("Codigo item", id);
    this.navCtrl.navigateRoot('/editandamentoalim', id);
    sessionStorage.setItem("Codigoitem", btoa(id))
  }
  ionViewDidEnter() { }

  MostraDadosInfo() {
    // paramStatus: Pesquisando, Editando, Deletando    

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_Andamento_Alim',
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
  //delete(form: NgForm)
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
      'StatusCRUD': 'Deleteitem_alim',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spEstoque", params).then(res => {
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
    this.MostraDadosInfo();
  }

}


