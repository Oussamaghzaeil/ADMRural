import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService, } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-novoplantacao',
  templateUrl: './novoplantacao.page.html',
  styleUrls: ['./novoplantacao.page.scss'],
})
export class NovoplantacaoPage implements OnInit {
  @ViewChild('form') form: NgForm;

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
  public ValorSemente: number;
  public ValorAdubo: number;
  public ValorHerbicida: number;
  public ValorPesticida: number;
  public ValorMaquina: number;
  public MaodeObra: number;
  public OutrosCustos: number;
  public ValorTotal: number;
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
    this.navCtrl.navigateRoot('/plantacaoandamento');
  }
  Criacao(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    form.value.CodigoFazenda = atob(CodigoFazenda)
    let params = {
      'StatusCRUD': 'Criacao_Plantacao',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Novo Tratamento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spPlantacao', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Plantação...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
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





