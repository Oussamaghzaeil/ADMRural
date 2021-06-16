import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-edittratamento',
  templateUrl: './edittratamento.page.html',
  styleUrls: ['./edittratamento.page.scss'],
})
export class EdittratamentoPage implements OnInit {
  @ViewChild('Nome') iNome;
  public CodigoAnimalTratamento: number;
  public DataTratamento: String;
  public TipoTratamento: String;
  public MedicamentoTratamento: String;
  public dados: any;
  public dadosaplicacao: any;
  public CodigoTratamento: any;
  public DataTratamentofinal: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
  ) { }
  public tipos: string[] = ["Vacina", "Medicamento"];
  ngOnInit() {
    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/vacina');
    })
  }
  ionViewDidEnter() {
    this.MostraDadosmed();
    this.MostraDadosaplicacao();
    console.log("ionViewDidEnter");
    this.MostraDados();
  }
  ionViewWillEnter() { }
  ionViewWillLeave() {
    console.log('hello world1')
  }
  ionViewDidLeave() {
  }
  goBack() {
    this.navCtrl.navigateRoot('/vacina');
  }
  goToCreateMedicamento() {

    this.navCtrl.navigateRoot('/novomedicamentoedit');
  }
  MostraDados() {
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of CodigoTratamento :', atob(CodigoTratamento));
    let params = {
      'StatusCRUD': 'Pesquisar_edittratamento',
      'formValues': atob(CodigoTratamento),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.CodigoAnimalTratamento = JSON.parse(resultado.results)[0].CodigoAnimalTratamento;
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
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Tratamento', pMessage: 'Não tratamento' });

      }
    });

  }

  goToViewMedicamento(Codigomedicamento) {
    console.log("Codigo medicamento", Codigomedicamento);
    this.navCtrl.navigateRoot('/viewmedicamentoedit', Codigomedicamento);
    sessionStorage.setItem("Codigomedicamento", btoa(Codigomedicamento))
  }


  goToViewAplicacao(CodigoAplicacao) {
    console.log("Codigo Aplicacao", CodigoAplicacao);
    this.navCtrl.navigateRoot('/aplicacaomedicamento', CodigoAplicacao);
    sessionStorage.setItem("CodigoAplicacao", btoa(CodigoAplicacao))
  }

  goToAplicado() {
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    CodigoAnimal = atob(CodigoAnimal);
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of CodigoTratamento :', atob(CodigoTratamento));
    CodigoTratamento = atob(CodigoTratamento);
    this.navCtrl.navigateRoot('/aplicacadomedicamento');
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
    sessionStorage.setItem("CodigoTratamento", btoa(CodigoTratamento))
  }
  MostraDadosmed() {
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    CodigoAnimal = atob(CodigoAnimal);
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of CodigoTratamento :', atob(CodigoTratamento));
    let params = {
      'StatusCRUD': 'Pesquisar_medicamentos',
      'formValues': CodigoAnimal,
      'CodigoTratamento': atob(CodigoTratamento),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spTratamentosAnimal', params).then(res => {
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
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of CodigoTratamento :', atob(CodigoTratamento));
    let params = {
      'StatusCRUD': 'Pesquisar_aplicacao',
      'formValues': CodigoAnimal,
      'CodigoTratamento': atob(CodigoTratamento),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spTratamentosAnimal', params).then(res => {
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
    let CodigoTratamento = sessionStorage.getItem('CodigoTratamento')
    console.log('vlue of CodigoTratamento :', atob(CodigoTratamento));

    form.value.CodigoTratamento = atob(CodigoTratamento);
    let params = {
      'StatusCRUD': 'Gravar',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('formm: ', form)
    console.log("gravar:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spTratamentosAnimal', params).then(res => {
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
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Editar Tratamento', pMessage: 'Nenhum usuário!' });
      }
    });
  }



}






