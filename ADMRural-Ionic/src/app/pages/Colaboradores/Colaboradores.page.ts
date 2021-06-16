
// import { Component, OnInit } from '@angular/core';
// import { NavController, Platform, AlertController } from '@ionic/angular';
// import { AuthService } from 'src/app/services/auth.service';
// import { AlertService } from 'src/app/services/alert.service';
// import { FormBuilder, FormGroup } from '@angular/forms';


// @Component({
//   selector: 'app-colaboradores-list',
//   templateUrl: './colaboradores-list.page.html',
//   styleUrls: ['./colaboradores-list.page.scss'],
// })
// export class ColaboradoresListPage implements OnInit {

//   public CodigoFazenda: any;

//   public anosColaboradores: any;
//   public ano: any = "";
//   public mesColaboradores: any;
//   public mes: any = "";

//   public NomeFazenda: any;
//   public infotbColaboradores: any; //data despensas
//   public searchColaboradores: any; // data for search

//   public datasearch: any

//   constructor(
//     private navCtrl: NavController,
//     public platform: Platform,
//     private Authorizer: AuthService,
//     private alertCtrl: AlertController,
//     private alertService: AlertService,
//     private formBuilder: FormBuilder
//   ) { }
//   ngOnInit() {
//     let i = sessionStorage.getItem('CodigoFazenda')
//     //console.log('Cod Fazenda :', atob(i));
//     this.CodigoFazenda = atob(i);
//     this.platform.backButton.subscribe(() => {
//       this.navCtrl.navigateRoot('/colaboradores');
//     })
//     this.MostrarAnos();
//     this.MostrarMes();
//     this.MostrarDadosFazenda();
//     this.MostraDadosColaboradore();
//   }
//   goBack() {
//     this.navCtrl.navigateRoot('/colaboradores');
//   }
//   goToo(CodigoColaboradore) {
//     console.log("Codigo colaboradore", CodigoColaboradore);
//     this.navCtrl.navigateRoot('/editcolaboradores', CodigoColaboradore);
//     sessionStorage.setItem("CodigoColaboradore", btoa(CodigoColaboradore))
//   }

// /* ---------------------------------- SHOW THE NAME OF THE FAZENDA -------------------------------- */
//   MostrarDadosFazenda() { 
//     let params = {
//       'StatusCRUD': 'Pesquisar_Fazenda',
//       'CodigoFazenda': this.CodigoFazenda,
//       'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
//       'Hashkey': sessionStorage.getItem("SessionHashkey"),
//     };
//     //console.log('params', params)
//     this.Authorizer.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
//       let resultado: any = res[0];
//       //console.log("NomeFazenda", JSON.parse(resultado.results))
//       if (resultado.success) {
//         this.NomeFazenda = JSON.parse(resultado.results)[0].NomeFazenda;
//       }
//     });
//   }
// /* ---------------------------------- END SHOW THE NAME OF THE FAZENDA -------------------------------- */
// /* ---------------------------------- BRING YEARS (NOT REPEAT) -------------------------------- */
// MostrarAnos() { 
//   let params = {
//     'StatusCRUD': 'Info_Ano',
//     'CodigoFazenda': this.CodigoFazenda,
//     'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
//     'Hashkey': sessionStorage.getItem("SessionHashkey"),
//   };
//   //console.log('params', params)
//   this.Authorizer.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
//     let resultado: any = res[0];
//     //console.log("NomeFazenda", JSON.parse(resultado.results))
//     if (resultado.success) {
//       this.anosColaboradores = JSON.parse(resultado.results);
//     }
//   });
// }
// /* ---------------------------------- END BRING YEARS (NOT REPEAT) -------------------------------- */
// /* ---------------------------------- BRING MONTH (NOT REPEAT) -------------------------------- */
// MostrarMes() { 
//   let params = {
//     'StatusCRUD': 'Info_Mes',
//     'CodigoFazenda': this.CodigoFazenda,
//     'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
//     'Hashkey': sessionStorage.getItem("SessionHashkey"),
//   };
//   //console.log('params', params)
//   this.Authorizer.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
//     let resultado: any = res[0];
//     //console.log("NomeFazenda", JSON.parse(resultado.results))
//     if (resultado.success) {
//       this.mesColaboradores = JSON.parse(resultado.results);
//     }
//   });
// }
// /* ---------------------------------- END BRING MONTH (NOT REPEAT) -------------------------------- */
// /* ---------------------------------- SHOW DATA OF THE FARM EXPENSES -------------------------------- */
//   MostraDadosColaboradore() {
//     let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
//     let params = {
//       'StatusCRUD': 'Pesquisar_Colaboradore',
//       'CodigoFazenda': atob(CodigoFazenda),
//       'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
//       'Hashkey': sessionStorage.getItem("SessionHashkey"),
//     };
//     this.Authorizer.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
//       let resultado: any = res[0];
//       if (resultado.success) {
//         this.infotbColaboradores = JSON.parse(resultado.results);
//         this.searchColaboradores = JSON.parse(resultado.results);
//         this.ano = (JSON.parse(resultado.results)[0].DataColaboradores.toString()).substring(0,4);
//         this.mes = (JSON.parse(resultado.results)[0].DataColaboradores.toString()).substring(5,7);
//       }
//     });
//   }
//   /* ---------------------------------- END SHOW DATA OF THE FARM EXPENSES -------------------------------- */
//   /* ---------------------------------- SEARCH BY CLASSE and DATE ----------------------------------------- */
//   getItems(ev: any) {
//     //this.CarregaMenuPrincipalStatic();
//      this.infotbColaboradores = this.searchColaboradores;
//     const val = ev.target.value;
//     if (val && val.trim() != '') {
//       this.infotbColaboradores = this.infotbColaboradores.filter((item) => {
//         return (
//           (item.NomeClasseColaboradore.toLowerCase().indexOf(val.toLowerCase()) > -1)
//           //||(item.Observacao.toLowerCase().indexOf(val.toLowerCase()) > -1)
//         );
//       })
//     }
//   }
//   onSearchChange(data: any) {
//     let myForm: FormGroup;

