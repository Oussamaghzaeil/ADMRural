import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
})
export class RelatoriosPage implements OnInit {

  public relatorio = new Relatorios();
  public TipoDespesas: Array<any> = [];
  public TipoRelatorios: Array<any> = [];
  public CodigoFazenda: any;
  public fazendas: any;

  //Check boxes
  // public visualizar: boolean = false;
  // public email: boolean = false;



  constructor(public platform: Platform,
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private alertService: AlertService, ) {

  }

  ngOnInit() {

    this.TipoDespesas = this.cargarDespesa();
    this.TipoRelatorios = this.cargarRelatorios();

    this.CRUDFazenda('Pesquisar', null, null);

    if (sessionStorage.getItem('CodigoFazenda')) {
      this.CodigoFazenda = atob(sessionStorage.getItem('CodigoFazenda'));
    }

    if (sessionStorage.getItem('CodigoRelatorio')) {
      this.relatorio.Codigo = atob(sessionStorage.getItem('CodigoRelatorio'));
      this.CRUDAnotacoes('Pesquisar', null, this.relatorio.Codigo);
    }


    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }

  save(formRelatorio: NgForm) {

    if (formRelatorio.value.SendEmail) {
      //HERE, you have to validate that 'Papi'
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formRelatorio.value.Email)) {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: 'Email incorrecto' });
        return
      }
    }

    if (!this.relatorio.Visualizar && !this.relatorio.SendEmail) {
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: 'Selecione uma opção' });
      return
    }

    if (this.relatorio.Visualizar) {
      this.callPDF()
    }
    else {
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: 'O e-mail está sendo enviando a: ' + this.relatorio.Email });
    }


    //WE NEED TO CALL THE PAGE

    // if (this.relatorio.Codigo) {
    //   this.CRUDAnotacoes('Salvar', formRelatorio, this.relatorio.Codigo);
    // }
    // else {
    //   this.CRUDAnotacoes('Criar', formRelatorio, null);
    // }
  }

  callPDF() {

    // ADD parameters to send it like GET
    let params = new HttpParams()
      .set("usuario", JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario ? this.encripta(JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario) : "")
      .set("fazenda", this.relatorio.CodigoFazenda ? this.encripta(this.relatorio.CodigoFazenda) : "")
      .set("tipo_despesa", this.relatorio.TipoDespesa ? this.encripta(this.relatorio.TipoDespesa) : "")
      .set("inicio", this.relatorio.DataInicial ? this.encripta(this.relatorio.DataInicial) : "")
      .set("fim", this.relatorio.DataFinal ? this.encripta(this.relatorio.DataFinal) : "")


    switch (this.relatorio.TipoRelatorio) {
      case '1': //  { codigo: 1, value: 'Custo Geral' },
        window.open("http://undercode.tecnologia.ws/animal/asp/custo.asp?" + params, '_system')
        // window.open("http://undercode.tecnologia.ws/animal/asp/custo.asp?" + params)
        break;
      case '2': // { codigo: 2, value: 'Animais' },
        window.open("http://undercode.tecnologia.ws/animal/asp/animal.asp?" + params, '_system')
      case '3': // { codigo: 3, value: 'Plantacoes' },
        window.open("http://undercode.tecnologia.ws/animal/asp/plantacao.asp?" + params, '_system')
      case '4': //  { codigo: 4, value: 'Estoque' }
        window.open("http://undercode.tecnologia.ws/animal/asp/coleta.asp?" + params, '_system')
        break;
      default:
      // code block
    }


  }

  CRUDFazenda(StatusCRUD: string, formFazenda: NgForm, CodigoFazenda: string) {

    let params = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': StatusCRUD,
      'CodigoFazenda': (CodigoFazenda) ? CodigoFazenda : "",
      'formValues': (formFazenda) ? formFazenda.value : "",

    };

    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {

          switch (StatusCRUD) {
            case 'Pesquisar':
              if (resultado.results) {

                this.fazendas = JSON.parse(resultado.results);

              }
              break;
            default:
            // code block
          }
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: resultado.message });
          this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: resultado.message });
        this.navCtrl.navigateRoot('/login');
      }
    });

  }

  CRUDAnotacoes(StatusCRUD: string, formRelatorio: NgForm, CodigoRelatorio: string) {

    if (formRelatorio) {
      formRelatorio.value.CodigoFazenda = this.CodigoFazenda;
    }

    let params = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': StatusCRUD,
      'CodigoRelatorio': (CodigoRelatorio) ? CodigoRelatorio : "",
      'formValues': (formRelatorio) ? formRelatorio.value : { 'CodigoFazenda': this.CodigoFazenda },

    };

    this.Authorizer.QueryStoreProc('Executar', 'spCRUDRelatorios', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {

          switch (StatusCRUD) {
            case 'Criar':
              this.navCtrl.navigateRoot('/relatorios-list');
              break;
            case 'Salvar':
              this.navCtrl.navigateRoot('/relatorios-list');
              break;
            case 'Pesquisar':
              if (resultado.results) {

                this.relatorio.TipoRelatorio = String(JSON.parse(resultado.results)[0].TipoRelatorio);
                this.relatorio.TipoDespesa = String(JSON.parse(resultado.results)[0].TipoDespesa);
                this.relatorio.DataInicial = JSON.parse(resultado.results)[0].DataInicial;
                this.relatorio.DataFinal = JSON.parse(resultado.results)[0].DataFinal;
                this.relatorio.Email = JSON.parse(resultado.results)[0].Email;


              } else {
                this.relatorio = new Relatorios();
              }
              break;
            default:
            // code block
          }
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: resultado.message });
          this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Anotacoes', pMessage: resultado.message });
        this.navCtrl.navigateRoot('/login');
      }
    });

  }

  checkVisualizar() {
    this.relatorio.Visualizar ? this.relatorio.SendEmail = false : null;
  }

  checkSendEmail() {
    this.relatorio.SendEmail ? this.relatorio.Visualizar = false : null;
  }

  goBack() {
    this.navCtrl.navigateRoot('/menu/options/tabs/main');
  }

  private encripta(valor: string): string {
    let retorno: string;
    let stexto: string;
    retorno = "";
    try {
      stexto = valor.trim();
    } catch (err) {
      stexto = valor;
    }
    if (stexto == null)
      stexto = "";
    if (stexto == "")
      return stexto;
    while (true) {
      let letra: string;
      let nnumero: number;
      let snumero: string;
      if (stexto.length > 1)
        letra = stexto.substring(0, 1);
      else
        letra = stexto;

      nnumero = letra.toString().charCodeAt(0);
      nnumero += 166;
      snumero = nnumero.toString();
      if (snumero.length < 3)
        snumero = "0" + snumero;
      if (snumero.length < 3)
        snumero = "0" + snumero;

      retorno += snumero;
      if (stexto.length > 1)
        stexto = stexto.substring(1);
      else
        stexto = "";
      if (stexto == "")
        break;
    }
    return retorno;
  }

  cargarDespesa() {
    return [
      { codigo: 1, value: 'Todas' },
      { codigo: 2, value: 'Apropiada' },
      { codigo: 3, value: 'Nao Apropiada' }
    ]
  }

  cargarRelatorios() {
    return [
      { codigo: 1, value: 'Custo Geral' },
      { codigo: 2, value: 'Animais' },
      { codigo: 3, value: 'Plantacoes' },
      { codigo: 4, value: 'Estoque' }
    ]
  }
}

class Relatorios {
  Codigo: string;
  CodigoFazenda: string;
  TipoRelatorio: string;
  TipoDespesa: string;
  DataInicial: string;
  DataFinal: string;
  Email: string;
  Visualizar: boolean = false;
  SendEmail: boolean = false;
}
