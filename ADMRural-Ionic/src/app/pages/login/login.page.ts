import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, LoadingController, AngularDelegate, AlertController } from '@ionic/angular';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthService } from 'src/app/services/auth.service';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';
import { SqlStorage } from '../../../providers/sql-storage/sql-storage'
import { Usuario } from '../../../providers/user-classes/user-classes'
import { Network } from '@ionic-native/network/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('email') iemail;
  constructor(
    private platform: Platform
    , private navCtrl: NavController
    , private Authorizer: AuthService
    , private db: Storage
    , private sqlstore: SqlStorage
    , private alertService: AlertService
    , private loadingCtrl: LoadingController
    , public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private network: Network
  ) { }
  model: Usuario;

  private user: any;
  public loading: any;
  private slogin: string;
  private ssenha: string;

  ngOnInit() {
    /* this.db.set('Nome', 'Osmar');
    this.db.get('Nome').then((Nome) => {
      console.log('Olá, ' + Nome + '! Você tem um nome muito legal.');
    }); */
    // Uso a instrução (fetch) para pegar o ip do roteador.
    let ipAPI: any = 'https://api.ipify.org?format=json'
    fetch(ipAPI).then(response => response.json()).then(data => sessionStorage.setItem('SessionIP', data.ip)).catch(() => { }
    )
    // Este método retorna ON/OFF do Serviço onde esta API.
    //this.Authorizer.EngineStatusConection(this.env.API_HOST);  

    // Teste de recuperação de dados

    // Zero a SessionConection 
    sessionStorage.setItem("SessionConection", "0");
    sessionStorage.setItem('SessionUser', '');
    sessionStorage.setItem('SessionHashkey', '');
    this.AutomaticLogin();
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    this.user = [];
    setTimeout(() => {
      this.iemail.setFocus();
    }, 150);
  }
  ionViewWillLeave() { }
  ionViewDidLeave() { }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      console.log('exit');
      navigator['app'].exitApp();
    })
  }

  AuthLogin(form: NgForm) {
    if (this.network.type == 'none')
      this.validoOff(form);
    else
      this.validoOn(form);
  }

  decripta(texto: string) {
    let retorno = "";
    let stexto = texto;
    if (stexto == "") {
      return stexto;
    }


    while (true) {
      let letra = stexto.substring(0, 3);
      let snumero = parseInt(letra);
      snumero -= 166;
      retorno += String.fromCharCode(snumero);
      // retorno += Char.ConvertFromUtf32(snumero);
      stexto = stexto.substring(3);
      if (stexto == "") {
        break;
      }
    }
    console.log("The decrypt result ==>", retorno);

    return retorno;
  }

  public items1 = [];
  AutomaticLogin() {

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

      if (recs.rows.length > 0) {
        let myForm: FormGroup;
  
        myForm = this.formBuilder.group({
          email: [this.items1[0].email],
          senha: [this.items1[0].senha]
        });
        myForm.value.senha = Md5.hashStr(myForm.value.senha);
        
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
        });
      }
    });
    

  }

  presentAlert(titulo, conteudo) {
    const alert = this.alertCtrl.create({
      message: 'titulo',
      subHeader: 'conteudo',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  validoOn(form: NgForm) {
    this.slogin = form.value.email;
    this.ssenha = form.value.senha;

    console.log(form.value)
    form.value.senha = Md5.hashStr(form.value.senha);
    console.log(form.value)

    this.Authorizer.Login
    (form).then(res => {
      let resultado: any = res[0];
      console.log("res:", res);
      form.value.email = this.slogin;
      form.value.senha = this.ssenha;
      let result: any;
      if (resultado.success == true) {
        result = JSON.parse(resultado.results);
        console.log("sessionuser:", result);
        this.db.set('SessionUser', result);

        this.db.get('SessionUser').then((Usuario) => {
          console.log('Usuario Logado:' + JSON.stringify(Usuario));
        });


        this.user.CodigoUsuario = result[0].CodigoUsuario;
        this.user.DD = result[0].DD;
        this.user.Celular = result[0].Celular;
        this.user.Nome = result[0].Nome;
        this.user.Email = form.value.email;
        this.user.Senha = form.value.senha;
        this.user.photopath = '';
        this.user.hashkey = resultado.hashkey;
        this.user.perfil = resultado.perfil;
        this.user.connection = '1';

        console.log("user21:", this.user);

         this.sqlstore.saveUser(this.user);

        if (this.platform.is('cordova')) {

        }

        this.navCtrl.navigateRoot('/menu/options');
      }
    });
  }

  validoOff(form: NgForm) {
    this.model = new Usuario();
    this.model.Email = form.value.email;
    this.model.Senha = form.value.senha;
    this.sqlstore.getUser(this.model).then((data) => {
      let ret = data;
      console.log("ret:", ret);
      if (typeof (ret) == 'undefined') {
        this.alertService.presentAlert({ pTitle: 'ADM Rural', pSubtitle: '', pMessage: 'Usuário não validado. Por favor, verifique!' });
        return;
      }
      if (typeof (ret) != 'object') {
        this.alertService.presentAlert({ pTitle: 'ADM Rural', pSubtitle: '', pMessage: 'Usuário não validado. Por favor, tente novamente!' });
        return false;
      }
      this.user = ret;
      let cod: number = 0;
      try {
        cod = this.user.CodigoUsuario;
      } catch (err) { }
      if (cod == 0) {
        this.alertService.presentAlert({ pTitle: 'ADM Rural', pSubtitle: '', pMessage: 'Usuário não validado. Por favor, tente novamente!' });
        return;
      }
      this.user.Email = form.value.email;
      this.user.Senha = form.value.senha;
      let session: any = [this.user];
      this.db.set('SessionUser', session);
      sessionStorage.setItem('SessionUser', session);
      sessionStorage.setItem("SessionHashkey", this.user.hashkey);
      sessionStorage.setItem("SessionConection", this.user.connection);
      this.navCtrl.navigateRoot('/menu/options');
    }, (error) => {
      this.alertService.presentAlert({ pTitle: 'ADM Rural', pSubtitle: '', pMessage: 'Usuário não validado. Por favor, tente novamente!' });
    });
  }


}