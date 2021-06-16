import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-aplicacadomedicamento-coletivo',
  templateUrl: './aplicacadomedicamento-coletivo.page.html',
  styleUrls: ['./aplicacadomedicamento-coletivo.page.scss'],
})
export class AplicacadomedicamentoColetivoPage implements OnInit {
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public valorUnitario: number;
  public valorTotal: number;
  public DataTratamento :String;
  public TipoTratamento :String;
  public MedicamentoTratamento :String;
  public dados :any; 
  public dadosaplicacao :any;
  public DataTratamentofinal : any;
  public tipos: string[] = ["Vacina", "Medicamento"];
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
  ) { }
  public TipoEntrada: any;
  public racao: string;
  public Unidadementrada: string;
  public Quantidade: number;
  public a: any;
  public b: any;
  public observacao: String;
  public Datadealimentacao: Date;
  public selected: boolean = true;
  public j: boolean = true;
  ngOnInit() {
    this.MostraDados();
    this.MostraDadosmed();
    this.MostraDadosaplicacao();
    this.platform.backButton.subscribe(() => {
      this.goBack1();
    })
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }
  ionViewWillLeave() {
  }
  ionViewDidLeave() {
  }
  goBack() {
    this.navCtrl.navigateRoot('/tratamentocoletivo');
  }
  goBack1() {
    this.navCtrl.navigateRoot('/tratamentocoletivo');
  }
  goToCreateMedicamento() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    console.log('vlue of CodigoTratamento :', atob(Codigoitem)); 
    sessionStorage.setItem("Codigoitem", Codigoitem)
      this.navCtrl.navigateRoot('/novomedicamentocoletivoedit');

    }
  goToAguardandoColetivo(){

    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of CodigoTratamento :', atob(CodigoTratamento)); 
    CodigoTratamento =atob(CodigoTratamento);
    this.navCtrl.navigateRoot('/viewcoletivotratamento');
    sessionStorage.setItem("CodigoTratamento", btoa(CodigoTratamento))
  }
  onChangeSituacao(ev: any) {
    console.log('item selected :', ev);
    if (this.j) {
      this.j = false;
      console.log('item selected :', this.j)
      this.selected = false;
      console.log('item selected :', this.selected)
    }
    else {
      this.selected = true;
      console.log('item selected :', this.selected)
      this.j = true;
      console.log('item  :', this.j)
    }
  }
  
  goToViewMedicamento(Codigomedicamento) {
    console.log("Codigo medicamento", Codigomedicamento);
    this.navCtrl.navigateRoot('/viewmedicamentocoletivoedit', Codigomedicamento);
    sessionStorage.setItem("Codigomedicamento", btoa(Codigomedicamento))
  }

  goToViewAplicacao(CodigoAplicacao) {
    console.log("Codigo Aplicacao", CodigoAplicacao);
    this.navCtrl.navigateRoot('/aplicacaomedicamentocoletivo', CodigoAplicacao);
    sessionStorage.setItem("CodigoAplicacao", btoa(CodigoAplicacao))
  }

  MostraDados() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
    let params = {
      'StatusCRUD': 'Monstradados_Tra_Coletivo_Edit',
      'formValues': Codigoitem,
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
          this.MedicamentoTratamento = JSON.parse(resultado.results)[0].MedicamentoTratamento;
          this.DataTratamento = JSON.parse(resultado.results)[0].DataTratamento;
          this.DataTratamentofinal = JSON.parse(resultado.results)[0].DataTratamentofinal;
          let U: any = JSON.parse(resultado.results)[0].TipoTratamento;
          if (typeof (U) == 'undefined')
            U = '';
          if (U == null)
            U = '';
          if (U != '')
            this.TipoTratamento = U;
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Alimentacao Coletivo', pMessage: 'Nenhum dados' });
        }
      } catch (err) {
      }
    });
  }

  MostraDadosmed() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
    let params = {
      'StatusCRUD': 'Monstradados_MEd_Coletivo_Edit',
      'formValues': Codigoitem,
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
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
    let params = {
      'StatusCRUD': 'Monstradados_Apli_Coletivo_Aplicado_Edit',
      'formValues': Codigoitem,
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
  atualizar(form: NgForm) {
    // paramStatus: Pesquisando, Editando, Deletando 
    let CodigoTratamento = sessionStorage.getItem('Codigoitem')
    console.log('vlue of CodigoTratamento :', atob(CodigoTratamento)); 
    
      form.value.CodigoTratamento = atob(CodigoTratamento);   
      let params = {
        'StatusCRUD': 'Gravar_Tratamento',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      console.log('formm: ', form)
      console.log("gravar:", params);
      this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
            //this.navCtrl.navigateRoot('/login');
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Editar Tratamento', pMessage: 'Nenhum usuário!' });
        }
      });
  }

}




