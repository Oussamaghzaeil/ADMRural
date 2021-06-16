import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { ActionSheetController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-selling',
  templateUrl: './selling.page.html',
  styleUrls: ['./selling.page.scss'],
})
export class SellingPage implements OnInit {
  @ViewChild('Nome') iNome;
  @ViewChild('inputcamera') cameraInput: ElementRef;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/imgdefault.png";
  public photopath: string;
  public CodigoFazendaAnimal: number;
  public FazendaAnimal: string;
  public ImgAnimal: string;
  public TipoAnimal: string;
  public IdentificacaoAnimal: string;
  public SexoAnimal: string;
  public RacaAnimal: string;
  public QtdAtualAnimal: number;
  public UnidadPesoAnimal: number;
  public PesoAtualAnimal: number;
  public ValorAtualAnimal: number;
  public HiddenAnimal: string;
  public InactiveAnimal: string;
  public ChangeLog: string;
  public ObservacoesAnimal: string;
  public Datadenascimento: Date;
  public Datadeaquisicao: Date;
  public Situacao: string;
  public CodigoAnimal: number;
  public Precosaida: any;
  public ObservacoesAnimalvendo : string;
  public Datadevendo : Date;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    private actionSheetController: ActionSheetController,
  ) { }
  public tipos: string[] = ["Ave", "Bovino", "Caprino", "Equino", "Ovino", "Peixe", "Suino"];
  public unidades: string[] = ["Arroba", "Grama", "Kg", "Tonelada"];
  ngOnInit() {
    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/animaisin');
    })
  }
  showSubOptionOfB: boolean = false; //default
  onSelectChangeOption(form: NgForm) {
    console.log('value selected', form.value.Situacao);
    //grab form value
    let optionValue = form.value.Situacao;
    console.log('value selected', optionValue);
    //show subOptions
    if (optionValue == "Morte") {
      this.showSubOptionOfB = true;
    }
    else {
      this.showSubOptionOfB = false;
    }
  }
  ionViewDidEnter() {
    this.MostraDados();
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    this.imageFileBase64 = "assets/imgs/imgdefault.png";
    this.imageFile = null;
    element.onchange = () => {
      const reader = new FileReader();
      reader.onload = (r: any) => {
        let base64 = r.target.result as string;
        //this.imageFileName = r.target.result as string; //MEU JC
        this.imageFileBase64 = r.target.result as string; //MEU JC
      };
      //console.log('imagem: ', element.files[0]);
      reader.readAsDataURL(element.files[0]);
      this.imageCroquiExtension = element.files[0].type;
      this.imageFile = element.files[0];
    };
  }
  ionViewWillEnter() { }
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.navigateRoot('/animaisin');
  }

  MostraDados() {
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_editAnimal',
      'formValues': atob(CodigoAnimal),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.photopath = JSON.parse(resultado.results)[0].ImgAnimal;
          if (this.photopath) {
            let path = this.env.API_HOST + '/Rural/';
            this.imageFileBase64 = path + JSON.parse(resultado.results)[0].ImgAnimal;
          }
          else { this.photopath = '' }
          this.CodigoAnimal = JSON.parse(resultado.results)[0].CodigoAnimal;
          this.TipoAnimal = JSON.parse(resultado.results)[0].TipoAnimal;
          this.IdentificacaoAnimal = JSON.parse(resultado.results)[0].IdentificacaoAnimal;
          this.CodigoFazendaAnimal = JSON.parse(resultado.results)[0].CodigoFazendaAnimal;
          this.RacaAnimal = JSON.parse(resultado.results)[0].RacaAnimal;
          this.QtdAtualAnimal = JSON.parse(resultado.results)[0].QtdAtualAnimal;
          this.PesoAtualAnimal = JSON.parse(resultado.results)[0].PesoAtualAnimal;
          this.ValorAtualAnimal = JSON.parse(resultado.results)[0].ValorAtualAnimal;
          this.ObservacoesAnimal = JSON.parse(resultado.results)[0].ObservacoesAnimal;
          this.Datadenascimento = JSON.parse(resultado.results)[0].Datadenascimento;
          this.Datadeaquisicao = JSON.parse(resultado.results)[0].Datadeaquisicao;
          let a: any = JSON.parse(resultado.results)[0].Situacao;
          if (typeof (a) == 'undefined')
            a = '';
          if (a == null)
            a = '';
          if (a != '')
            this.Situacao = a;

          let s: any = JSON.parse(resultado.results)[0].SexoAnimal;
          if (typeof (s) == 'undefined')
            s = '';
          if (s == null)
            s = '';
          if (s != '')
            this.SexoAnimal = s;

          let un: any = JSON.parse(resultado.results)[0].UnidadPesoAnimal;
          if (typeof (un) == 'undefined')
            un = '';
          if (un == null)
            un = '';
          if (un != '')
            this.UnidadPesoAnimal = un;

        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Animal', pMessage: 'Não Animal' });

      }
    });

  }

  public morteFlag: boolean = false;


  onChangeSituacao(Situacao: string) {
    if (Situacao == "Vendido") {
      this.morteFlag = true;
    }
    else {
      this.morteFlag = false;
    }
  }
  atualizar(form: NgForm) {
    // paramStatus: Pesquisando, Editando, Deletando 
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    CodigoAnimal = atob(CodigoAnimal);
    console.log('vlue of CodigoAnimal :', CodigoAnimal);
    if (this.morteFlag = true) {
      let params = {
        'StatusCRUD': 'Sell',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
            //this.navCtrl.navigateRoot('/login');
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Editar Animal', pMessage: 'Nenhum usuário!' });
        }
      });
    } else {
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você tem que escolher a situação de venda' });
      //this.navCtrl.navigateRoot('/login');

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






