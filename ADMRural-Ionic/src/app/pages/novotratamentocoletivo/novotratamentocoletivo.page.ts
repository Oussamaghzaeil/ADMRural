import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-novotratamentocoletivo',
  templateUrl: './novotratamentocoletivo.page.html',
  styleUrls: ['./novotratamentocoletivo.page.scss'],
})
export class NovotratamentocoletivoPage implements OnInit {
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public valorUnitario: number;
  public valorTotal: number;
  public aplicacaodados: any[];
  public doses: any[];
  public medName: any[];
  public DataTratamentofinal: any;
  public tratamentos: any[] = [
    {
      id: 1,
      Tratamento: 'Medicamento'
    },
    {
      id: 2,
      Tratamento: 'Vacina'
    }
  ];
  public incluirPronto: string;
  public aplicacao: boolean = true;
  public j: boolean = true;
  public dados: any;
  public dadosaplicacao: any;
  public DataTratamento: any;
  public tipotratamento: any;
  public MedicamentoTratamento: any;
  public CodigoTratamento: any;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,

  ) { }
  public TipoEntrada: any;
  public i: number;
  public item: any;
  public animal: any;
  public Nome: String;
  public racao: string;
  public QuantidadeemEntrada: number;
  public Unidadementrada: string;
  public valor: number;
  public Datadaentrada: Date;
  public horadaentrada: Date;
  public Quantidade: number;
  public a: any;
  public ValorUnit: number;
  public id: number;
  public TipodeEntrada: string;
  public itemSelected: any;
  public value: string;
  public b: any;
  ngOnInit() {
    //console.log("ionViewDidEnter");
    this.MostraDadosanimais();
    /* this.MostraDadosAnimaisin(); */
    this.MostraDadosTratamento();
    this.MostraDadosMedicamento();
    this.MostraDadosaplicacao();

    /*     this.platform.backButton.subscribe(() => {
          this.goBack1();
        }) */

  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }
  ionViewWillLeave() {
  }
  ionViewDidLeave() {
  }
  /*   goBack() {
      this.navCtrl.navigateRoot('/tratamentocoletivo');
    } */
  goBack1() {
    this.navCtrl.navigateRoot('/tratamentocoletivo');
  }
  FilterJSONData(ev: any) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    console.log('event search bar:', ev.target.value)
    let search = ev.target.value;
    let params = {
      'StatusCRUD': 'Pesquisar_search_animais',
      'formValues': search,
      'CodigoFazenda': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
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
  MostraDadosanimais() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    let params = {
      'StatusCRUD': 'Pesquisar_animais',
      'formValues': CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });
  }
  selected(ev: any) {
    console.log('event click:', ev)
    console.log('evento click:', ev.detail.value)
    this.animal = ev.detail.value;
    console.log('evento click:', this.animal)
    // this.navCtrl.navigateRoot('/novoitem',ev);
  }
  goToAlimColetivo() {
    this.router.navigate(['/alimcoletivo', this.item]);
  }
  CriacaoNovo(form: NgForm) {
    this.incluirPronto = 'true';
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    console.log('id of animals selected from show function :', this.animal);
    let animalIdsplit: any;
    animalIdsplit = this.animal;
    console.log('id of animals selected from show function :', animalIdsplit[0]);
    //for (this.value of animalIdsplit) {
    for (var i = 0; i < animalIdsplit.length; i++) {
      console.log(animalIdsplit[i]);
      form.value.CodigoAnimalTratamento = animalIdsplit[i];
      form.value.CodigoFazenda = CodigoFazenda;
      console.log('codigo animal selected :', form.value.CodigoAnimalTratamento);
      //form.value.racao = this.racao.TipodeEntrada;
      let params = {
        'StatusCRUD': 'Salvar_Tratamento_Coletivo',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            this.CodigoTratamento = JSON.parse(resultado.results)[0].CodigoTratamento;
            console.log('value of codigo tratamento :', this.CodigoTratamento);
            this.incluirPronto = JSON.parse(resultado.results)[0].validation;
            console.log('value when it came :', this.incluirPronto);
            this.DataTratamento = JSON.parse(resultado.results)[0].DataTratamento;
            this.DataTratamentofinal = JSON.parse(resultado.results)[0].DataTratamentofinal;
            let U: any = JSON.parse(resultado.results)[0].TipoTratamento;
            if (typeof (U) == 'undefined')
              U = '';
            if (U == null)
              U = '';
            if (U != '')
              this.tipotratamento = U;
            this.MedicamentoTratamento = JSON.parse(resultado.results)[0].MedicamentoTratamento;
            console.log('the new codigo tratamento :', this.CodigoTratamento);
          }
          else {
            this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
        }
      });
    }
    this.alertService.presentAlert({ pTitle: 'Salvando alimentação...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });

  }
  goBack() {
    console.log('the value of this.incluirPronto :', this.incluirPronto)
    if (this.incluirPronto == undefined && this.CodigoTratamento == undefined) {
      this.navCtrl.navigateRoot('/tratamentocoletivo');
    }
    else
      if (this.incluirPronto == 'true') {

        let params = {
          'StatusCRUD': 'Delete_tratamento_prov',
          'formValues': this.CodigoTratamento,
          'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
          'Hashkey': sessionStorage.getItem("SessionHashkey"),
        };
        console.log("Delete:", params);
        this.Authorizer.QueryStoreProc('Executar', "spColetivo", params).then(res => {
          let resultado: any = res[0];
          console.log(resultado)
          try {
            if (resultado.success) {
              // this.alertService.presentAlert({ pTitle: 'Excluindo Medicamento..', pSubtitle: '', pMessage: 'Medicamento excluído com sucesso!' });
              //this.goBack();
            }
            else {
              //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este Medicamento!' });
              //this.navCtrl.navigateRoot('/login');
            }
          }
          catch (err) {
            //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Medicamento', pMessage: 'Nenhum usuário!' });
          }
        });
        this.alertService.presentAlert({ pTitle: 'Salvando Tratamento...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
        this.navCtrl.navigateRoot('/tratamentocoletivo');
      }
  }
  goToCreateMedicamento() {

    if (this.incluirPronto == 'true') {
      this.navCtrl.navigateRoot('/novomedicamentocoletivo');
      sessionStorage.setItem("CodigoTratamento", btoa(this.CodigoTratamento))
      console.log('codigo tratamento coletivo :', this.CodigoTratamento)

    } else {
      this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: '', pMessage: 'Precisa salvar o tratamento antes incluir medicamento!' });
    }

  }
  goToViewMedicamento(Codigomedicamento) {
    console.log("Codigo medicamento", Codigomedicamento);
    this.navCtrl.navigateRoot('/viewmedicamentocoletivo', Codigomedicamento);
    sessionStorage.setItem("Codigomedicamento", btoa(Codigomedicamento))
  }
  MostraDadosTratamento() {
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of Codigo Tratamento:', atob(CodigoTratamento));
    CodigoTratamento = atob(CodigoTratamento);
    let params = {
      'StatusCRUD': 'Pesquisar_dados_tratamento',
      'formValues': CodigoTratamento,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.CodigoTratamento = JSON.parse(resultado.results)[0].CodigoTratamento;
          console.log('value of codigo tratamento :', this.CodigoTratamento);
          this.incluirPronto = JSON.parse(resultado.results)[0].validation;
          console.log('value when it came :', this.incluirPronto);
          this.DataTratamento = JSON.parse(resultado.results)[0].DataTratamento;
          this.DataTratamentofinal = JSON.parse(resultado.results)[0].DataTratamentofinal;
          let U: any = JSON.parse(resultado.results)[0].TipoTratamento;
          if (typeof (U) == 'undefined')
            U = '';
          if (U == null)
            U = '';
          if (U != '')
            this.tipotratamento = U;
          this.MedicamentoTratamento = JSON.parse(resultado.results)[0].MedicamentoTratamento;
        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });
  }
 /*  MostraDadosAnimaisin() {
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of Codigo Tratamento:', atob(CodigoTratamento));
    CodigoTratamento = atob(CodigoTratamento);
    let params = {
      'StatusCRUD': 'Pesquisar_Animais_tratamento',
      'formValues': CodigoTratamento,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
          console.log('value of animals selected:',this.a);
        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });
  } */
  MostraDadosMedicamento() {
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of Codigo Tratamento:', atob(CodigoTratamento));
    CodigoTratamento = atob(CodigoTratamento);
    let params = {
      'StatusCRUD': 'Pesquisar_medicamentos_coletivo',
      'formValues': CodigoTratamento,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.dados = JSON.parse(resultado.results);
        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });
  }
  MostraDadosaplicacao() {
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of Codigo Tratamento:', atob(CodigoTratamento));
    CodigoTratamento = atob(CodigoTratamento);
    let params = {
      'StatusCRUD': 'Pesquisar_aplicacao_coletivo',
      'formValues': CodigoTratamento,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.dadosaplicacao = JSON.parse(resultado.results);
        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });
  }

}