//       	myForm = this.formBuilder.group({
//       		ano: this.ano,
//       		mes: this.mes
//       	});
//     let params = {
//       'StatusCRUD': 'pesqColaboradore_por_data',
//       'CodigoFazenda': this.CodigoFazenda,
//       'formValues': myForm.value,
//       'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
//       'Hashkey': sessionStorage.getItem("SessionHashkey"),
//     };
//     //console.log('params', params)
//     this.Authorizer.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
//       let resultado: any = res[0];
//       //console.log("resultado", resultado)
//       if (resultado.success) {
//         this.infotbColaboradores = JSON.parse(resultado.results);
//         this.searchColaboradores = JSON.parse(resultado.results);
//       } else{
//         this.alertService.presentAlert({
//               pTitle: 'SEM COLABORADORES', pSubtitle: 'Colaboradores', pMessage: 'Não há Colaboradores nesta data'
//             });
//       }

//     });
// }
// /* ---------------------------------- END SEARCH BY CLASSE and DATE ----------------------------------------- */

// /* ------------------------------------- CONFIRM DELETE ALERT ------------------------------------------ */
//   ConfirmDelete(codColaboradore: any) {
//     let alert = this.alertCtrl.create({
//       message: 'Tem certeza de que deseja excluir despesa permanentemente?',
//       buttons: [
//         {
//           text: 'Desistir',
//           role: 'cancel',
//           handler: () => {
//             //console.log('Cancel clicked');
//           }
//         },
//         {
//           text: 'Confirmar',
//           handler: data => {
//             //console.log(codColaboradore);
//             this.Excluir(codColaboradore);
//           }
//         }
//       ]
//     }).then(alert => alert.present());
//   }

//   /* ----------------------------------- END CONFIRM DELETE ALERT ------------------------------------- */
// /* --------------------------------------- DELETE  --------------------------------------------------- */
//   Excluir(codColaboradore: any) { 
//     let params = {
//       'StatusCRUD': 'excluir_colaboradore',
//       'CodColaboradore': codColaboradore,
//       'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
//       'Hashkey': sessionStorage.getItem("SessionHashkey"),
//     };
//     //console.log('params', params)
//     this.Authorizer.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
//       let resultado: any = res[0];
//       if (resultado.success) {
//         this.MostrarDadosFazenda();
//         this.MostraDadosColaboradore();
//         this.alertService.presentAlert({ pTitle: 'Removendo Colaboradore...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
//       }
//     });
//   }
//   /* --------------------------------------- END DELETE  --------------------------------------------------- */
//   /* --------------------------------------- GO TO CREAT NEW DESPESA --------------------------------------- */

//   goTo(){
//     this.navCtrl.navigateRoot('/novacolaboradore', this.CodigoFazenda);
//     sessionStorage.setItem("CodigoFazenda", btoa(this.CodigoFazenda))
//     sessionStorage.setItem("CodigoColaboradore", '')
//   }

//   /* --------------------------------------- END GO TO CREAT NEW DESPESA --------------------------------------- */
//   showInfo(CodigoColaboradore: any){
//     this.navCtrl.navigateRoot('/novacolaboradore', CodigoColaboradore);
//     sessionStorage.setItem("CodigoColaboradore", btoa(CodigoColaboradore))
//     //sessionStorage.setItem("CodigoFazenda", '')
//   }


