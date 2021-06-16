import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-despesasfazenda',
  templateUrl: './despesasfazenda.page.html',
  styleUrls: ['./despesasfazenda.page.scss'],
})
export class DespesasfazendaPage implements OnInit {

  public CodigoFazenda: any;

  public anosDespesas: any;
  public ano: any = "";
  public mesDespesas: any;
  public mes: any = "";

  public NomeFazenda: any;
  public infotbDespesas: any; //data despensas
  public searchDespesas: any; // data for search

  public datasearch: any

  constructor(
    private navCtrl: NavController,
    public platform: Platform,
    private Authorizer: AuthService,
    private alertCtrl: AlertController,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    let i = sessionStorage.getItem('CodigoFazenda')
    //console.log('Cod Fazenda :', atob(i));
    this.CodigoFazenda = atob(i);
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/despesas');
    })
    this.MostrarAnos();
    this.MostrarMes();
    this.MostrarDadosFazenda();
    this.MostraDadosDespesa();
  }
  goBack() {
    this.navCtrl.navigateRoot('/despesas');
  }
  goToo(CodigoDespesa) {
    console.log("Codigo despesa", CodigoDespesa);
    this.navCtrl.navigateRoot('/editdespesas', CodigoDespesa);
    sessionStorage.setItem("CodigoDespesa", btoa(CodigoDespesa))
  }

/* ---------------------------------- SHOW THE NAME OF THE FAZENDA -------------------------------- */
  MostrarDadosFazenda() { 
    let params = {
      'StatusCRUD': 'Pesquisar_Fazenda',
      'CodigoFazenda': this.CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      //console.log("NomeFazenda", JSON.parse(resultado.results))
      if (resultado.success) {
        this.NomeFazenda = JSON.parse(resultado.results)[0].NomeFazenda;
      }
    });
  }
/* ---------------------------------- END SHOW THE NAME OF THE FAZENDA -------------------------------- */
/* ---------------------------------- BRING YEARS (NOT REPEAT) -------------------------------- */
MostrarAnos() { 
  let params = {
    'StatusCRUD': 'Info_Ano',
    'CodigoFazenda': this.CodigoFazenda,
    'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
    'Hashkey': sessionStorage.getItem("SessionHashkey"),
  };
  //console.log('params', params)
  this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
    let resultado: any = res[0];
    //console.log("NomeFazenda", JSON.parse(resultado.results))
    if (resultado.success) {
      this.anosDespesas = JSON.parse(resultado.results);
    }
  });
}
/* ---------------------------------- END BRING YEARS (NOT REPEAT) -------------------------------- */
/* ---------------------------------- BRING MONTH (NOT REPEAT) -------------------------------- */
MostrarMes() { 
  let params = {
    'StatusCRUD': 'Info_Mes',
    'CodigoFazenda': this.CodigoFazenda,
    'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
    'Hashkey': sessionStorage.getItem("SessionHashkey"),
  };
  //console.log('params', params)
  this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
    let resultado: any = res[0];
    //console.log("NomeFazenda", JSON.parse(resultado.results))
    if (resultado.success) {
      this.mesDespesas = JSON.parse(resultado.results);
    }
  });
}
/* ---------------------------------- END BRING MONTH (NOT REPEAT) -------------------------------- */
/* ---------------------------------- SHOW DATA OF THE FARM EXPENSES -------------------------------- */
  MostraDadosDespesa() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    let params = {
      'StatusCRUD': 'Pesquisar_Despesa',
      'CodigoFazenda': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      if (resultado.success) {
        this.infotbDespesas = JSON.parse(resultado.results);
        this.searchDespesas = JSON.parse(resultado.results);
        this.ano = (JSON.parse(resultado.results)[0].DataDespesa.toString()).substring(0,4);
        this.mes = (JSON.parse(resultado.results)[0].DataDespesa.toString()).substring(5,7);
      }
    });
  }
  /* ---------------------------------- END SHOW DATA OF THE FARM EXPENSES -------------------------------- */
  /* ---------------------------------- SEARCH BY CLASSE and DATE ----------------------------------------- */
  getItems(ev: any) {
    //this.CarregaMenuPrincipalStatic();
     this.infotbDespesas = this.searchDespesas;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.infotbDespesas = this.infotbDespesas.filter((item) => {
        return (
          (item.NomeClasseDespesa.toLowerCase().indexOf(val.toLowerCase()) > -1)
          //||(item.Observacao.toLowerCase().indexOf(val.toLowerCase()) > -1)
        );
      })
    }
  }
  onSearchChange(data: any) {
    let myForm: FormGroup;
      
      	myForm = this.formBuilder.group({
      		ano: this.ano,
      		mes: this.mes
      	});
    let params = {
      'StatusCRUD': 'pesqDespesa_por_data',
      'CodigoFazenda': this.CodigoFazenda,
      'formValues': myForm.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      //console.log("resultado", resultado)
      if (resultado.success) {
        this.infotbDespesas = JSON.parse(resultado.results);
        this.searchDespesas = JSON.parse(resultado.results);
      } else{
        this.alertService.presentAlert({
              pTitle: 'SEM DESPESAS', pSubtitle: 'Despesas', pMessage: 'Não há despesas nesta data'
            });
      }

    });
}
/* ---------------------------------- END SEARCH BY CLASSE and DATE ----------------------------------------- */

/* ------------------------------------- CONFIRM DELETE ALERT ------------------------------------------ */
  ConfirmDelete(codDespesa: any) {
    let alert = this.alertCtrl.create({
      message: 'Tem certeza de que deseja excluir despesa permanentemente?',
      buttons: [
        {
          text: 'Desistir',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            //console.log(codDespesa);
            this.Excluir(codDespesa);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  /* ----------------------------------- END CONFIRM DELETE ALERT ------------------------------------- */
/* --------------------------------------- DELETE  --------------------------------------------------- */
  Excluir(codDespesa: any) { 
    let params = {
      'StatusCRUD': 'excluir_despesa',
      'CodDespesa': codDespesa,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      if (resultado.success) {
        this.MostrarDadosFazenda();
        this.MostraDadosDespesa();
        this.alertService.presentAlert({ pTitle: 'Removendo Despesa...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
      }
    });
  }
  /* --------------------------------------- END DELETE  --------------------------------------------------- */
  /* --------------------------------------- GO TO CREAT NEW DESPESA --------------------------------------- */

  goTo(){
    this.navCtrl.navigateRoot('/novadespesa', this.CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(this.CodigoFazenda))
    sessionStorage.setItem("CodigoDespesa", '')
  }

  /* --------------------------------------- END GO TO CREAT NEW DESPESA --------------------------------------- */
  showInfo(CodigoDespesa: any){
    this.navCtrl.navigateRoot('/novadespesa', CodigoDespesa);
    sessionStorage.setItem("CodigoDespesa", btoa(CodigoDespesa))
    //sessionStorage.setItem("CodigoFazenda", '')
  }


}
