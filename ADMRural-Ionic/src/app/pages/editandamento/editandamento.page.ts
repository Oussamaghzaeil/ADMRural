import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editandamento',
  templateUrl: './editandamento.page.html',
  styleUrls: ['./editandamento.page.scss'],
})
export class EditandamentoPage implements OnInit {
  portForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;
  @ViewChild('form') form: NgForm;
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public Datadaentrada: Date;
  public horadaentrada: string;
  public Quantidade: number;
  public Observacao: string;
  public Situacao: string;
  public valorUnitario: number;
  public valorTotal: number;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController
  ) { }

  public AppName: String = 'ADM Rural';
  public Nome: String;

  ngOnInit() {
    //console.log("ionViewDidEnter");
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
    // this.TipoSelected = this.navParams.get('TipoEntrada')

    this.MostraDados();
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");
  }
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.navigateRoot('/stock');
  }
  goInsertTipo() {
    this.navCtrl.navigateRoot('/novotipo');
  }
  goInsertUnidad() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
    sessionStorage.setItem("Codigoitem", btoa(Codigoitem))
    this.navCtrl.navigateRoot('/unidadeforedit');
  }
  atualizar(form: NgForm) {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
    form.value.Codigoitem = Codigoitem;
    let params = {
      'StatusCRUD': 'Gravar',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
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
  }
  async Cancelar() {
    const alert = await this.alertController.create({
      header: 'Cancelar...',
      message: 'Tem certeza de que deseja cacel esta opera????o?',
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
            this.Delete();
            await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }


  Delete() {
    let params = {
      'StatusCRUD': 'Cancelar',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
      this.alertService.presentAlert({ pTitle: 'Opera????o cancelada...', pSubtitle: '', pMessage: 'Opera????o realizada com sucesso!' });
      // this.alertService.showLoader(resultado.message, 500);
      this.goBack();
    });
  }
  MostraDados() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    console.log('vlue of Codigoitem :', atob(Codigoitem));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_view_edit',
      'formValues': atob(Codigoitem),
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.Nome = JSON.parse(resultado.results)[0].NomeFazenda;
          this.TipoSelected = JSON.parse(resultado.results)[0].TipodeEntrada;
          this.Datadaentrada = JSON.parse(resultado.results)[0].DatadeEntrada;
          let hora = JSON.parse(resultado.results)[0].HoradeEntrada.split(':')[0];
          let min = JSON.parse(resultado.results)[0].HoradeEntrada.split(':')[1];
          this.horadaentrada = hora + ':' + min;
          this.Quantidade = JSON.parse(resultado.results)[0].Quantidade;
          this.UnidadSelected = JSON.parse(resultado.results)[0].Unidad;
          this.valorUnitario = JSON.parse(resultado.results)[0].ValorUnitario;
          this.valorTotal = JSON.parse(resultado.results)[0].ValorTotal;
          this.Observacao = JSON.parse(resultado.results)[0].Observacao;
          this.Situacao = JSON.parse(resultado.results)[0].Situacao;
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'N??o fazenda' });
      }
    });

  }
  calculateRowTotal() {
    this.valorTotal = +this.valorUnitario * +this.Quantidade
  }


}







