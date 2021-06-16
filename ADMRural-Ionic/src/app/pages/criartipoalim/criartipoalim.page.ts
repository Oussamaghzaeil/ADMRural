import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-criartipoalim',
  templateUrl: './criartipoalim.page.html',
  styleUrls: ['./criartipoalim.page.scss'],
})
export class CriartipoalimPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
  ) { }
  ngOnInit() {
    //console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/novotipoalim');
    })
  }

  ionViewWillEnter() { }
  ionViewDidEnter() { }
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.navigateRoot('/novotipoalim');
  }
  Criacao(form: NgForm) {
    let params = {
      'StatusCRUD': 'Criacao_tipo_alim',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("Novo tipo de entrada:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          //this.alertService.presentAlert({ pTitle: 'Salvando Tipo...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          this.alertService.showLoader(resultado.message, 1000);
          this.goBack();
        } else {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    }
    );
  }
}




