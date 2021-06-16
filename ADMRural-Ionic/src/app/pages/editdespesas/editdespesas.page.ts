import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editdespesas',
  templateUrl: './editdespesas.page.html',
  styleUrls: ['./editdespesas.page.scss'],
})
export class EditdespesasPage implements OnInit {

  public CodigoFazenda: any;
  public NomeFazenda: any;

  public CodigoDespesa: any;
  public opcao: any;

  public classesDespesa: any;
  public ClasseSelected: any;

  public CodigoClasseDespesa: any;
  public NomeClasseDespesa: any;
  public CodigoTipoDespesa: any;
  public DataDespesa: any;
  public HoraDespesa: any;
  public ValorDespesa: any;
  public Observacao: any;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/despesasfazenda');
    })

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    this.CodigoFazenda = atob(CodigoFazenda)
    console.log('CodigoFazenda :', this.CodigoFazenda);

    let CodigoDespesa = sessionStorage.getItem('CodigoDespesa')
    this.CodigoDespesa = atob(CodigoDespesa)
    console.log('CodigoDespesa:', this.CodigoDespesa);

    this.MostrarNomeFazenda();
    //this.ConsulaClasse();

    if (this.CodigoDespesa) {
      this.opcao = 2;
      //console.log('information')
      this.mostrarInfoDespesa(this.CodigoDespesa);
    } else {
      this.opcao = 1;
      // console.log('new')
    }

    this.activatedRoute.params.subscribe(
      data => {
        //console.log('Classe despesa value:', this.ClasseSelected);
        if (data.ClasseDesp) {
          this.ClasseSelected = data.ClasseDesp;
          this.ConsulaClasse(this.ClasseSelected);
        }
        //console.log('Classe despesa value after:', this.ClasseSelected);
      }
    )
  }

  goBack() {
    this.navCtrl.navigateRoot('/despesasfazenda');
  }
  /* ------------------------------ SHOW THE NAME OF THE FAZENDA ---------------------------------------  */
  MostrarNomeFazenda() {
    let params = {
      'StatusCRUD': 'Pesquisar_Fazenda',
      'CodigoFazenda': this.CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
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
  /* ------------------------------ SHOW THE NAME OF THE FAZENDA ---------------------------------------  */
  /* ---------------------------------------- SELECT CLASSE ----------------------------------------------  */
  ConsulaClasse(codClasseDesp: any) {
    let params = {
      'StatusCRUD': '',
      'CodigoClasseDespesa': codClasseDesp,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spConsultaClasseDespesa', params).then(res => {
      let resultado: any = res[0];
      //console.log("ClassesDespesa", JSON.parse(resultado.results))
      if (resultado.success) {
        this.CodigoClasseDespesa = JSON.parse(resultado.results)[0].CodigoClasseDespesa;
        this.NomeClasseDespesa = JSON.parse(resultado.results)[0].NomeClasseDespesa;
      }
    });
  }
  /* ---------------------------------------- END SELECT CLASSE ----------------------------------------------  */
  goInsertClasse() {
    this.navCtrl.navigateRoot('/editclassadespesa');
  }
  /* ------------------------------------------ NEW EXPENSE --------------------------------------------------  */
  Atualizar(form: NgForm) {
    //console.log('Formulario:', form)
    let params = {
      'StatusCRUD': 'Nova_Despesa',
      'formValues': form.value,
      'CodigoFazenda': this.CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      //  console.log("Respuesa", JSON.parse(resultado.results))
      if (resultado.success) {
        this.alertService.presentAlert({ pTitle: 'Salvando Despesa...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
        //this.alertService.showLoader(resultado.message, 500);
        this.goBack();
      }
    });
  }
  /* ------------------------------------------ END NEW EXPENSE --------------------------------------------------  */
  mostrarInfoDespesa(codDespesa: any) {
    let params = {
      'StatusCRUD': 'Info_Despesa',
      'CodDespesa': codDespesa,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      console.log("ClassesDespesa", JSON.parse(resultado.results))
      if (resultado.success) {
        this.CodigoClasseDespesa = (JSON.parse(resultado.results)[0].CodigoClasseDespesa).toString();
        this.NomeClasseDespesa = JSON.parse(resultado.results)[0].NomeClasseDespesa;
        this.CodigoTipoDespesa = (JSON.parse(resultado.results)[0].CodigoTipoDespesa).toString();
        this.DataDespesa = JSON.parse(resultado.results)[0].DataDespesa;
        this.HoraDespesa = JSON.parse(resultado.results)[0].HoraDespesa;
        this.ValorDespesa = JSON.parse(resultado.results)[0].ValorDespesa;
        this.Observacao = JSON.parse(resultado.results)[0].Observacao;
      }
    });

  }

}
