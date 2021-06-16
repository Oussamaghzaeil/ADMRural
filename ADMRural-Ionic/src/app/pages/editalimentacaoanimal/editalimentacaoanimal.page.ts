import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-editalimentacaoanimal',
  templateUrl: './editalimentacaoanimal.page.html',
  styleUrls: ['./editalimentacaoanimal.page.scss'],
})
export class EditalimentacaoanimalPage implements OnInit {
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;

  @ViewChild('form') form: NgForm;

  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public Datadealimentacaoinicial: Date;
  public Datadealimentacaofinal: Date;
  public horadaentrada: string;
  public Quantidade: number;
  public Observacao: string;
  public Situacao: string;
  public valorUnitario: number;
  public valorTotal: number;
  public QuantidadeemEntrada: number;
  public Unidadementrada: string;
  public id: number;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public alertController: AlertController
  ) { }

  public AppName: String = 'ADM Rural';
  public Nome: String;
  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/alimentacaoanimal');
    })
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");
  }
  ionViewWillLeave() { }

  ionViewDidLeave() { }

  goBack() {
    this.navCtrl.navigateRoot('/alimentacaoanimal');
  }
  atualizar(form: NgForm) {
    let Codigoitem = sessionStorage.getItem('id')
    console.log('vlue of Codigoitem :', atob(Codigoitem));
    form.value.Codigoitem = atob(Codigoitem);
    form.value.id = this.id
    console.log('vlue of id item :', this.id);
    let params = {
      'StatusCRUD': 'Gravar_edit_alim_animal',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('vlue of form :', form.value);
    this.Authorizer.QueryStoreProc('Executar', 'spAlimentacao', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Item...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          //this.alertService.showLoader(resultado.message, 500);
          this.goBack();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    });
  }
  MostraDados() {
    let Codigoitem = sessionStorage.getItem('id')
    console.log('vlue of Codigoitem :', atob(Codigoitem));
    let params = {
      'StatusCRUD': 'Pesquisar_edit_alim_animal',
      'formValues': atob(Codigoitem),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAlimentacao', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.id = JSON.parse(resultado.results)[0].Codigoitem;
          this.TipoSelected = JSON.parse(resultado.results)[0].racao;
          this.Datadealimentacaoinicial = JSON.parse(resultado.results)[0].Datadealimentacaoinicial;
          this.Datadealimentacaofinal = JSON.parse(resultado.results)[0].Datadealimentacaofinal;
          this.Quantidade = JSON.parse(resultado.results)[0].Quantidade;
          this.QuantidadeemEntrada = JSON.parse(resultado.results)[0].QuantidadeEntrada;
          this.Unidadementrada = JSON.parse(resultado.results)[0].UnidadeEntrada;
          this.valorUnitario = JSON.parse(resultado.results)[0].ValorUnitarioEstoque;
          this.UnidadSelected = JSON.parse(resultado.results)[0].Unidade;
          this.valorTotal = JSON.parse(resultado.results)[0].valor;
          this.Observacao = JSON.parse(resultado.results)[0].observacao;
        }
      } catch (err) { }
    });
  }
  test() {
    console.log('the value unitario  ', this.valorUnitario)
  }
  calculateRowTotal() {
    this.valorTotal = +this.valorUnitario * +this.Quantidade
  }
}







