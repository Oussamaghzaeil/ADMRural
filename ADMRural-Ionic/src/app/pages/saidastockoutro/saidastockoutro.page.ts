import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-saidastockoutro',
  templateUrl: './saidastockoutro.page.html',
  styleUrls: ['./saidastockoutro.page.scss'],
})
export class SaidastockoutroPage implements OnInit {
  // @ViewChild('inputcamera') cameraInput: ElementRef;
  public Nome: String;
  public a: any;
  public viewdetail: boolean = false;
  public ViewCard: boolean = true;
  public SelectedItem: any;
  public NomeFazenda: any;
  public TipodeSaida: any;
  public DatadeSaida: any;
  public HoradeSaida: any;
  public Quantidade: any;
  public Unidad: any;
  public TipodeMovimentacao: any;
  public ValorUnitario: any;
  public ValorTotal: any;
  public Observacao: any;
  constructor(
    private navCtrl: NavController,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController

  ) { }
  goToView(id: any) {
    this.ViewCard = false;
    this.viewdetail = true;
    this.SelectedItem = id;
    console.log("Codigo item", id);
    this.NomeFazenda = id.NomeFazenda;
    this.TipodeSaida = id.TipodeSaida;
    this.DatadeSaida = id.DatadeSaida;
    this.HoradeSaida = id.HoradeSaida;
    this.Quantidade = id.Quantidade;
    this.Unidad = id.Unidad;
    this.TipodeMovimentacao = id.TipodeMovimentacao;
    this.ValorUnitario = id.ValorUnitario;
    this.ValorTotal = id.ValorTotal;
    this.Observacao = id.Observacao;
    //this.navCtrl.navigateRoot('/editfinalizado', id);
    //sessionStorage.setItem("Codigoitem", btoa(id))
  }
  backView() {
    this.ViewCard = true;
  }
  ngOnInit() {
    this.MostraDadosInfo();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/tipoestoquesaida');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/tipoestoquesaida');
  }

  goTo() {
    this.navCtrl.navigateRoot('/novaitemsaidaoutro');
  }
  ionViewDidEnter() { }

  MostraDadosInfo() {
    this.viewdetail = false;
    this.ViewCard = true;
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    let params = {
      'StatusCRUD': 'Pesquisar_Finalizado',
      'formValues': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spEstoqueSaida', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      if (resultado.success) {
        this.a = JSON.parse(resultado.results);
        for (let i = 0; i <= this.a.length; i++) {
          let b = this.a
          let hours = b[i].HoradeSaida.split(':')[0];
          let min = b[i].HoradeSaida.split(':')[1];
          b[i].HoradeSaida = hours + ':' + min;
          this.a = b;
        }
      }
    });
  }
}