// }







import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { EnvService } from '../../services/env.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ColaboradoresModel } from 'src/app/models/Colaboradores.model';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-Colaboradores',
  templateUrl: './Colaboradores.page.html',
  styleUrls: ['./Colaboradores.page.scss'],
})
export class ColaboradoresPage implements OnInit {


  static CRUD_PESQUISAR: string = 'Pesquisar';
  static CRUD_CRIAR: string = 'Criar';
  static CRUD_SALVAR: string = 'Salvar';
  static APP_NAME: string = EnvService.name;

  public colaborador = new ColaboradoresModel();
  private colaboradores: Array<ColaboradoresModel> = [];
  // private navCtrl: NavController;
  public codigoFazenda: any;
  constructor(private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }



  ngOnInit() {
    let Fazenda = sessionStorage.getItem('codigoFazenda')

    this.codigoFazenda = atob(Fazenda);
    console.log('vlue of Fazenda :', this.codigoFazenda);


    // Getting data from another page
    this.activatedRoute.params.subscribe(
      data => {

        //"data" carries all the parameters
        this.colaborador.codigoColaborador = data.codigoColaborador;

        if (this.colaborador.codigoColaborador) {
          this.CRUDColaboradores(ColaboradoresPage.CRUD_PESQUISAR, null);
        }
        //Your logic

      }
    )

    //  goBack() {
    //       this.navCtrl.navigateRoot(['colaboradores-list']);
    //     }



  }




  cancel() {
    // this.navCtrl.navigateRoot('/menu/options/tabs/Colaboradores-list'); OLDER
    this.router.navigate(['colaboradores-list']); //NEWER

  }



  save(formColaboradores: NgForm) {


    console.log('formColaboradores: ', formColaboradores.value);
    if (formColaboradores.value.senha == formColaboradores.value.resenha) {
      if (this.colaborador.codigoColaborador) {
        this.CRUDColaboradores(ColaboradoresPage.CRUD_SALVAR, formColaboradores); //UPDATE
      }
      else {
        this.CRUDColaboradores(ColaboradoresPage.CRUD_CRIAR, formColaboradores); //CREATE
      }
    }
    else {
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: ColaboradoresPage.APP_NAME, pMessage: "Senha not correct" });
    }

  }

  CRUDColaboradores(StatusCRUD: string, formColaboradores: NgForm) {
    //this.colaborador=[];



    if (StatusCRUD == ColaboradoresPage.CRUD_CRIAR || StatusCRUD == ColaboradoresPage.CRUD_SALVAR) {
      if (formColaboradores.value.senha.trim() == '' || formColaboradores.value.resenha.trim() == '') {
        formColaboradores.value.senha = '';
        formColaboradores.value.resenha = '';
      } else {
        formColaboradores.value.senha = Md5.hashStr(formColaboradores.value.senha);
        formColaboradores.value.resenha = Md5.hashStr(formColaboradores.value.resenha);
      }





    }

    let params = {
      'StatusCRUD': StatusCRUD,
      'codigoColaborador': this.colaborador.codigoColaborador,
      'codigoFazenda': this.codigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'formValues': (formColaboradores) ? formColaboradores.value : "",
    };

    this.authService.QueryStoreProc('Executar', 'spCRUDColaboradores', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          console.log(resultado.message);
          this.alertService.presentToast(resultado.message);
          if (resultado.results) {
            this.colaborador.codigoColaborador = JSON.parse(resultado.results)[0].codigoColaborador;
            this.colaborador.nome = JSON.parse(resultado.results)[0].nome;
            this.colaborador.celular = JSON.parse(resultado.results)[0].celular;
            this.colaborador.senha = '';
            this.colaborador.resenha = '';

            this.colaborador.codigoFazenda = JSON.parse(resultado.results)[0].codigoFazenda;
            this.colaborador.email = JSON.parse(resultado.results)[0].email;

          }
          if (StatusCRUD != ColaboradoresPage.CRUD_PESQUISAR) this.router.navigate(['colaboradores-list']);

        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: ColaboradoresPage.APP_NAME, pMessage: resultado.message });
          this.router.navigate(['/login']); //NEWER
          //this.navCtrl.navigateRoot('/login'); OLDER
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: ColaboradoresPage.APP_NAME, pMessage: resultado.message });
        this.router.navigate(['/login']);
      }
    });
  }

  /*
   VALIDATION FUNCTION
   This one should be stored in an isolated file
 */


  isUndefined(value: string) {
    if (value == undefined) return true;
    else return false;
  }


}






