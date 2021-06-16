import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-novoitemmed',
  templateUrl: './novoitemmed.page.html',
  styleUrls: ['./novoitemmed.page.scss'],
})
export class NovoitemmedPage implements OnInit {
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;

  @ViewChild('form') form: NgForm;
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public Datadaentrada : Date;
  public horadaentrada : any;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController
  ) { }
  public AppName: String = 'ADM Rural';
  today: Date = new Date();
  public Nome: String;
  public Quantidade: number;
  public valorUnitario: number;
  public valorTotal: number;
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      data => {
        console.log('tipo entrada value:', this.TipoSelected);
        if (data.TipoEntrada) {
          this.TipoSelected = data.TipoEntrada;
        }
        this.UnidadSelected = data.TipoUnidad;
        console.log('tipo entrada value after:', this.TipoSelected);
      }
    )
    this.MostraDadosNome();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/medicamento');
    })
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");
  }
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.navigateRoot('/medicamento');
  }
  goInsertTipo() {
    this.navCtrl.navigateRoot('/novotipomed');
  }
  CriacaoNovo(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    form.value.CodigoFazenda = CodigoFazenda;
    let params = {
      'StatusCRUD': 'Criacao_med',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Item...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          this.alertService.showLoader(resultado.message, 500);
          this.goBack();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    });
  }
  async Cancelar() {
    const alert = await this.alertController.create({
      header: 'Cancelar...',
      message: 'Tem certeza que deseja cancelar esta operação?',
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
            await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }
  MostraDadosNome() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_editfazenda',
      'formValues': atob(CodigoFazenda),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.Nome = JSON.parse(resultado.results)[0].NomeFazenda;
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Não fazenda' });
      }
    });
  }
  calculateRowTotal() {
    this.valorTotal = +this.valorUnitario * +this.Quantidade
  }


}














