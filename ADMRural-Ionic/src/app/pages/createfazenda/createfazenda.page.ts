import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActionSheetController, Platform } from '@ionic/angular';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SqlStorage } from 'src/providers/sql-storage/sql-storage';
import { ColaboradoresModel } from 'src/app/models/Colaboradores.model';

import { ValidationService } from 'src/app/services/validation.service';
const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-createfazenda',
  templateUrl: './createfazenda.page.html',
  styleUrls: ['./createfazenda.page.scss'],
})
export class CreatefazendaPage implements OnInit {
  private imageFileBase64: string;
  private imageCroquiExtension: string;
  private imageFile: any;

  @ViewChild('inputcamera') cameraInput: ElementRef;
  public Latitude: any;
  public Longitude: any;
  public Endereco: any;
  public numberMask: any;
  public valorInicial: any = 65444.46;
  public Valor_atual: any;
  public Valor_atual_aux: any;
  public Valor_inicial: any;
  private alterando: boolean;
  public selectedUf: any;
  public cidades: any;
  public cidades2: any;
  public formattedValue: any;
  public ufs;
  public ufs2;
  public colaborador = new ColaboradoresModel();

  masks: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private validations: ValidationService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    private actionSheetController: ActionSheetController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public alertController: AlertController,
    private sqlstore: SqlStorage,
    
    private network: Network
  ) {
    this.masks = {
      valorInicialMask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      numberMask: createNumberMask({ requireDecimal: true, prefix: 'R$ ', thousandsSeparatorSymbol: '.', allowDecimal: true, decimalSymbol: ',' })
    };
  }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/fazendas');
    })
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
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");
    this.AuthLogin();
    //this.getUfs();
    this.alterando = false;
  }
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.back();
  }

  AuthCricao(form: NgForm) {
    if (this.network.type == 'none')
      this.CriacaoOffline(form);
    else
      this.Criacao(form);
  }

  public items = [];
  CriacaoOffline(form: NgForm) {

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    let CodigoUsuario = sessionStorage.getItem('CodigoUsuario')
    CodigoUsuario = atob(CodigoUsuario)

    console.log("The codigo usuario ==>",CodigoUsuario);
    console.log("The codigo Fazenda ==>",CodigoFazenda);
    
    
    console.log(form.value)
    this.items.push({
      CodigoFazenda: CodigoFazenda,
      CodigoUsuario: CodigoUsuario,
      EnderecoFazenda: form.value.EnderecoFazenda,
      ImgFazenda: form.value.ImgFazenda,
      LatitudeFazenda: form.value.LatitudeFazenda,
      LongitudeFazenda: form.value.LongitudeFazenda,
      NomeFazenda: form.value.NomeFazenda,
      NomeMunicipioFazenda: form.value.NomeMunicipioFazenda,
      ObservacoesFazenda: form.value.ObservacoesFazenda,
      UfFazenda: form.value.UfFazenda,
      ValorAtualFazenda: form.value.ValorAtualFazenda,
      ValorInicialFazenda: form.value.ValorInicialFazenda
    });


    console.log("user21:", this.items);

    this.sqlstore.saveFazenda(this.items);

    this.navCtrl.navigateRoot('/menu/options');

  }

  /* ----------------------------------------------- MASKS -----------------------------------------------*/
  formatreal(valString: any, idComponent: any) {
    this.validations.formatreal(valString, idComponent)
  }

  formatkg(valString: any, idComponent: any) {
    this.validations.formatquilo(valString, idComponent)
  }

