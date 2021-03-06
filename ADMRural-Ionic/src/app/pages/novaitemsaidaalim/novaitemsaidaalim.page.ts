import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, ModalController, NavParams, AlertController } from '@ionic/angular';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Time } from '@angular/common';


@Component({
  selector: 'app-novaitemsaidaalim',
  templateUrl: './novaitemsaidaalim.page.html',
  styleUrls: ['./novaitemsaidaalim.page.scss'],
})
export class NovaitemsaidaalimPage implements OnInit {
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;

  @ViewChild('form') form: NgForm;

  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public AppName: String = 'ADM Rural';
  today: Date = new Date();
  public Nome: String;
  public Quantidade: number;
  public valorUnitario: number;
  public valorTotal: number;
  public selVendaa: Boolean;
  public TipoQty: any;
  public valorRemainig: any;
  public Datadaentrada : Date;
  public horadaentrada : any;
  public TipoMovimentacao : any;
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
    public alertController: AlertController ) { }

  ngOnInit() {
    //console.log("ionViewDidEnter");

    this.activatedRoute.params.subscribe(
      data => {
        console.log('tipo entrada value:', this.TipoSelected);
        if (data.TipoEntrada) {
          this.TipoSelected = data.TipoEntrada;
          this.TipoQty = data.tipoQty;
          this.UnidadSelected = data.unidade;
        }
       //this.UnidadSelected = data.TipoUnidad;
        console.log('tipo entrada value after:', this.TipoSelected);
      }
    )
    this.MostraDadosNome();
    this.platform.backButton.subscribe(() => {
      this.Cancelar();
      this.navCtrl.navigateRoot('/saidastockali');
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
    this.navCtrl.navigateRoot('/saidastockali');
  }
  goInsertTipo() {
    this.navCtrl.navigateRoot('/novotipoalimsaida');
  }
  CriacaoNovo(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    form.value.CodigoFazenda = CodigoFazenda;
    this.TipoQty = this.TipoQty - this.Quantidade;
    this.valorRemainig = this.valorRemainig - this.valorTotal;
    console.log("The quantity left ==>",this.TipoQty);
    let params = {
      'StatusCRUD': 'Criacao_alim',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };

    this.Authorizer.QueryStoreProc('Executar', 'spEstoqueSaida', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Item...', pSubtitle: '', pMessage: 'Opera????o realizada com sucesso!' });
          this.alertService.showLoader(resultado.message, 500);
          this.goBack();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'Aten????o', pSubtitle: 'Erro', pMessage: 'Opera????o n??o realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Aten????o', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    });

    this.UpdateEstoque();
  }

  UpdateEstoque(){
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    this.TipoQty = this.TipoQty - this.Quantidade;
    this.valorRemainig = this.valorRemainig - this.valorTotal;
    console.log("The Quantity remaining ==>",this.TipoQty);
    console.log("The Value remining  ==> ",this.valorRemainig);

    let params = {
      'StatusCRUD': 'Criacao_alim',
      'formValues': 0,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
  }
  async Cancelar() {
    const alert = await this.alertController.create({
      header: 'Cancelar...',
      message: 'Tem certeza de que deseja cancelar esta opera????o?',
      buttons: [
        {
          text: 'N??O',
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
    // paramStatus: Pesquisando, Editando, Deletando    

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
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'N??o fazenda' });

      }
    });

  }

  test() {
    console.log('the value unitario  ', this.valorUnitario)
  }
  calculateRowTotal() {
    this.valorTotal = +this.valorUnitario * +this.Quantidade
  }


}
