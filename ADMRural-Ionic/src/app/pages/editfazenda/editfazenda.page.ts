import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-editfazenda',
  templateUrl: './editfazenda.page.html',
  styleUrls: ['./editfazenda.page.scss'],
})
export class EditfazendaPage implements OnInit {
  @ViewChild('Nome') iNome;
  @ViewChild('inputcamera') cameraInput: ElementRef;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/imgdefault.png";
  public photopath: String;
  public Nome: String;
  public SobreNome: String;
  public Observacoes: String;
  public UF: String;
  public NCidade: String;
  public Endereco_form: String;
  public Latitude: any;
  public Longitude: any;
  public Valor_atual: String;
  public Valor_inicial: String;
  public Endereco: any;
  public numberMask: any;
  public valorInicial: any = 65444.46;
  public Valor_atual_aux: any;
  private alterando: boolean;
  public selectedUf: any;
  public cidades: any;
  public cidades2: any;
  public formattedValue: any;
  public ret1: any;
  public ufs;
  public ufs2;
  masks: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    private actionSheetController: ActionSheetController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public alertController: AlertController
  ) { }
  ngOnInit() {
    this.getUfs();
    this.getMunicipio();
    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/fazenda');
    })
  }
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    this.imageFileBase64 = "assets/imgs/imgdefault.png";
    this.imageFile = null;
    element.onchange = () => {
      const reader = new FileReader();
      reader.onload = (r: any) => {
        let base64 = r.target.result as string;
        this.imageFileBase64 = r.target.result as string;
      };
      reader.readAsDataURL(element.files[0]);
      this.imageCroquiExtension = element.files[0].type;
      this.imageFile = element.files[0];
    };
    this.MostraDados();
  }
 
  goBack() {
    this.navCtrl.navigateRoot('/fazenda');
  }
  // ----------------------- Showing Data -----------------------------
  MostraDados() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('value of CodigoFazenda :', atob(CodigoFazenda));
    let params = {
      'StatusCRUD': 'Pesquisar_editfazenda',
      'formValues': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado edit fazenda", resultado)
      try {
        if (resultado.success) {
          this.photopath = JSON.parse(resultado.results)[0].ImgFazenda;
          if (this.photopath) {
            let path = this.env.API_HOST + '/Rural/';
            this.imageFileBase64 = path + JSON.parse(resultado.results)[0].ImgFazenda;
          }
          else { this.photopath = '' }
         let {NomeFazenda, ObservacoesFazenda, EnderecoFazenda, LatitudeFazenda,
             LongitudeFazenda, ValorAtualFazenda, ValorInicialFazenda, UfFazenda, NomeMunicipioFazenda}  = JSON.parse(resultado.results)[0];
          this.Nome = NomeFazenda;
          this.Observacoes = ObservacoesFazenda;
          this.Endereco_form = EnderecoFazenda;
          this.Latitude = LatitudeFazenda;
          this.Longitude = LongitudeFazenda;
          this.Valor_atual = ValorAtualFazenda;
          this.Valor_inicial = ValorInicialFazenda;
          let U: any =UfFazenda;
          if (typeof (U) == 'undefined')
            U = '';
          if (U == null)
            U = '';
          if (U != '')
            this.UF = U;
          let nc: any = NomeMunicipioFazenda;
          if (typeof (nc) == 'undefined')
            nc = '';
          if (nc == null)
            nc = '';
          if (nc != ''){
            
          }
            this.NCidade = nc;
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Não fazenda' });

      }
    });

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
        else { }
      } catch (err) {
      }
    });
  }


  //--------------------------Municipio-------------------------


  public municipio: any;
  getMunicipio() {
    console.log("Iam here in the Municipio");

    let dataCidades = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'PesquisarMunicipio'
    };
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', dataCidades).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.cidades = JSON.parse(resultado.results);
          console.log("The Municipio ==>",this.cidades);
          
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

  //----------------------End Municipio--------------------------------

  // ------------------------UFS ENDS-----------------------------


  getCidadeCodigo(form) {
    if (this.ufs != null) {
      console.log('form', form.value)
      this.selectedUf = this.ufs.filter((uf) => {
        return uf.Sigla == form.value.UF;
      });
      console.log('selectedUf: ', this.selectedUf)
      this.cidades2 = [];
      this.getCidades();
    }
  }

  getCidadeCodigoEdit(ufEdit) {
    console.log('form', ufEdit)
    this.selectedUf = this.ufs.filter((uf) => {
      return uf.Sigla == ufEdit;
    });
    console.log('selectedUf middle: ', this.selectedUf)
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
    console.log("dataCidades ==>: ", dataCidades)
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

  // ------------------------Update Farm-----------------------------
  atualizar(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda);
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    if (this.imageFile) {
      this.Authorizer.QueryStoreImagem('SalvarImagem', '', 'images/', this.imageFile).then(res => {
        if (res[0].success) {
          console.log('I am the path', res[0].results);
          form.value.path = res[0].results;
          form.value.CodigoFazenda = CodigoFazenda
          let params = {
            'StatusCRUD': 'Gravar',
            'formValues': form.value,
            'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };
          console.log('formm: ', form)
          console.log("gravar:", params);
          this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
            let resultado: any = res[0];
            try {
              if (resultado.success) {
                this.alertService.showLoader(resultado.message, 1000);
                this.goBack();
              }
              else {
                this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Editar Fazenda', pMessage: 'Nenhum usuário!' });
            }
          });
        }
      });
    } else {
      form.value.CodigoFazenda = CodigoFazenda
      form.value.path = this.photopath
      let params = {
        'StatusCRUD': 'Gravar',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };
      console.log('formm: ', form)
      console.log("gravar:", params);
      this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Editar Fazenda', pMessage: 'Nenhum usuário!' });
        }
      });
    }
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
  formatValorAtual(Valor_atual: any) {
    if (Valor_atual == "") {
      Valor_atual = 0;

      this.Valor_atual_aux = "";
      let ret = "";
    }
    if (this.alterando == true) {
      return
    }

    if (this.alterando == false) {
      this.alterando = true;
      console.log("Valor_atual ", Valor_atual)

      if (Valor_atual != "" && Valor_atual != null) {
        let ret = "";
        let sval = Valor_atual.toString();
        let ulti = "";
        if (sval.length > 14) {
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ulti = sval.toString().substring(0, sval.length - 6);
          sval = sval.toString().substring(sval.length - 6);
          sval = ulti + "." + sval;
          ulti = sval.toString().substring(0, sval.length - 10);
          sval = sval.toString().substring(sval.length - 10);
          sval = ulti + "." + sval;
          ulti = sval.toString().substring(0, sval.length - 14);
          sval = sval.toString().substring(sval.length - 14);
          sval = ulti + "." + sval;
          ret = sval;
          ulti = sval.toString().substring(0, sval.length - 18);
          sval = sval.toString().substring(sval.length - 18);
          sval = ulti + "." + sval;
          ret = sval;
        }
        else if (sval.length > 11) {
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ulti = sval.toString().substring(0, sval.length - 6);
          sval = sval.toString().substring(sval.length - 6);
          sval = ulti + "." + sval;
          ulti = sval.toString().substring(0, sval.length - 10);
          sval = sval.toString().substring(sval.length - 10);
          sval = ulti + "." + sval;
          ulti = sval.toString().substring(0, sval.length - 14);
          sval = sval.toString().substring(sval.length - 14);
          sval = ulti + "." + sval;
          ret = sval;
        } else if (sval.length > 8) {
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ulti = sval.toString().substring(0, sval.length - 6);
          sval = sval.toString().substring(sval.length - 6);
          sval = ulti + "." + sval;
          ulti = sval.toString().substring(0, sval.length - 10);
          sval = sval.toString().substring(sval.length - 10);
          sval = ulti + "." + sval;
          ret = sval;
        } else if (sval.length > 5) {
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ulti = sval.toString().substring(0, sval.length - 6);
          sval = sval.toString().substring(sval.length - 6);
          sval = ulti + "." + sval;
          ret = sval;
        } else if (sval.length > 2) {
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ret = sval;
        } else {
          while (sval.length < 3) {
            sval = "0" + sval;
          }
          if (sval == "000")
            sval = "";
          if (sval != "") {
            ulti = sval.toString().substring(0, sval.length - 2);
            sval = sval.toString().substring(sval.length - 2);
            sval = ulti + "," + sval;
          }
          ret = sval;
        }
        console.log("ret: ", ret)
        this.Valor_atual_aux = ret;
        console.log("Valor_atual: ", this.Valor_atual)
        this.formattedValue = this.Valor_atual_aux;
        console.log("Valor_atual_aux: ", this.Valor_atual_aux)
        this.alterando = false;
        this.ret1 = ret
      }
    }
  }
  onChangePrice(evt) {
    console.log("evt: ", evt)
  }
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
          this.takePicture();
        }
      },
      {
        text: 'Use a Câmera',
        handler: () => {
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
          }
        }
      ]
    });
    await alert.present();
  }

}





