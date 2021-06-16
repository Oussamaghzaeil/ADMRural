import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService, } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-novotratamento',
  templateUrl: './novotratamento.page.html',
  styleUrls: ['./novotratamento.page.scss'],
})
export class NovotratamentoPage implements OnInit {
  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('form') form: NgForm;
  public aplicacaodados: any[];
  public doses: any[];
  public medName: any[];
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
  public DataTratamentofinal: any;
  public MedicamentoTratamento: any;
  public CodigoTratamento: number;
  masks: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) { }
  ngOnInit() {
    //console.log("ionViewDidEnter");
    console.log('tratamentos :', this.tratamentos)
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    CodigoAnimal = atob(CodigoAnimal)
    console.log('vlue of CodigoAnimal :', CodigoAnimal);
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    console.log('the value of this.incluirPronto :', this.incluirPronto)
    this.MostraDadosTratamento();
    this.MostraDados();
    this.MostraDadosaplicacao();
  }
  ionViewWillLeave() {
  }
  ionViewDidLeave() {
  }
  goBack() {
    console.log('the value of this.incluirPronto :', this.incluirPronto)
    if (this.incluirPronto == undefined && this.CodigoTratamento == undefined) {
      this.navCtrl.navigateRoot('/vacina');
    }
    else
      if (this.incluirPronto == 'true') {
        let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
        console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
        CodigoAnimal = atob(CodigoAnimal);
        let params = {
          'StatusCRUD': 'Delete_tratamento_prov',
          'formValues': CodigoAnimal,
          'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
          'Hashkey': sessionStorage.getItem("SessionHashkey"),
        };
        console.log("Delete:", params);
        this.Authorizer.QueryStoreProc('Executar', "spAnimal", params).then(res => {
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
        this.navCtrl.navigateRoot('/vacina');
      }
  }
  Criacao(form: NgForm) {
    this.incluirPronto = 'true';
    console.log('the value of this.incluirPronto :', this.incluirPronto)

    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    form.value.CodigoAnimalTratamento = atob(CodigoAnimal);
    form.value.validate = 'true';
    let params = {
      'StatusCRUD': 'Criacao_tratamento',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Novo Tratamento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Tratamento...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          //this.alertService.showLoader(resultado.message, 1000);
        } else {
          //this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    }
    );
  }
  goToCreateMedicamento() {

    if (this.incluirPronto == 'true') {
      this.navCtrl.navigateRoot('/novomedicamento');

    } else {
      this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: '', pMessage: 'Precisa salvar o tratamento antes incluir medicamento!' });
    }

  }
  goToViewMedicamento(Codigomedicamento) {
    console.log("Codigo medicamento", Codigomedicamento);
    this.navCtrl.navigateRoot('/viewmedicamento', Codigomedicamento);
    sessionStorage.setItem("Codigomedicamento", btoa(Codigomedicamento))
  }
  MostraDadosTratamento() {
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    CodigoAnimal = atob(CodigoAnimal);
    let params = {
      'StatusCRUD': 'Pesquisar_dados_tratamento',
      'formValues': CodigoAnimal,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.CodigoTratamento = JSON.parse(resultado.results)[0].idTratamento;
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
  MostraDados() {
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    CodigoAnimal = atob(CodigoAnimal);
    let params = {
      'StatusCRUD': 'Pesquisar_medicamentos',
      'formValues': CodigoAnimal,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
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
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    CodigoAnimal = atob(CodigoAnimal);
    let params = {
      'StatusCRUD': 'Pesquisar_aplicacao',
      'formValues': CodigoAnimal,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
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





