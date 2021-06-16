import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-novocobertura',
  templateUrl: './novocobertura.page.html',
  styleUrls: ['./novocobertura.page.scss'],
})
export class NovocoberturaPage implements OnInit {
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public valorUnitario: number;
  public valorTotal: number;
  public Datadacobertura : Date;
  public Tipo : string;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
  ) { }
  public TipoEntrada: any;
  public i: number;
  public item: any;
  public animal: any;
  public Nome: String;
  public racao: string;
  public QuantidadeemEntrada: number;
  public Unidadementrada: string;
  public valor: number;
  public Datadaentrada: Date;
  public horadaentrada: Date;
  public Quantidade: number;
  public a: any;
  public ValorUnit: number;
  public id: number;
  public TipodeEntrada: string;
  public itemSelected: any;
  public value: string;
  public b: any;
  public Touro: Boolean=false;
  public Inciminacao: Boolean=false;
  ngOnInit() {
    //console.log("ionViewDidEnter");
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
    this.navCtrl.navigateRoot('/cobertura');
  }
  goBack1() {
    this.navCtrl.navigateRoot('/cobertura');
  }
  goToAlimColetivo() {
    this.router.navigate(['/alimcoletivo', this.item]);
  }
  MostraDados() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    let params = {
      'StatusCRUD': 'Pesquisar_animais_cobertura',
      'formValues': CodigoFazenda,
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
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });

  }
  selected(ev: any) {
    console.log('event click:', ev)
    console.log('evento click:', ev.detail.value)
    this.animal = ev.detail.value;
    console.log('evento click:', this.animal)
    // this.navCtrl.navigateRoot('/novoitem',ev);
  }
  CriacaoNovoTouro(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    console.log('id of animals selected from show function :', this.animal);
      form.value.CodigoAnimal = this.animal;
      form.value.CodigoFazenda = CodigoFazenda;
      let params = {
        'StatusCRUD': 'Salvar_Cobertura_Touro',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            this.alertService.presentAlert({ pTitle: 'Salvando Cobertura...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            //this.alertService.showLoader(resultado.message, 20);
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
  CriacaoNovoInciminacao(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    console.log('id of animals selected from show function :', this.animal);
      form.value.CodigoAnimal = this.animal;
      form.value.CodigoFazenda = CodigoFazenda;
      let params = {
        'StatusCRUD': 'Salvar_Cobertura_Inciminacao',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            this.alertService.presentAlert({ pTitle: 'Salvando Cobertura...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            //this.alertService.showLoader(resultado.message, 20);
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
  onChangeSituacao(Tipo: string) {
    if (Tipo == "Touro"){
      this.Touro = true;
      this.Inciminacao = false;
    }
    else if (Tipo == "Inciminacao") {
      this.Inciminacao = true;
      this.Touro = false;
    }
    else{
      this.Inciminacao = false;
      this.Touro = false;
    }
  }

}





