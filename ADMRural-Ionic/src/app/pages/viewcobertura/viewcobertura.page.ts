import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-viewcobertura',
  templateUrl: './viewcobertura.page.html',
  styleUrls: ['./viewcobertura.page.scss'],
})
export class ViewcoberturaPage implements OnInit {
  public NomeTouro: string;
  public RacaTouro: string;
  public TecnicoInciminacao: string;
  public PrenhesTouro: string;
  public MedicamentoVacinaTouro: string;
  public observacaoTouro: string;
  public NumeroTouro: number;
  public animal: number;
  public Tipo: string;
  public a: any;
  public Datadacobertura: Date;
  public Datadanacimento : Date
  public Situacao: string;
  public Sexo: string;
  public inciminacao: boolean = false;
  public Num: boolean = false;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.MostraDados();
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
    this.navCtrl.navigateRoot('/cobertura');
  }
  goBack1() {
    this.navCtrl.navigateRoot('/cobertura');
  }


  MostraDados() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
    let params = {
      'StatusCRUD': 'Monstradados_Cobertura_Coletivo',
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
          this.Datadacobertura = JSON.parse(resultado.results)[0].Datadacobertura;
          this.Tipo            = JSON.parse(resultado.results)[0].Tipo;
          this.NumeroTouro     = JSON.parse(resultado.results)[0].Numero;
          this.NomeTouro       = JSON.parse(resultado.results)[0].Nome;
          this.RacaTouro       = JSON.parse(resultado.results)[0].Raca;
          this.TecnicoInciminacao = JSON.parse(resultado.results)[0].Tecnico;
          this.a = JSON.parse(resultado.results);
          this.PrenhesTouro = JSON.parse(resultado.results)[0].Prenhes;
          this.MedicamentoVacinaTouro = JSON.parse(resultado.results)[0].MedicamentoVacina;
          this.observacaoTouro = JSON.parse(resultado.results)[0].Obs;
          this.Datadanacimento = JSON.parse(resultado.results)[0].Datanacimento;
          this.Situacao        = JSON.parse(resultado.results)[0].Situacao;
          this.Sexo            = JSON.parse(resultado.results)[0].Sexo;
          if(this.TecnicoInciminacao){
              this.inciminacao = true;
          }
          if(this.NumeroTouro){
            this.Num = true;
        }
          
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Alimentacao Coletivo', pMessage: 'Nenhum dados' });
        }
      } catch (err) {
      }
    });
  }
  Atualizar(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
      form.value.CodigoFazenda = CodigoFazenda;
      form.value.Codigo        = Codigoitem;
      let params = {
        'StatusCRUD': 'Gravar_Cobertura',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            this.alertService.presentAlert({ pTitle: 'Salvando Cobertura...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            //this.alertService.showLoader(resultado.message, 20);
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
}





