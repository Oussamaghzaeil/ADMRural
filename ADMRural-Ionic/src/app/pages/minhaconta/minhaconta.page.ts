import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { NgForm } from '@angular/forms';
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
import { finalize } from 'rxjs/operators';
const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhaContaPage implements OnInit {
  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('Nome') iNome;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/user.jpg";
  public CodigoUsuario: any;
  public NomeUsuarioLogado: String;
  public Nome: String;
  public photopath: String;
  public Senha : any;
  public ReSenha : any;
  public email: String;
  public numero2: string;
  public numero8: string;


  constructor(
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

  ) { }

  ngOnInit() {
    this.CodigoUsuario = JSON.parse(sessionStorage.getItem('SessionUser'))[0].CodigoUsuario;
    this.NomeUsuarioLogado = JSON.parse(sessionStorage.getItem('SessionUser'))[0].Nome;
    this.MostraDados(JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario);
    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(()=>{
      this.goBack();
    })
  }
  ionViewWillEnter() { }
  
  numberOnlyValidation2(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    let pla: string = this.numero2;
    console.log("placa:", pla);
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
  ionViewDidEnter() {
    this.MostraDados(JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario);
    console.log("ionViewDidEnter");
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    this.imageFileBase64 = "assets/imgs/user.jpg";
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
  }
  ionViewWillLeave() {}
  ionViewDidLeave() {}
  goBack() {
    this.navCtrl.back();
  }
  MostraDados(CodigoUsuario: any) {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    this.Authorizer.QueryStoreProc('MinhaConta', 'spMinhaConta', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.photopath = JSON.parse(resultado.results)[0].photopath;
          if (this.photopath) {
            let path = this.env.API_HOST + '/Rural/';
            this.imageFileBase64 = path + JSON.parse(resultado.results)[0].photopath;
          }
          else { this.photopath = '' }
          this.Nome = JSON.parse(resultado.results)[0].Nome;
          this.email = JSON.parse(resultado.results)[0].Email;
          this.numero2 = JSON.parse(resultado.results)[0].DD;
          this.numero8 = JSON.parse(resultado.results)[0].Celular;
          this.Senha = JSON.parse(resultado.results)[0].Senha;
          this.ReSenha = JSON.parse(resultado.results)[0].Senha;
          this.photopath = JSON.parse(resultado.results)[0].photopath;

          //this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Minha Conta', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Minha Conta', pMessage: 'Nenhum usuário!' });
      }
    });

  }
  atualizar(form: NgForm) {
    // paramStatus: Pesquisando, Editando, Deletando  
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
            'StatusCRUD': 'Gravar',
            'formValues': form.value,
            'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };

          console.log("valores:", params);
          this.Authorizer.QueryStoreProc('MinhaConta', 'spMinhaConta', params).then(res => {
            let resultado: any = res[0];
            console.log("resultado", resultado)
            try {
              if (resultado.success) {

                this.alertService.showLoader(resultado.message, 1000);
              }
              else {
                this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Minha Conta', pMessage: resultado.message });
                //this.navCtrl.navigateRoot('/login');
              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Minha Conta', pMessage: 'Nenhum usuário!' });
            }
          });


        }
      });
    } else {
      form.value.path = this.photopath
      form.value.Senha = Md5.hashStr(form.value.Senha);
      form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
      let params = {
        'StatusCRUD': 'Gravar',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };

      console.log("valores:", params);
      this.Authorizer.QueryStoreProc('MinhaConta', 'spMinhaConta', params).then(res => {
        let resultado: any = res[0];
        console.log("resultado", resultado)
        try {
          if (resultado.success) {

            this.alertService.showLoader(resultado.message, 1000);
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: resultado.message });
            //this.navCtrl.navigateRoot('/login');
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Erro', pMessage: 'Nenhum usuário!' });
        }
      });
    }
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

}

