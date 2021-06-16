import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { rootRoute } from '@angular/router/src/router_module';
import { AuthService } from 'src/app/services/auth.service';
//import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class principalPage implements OnInit {

  public items: any;
  public MenuOptions: any;
  public AppName: String = 'ADM RURAL';
  public AppVersion: String = '0.0.1';
  public AppGreetings: String = 'Bem-Vindos ao ADM Rural!';

  constructor(
    public navCtrl: NavController,
    private appLauncher: AppLauncher,
    private platform: Platform,
    public iab: InAppBrowser
  ) { }
  async launchApp() {
    const options: AppLauncherOptions = {
    }

    if (this.platform.is('android')) {
      options.uri = 'fb://'
    } else {
      options.packageName = 'com.undercode.hospitalcampanha'
    }

    this.appLauncher.canLaunch(options)
      .then((canLaunch: boolean) => this.iab.create('android-app://com.undercode.hospitalcampanha', "_system"))
      .catch((error: any) => console.error('Facebook is not available'));
  }
  itemSelected(item: { name: string, icon: string, details: string, route: string }) {
    //if(item.name ==='Produtos'){
    //this.alertService.presentToast("Acessando...: "+item.name);
    this.navCtrl.navigateRoot(item.route);
    //}
  }
  public dados: any;
  ngOnInit() {
    if (!sessionStorage.SessionHashkey) {
      this.navCtrl.navigateRoot('/login');
    }


    this.dados = JSON.parse(sessionStorage.getItem('SessionCodigoUsuario'));
    //this.alertService.showLoader('Carregando... aguarde!!!');
    this.getModul()

  }


  getModul() {
    console.log('gutykuejbdl', this.dados)
    /*     let params = {
          'StatusCRUD': 'pesquisar',
          'formValues': this.dados[0].position,
          'CodigoUsuarioSistema': 0,
          'Hashkey': sessionStorage.getItem("SessionHashkey")
        };
        console.log('gutykuejbdl',params)
      this.Authorizer.QueryStoreProc('Executar',"spPermission", params).then(res => {
        let resultado: any = res[0];
        console.log(JSON.parse(resultado.results))
        try {
          if (resultado.success) { 
              //this.alertService.presentAlert({ pTitle: 'Atendimento', pSubtitle: 'Success', pMessage: 'Atendimento excluído com sucesso !' });
             
              */



    this.items = [
      {
        id: 1,
        name: "Fazendas",
        icon: "assets/imgs/fazenda.png",
        route: '/fazenda'
      }
    ];
    this.items.push({
      id: 2,
      name: "Animais",
      icon: "assets/imgs/animal.png",
      route: '/animais'
    });
    this.items.push({
      id: 5,
      name: "Coletivo",
      icon: "assets/imgs/alimento.png",
      route: '/coletivo'
    });
    this.items.push({
      id: 6,
      name: "Medições De Áreas",
      icon: "assets/imgs/medicao.png",
      route: '/medicoesdeareas'
    });
    this.items.push({
      id: 3,
      name: "Medição Linear",
      icon: "assets/imgs/linear.png",
      route: '/medicaolinear'
    });
    this.items.push({
      id: 6,
      name: "Plantação",
      icon: "assets/imgs/plantacao.png",
      route: '/plantacao'
    });
    this.items.push({
      id: 6,
      name: "Colheita",
      icon: "assets/imgs/coleta.png",
      route: '/colheita'
    });
    this.items.push({
      id: 6,
      name: "Entrada de Estoque",
      icon: "assets/imgs/entrada.png",
      route: '/entradaestoque'
    });
    this.items.push({
      id: 6,
      name: "Saída De Estoque",
      icon: "assets/imgs/entrada.png",
      route: '/saidadeestoque'
      // route :JSON.parse(resultado.results)[2].module
    });
    this.items.push({
      id: 6,
      name: "Despesas",
      icon: "assets/imgs/despesa.png",
      route: '/despesas'
      //route :JSON.parse(resultado.results)[2].module
    });
    this.items.push({
      id: 6,
      name: "Pontos De Interesse",
      icon: "assets/imgs/pontos.png",
      route: '/pontosdeinteresse'
    });




    this.items.push({
      id: 6,
      name: "Anotações",
      icon: "assets/imgs/rascunho.png",
      route: "anotacoes-list"
    });
    this.items.push({
      id: 7,
      name: "Fale Conosco",
      icon: "assets/imgs/ajuda.png",
      route: '/faleconosco'
      // route :JSON.parse(resultado.results)[4].module
    });
    this.items.push({
      id: 6,
      name: "Relatórios",
      icon: "assets/imgs/printer.png",
      route: "/relatorios"
    });


    this.items.push({
      id: 6,
      name: "Colaboradores",
      icon: "assets/imgs/printer.png",
      route: '/colaboradoresfazenda'
    });



  }




  /*     
    }
    catch (err) {
      //this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Atendimento', pMessage: 'Nenhum usuário!' });
    }
});

} */

}
