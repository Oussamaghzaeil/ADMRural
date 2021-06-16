import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-viewvendido',
  templateUrl: './viewvendido.page.html',
  styleUrls: ['./viewvendido.page.scss'],
})
export class ViewvendidoPage implements OnInit {
  @ViewChild('Nome') iNome;
  @ViewChild('inputcamera') cameraInput: ElementRef;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/imgdefault.png";
  public photopath: String;
  public CodigoFazendaAnimal: number; 
  public FazendaAnimal: String;
  public ImgAnimal: String;
  public TipoAnimal: String;
  public IdentificacaoAnimal: String;
  public SexoAnimal: String;
  public RacaAnimal: String;
  public QtdAtualAnimal: number;
  public UnidadPesoAnimal: number;
  public PesoAtualAnimal: number;
  public ValorAtualAnimal: number;
  public ObservacoesAnimal: String;
  public Datadenascimento : Date;
  public Datadeaquisicao : Date;
  public Situacao : String;
  public ValorAlimentacao : number;
  public Data : Date;
  public Datadevendo : Date;
  public Precosaida : number;
  public ObservacoesAnimalvendo: String;
  public  CodigoAnimal : number;
  public tipos : any;
  public unidades : string;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
  ) {}
  ngOnInit() {
    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/vendido');
    })
  }
  ionViewDidEnter() {
    this.MostraDados();
    this.MostraDadosoutro();
  }
  ionViewWillEnter() {}
  ionViewWillLeave() {}
  ionViewDidLeave() {}
  goBack() {
    this.navCtrl.navigateRoot('/vendido');
  }
  MostraDados() {
     let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    let params = {
      'StatusCRUD': 'Pesquisar_editanimal',
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
          this.Data            = JSON.parse(resultado.results)[0].Dataa;
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
  MostraDadosoutro() {
    let CodigoAnimal = sessionStorage.getItem('CodigoAnimal')
    console.log('vlue of CodigoAnimal :', atob(CodigoAnimal));
    let params = {
      'StatusCRUD': 'Pesquisar_animal_vendido',
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
          this.Precosaida = JSON.parse(resultado.results)[0].Precosaida;
          this.ObservacoesAnimalvendo = JSON.parse(resultado.results)[0].ObservacoesAnimalvendo;
          this.Datadevendo = JSON.parse(resultado.results)[0].Datadevendo;
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Animal', pMessage: 'Não alimentacao' });
      }
    });
  }
}







