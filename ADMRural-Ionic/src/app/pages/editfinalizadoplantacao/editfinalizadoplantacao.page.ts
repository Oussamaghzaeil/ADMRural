import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService, } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editfinalizadoplantacao',
  templateUrl: './editfinalizadoplantacao.page.html',
  styleUrls: ['./editfinalizadoplantacao.page.scss'],
})
export class EditfinalizadoplantacaoPage implements OnInit {
  @ViewChild('form') form: NgForm;
  public DataPlantacaoInicio: any;
  public DataPlantacaofinal: any;
  public ValorSemente: number;
  public ValorAdubo: number;
  public ValorHerbicida: number;
  public ValorPesticida: number;
  public ValorMaquina: number;
  public MaodeObra: number;
  public OutrosCustos: number;
  public ValorTotal: number;
  public Area: number;
  public UnidadeArea: string;
  public QtdSemente: number;
  public UnidadeSemente: string;
  public QtdAdubo: number;
  public UnidadeAdubo: string;
  public QtdHerbicida: number;
  public UnidadeHerbicida: string;
  public QtdPesticida: number;
  public UnidadePesticida: string;
  public HorasdeMaquina: number;
  public Observacoes: string;
  public Situacao: string;
  public Tipo: string;
  public TipoSemente: string;

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
    console.log("unit:", this.ValorSemente);
    console.log("qtd:", this.ValorAdubo);
    console.log("qtd:", this.ValorHerbicida);
    console.log("qtd:", this.ValorPesticida);
    console.log("qtd:", this.ValorMaquina);
    console.log("qtd:", this.MaodeObra);
    console.log("qtd:", this.OutrosCustos);
    this.ValorTotal = + this.ValorSemente + this.ValorAdubo + this.ValorHerbicida + this.ValorPesticida + this.ValorMaquina + this.MaodeObra + this.OutrosCustos
  }
  ngOnInit() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    this.notify();
    this. MostraDados() ;
  }
  notify() {
    if (this.ValorSemente == undefined || this.ValorSemente == NaN) { this.ValorSemente = 0; }
    if (this.ValorAdubo == undefined || this.ValorAdubo == NaN) { this.ValorAdubo = 0; }
    if (this.ValorHerbicida == undefined || this.ValorHerbicida == NaN) { this.ValorHerbicida = 0; }
    if (this.ValorPesticida == undefined || this.ValorPesticida == NaN) { this.ValorPesticida = 0; }
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
    this.navCtrl.navigateRoot('/plantacaofinalizado');
  }
  MostraDados() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    console.log('vlue of Codigoitem :', atob(Codigoitem));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_view_edit_plantacao_Finalizado',
      'formValues': atob(Codigoitem),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spPlantacao', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.DataPlantacaoInicio = JSON.parse(resultado.results)[0].DataInicio;
          this.DataPlantacaofinal = JSON.parse(resultado.results)[0].DataFinal;
          this.Area = JSON.parse(resultado.results)[0].Area;
          this.Tipo = JSON.parse(resultado.results)[0].Tipo;
          this.UnidadeArea = JSON.parse(resultado.results)[0].UnidadeArea;
          this.TipoSemente = JSON.parse(resultado.results)[0].TipoSemente;
          this.QtdSemente = JSON.parse(resultado.results)[0].QtdSemente;
          this.UnidadeSemente = JSON.parse(resultado.results)[0].UnidadeSemente;
          this.ValorSemente = JSON.parse(resultado.results)[0].ValorSemente;
          this.QtdAdubo = JSON.parse(resultado.results)[0].QtdAdubo;
          this.UnidadeAdubo = JSON.parse(resultado.results)[0].UnidadeAdubo;
          this.ValorAdubo = JSON.parse(resultado.results)[0].ValorAdubo;
          this.QtdHerbicida = JSON.parse(resultado.results)[0].QtdHerbicida;
          this.UnidadeHerbicida = JSON.parse(resultado.results)[0].UnidadeHerbicida;
          this.ValorHerbicida = JSON.parse(resultado.results)[0].ValorHerbicida;
          this.QtdPesticida = JSON.parse(resultado.results)[0].QtdPesticida;
          this.UnidadePesticida = JSON.parse(resultado.results)[0].UnidadePesticida;
          this.ValorPesticida = JSON.parse(resultado.results)[0].ValorPesticida;
          this.HorasdeMaquina = JSON.parse(resultado.results)[0].HorasdeMaquina;
          this.ValorMaquina = JSON.parse(resultado.results)[0].ValorMaquina;
          this.MaodeObra = JSON.parse(resultado.results)[0].MaodeObra;
          this.OutrosCustos = JSON.parse(resultado.results)[0].OutrosCustos;
          this.ValorTotal = JSON.parse(resultado.results)[0].ValorTotal;
          this.Observacoes = JSON.parse(resultado.results)[0].Observacoes;
          this.Situacao = JSON.parse(resultado.results)[0].Situacao;
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Não fazenda' });
      }
    });

  }
  

}





