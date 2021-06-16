
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

//MODELS
import { ColaboradoresModel } from '../../models/Colaboradores.model';

//SERVICE
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { EnvService } from '../../services/env.service';


@Component({
  selector: 'app-Colaboradores-list',
  templateUrl: './Colaboradores-list.page.html',
  styleUrls: ['./Colaboradores-list.page.scss'],
})
export class ColaboradoresListPage implements OnInit {



  static CRUD_PESQUISAR: string = 'Pesquisar';
  static CRUD_APAGAR: string = 'Apagar';
  static APP_NAME: string = EnvService.name;
  public navCtrl: NavController;
  public codigoFazenda :any;
  public platform: Platform;

  private colaborador = new ColaboradoresModel();
  public colaboradores: Array<ColaboradoresModel> = [];
  public perfil: number;
  
  constructor(private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private alertController: AlertController) {
    //console.log('I am a constructor beach!');
  }

  // this is not working, maybe because is HomePage
  ngOnInit() {

    this.perfil =  JSON.parse(sessionStorage.getItem("SessionUser"))[0].perfil;
   

    // this.platform.backButton.subscribe(() => {
    //   this.navCtrl.navigateRoot('/colaboradores-list');
    // })
  }

  // Instead I have to use it
  ionViewDidEnter() {
    let Fazenda = sessionStorage.getItem('codigoFazenda')
    
    this.codigoFazenda =  atob(Fazenda);
    console.log('value of Fazenda :', this.codigoFazenda);
    
    this.CRUDColaboradores(ColaboradoresListPage.CRUD_PESQUISAR, null);// I WANT TO READ THE colaborador
    
  }

  createColaborador() {
  
    this.router.navigate(['colaboradores']); //NEWER
   
  
  }

  updateColaborador(colaborador_codigoColaborador: string) {
    //this.navCtrl.navigateRoot('/menu/options/tabs/Colaboradores', Colaboradores_CodigoColaborador); OLDER 
    this.router.navigate(['colaboradores', colaborador_codigoColaborador]); //NEWER
  }

  deleteColaborador(codigoColaborador: string) {
    this.colaborador.codigoColaborador = codigoColaborador;
    this.CRUDColaboradores(ColaboradoresListPage.CRUD_APAGAR, null); // I WANT TO DELETE THE colaborador
  }



  CRUDColaboradores(StatusCRUD: string, formColaboradores: NgForm) {
    let params = {
      // 'CodigoUsuarioSistema': this.authService.CodigoUsuarioSistema, //MANDATORY
      // 'Hashkey': this.authService.HashKey, //MANDATORY
      // 'StatusCRUD': StatusCRUD,
      // 'codigoColaborador': (this.colaborador.codigoColaborador) ? this.colaborador.codigoColaborador : "",
      

      'StatusCRUD': StatusCRUD,
      'codigoColaborador': this.colaborador.codigoColaborador,
      'codigoFazenda': this.codigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'formValues': (formColaboradores) ? formColaboradores.value : ""
    };

    this.colaborador.codigoColaborador = null

    // API methode's name
    // Store Procedure's name
    // parameters

    this.authService.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          console.log(resultado.message);

          if (resultado.results) {
            let results = JSON.parse(resultado.results);

            // Easy Way to get 'result' data
            //this.countrys = JSON.parse(resultado.results);

            // Better Way to get 'result' data

           this.colaboradores = results.map(function callback(value) {

              let colaborador = new ColaboradoresModel();
              colaborador.codigoColaborador = value.codigoColaborador;
              colaborador.nome = value.nome;
              return colaborador;

            });


          } else {
            this.colaboradores = [];
          }

          if (StatusCRUD == ColaboradoresListPage.CRUD_APAGAR) {
            this.alertService.presentToast(resultado.message);
            this.CRUDColaboradores(ColaboradoresListPage.CRUD_PESQUISAR, null);
          }
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: ColaboradoresListPage.APP_NAME, pMessage: resultado.message });
          this.router.navigate(['/login']);
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: ColaboradoresListPage.APP_NAME, pMessage: resultado.message });
        this.router.navigate(['/login']);
      }
    });
  }

  async willDeleteColaborador(colaborador_codigoColaborador: string, nome: string) {

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Deleted <strong>' + nome + '?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          // handler: (blah) => {
          //   console.log('Confirm Cancel: blah');
          // }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteColaborador(colaborador_codigoColaborador);
          }
        }
      ]
    });

    await alert.present();
  }

}
