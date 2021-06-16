

import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ColaboradoresFazenda',
  templateUrl: './ColaboradoresFazenda.page.html',
  styleUrls: ['./ColaboradoresFazenda.page.scss'],
})
export class ColaboradoresFazendaPage implements OnInit {

  public fazendas: any;
  public ishidden: boolean = true;

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
    // this.imageFileBase64 = "assets/imgs/user.jpg";
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/menu/options/tabs/main');
  }

  goToo(codigoFazenda) {
    // console.log("codigo fazenda", codigoFazenda);
    this.navCtrl.navigateRoot('/colaboradores-list');
    sessionStorage.setItem("codigoFazenda", btoa(codigoFazenda))
  }
  ionViewDidEnter() { }
 
  MostraDados() {
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.fazendas = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Você ainda não cadastrou um Estoque' });
        }
      } catch (err) { }
    });
  }

}




// import { Component, OnInit } from '@angular/core';
// import { NavController, ModalController } from '@ionic/angular';
// import { AuthService } from 'src/app/services/auth.service';
// import { AlertService } from 'src/app/services/alert.service';
// import { FormBuilder } from '@angular/forms';
// import { Platform } from '@ionic/angular';
// import { AlertController } from '@ionic/angular';

// @Component({
//   selector: 'app-colaboradores',
//   templateUrl: './colaboradores.page.html',
//   styleUrls: ['./colaboradores.page.scss'],
// })
// export class ColaboradoresPage implements OnInit {


//   static CRUD_PESQUISAR: string =  'Pesquisar';
//   static CRUD_CRIAR: string =  'Criar';
//   static CRUD_SALVAR: string =  'Salvar';
//   static APP_NAME: string = EnvService.name;
  
//   private Colaboradores = new ColaboradoresModel();
//   private Colaboradore: Array<ColaboradoresModel> = [];

//   constructor(private alertService: AlertService,
//     private authService: AuthService,
//     private router: Router,
//     private activatedRoute: ActivatedRoute) { }

//   ngOnInit() {
   

//     // Getting data from another page
//     this.activatedRoute.params.subscribe(
//       data => {

//         //"data" carries all the parameters
//         this.CodigoColaborador = data.CodigoColaborador;

//         if(this.CodigoColaborador){
//           this.CRUDColaboradores(ColaboradoresPage.CRUD_PESQUISAR, null);
//         }
//         //Your logic

//       }
//     )



//   }

//   cancel()
//   {
//     // this.navCtrl.navigateRoot('/menu/options/tabs/Colaboradores-list'); OLDER
//     this.router.navigate(['/menu/options/tabs/Colaboradores-list']); //NEWER
    
//   }

 

//   save(formColaboradores: NgForm)
//   {


//     console.log('formColaboradores: ',formColaboradores.value);
//     if(this.CodigoColaborador)
//     { 
//       this.CRUDColaboradores(ColaboradoresPage.CRUD_SALVAR,formColaboradores); //UPDATE
//     }
//     else
//     {
//       this.CRUDColaboradores(ColaboradoresPage.CRUD_CRIAR,formColaboradores); //CREATE
//     }

//   }

//   CRUDColaboradores(StatusCRUD: string, formColaboradores: NgForm)
//   {
//     let params = {
//       'CodigoUsuarioSistema': this.authService.CodigoUsuarioSistema,
//       'Hashkey': this.authService.HashKey,
//       'StatusCRUD': StatusCRUD,
//       'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
//       'CodigoColaborador': (this.CodigoColaborador) ? this.CodigoColaborador : "",
//       'formValues': (formColaboradores) ? formColaboradores.value : ""

//     };

//     // API methode's name
//     // Store Procedure's name
//     // parameters

//     this.authService.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
//       let resultado: any = res[0];
//       try {
//         if (resultado.success) {
//           console.log(resultado.message);
//           this.alertService.presentToast(resultado.message);
//           if (resultado.results) 
//           {
//             this.Colaboradores.CodigoColaborador = JSON.parse(resultado.results)[0].CodigoColaborador;
//             this.Colaboradores.Nome = JSON.parse(resultado.results)[0].Nome;
//             this.Colaboradores.Celular = JSON.parse(resultado.results)[0].Celular;
//             this.Colaboradores.Senha = JSON.parse(resultado.results)[0].Senha;
//             this.Colaboradores.CodigoFazenda = JSON.parse(resultado.results)[0].CodigoFazenda;
//             this.Colaboradores.Email = JSON.parse(resultado.results)[0].Email;
        
//           }
//           if (StatusCRUD != ColaboradoresPage.CRUD_PESQUISAR) this.router.navigate(['/menu/options/tabs/Colaboradores-list']);
          
//         }
//         else {
//           this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: ColaboradoresPage.APP_NAME, pMessage: resultado.message });
//           this.router.navigate(['/login']); //NEWER
//           //this.navCtrl.navigateRoot('/login'); OLDER
//         }
//       } catch (err) {
//         this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: ColaboradoresPage.APP_NAME, pMessage: resultado.message });
//         this.router.navigate(['/login']);
//       }
//     });
//   }

//    /*
//     VALIDATION FUNCTION
//     This one should be stored in an isolated file
//   */

//  isUndefined(value: string)
//  {
//    if (value == undefined) return true;
//    else return false;
//  }

// }



