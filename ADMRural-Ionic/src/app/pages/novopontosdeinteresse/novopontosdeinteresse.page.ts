import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ActivatedRoute, } from '@angular/router';
import { EnvService } from 'src/app/services/env.service';
const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-novopontosdeinteresse',
  templateUrl: './novopontosdeinteresse.page.html',
  styleUrls: ['./novopontosdeinteresse.page.scss'],
})
export class NovopontosdeinteressePage implements OnInit {
  private imageFileBase64: string;
  private imageCroquiExtension: string;
  private imageFile: any;

  @ViewChild('inputcamera') cameraInput: ElementRef;
  public Latitude: any;
  public Longitude: any;
  public Endereco: any;
  public selectedUf: any;
  public cidades: any;
  public cidades2: any;
  public formattedValue: any;
  public ufs;
  public ufs2;
  public fazendas: any;
  public incluirPronto: boolean = false;
  public codigo : number;
  public Observacoes : string;
  public NCidade : string;
  public UF : string;
  public Mapeamento : string;
  public photopath: String;
  public CodigoFazenda : number;
  constructor(
    private env: EnvService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    private actionSheetController: ActionSheetController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      data => {
        console.log('tipo entrada value:', this.codigo);
        if (data.codigo) {
          this.codigo = data.codigo;
        }
        console.log('codigo coming with the link:', this.codigo);
      }
    )
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/pontosdeinteresse');
    })
  }
  Map() {
    if (this.incluirPronto == true) {
      this.navCtrl.navigateRoot('/mapapontosdeinteresse');
    }
    else {
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Ponto de interesse', pMessage: 'Salve o formulário antes de visualizar o mapa!' })
    }
  }
  ionViewWillEnter() {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    this.imageFileBase64 = "assets/imgs/imgdefault.png";
    this.imageFile = null;
    element.onchange = () => {
      // Depois colocar um loading aqui!!!     
      const reader = new FileReader();
      reader.onload = (r: any) => {
        let base64 = r.target.result as string;
        this.imageFileBase64 = r.target.result as string;
      };
      reader.readAsDataURL(element.files[0]);
      this.imageCroquiExtension = element.files[0].type;
      this.imageFile = element.files[0];
    };
  }
  ionViewDidEnter() {
    this.MostraDadosdados() ;
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");
    this.getUfs();
  }
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.navigateRoot('/pontosdeinteresse');
  }

  Criacao(form: NgForm) {
    // paramStatus: Pesquisar, Gravar, Deletar
    if (this.imageFile) {
      this.Authorizer.QueryStoreImagem('SalvarImagem', '', 'images/', this.imageFile).then(res => {
        let resultado: any = res[0];
        //resultado.results // This is the complete path. Ejemplo: "C:\web\sites\ServiceImobiliario\uploads\imagems\croqui\y35swmarzjt.jpg"
        if (res[0].success) {
          console.log('I am the path', res[0].results);
          form.value.path = res[0].results;
          let params = {
            'StatusCRUD': 'Criacao_Ponto',
            'formValues': form.value,
            'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };
          console.log("Novo Fisico:", params);
          this.Authorizer.QueryStoreProc('Executar', 'spPontosdeInteresse', params).then(res => {
            let resultado: any = res[0];
            console.log(resultado);
            try {
              if (resultado.success) {
                this.alertService.presentAlert({ pTitle: 'Salvando Ponto de interesse...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
                this.alertService.showLoader(resultado.message, 1000);
                this.incluirPronto = true;
              } else {
                this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
            }
          });

        }
      }
      );

    }
    else {
      let params = {
        'StatusCRUD': 'Criacao_Ponto',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };
      console.log("Novo Fisico:", params);
      this.Authorizer.QueryStoreProc('Executar', 'spPontosdeInteresse', params).then(res => {
        let resultado: any = res[0];
        console.log(resultado);
        try {
          if (resultado.success) {
            this.alertService.presentAlert({ pTitle: 'Salvando Ponto de interesse...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            this.alertService.showLoader(resultado.message, 1000);
            this.incluirPronto = true;
          } else {
            this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
        }
      }
      );

    }
  }

  // ------------------------UFS Begins-----------------------------
  getUfs() {
    let dataUfs = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'Pesquisaruf'
    };
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', dataUfs).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.ufs = JSON.parse(resultado.results);
          console.log("Ufs: ", this.ufs)
          this.ufs2 = JSON.parse(resultado.results);
          for (let i = 0; i < this.ufs2.length; i++) {
            this.ufs2[i] = this.ufs[i].Sigla;
          }
        }
        else {
        }
      } catch (err) {
      }
    });
  }

  // ------------------------UFS ENDS-----------------------------
  getCidadeCodigo(form) {
    console.log('form', form.value)
    this.selectedUf = this.ufs.filter((uf) => {
      return uf.Sigla == form.value.UF;
    });
    console.log('selectedUf: ', this.selectedUf)
    //console.log('selectedUf: ', this.selectedUf[0].CodigoBaseUF)
    this.cidades2 = [];
    this.getCidades();
  }

  // ------------------------Cidades Begins-----------------------------

  getCidades() {
    let dataCidades = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'PesquisarCidades',
      'formValues': this.selectedUf[0].CodigoBaseUF
    };
    console.log("dataCidades: ", dataCidades)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', dataCidades).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.cidades = JSON.parse(resultado.results);
          this.cidades2 = JSON.parse(resultado.results);
          console.log("cidades: ", this.cidades)
          for (let i = 0; i < this.cidades2.length; i++) {
            this.cidades2[i] = this.cidades[i].Nome;
          }
        }
        else {
        }
      } catch (err) {
      }
    });
  }
  // ------------------------Cidades ENDS-----------------------------
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
            JSON.stringify(result[0].locality).substr(1).slice(0, -1) + ", " +
            JSON.stringify(result[0].subAdministrativeArea).substr(1).slice(0, -1) + ", " +
            JSON.stringify(result[0].administrativeArea).substr(1).slice(0, -1) + ", " +
            JSON.stringify(result[0].postalCode).substr(1).slice(0, -1) + ", " +
            JSON.stringify(result[0].countryName).substr(1).slice(0, -1)
          ))
        .catch((error: any) => console.log(error));
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  /////////////////////////////  image insert //////////////////////////////

  takePicture() {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.click();
  }
  async seleccionarImagen() {
    const actionSheet = await this.actionSheetController.create({
      header: "SELECIONAR FONTE DA IMAGEM",
      buttons: [{
        text: 'Carregar da biblioteca de Imagens',
        handler: () => {
          // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          this.takePicture();
        }
      },
      {
        text: 'Use a Câmera',
        handler: () => {
          //this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Fechar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  async Cancelar() {
    const alert = await this.alertController.create({
      header: 'Cancelar...',
      message: 'Tem certeza de que deseja cancelar esta operação?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIM',
          handler: async () => {
            console.log('Confirm Ok');
            this.goBack();
            //await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }

  MostraDados() {
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.fazendas = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: resultado.message });
        }
      } catch (err) {
      }
    });
  }
  MostraDadosdados() {

    let params = {
      'StatusCRUD': 'Pesquisar_Ponto_interesse',
      'formValues': this.codigo,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spPontosdeInteresse', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          if (this.photopath) {
            let path = this.env.API_HOST + '/Rural/';
            this.imageFileBase64 = path + JSON.parse(resultado.results)[0].Img;
          }
          else { this.photopath = '' }
          this.CodigoFazenda = JSON.parse(resultado.results)[0].CodigoFazenda;
          this.Latitude = JSON.parse(resultado.results)[0].Latitude;
          this.Longitude = JSON.parse(resultado.results)[0].Longitude;
          this.Endereco = JSON.parse(resultado.results)[0].Endereco;
          this.Mapeamento = JSON.parse(resultado.results)[0].Mapeamento;
          this.Observacoes = JSON.parse(resultado.results)[0].Observacoes;
          let U: any = JSON.parse(resultado.results)[0].UF;
          if (typeof (U) == 'undefined')
            U = '';
          if (U == null)
            U = '';
          if (U != '')
            this.UF = U;
          let nc: any = JSON.parse(resultado.results)[0].NomeMunicipio;
          if (typeof (nc) == 'undefined')
            nc = '';
          if (nc == null)
            nc = '';
          if (nc != '')
            this.NCidade = nc;

        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });
  }


}




