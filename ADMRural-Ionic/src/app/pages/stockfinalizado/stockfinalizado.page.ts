import { Component, OnInit} from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import {  FormBuilder } from '@angular/forms';
import {  Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-stockfinalizado',
  templateUrl: './stockfinalizado.page.html',
  styleUrls: ['./stockfinalizado.page.scss'],
})
export class StockfinalizadoPage implements OnInit {
  // @ViewChild('inputcamera') cameraInput: ElementRef;
  public a : any;
  public Nome: String;
  constructor(
    private navCtrl: NavController,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController

  ) {}
  goToView(id) {
    console.log("Codigo item", id);
    this.navCtrl.navigateRoot('/editfinalizado', id);
    sessionStorage.setItem("Codigoitem", btoa(id))
  }
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
    this.navCtrl.navigateRoot('/novoitem');
  }
  goToAndamento(){
    this.navCtrl.navigateRoot('/stock');
  }
  ionViewDidEnter() { }
  MostraDadosInfo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    let params = {
      'StatusCRUD': 'Pesquisar_Finalizado',
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
              let hours = b[i].HoradeEntrada.split(':')[0] ;
              let min =   b[i].HoradeEntrada.split(':')[1] ;
              b[i].HoradeEntrada = hours +':' + min ;
              this.a = b;
              let month = b[i].DatadeEntrada.split('-')[2];
              let day = b[i].DatadeEntrada.split('-')[1];
              let year = b[i].DatadeEntrada.split('-')[0];
              b[i].DatadeEntrada = day + '/' + month + '/' + year;
            }
        }
    });
  }

}


