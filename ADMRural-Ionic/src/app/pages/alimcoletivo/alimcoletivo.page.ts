import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-alimcoletivo',
  templateUrl: './alimcoletivo.page.html',
  styleUrls: ['./alimcoletivo.page.scss'],
})
export class AlimcoletivoPage implements OnInit {
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;
  @ViewChild('form') form: NgForm;
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public valorUnitario: number;
  public valorTotal: number;
  public Datadealimentacao : Date;
  public observacao : string;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public alertController: AlertController,
    private activatedRoute: ActivatedRoute,

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
  public item: any;
  public itemSelected: any;
  public value: string;

  ngOnInit() {
    this.MostraDados();
    this.activatedRoute.params.subscribe(
      data => {
        console.log('id of animals selected:', this.item);
        if (data.item) {
          this.itemSelected = data.item;
        }
        console.log('id of animals selected :', this.itemSelected);
      })
    this.notify();
    // this.showid();
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
    this.navCtrl.navigateRoot('/animaiscoletivo');
  }
  goBack1(){
    this.navCtrl.navigateRoot('/coletivolista');
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
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
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

    console.log('id of animals selected from show function :', this.itemSelected);
    let animalIdsplit: any;
    animalIdsplit = this.itemSelected.split(', ');
    console.log('id of animals selected from show function :', animalIdsplit[0]);
    //for (this.value of animalIdsplit) {
    if (this.value != 'undefined') {
      for (var i = 0; i < animalIdsplit.length; i++) {
        console.log(animalIdsplit[i]);

        form.value.CodigoAnimalAlimentacao = animalIdsplit[i];
        form.value.CodigoFazenda = CodigoFazenda;
        form.value.Codigoitem = this.id;
        form.value.racao = this.TipodeEntrada;
        console.log('vlue of racao :', form.value.racao);
        console.log('codigo animal selected :', form.value.CodigoAnimalAlimentacao);
        //form.value.racao = this.racao.TipodeEntrada;

        let params = {
          'StatusCRUD': 'Salvar_Alimentacao_Coletivo',
          'formValues': form.value,
          'CodigoUsuarioSistema': 0,
          'Hashkey': sessionStorage.getItem("SessionHashkey")
        };

        this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
          let resultado: any = res[0];
          try {
            if (resultado.success) {
              //this.alertService.presentAlert({ pTitle: 'Salvando alimentação...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
             //this.alertService.showLoader(resultado.message, 20);
            //this.goBack();

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
      this.goBack1();
    }
  }
  calculateRowTotal() {
    console.log("unit:", this.ValorUnit);
    console.log("qtd:", this.Quantidade);
    this.valorTotal = + this.ValorUnit * +this.Quantidade
  }

}








