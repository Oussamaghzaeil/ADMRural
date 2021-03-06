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
  selector: 'app-novomedicaodearea',
  templateUrl: './novomedicaodearea.page.html',
  styleUrls: ['./novomedicaodearea.page.scss'],
})
export class NovomedicaodeareaPage implements OnInit {
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
  public codigoMedicao: number;

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
    this.activatedRoute.params.subscribe(
      data => {
        console.log('tipo entrada value:', this.codigoMedicao);
        if (data.codigoMedicao) {
          this.codigoMedicao = data.codigoMedicao;
        }
        console.log('codigoMedicao coming with the link:', this.codigoMedicao);
      }
    )
    this.platform1.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/medicaodeareain');
    });
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    this.MostraDados();
  }
  Map() {
    if (this.incluirPronto == true) {
      this.mapclicked = true;
      this.navCtrl.navigateRoot('/mapamedicaodeareas');
    }
    else {
      this.alertService.presentAlert({ pTitle: 'ATEN????O', pSubtitle: 'Medi????o de ??rea', pMessage: 'Salve o formul??rio antes de visualizar o mapa!' })
    }
  }
  ionViewWillLeave() {
  }
  ionViewDidLeave() {
  }
  goBack() {
    this.navCtrl.navigateRoot('/medicaodeareain');
  }

  Criacao(form: NgForm) {

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    form.value.CodigoFazenda = atob(CodigoFazenda);
    let params = {
      'StatusCRUD': 'Criacao_Medicacao',
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
          this.alertService.presentAlert({ pTitle: 'Salvando Medi????o de ??rea...', pSubtitle: '', pMessage: 'Opera????o realizada com sucesso!' });
          this.Salvando = true;

        } else {
          //this.alertService.presentAlert({ pTitle: 'Aten????o', pSubtitle: 'Erro', pMessage: 'Opera????o n??o realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Aten????o', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    }
    );
    console.log('vlue of salvando:', this.Salvando);
  }
  MostraDados() {

    let params = {
      'StatusCRUD': 'Pesquisar_Medicao_In',
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
          //this.alertService.presentAlert({ pTitle: 'ATEN????O', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });
  }

  getCoordinates() {
    if (this.Salvando == false) {
      this.alertService.presentAlert({ pTitle: 'ATEN????O', pSubtitle: 'Medi????o de ??rea', pMessage: 'Salve o formul??rio antes de incluir as coordenadas!' });
    }
    else
      if (this.Salvando == true) {
        this.incluirPronto = true;
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
      }
    let params = {
      'StatusCRUD': 'Insert_Pontos',
      'Latitude': this.Latitude,
      'Longitude': this.Longitude,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Novo Tratamento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spMedicao', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Ponto...', pSubtitle: '', pMessage: 'Opera????o realizada com sucesso!' });
          this.Coordenadas = this.Coordenadas + 1;
        } else {
          //this.alertService.presentAlert({ pTitle: 'Aten????o', pSubtitle: 'Erro', pMessage: 'Opera????o n??o realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Aten????o', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    }
    );
  }
}





