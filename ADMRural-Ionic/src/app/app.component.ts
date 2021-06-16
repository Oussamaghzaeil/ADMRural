import { Component } from '@angular/core';
import { Platform, ModalController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Time } from '@angular/common';
import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DatabaseProvider } from '../providers/database/database'
import { LoginPage } from '../app/pages/login/login.page';
import { AuthService } from './services/auth.service';
import { SqlStorage } from 'src/providers/sql-storage/sql-storage';
import { AlertService } from './services/alert.service';
import { Network } from '@ionic-native/network/ngx';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { SplashPage } from './/pages/splash/splash.page';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  public _APP = {
    "VersionEngineAPI": "1.1.5",
    "Version": "1.0.0",
    "HostDevAPI": "http://192.168.1.3:8081",
    "HostDevLevelAPI": "http://192.168.15.10:8081",
    "HostHomoAPI": "http://200.196.251.212:8081",
    "HostProdAPI": "http://200.196.251.212:8081"

  };
  public get APP() {
    return this._APP;
  }
  public set APP(value) {
    this._APP = value;
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbProvider: DatabaseProvider,
    private modalController: ModalController
    , private navCtrl: NavController
    , private Authorizer: AuthService
    , private db: Storage
    , private sqlstore: SqlStorage
    , private alertService: AlertService
    , private loadingCtrl: LoadingController
    , public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
     private network: Network
  ) {
    this.initializeApp();
    //this.showLoader();
  }
  rootPage: any = LoginPage;


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.SplashModal();          

      this.dbProvider.createDatabase().then(() => {
        console.log("banco criado");
      })
        .catch(() => {
          console.log("falha criando");
        });
      this.rootPage = LoginPage;
      //this.validoOff();
    });
  }

  /* decripta(texto: string)
        {
            let retorno = "";
            let stexto = texto;
            if (stexto == "")
            {
                return stexto;
            }
            
            
                while (true)
                {
                    let letra = stexto.substring(0, 3);
                    let snumero = parseInt(letra);
                    snumero -= 166;
                    retorno += String.fromCharCode(snumero);
                   // retorno += Char.ConvertFromUtf32(snumero);
                    stexto = stexto.substring(3);
                    if (stexto == "")
                    {
                        break;
                    }
                }
            console.log("The decrypt result ==>",retorno);
            
            return retorno;
        }

  private user: any;
  public items1 = [];
  form: FormGroup;

  validoOff() {
    //let code = JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario;
    let sql: string = "select CodigoUsuario, Nome, Email, Senha, hashkey, connection , DD, Celular, photopath";
    sql += " from tblUsuarioSistema";

    let data: any = [];

    this.sqlstore.getQuery(sql, data).then((data) => {
      let recs = data;
      for (let i = 0; i < recs.rows.length; i++) {
        let ite = recs.rows.item(i);

        this.items1.push({
          email: ite.Email,
          senha: this.decripta(ite.Senha)
        });
      }
      
     let myForm: FormGroup;
      
      	myForm = this.formBuilder.group({
          email: [this.items1[0].email],
          senha: [this.items1[0].senha]
      	});
      console.log("the data received Usuario ==>", myForm);
      this.Authorizer.LoginAuto(myForm).then(res => {
        let resultado: any = res[0];
        console.log("res:", res);
        //this.items1.Email = this.slogin;
        //form.value.senha = this.ssenha;
        let result: any;
        if (resultado.success == true) {
          result = JSON.parse(resultado.results);
          console.log("sessionuser:", result);
          this.db.set('SessionUser', result);
  
          this.db.get('SessionUser').then((Usuario) => {
            console.log('Usuario Logado:' + JSON.stringify(Usuario));
          });        
          
          if (this.platform.is('cordova')) {
            
         }
          
          this.navCtrl.navigateRoot('/menu/options');
        }
        else{
          this.rootPage = LoginPage;
        }
      });
      
      //this.mostraMunicipio();


    }, (error) => {
     
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de UF. Por favor, tente novamente!");
      console.log("Iam in the error");
    });
  }

  presentAlert(titulo, conteudo) {
    const alert = this.alertCtrl.create({
      message: 'titulo',
      subHeader: 'conteudo',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  } */

  /*  async SplashModal() {    
     const modal = await this.modalController.create({
       component: SplashPage,
       componentProps: {Titulo:"Teste"}
     });
     return await modal.present();
   } */

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
      return console.log("fired");
    });
  }

  sleep = function (time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

}