numberOnlyValidation(event: any, opt:number) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
      return;
    }
    let val:string = '';
    /* if(opt==1)
      val = this.quantidade;
    else if(opt==2){
      val = this.valor;
    }else if(opt==3)
      val = this.acrescimo;
    if(typeof(val)=='undefined')
      val='';
    if(val==null)
      val='';
    if(val.length==10)
      event.preventDefault(); */
  }  

  format(valString) {
    if (!valString) {
        return '';
    }
    if(typeof(valString)=='undefined')
      return '';

    //991.000.000,00
    let val:string = valString;
    val = val.replace('.','');
    val = val.replace('.','');
    val = val.replace(',','');
    val = val.trim();
    let val2 = parseFloat(val);
    val = val2.toString().trim();
    console.log("val:", val);
    if(val.length==1)
      val = '0,0' + val;
    else if(val.length==2)
      val = '0,' + val;
    else if(val.length==3){
      let par1 = val.substring(0,1);
      let par2 = val.substring(1);
      val = par1 + ',' + par2;
    }else if(val.length==4){
      let par1 = val.substring(0,2);
      let par2 = val.substring(2);
      val = par1 + ',' + par2;
    }else if(val.length==5){
      let par1 = val.substring(0,3);
      let par2 = val.substring(3);
      val = par1 + ',' + par2;
    }else if(val.length==6){
      let par1 = val.substring(0,1);
      let par2 = val.substring(1,4);
      let par3 = val.substring(4);
      val = par1 + '.' + par2 + ',' + par3;
    }else if(val.length==7){
      let par1 = val.substring(0,2);
      let par2 = val.substring(2,5);
      let par3 = val.substring(5);
      console.log("par1:", par1);
      console.log("par2:", par2);
      console.log("par3:", par3);
      val = par1 + '.' + par2 + ',' + par3;
    }else if(val.length==8){
      let par1 = val.substring(0,3);
      let par2 = val.substring(3,6);
      let par3 = val.substring(6);
      val = par1 + '.' + par2 + ',' + par3;
    }else if(val.length==9){
      let par1 = val.substring(0,1);
      let par2 = val.substring(1,4);
      let par3 = val.substring(4,7);
      let par4 = val.substring(7);
      val = par1 + '.' + par2 + '.' + par3 + ',' + par4;
    }else if(val.length==10){
      let par1 = val.substring(0,2);
      let par2 = val.substring(2,5);
      let par3 = val.substring(5,8);
      let par4 = val.substring(8);
      val = par1 + '.' + par2 + '.' + par3 + ',' + par4;
    }else if(val.length==11){
      let par1 = val.substring(0,3);
      let par2 = val.substring(3,6);
      let par3 = val.substring(6,9);
      let par4 = val.substring(9);
      val = par1 + '.' + par2 + '.' + par3 + ',' + par4;
    }

    if(val.length>14)
      val = val.substring(0,14);

    //this.calculoTotal();

    return val;
  }



  
  /* ----------------------------------------------- MASKS -----------------------------------------------*/

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
            'StatusCRUD': 'Criacao',
            'formValues': form.value,
            'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,

            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };
          console.log("Novo Fisico:", params);
          this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
            let resultado: any = res[0];
            console.log(resultado);
            try {
              if (resultado.success) {
                this.alertService.presentAlert({ pTitle: 'Salvando Fazenda...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
                this.alertService.showLoader(resultado.message, 1000);
                this.goBack();
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
        'StatusCRUD': 'Criacao',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,

        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };
      console.log("Novo Fisico:", params);
      this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
        let resultado: any = res[0];
        console.log(resultado);
        try {
          if (resultado.success) {
            this.alertService.presentAlert({ pTitle: 'Salvando Fazenda...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
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
  //------------------------Network Check Start------------------------------------

  AuthLogin() {
    if (this.network.type == 'none')
      this.mostraUfs();
    else
      this.getUfs();
  }
  //-------------------------NetworkCheck End

  //-------------------------UFOFFLINE------------------------------

  public items1 = [];
  mostraUfs() {
    //let code = JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario;
    let sql: string = "select CodigoBaseUF, Nome, Sigla";
    sql += " from tblBaseUF";

    let data: any = [];

    this.sqlstore.getQuery(sql, data).then((data) => {
      let recs = data;
      for (let i = 0; i < recs.rows.length; i++) {
        let ite = recs.rows.item(i);

        this.items1.push({
          CodigoBaseUF: ite.CodigoBaseUF,
          Nome: ite.Nome,
          Sigla: ite.Sigla
        });
      }
      console.log("the data UF received ==>", this.items1);

    }, (error) => {
      /* if(this.pesquisando==false){
        this.loading.dismiss();
        this.showAlert("Talonário", "Falha carregando a tabela de bairros. Por favor, tente novamente!");
      }
      this.pesquisando=false; */
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de UF. Por favor, tente novamente!");
      console.log("Iam in the error");
    });

  }


  //-------------------------UFOFFLINE END----------------------------

  presentAlert(titulo, conteudo) {
    const alert = this.alertController.create({
      message: 'titulo',
      subHeader: 'conteudo',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
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
          this.items1 = JSON.parse(resultado.results);
          console.log("Ufs: ", this.items1)
          this.ufs2 = JSON.parse(resultado.results);
          for (let i = 0; i < this.ufs2.length; i++) {
            this.ufs2[i] = this.items1[i].Sigla;
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
    this.selectedUf = this.items1.filter((uf) => {
      return uf.Sigla == form.value.UF;
    });
    console.log('selectedUf: ', this.selectedUf)
    //console.log('selectedUf: ', this.selectedUf[0].CodigoBaseUF)
    this.cidades2 = [];
    this.items2 = [];
    if (this.network.type == 'none')
      this.mostraMunicipio();
    else
      this.getCidades();
    //this.getCidades();
  }

  //------------------------Municipio OFFLINE------------------------

  public items2 = [];
  mostraMunicipio() {
    let code = this.selectedUf[0].CodigoBaseUF
    let sql: string = "SELECT Nome";
    sql += " from tblBaseMunicipio";
    sql += " where CodigoBaseUF =?";

    let data: any = [code];

    this.sqlstore.getQuery(sql, data).then((data) => {
      let recs = data;
      for (let i = 0; i < recs.rows.length; i++) {
        let ite = recs.rows.item(i);

        this.items2.push({
          CodigoBaseMunicipio: ite.CodigoBaseMunicipio,
          CodigoBaseUF: ite.CodigoBaseUF,
          Nome: ite.Nome,
          Populacao: ite.Populacao,
          IndicadorCapital: ite.IndicadorCapital
        });
      }
      console.log("the data Municipio received ==>", this.items2);


    }, (error) => {
      /* if(this.pesquisando==false){
        this.loading.dismiss();
        this.showAlert("Talonário", "Falha carregando a tabela de bairros. Por favor, tente novamente!");
      }
      this.pesquisando=false; */
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de Municipio. Por favor, tente novamente!");
      console.log("Iam in the error");
    });

  }

  //------------------------Municipio Offline End--------------------



  // ------------------------Cidades Begins-----------------------------

  getCidades() {
    let dataCidades = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'codigoColaborador': this.colaborador.codigoColaborador,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'PesquisarCidades',
      'formValues': this.selectedUf[0].CodigoBaseUF
    };
    console.log("dataCidades: ", dataCidades)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', dataCidades).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.items2 = JSON.parse(resultado.results);
          this.cidades2 = JSON.parse(resultado.results);
          console.log("cidades: ", this.items2)
          for (let i = 0; i < this.cidades2.length; i++) {
            this.cidades2[i] = this.items2[i].Nome;
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
  public ret1: any;
  formatValorAtual(Valor_atual: any) {
    //console.log('event',event)
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
        //5 432 109 876 543 21
        //9,999,999,999,999.00
        if (sval.length > 14) {
          //543210987654321
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ////5432109876543,21
          ulti = sval.toString().substring(0, sval.length - 6);
          sval = sval.toString().substring(sval.length - 6);
          //ulti = ulti.toString(ulti);
          sval = ulti + "." + sval;
          ////5432109.876.543,21
          ulti = sval.toString().substring(0, sval.length - 10);
          sval = sval.toString().substring(sval.length - 10);
          //ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ////5.432.109.876.543,21
          ulti = sval.toString().substring(0, sval.length - 14);
          sval = sval.toString().substring(sval.length - 14);
          //ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ret = sval;
          ulti = sval.toString().substring(0, sval.length - 18);
          sval = sval.toString().substring(sval.length - 18);
          // ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ret = sval;
        }
        else if (sval.length > 11) {
          //543210987654321
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ////5432109876543,21
          ulti = sval.toString().substring(0, sval.length - 6);
          sval = sval.toString().substring(sval.length - 6);
          //ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ////5432109.876.543,21
          ulti = sval.toString().substring(0, sval.length - 10);
          sval = sval.toString().substring(sval.length - 10);
          //ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ////5.432.109.876.543,21
          ulti = sval.toString().substring(0, sval.length - 14);
          sval = sval.toString().substring(sval.length - 14);
          // ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ret = sval;
        } else if (sval.length > 8) {
          //210987654321
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ////210987654,321
          ulti = sval.toString().substring(0, sval.length - 6);
          sval = sval.toString().substring(sval.length - 6);
          // ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ////210987.654,321
          ulti = sval.toString().substring(0, sval.length - 10);
          sval = sval.toString().substring(sval.length - 10);
          //ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ret = sval;
        } else if (sval.length > 5) {
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          sval = ulti + "," + sval;
          ulti = sval.toString().substring(0, sval.length - 6);
          sval = sval.toString().substring(sval.length - 6);
          // ulti = Integer.toString(Integer.parseInt(ulti));
          sval = ulti + "." + sval;
          ret = sval;
        } else if (sval.length > 2) {
          ulti = sval.toString().substring(0, sval.length - 2);
          sval = sval.toString().substring(sval.length - 2);
          // ulti = Integer.toString(Integer.parseInt(ulti));
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
        //this.Valor_atual = this.Valor_atual_aux;
        console.log("Valor_atual: ", this.Valor_atual)
        this.formattedValue = this.Valor_atual_aux;

        console.log("Valor_atual_aux: ", this.Valor_atual_aux)
        this.alterando = false;
        this.ret1 = ret
        //  return
      }
    }
  }

  formatValorAtual_aux(Valor_atual) { }
  onChangePrice(evt) {
    console.log("evt: ", evt)
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


}




