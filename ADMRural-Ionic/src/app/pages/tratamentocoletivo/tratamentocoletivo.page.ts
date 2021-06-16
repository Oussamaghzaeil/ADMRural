import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-tratamentocoletivo',
  templateUrl: './tratamentocoletivo.page.html',
  styleUrls: ['./tratamentocoletivo.page.scss'],
})
export class TratamentocoletivoPage implements OnInit {
  // @ViewChild('inputcamera') cameraInput: ElementRef;
  public Nome: String;
  public TipodeEntrada: String;
  public DatadeEntrada: Date;
  public HoradeEntrada: Date;
  public Quantidade: number;
  public Unidad: String;
  public ValorTotal: number;
  public id: number;
  public a: any;
  public b: any;
  public alim: any = "assets/imgs/alimento.png";
  public tra: any = "assets/imgs/vacina.png";
  public gra: any = "assets/imgs/animal.png";
  public CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
  public ishidden: boolean = true;
  constructor(
    private navCtrl: NavController,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private alertService: AlertService,
  ) { }
  ngOnInit() {
    this.MostraDadosCurrent();
    this.MostraDadosInfo();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/coletivoopcoes');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/coletivoopcoes');
  }
  goToCreate() {
    this.navCtrl.navigateRoot('/novotratamentocoletivo');
  }
  goToAlimentacao() {
    this.navCtrl.navigateRoot('/coletivolista');
  }
  goToCobretura() {
    this.navCtrl.navigateRoot('/cobertura');
  }
  goToView(id) {
    console.log("Codigo item", id);
    this.navCtrl.navigateRoot('/viewcoletivotratamento', id);
    sessionStorage.setItem("Codigoitem", btoa(id))
  }
  ionViewDidEnter() { }
  MostraDadosInfo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_Medic_Coletivo_Old',
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
        for (let i = 0; i <= this.a.length; i++) {
          let b = this.a
         
          let month = b[i].DataTratamento.split('-')[2];
          let day = b[i].DataTratamento.split('-')[1];
          let year = b[i].DataTratamento.split('-')[0];
          b[i].DataTratamento = day + '/' + month + '/' + year;
          let month1 = b[i].DataTratamentofinal.split('-')[2];
          let day1 = b[i].DataTratamentofinal.split('-')[1];
          let year1 = b[i].DataTratamentofinal.split('-')[0];
          b[i].DataTratamentofinal = day1 + '/' + month1 + '/' + year1;
 
        }
      }
    });
  }

  MostraDadosCurrent() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    let params = {
      'StatusCRUD': 'Pesquisar_Medic_Coletivo_Current',
      'formValues': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)

      if (resultado.success) {
        this.b = JSON.parse(resultado.results);
      }

    });
  }

}


