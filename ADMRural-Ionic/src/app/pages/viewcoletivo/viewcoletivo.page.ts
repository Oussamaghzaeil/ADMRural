import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-viewcoletivo',
  templateUrl: './viewcoletivo.page.html',
  styleUrls: ['./viewcoletivo.page.scss'],
})
export class ViewcoletivoPage implements OnInit {
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public valorUnitario: number;
  public valorTotal: number;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
  ) { }
  public TipoEntrada: any;
  public racao: string;
  public Unidadementrada: string;
  public Quantidade: number;
  public a: any;
  public b: any;
  public observacao: String;
  public Datadealimentacaoinicial: Date;
  public Datadealimentacaofinal: Date;
  public selected: boolean = true;
  public j: boolean = true;
  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.goBack1();
    })
  }
  ionViewWillEnter() { }
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }
  ionViewWillLeave() {
  }
  ionViewDidLeave() {
  }
  goBack() {
    this.navCtrl.navigateRoot('/coletivolista');
  }
  goBack1() {
    this.navCtrl.navigateRoot('/coletivolista');
  }
  onChangeSituacao(ev: any) {
    console.log('item selected :', ev);
    if (this.j) {
      this.j = false;
      console.log('item selected :', this.j)
      this.selected = false;
      console.log('item selected :', this.selected)
    }
    else {
      this.selected = true;
      console.log('item selected :', this.selected)
      this.j = true;
      console.log('item  :', this.j)
    }
  }
  MostraDados() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
    let params = {
      'StatusCRUD': 'Monstradados_Alim_Coletivo',
      'formValues': Codigoitem,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
          this.Quantidade = JSON.parse(resultado.results)[0].Quantidade;
          this.racao = JSON.parse(resultado.results)[0].racao;
          this.Unidadementrada = JSON.parse(resultado.results)[0].Unidade;
          this.observacao = JSON.parse(resultado.results)[0].observacao;
          this.Datadealimentacaoinicial = JSON.parse(resultado.results)[0].Datadealimentacaoinicial;
          this.Datadealimentacaofinal = JSON.parse(resultado.results)[0].Datadealimentacaofinal;
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Alimentacao Coletivo', pMessage: 'Nenhum dados' });
        }
      } catch (err) {
      }
    });
  }
}




