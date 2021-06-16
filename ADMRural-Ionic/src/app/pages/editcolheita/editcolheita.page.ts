import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService, } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editcolheita',
  templateUrl: './editcolheita.page.html',
  styleUrls: ['./editcolheita.page.scss'],
})
export class EditcolheitaPage implements OnInit {
  @ViewChild('form') form: NgForm;

  public DataColheitaInicio: any;
  public DataColheitafinal: any;
  public ValorSemente: number;
  public ValorMaquina: number;
  public MaodeObra: number;
  public OutrosCustos: number;
  public ValorTotal: number;
  public Area: number;
  public UnidadeArea: string;
  public Finalidade : string;
  public HorasdeMaquina: number;
  public Observacoes: string;
  public Situacao: string;
  public Tipo: string;
  public Produto: string;
  public id: number;
  public DatadaPlantacao : any;
  public b : any;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) { }
  calculateRowTotal() {
    console.log("qtd:", this.ValorMaquina);
    console.log("qtd:", this.MaodeObra);
    console.log("qtd:", this.OutrosCustos);
    this.ValorTotal = + this.ValorMaquina + this.MaodeObra + this.OutrosCustos
  }
  ngOnInit() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    this.MostraDados() ;
    this.MostraDadosTipo();
    this.notify();
  }
  notify() {
    if (this.ValorMaquina == undefined || this.ValorMaquina == NaN) { this.ValorMaquina = 0; }
    if (this.MaodeObra == undefined || this.MaodeObra == NaN) { this.MaodeObra = 0; }
    if (this.OutrosCustos == undefined || this.OutrosCustos == NaN) { this.OutrosCustos = 0; }
    if (this.ValorTotal == undefined || this.ValorTotal == NaN) { this.ValorTotal = 0; }
  }
  ionViewWillEnter() { }
  ionViewDidEnter() { }
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.navigateRoot('/colheitain');
  }
 
  GetTipo1(item) {
    console.log('id of the item selected:', item)
    let itens: any;
    itens = item.split(',');
    console.log('item after split:', itens)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.id = itens[0];
    console.log('Codigo:', this.id)
    this.Tipo = itens[1];
    console.log('tipo:', this.Tipo)
    this.DatadaPlantacao = itens[2];
    console.log('date ', this.DatadaPlantacao)
  }
  MostraDadosTipo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Get_Tipo',
      'formValues': CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColheita', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)

      if (resultado.success) {
        this.b = JSON.parse(resultado.results);
      }
    });
  }
  MostraDados() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    console.log('vlue of Codigoitem :', atob(Codigoitem));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_view_edit_colheita',
      'formValues': atob(Codigoitem),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColheita', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.DataColheitaInicio = JSON.parse(resultado.results)[0].DataInicio;
          this.DataColheitafinal = JSON.parse(resultado.results)[0].DataFinal;
          this.DatadaPlantacao = JSON.parse(resultado.results)[0].DatadaPlantacao;
          this.Area = JSON.parse(resultado.results)[0].Area;
          this.Tipo = JSON.parse(resultado.results)[0].Tipo;
          this.UnidadeArea = JSON.parse(resultado.results)[0].UnidadeArea;
          this.Produto = JSON.parse(resultado.results)[0].Produto;
          
        
          this.HorasdeMaquina = JSON.parse(resultado.results)[0].HorasdeMaquina;
          this.ValorMaquina = JSON.parse(resultado.results)[0].ValorMaquina;
          this.MaodeObra = JSON.parse(resultado.results)[0].MaodeObra;
          this.OutrosCustos = JSON.parse(resultado.results)[0].OutrosCustos;
          this.ValorTotal = JSON.parse(resultado.results)[0].ValorTotal;
          this.Observacoes = JSON.parse(resultado.results)[0].Observacoes;
          this.Situacao = JSON.parse(resultado.results)[0].Situacao;
          this.Finalidade = JSON.parse(resultado.results)[0].Finalidade;
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Não fazenda' });
      }
    });

  }
  atualizar(form: NgForm) {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    console.log('vlue of Codigoitem :', atob(Codigoitem));
    form.value.Codigoitem = atob(Codigoitem)
    let params = {
      'StatusCRUD': 'Gravar_Colheita',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Novo Tratamento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spColheita', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Colheita...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          //this.alertService.showLoader(resultado.message, 1000);
          this.goBack();
        } else {
          //this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    }
    );
  }
}






