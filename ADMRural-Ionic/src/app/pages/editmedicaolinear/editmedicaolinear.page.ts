import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService, } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-editmedicaolinear',
  templateUrl: './editmedicaolinear.page.html',
  styleUrls: ['./editmedicaolinear.page.scss'],
})
export class EditmedicaolinearPage implements OnInit {
  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('form') form: NgForm;
  public aplicacaodados: any[];
  public doses: any[];
  public medName: any[];

  public incluirPronto: boolean = false;
  public aplicacao: boolean = true;
  public j: boolean = true;
  public dados: any;
  public dadosaplicacao: any;
  public DataTratamento: any;
  public tipotratamento: any;
  public MedicamentoTratamento: any;
  public CodigoTratamento: number;
  public Tipomedicao: any;
  public Observacoes: string;
  public Coordenadas: number = 0;
  public Situacao: string;
  public Latitude: any;
  public Longitude: any;
  public Endereco: any;
  public Salvando: boolean = false;
  public Codigo: number;
  public mapclicked: boolean = false;
  public codigoMedicao: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform1: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) { }
  ngOnInit() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    console.log('vlue of codigo medicao :', atob(Codigoitem));
    this.codigoMedicao = atob(Codigoitem);
    this.MostraDados();
    this.platform1.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/medicaolinearin');
    });
  }
  ionViewWillEnter() { }
  ionViewDidEnter() { }
  Map() {
    sessionStorage.setItem("Codigoitem", btoa(this.codigoMedicao))
    this.navCtrl.navigateRoot('/editmapamedicaolinear');
  }
  ionViewWillLeave() {
  }
  ionViewDidLeave() {
  }
  goBack() {
    this.navCtrl.navigateRoot('/medicaolinearin');
  }

  Atualizar(form: NgForm) {
    form.value.CodigoMedicao = this.codigoMedicao;
    let params = {
      'StatusCRUD': 'Gravar_Medicacao_Linear',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Novo Tratamento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spMedicao', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Medição linear...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
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
  MostraDados() {
    let params = {
      'StatusCRUD': 'Pesquisar_Medicao_Linear_In',
      'formValues': this.codigoMedicao,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spMedicao', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.Tipomedicao = JSON.parse(resultado.results)[0].Tipomedicao;
          this.Observacoes = JSON.parse(resultado.results)[0].Observacoes;
          this.Situacao = JSON.parse(resultado.results)[0].Situacao;
          this.Coordenadas = JSON.parse(resultado.results)[0].QtdCoordenadas;
        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });
  }

  getCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.Latitude = resp.coords.latitude;
      this.Longitude = resp.coords.longitude;
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.reverseGeocode(this.Latitude, this.Longitude, options)
        .then((result: NativeGeocoderResult[]) =>
          this.Endereco = (
            //JSON.stringify(result[0]) + ", " +
            JSON.stringify(result[0].subThoroughfare).substr(1).slice(0, -1) + ", " +
            JSON.stringify(result[0].subLocality).substr(1).slice(0, -1) + ", " +
            JSON.stringify(result[0].locality).substr(1).slice(0, -1) + ", "

          ))
        .catch((error: any) => console.log(error));
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let params = {
      'StatusCRUD': 'Insert_Pontos_Linear_edit',
      'Latitude': this.Latitude,
      'Longitude': this.Longitude,
      'CodigoMedicao': this.codigoMedicao,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Novo Tratamento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spMedicao', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Ponto...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          this.Coordenadas = this.Coordenadas + 1;
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





