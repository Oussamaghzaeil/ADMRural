import { Component, ViewChild,  OnInit } from '@angular/core';
import { NavController,  ModalController,  AlertController } from '@ionic/angular';
import { NgForm, FormGroup,  FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-editfinalizado',
  templateUrl: './editfinalizado.page.html',
  styleUrls: ['./editfinalizado.page.scss'],
})
export class EditfinalizadoPage implements OnInit {
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;

  @ViewChild('form') form: NgForm;
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  constructor(
    private navCtrl: NavController,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public alertController: AlertController
  ) { }
  public AppName: String = 'ADM Rural';
  today: Date = new Date();
  public Nome: String;
  public Datadaentrada: Date;
  public horadaentrada: string;
  public Quantidade: number;
  public Unidad: string;
  public ValorUnitario: number;
  public ValorTotal: number;
  public Observacao: string;
  public Situacao: string;
  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/stockfinalizado');
    })  
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {}
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.navigateRoot('/stockfinalizado');
  }
  MostraDados() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    console.log('vlue of Codigoitem :', atob(Codigoitem));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_view_finalizado',
      'formValues': atob(Codigoitem),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {

          this.Nome = JSON.parse(resultado.results)[0].NomeFazenda;
          this.TipoSelected  = JSON.parse(resultado.results)[0].TipodeEntrada;
          this.Datadaentrada = JSON.parse(resultado.results)[0].DatadeEntrada;
          let hora = JSON.parse(resultado.results)[0].HoradeEntrada.split(':')[0];
          let min = JSON.parse(resultado.results)[0].HoradeEntrada.split(':')[1];
          this.horadaentrada = hora +':' + min ;
          this.Quantidade = JSON.parse(resultado.results)[0].Quantidade;
          this.Unidad     = JSON.parse(resultado.results)[0].Unidad;
          this.ValorUnitario = JSON.parse(resultado.results)[0].ValorUnitario;
          this.ValorTotal = JSON.parse(resultado.results)[0].ValorTotal;
          this.Observacao = JSON.parse(resultado.results)[0].Observacao;
          this.Situacao = JSON.parse(resultado.results)[0].Situacao;
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Não fazenda' });

      }
    });
  }

}