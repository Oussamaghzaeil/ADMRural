import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alimentacao',
  templateUrl: './alimentacao.page.html',
  styleUrls: ['./alimentacao.page.scss'],
})
export class AlimentacaoPage implements OnInit {
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;

  @ViewChild('form') form: NgForm;
  public valorUnitario: number;
  public valorTotal: number;
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public Datadealimentacao: Date;
  public observacao: string;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public alertController: AlertController

  ) { }

  public AppName: String = 'ADM Rural';
  today: Date = new Date();
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
  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/animaisin');
    })
    this.notify();
  }
  notify() {
    if (this.Quantidade == undefined || this.Quantidade == NaN) { this.Quantidade = 0; }
    if (this.valorTotal == undefined || this.valorTotal == NaN) { this.valorTotal = 0; }
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
  GetTipo1(item) {
    console.log('id of the item selected:', item)
    let itens: any;
    itens = item.split(',');
    console.log('item after split:', itens)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.ValorUnit = itens[0];
    this.QuantidadeemEntrada = itens[1];
    this.Unidadementrada = itens[2];

    this.id = itens[3];
    console.log('item after split:', this.id)
    this.TipodeEntrada = itens[4];
    console.log('tipo selected:', this.TipodeEntrada)

  }
  MostraDados() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Get_Alim_Info',
      'formValues': CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAlimentacao', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      if (resultado.success) {
        this.a = JSON.parse(resultado.results);
      }
    });
  }
  CriacaoNovo(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);

    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    CodigoAnimal = atob(CodigoAnimal)
    console.log('vlue of CodigoAnimal :', CodigoAnimal);

    form.value.CodigoFazenda = CodigoFazenda;
    form.value.CodigoAnimal = CodigoAnimal;
    form.value.Codigoitem = this.id;
    form.value.racao = this.TipodeEntrada;
    console.log('vlue of racao :', form.value.racao);
    //form.value.racao = this.racao.TipodeEntrada;

    let params = {
      'StatusCRUD': 'Salvar_Alimentacao',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };

    this.Authorizer.QueryStoreProc('Executar', 'spAlimentacao', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando alimentação...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          // this.alertService.showLoader(resultado.message, 500);
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
  calculateRowTotal() {
    console.log("unit:", this.ValorUnit);
    console.log("qtd:", this.Quantidade);
    this.valorTotal = + this.ValorUnit * +this.Quantidade
  }
}








