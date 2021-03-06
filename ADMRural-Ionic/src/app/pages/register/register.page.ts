import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
;


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //@ViewChild("Nome") iNome : ElementRef;
  //imagen 
  public imageFileBase64: string;
  public imageCroquiExtension: string;
  public imageFile: any;

  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('Nome') iNome;
  @ViewChild('phoneInput')

  images = [];
  imageData = [];
  public SrcPhotoAvatar: any = "assets/imgs/user.jpg";
  private DECIMAL_SEPARATOR = ".";
  private GROUP_SEPARATOR = ",";

  public codigoFazenda: any;


  public CodigoUsuario: any;
  public NomeUsuarioLogado: string;
  public numero2: string;
  public numero8: string;
  public Nome: string;
  public SobreNome: string;
  public Email: string;
  public Data: Date;
  public inputvalue : any;
  public min :number = 0;
  public max :number = 2;
  public msginputvalue  : boolean;


  constructor(

    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public platform: Platform,
    private camera: Camera,
    private file: File,
    private http: HttpClient,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private storage: Storage,
    private plt: Platform,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath

  ) {
    

  }



  public form: FormGroup = this.fb.group({
    phoneNumber: [null, [Validators.required]],
  });

  // prettier-ignore


  numberOnlyValidation2(event: any) {
    console.log("aqi");
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    let numero: string = this.numero2;
    console.log("numero:", numero);
    console.log("input:", inputChar);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
      return;
    }

    let val: string;
    val = this.numero2;
    if (typeof (val) == 'undefined')
      val = '';
    if (val == null)
      val = '';
    if (val.length == 2)
      event.preventDefault();
  }
  onInputnumero2(ev: string) {
    console.log('the value:', ev);
  }
  changetodo() {
    console.log(this.inputvalue);
    if (this.inputvalue > this.min && this.inputvalue == this.max)
      this.msginputvalue = true;
    else
      this.msginputvalue = false;
  }
  

  numberOnlyValidation8(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    let pla: string = this.numero8;
    console.log("placa:", pla);
    console.log("input:", inputChar);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
      return;
    }

    let val: string;
    val = this.numero8;
    if (typeof (val) == 'undefined')
      val = '';
    if (val == null)
      val = '';
    if (val.length == 9)
      event.preventDefault();
  }
  onInputnumero8(ev: string) {
    console.log('the value:', ev);
  }



  ngOnInit() {
    console.log("Init");
    this.CodigoUsuario = sessionStorage.getItem("SessionCodigoUsuario");
    this.NomeUsuarioLogado = sessionStorage.getItem("SessionNomeUsuario");
    this.platform.backButton.subscribe(() => {
      this.goBack();
    })
  }


  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes est?? prestes a se animar.    
    console.log("ionViewWillEnter");
  }



  percentage(value) {
    var num = value.replace('%', '');
    if (isNaN(num)) {
      if (num % 1 != 0) {
        num = parseFloat(num).toFixed(2);
      }
      return num + '%';
    } else {
      return false;
    }
  }



  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    setTimeout(() => {
      this.iNome.setFocus();
    }, 150);
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    this.imageFileBase64 = "assets/imgs/user.jpg";
    this.imageFile = null;
    element.onchange = () => {
      // Depois colocar um loading aqui!!!     
      const reader = new FileReader();
      reader.onload = (r: any) => {
        //THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
        //THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
        //UP TO YOU, NOT REALLY BOTHERED
        let base64 = r.target.result as string;
        //this.imageFileName = r.target.result as string; //MEU JC
        this.imageFileBase64 = r.target.result as string; //MEU JC
        //FIXING ORIENTATION USING NPM PLUGIN fix-orientation
        // fixOrientation(base64, { image: true }, (fixed: string, image: any) => {
        //   //fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
        //   this.Foto = fixed;
        //   //this.alertService.hideLoader(500);
        // });

      };
      //console.log('imagem: ', element.files[0]);
      reader.readAsDataURL(element.files[0]);
      this.imageCroquiExtension = element.files[0].type;
      this.imageFile = element.files[0];
    };
  }
  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes est?? prestes a ser animado.    
    console.log("ionViewWillLeave");
  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    console.log("ionViewDidLeave");
  }
  goBack() {
    this.navCtrl.back();
  }
  GravarDados(form: NgForm) {
    // paramStatus: Pesquisar, Gravar, Deletar
    if (this.imageFile) {
      this.Authorizer.QueryStoreImagem('SalvarImagem', '', 'images/', this.imageFile).then(res => {
        let resultado: any = res[0];
        //resultado.results // This is the complete path. Ejemplo: "C:\web\sites\ServiceImobiliario\uploads\imagems\croqui\y35swmarzjt.jpg"
        if (res[0].success) {
          // rutaImagem = this.envService.API_NAME + res[0].results;
          // this.imageFileBase64 = this.envService.API_NAME + res[0].results;
          console.log('I am the path', res[0].results);
          form.value.path = res[0].results;
          form.value.Senha = Md5.hashStr(form.value.Senha);
          form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
          let params = {
            'StatusCRUD': 'Register',
            'formValues': form.value,
            'CodigoUsuarioSistema': 0,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };
          console.log("Register:", params);
          this.Authorizer.QueryStoreProc('MinhaConta', 'spRegister', params).then(res => {
            let resultado: any = res[0];
            //console.log(resultado);
            try {
              if (resultado.success) {
                this.alertService.presentAlert({ pTitle: 'Salvando Conta...', pSubtitle: '', pMessage: 'Opera????o realizada com sucesso!' });
                this.alertService.showLoader(resultado.message, 1000);
                this.goBack();
              }
              else {
                this.alertService.presentAlert({ pTitle: 'ATEN????O', pSubtitle: 'Erro', pMessage: 'Opera????o n??o realizada!' });
              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: 'Aten????o', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
            }
          });
        }
      }
      );
    } else {
      form.value.Senha = Md5.hashStr(form.value.Senha);
      form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
      let params = {
        'StatusCRUD': 'Register',
       
        'formValues': form.value,
        'CodigoUsuarioSistema':0,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };
      console.log("Register:", params);
      this.Authorizer.QueryStoreProc('MinhaConta', 'spRegister', params).then(res => {
        let resultado: any = res[0];
        //console.log(resultado);
        try {
          if (resultado.success) {
            this.alertService.presentAlert({ pTitle: 'Salvando Conta...', pSubtitle: '', pMessage: 'Opera????o realizada com sucesso!' });
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATEN????O', pSubtitle: 'Erro', pMessage: 'Opera????o n??o realizada!' });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Aten????o', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
        }
      });
    }
  }
  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/\D/g, '');
    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  };
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
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
          // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          this.takePicture();
        }
      },
      {
        text: 'Use a C??mera',
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












}