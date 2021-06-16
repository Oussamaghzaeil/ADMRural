import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-coletivoopcoes',
  templateUrl: './coletivoopcoes.page.html',
  styleUrls: ['./coletivoopcoes.page.scss'],
})
export class ColetivoopcoesPage implements OnInit {
  // @ViewChild('inputcamera') cameraInput: ElementRef;
  public Nome: String;
  public TipodeEntrada: String;
  public DatadeEntrada: Date;
  public HoradeEntrada: Date;
  public Quantidade: number;
  public Unidad: String;
  public ValorTotal: number;
  public id: number;
  public alim: any = "assets/imgs/alimento.png";
  public tra: any = "assets/imgs/vacina.png";
  public gra: any = "assets/imgs/animal.png";
  public trans: any = "assets/imgs/printer.png";
  public CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
  public ishidden: boolean = true;
  constructor(
    private navCtrl: NavController,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController

  ) { }
  ngOnInit() {
    this.MostraDadosInfo();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/coletivo');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/coletivo');
  }
  goToAlim() {
    this.navCtrl.navigateRoot('/coletivolista');
  }
  goToTratamento() {
    this.navCtrl.navigateRoot('/tratamentocoletivo');
  }
  goToCobretura() {
    this.navCtrl.navigateRoot('/cobertura');
  }
  goToTransfer() {
    this.navCtrl.navigateRoot('/transferanciacoletivolista');
  }
  goToView(id) {
    console.log("Codigo item", id);
    this.navCtrl.navigateRoot('/viewcoletivo', id);
    sessionStorage.setItem("Codigoitem", btoa(id))
  }
  ionViewDidEnter() { }
  public a: any;
  MostraDadosInfo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    let params = {
      'StatusCRUD': 'Pesquisar_Alim_Coletivo',
      'formValues': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      if (resultado.success) {
        this.a = JSON.parse(resultado.results);
      }
    });
  }
}


