import { Component, OnInit } from '@angular/core';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editclassadespesa',
  templateUrl: './editclassadespesa.page.html',
  styleUrls: ['./editclassadespesa.page.scss'],
})
export class EditclassadespesaPage implements OnInit {

  public ClasseDesp: any;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private alertService: AlertService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.goBack1();
    })
  }

  goBack1() {
    this.navCtrl.navigateRoot('/editdespesas');
  }

  /* ---------------------------------- SHOW DATA ----------------------------------------- */
  public a: any;
  MostraDados() {      
    let params = {
      'StatusCRUD': 'Pesquisar_classe_despesa',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      //console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Classe Depesa', pMessage: 'Nenhum Classe salvo' });
        }
      } catch (err) {
      }
    });
  }
/* ---------------------------------- END SHOW DATA ----------------------------------------- */
/* ---------------------------------- SEARCH DATA ----------------------------------------- */
  FilterJSONData(ev: any) {
    //console.log('event search bar:', ev.target.value)
    let search = ev.target.value;
    let params = {
      'StatusCRUD': 'search_classe_despesa',
      'formValues': search,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      //console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: resultado.message });
        }
      } catch (err) {
      }
    });
  }
  /* ---------------------------------- END SEARCH DATA ----------------------------------------- */
/* ---------------------------------- SELECT DATA AND SEND TO novadespesa ----------------------------------------- */
  selected(ev: any) {
    //console.log('event click:', ev)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.ClasseDesp = ev;
    this.goBack();
  }
  goBack() {
    this.router.navigate(['/editdespesas', this.ClasseDesp]);
  }
  /* ---------------------------------- END SELECT DATA AND SEND TO novadespesa ----------------------------------------- */
/* --------------------------------------------- NEW CLASSE DESPESA ----------------------------------------------------- */
  async presentAlertPrompt() {
    //console.log(situa)
    const alert = await this.alertCtrl.create({
      header: 'Nova Classe',
      subHeader: 'Insira nova classe',
      inputs: [
        {
          name: 'NomeClasseDespesa',
          type: 'text',
          placeholder: 'Digite Nome'
        },
      ],
      buttons: [
        {
          text: 'Desistir',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: data => {
              this.NovaClasse(data.NomeClasseDespesa);
          }
        }
      ]
    });
    await alert.present();
  }

  NovaClasse(Nome:any){
    let params = {
      'StatusCRUD': 'NovaClasse',
      'NomeClasseDespesa': Nome,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      //  console.log("Respuesa", JSON.parse(resultado.results))
      if (resultado.success) {
        this.alertService.presentAlert({ pTitle: 'Salvando Classe...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
        //this.alertService.showLoader(resultado.message, 500);
        this.MostraDados();
      }
    });
  }
  /* -------------------------------------------- END NEW CLASSE DESPESA ---------------------------------------------------- */

}
