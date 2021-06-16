import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-animaiscoletivo',
  templateUrl: './animaiscoletivo.page.html',
  styleUrls: ['./animaiscoletivo.page.scss'],
})
export class AnimaiscoletivoPage implements OnInit {
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public valorUnitario: number;
  public valorTotal: number;
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
  public Datadealimentacao : Date;
  public observacao : string;

  ngOnInit() {
    //console.log("ionViewDidEnter");
    this.MostraDados();
    this.MostraDadosTipo();
    this.platform.backButton.subscribe(() => {
      this.goBack1();
    })
    this.notify();
  }
  notify() {
    if (this.Quantidade == undefined || this.Quantidade == NaN) { this.Quantidade = 0; }
    if (this.valorTotal == undefined || this.valorTotal == NaN) { this.valorTotal = 0; }
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
  FilterJSONData(ev: any) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    console.log('vlue of CodigoFazenda :', atob(CodigoFazenda));
    console.log('event search bar:', ev.target.value)
    let search = ev.target.value;
    let params = {
      'StatusCRUD': 'Pesquisar_search_animais',
      'formValues': search,
      'CodigoFazenda': atob(CodigoFazenda),
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
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: resultado.message });
        }
      } catch (err) {
      }
    });
  }
  MostraDados() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    let params = {
      'StatusCRUD': 'Pesquisar_animais',
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
  goToAlimColetivo() {
    this.router.navigate(['/alimcoletivo', this.item]);
  }
  GetTipo1(item) {
    console.log('id of the item selected:', item)
    let itens: any;
    itens = item.split(',');
    console.log('item after split:', itens)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.ValorUnit = itens[0];
    this.QuantidadeemEntrada = itens[1];
    this.Unidadementrada = itens[2];
    this.id = itens[3];
    console.log('item after split:', this.id)
    this.TipodeEntrada = itens[4];
    console.log('tipo selected:', this.TipodeEntrada)
  }
  MostraDadosTipo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Get_Alim_Info',
      'formValues': CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAlimentacao', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)

      if (resultado.success) {
        this.b = JSON.parse(resultado.results);
      }
    });
  }
  CriacaoNovo(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    console.log('id of animals selected from show function :', this.animal);
    let animalIdsplit: any;
    animalIdsplit = this.animal;
    console.log('id of animals selected from show function :', animalIdsplit[0]);
    //for (this.value of animalIdsplit) {
    for (var i = 0; i < animalIdsplit.length; i++) {
      console.log(animalIdsplit[i]);
      form.value.CodigoAnimalAlimentacao = animalIdsplit[i];
      form.value.CodigoFazenda = CodigoFazenda;
      form.value.Codigoitem = this.id;
      form.value.racao = this.TipodeEntrada;
      console.log('vlue of racao :', form.value.racao);
      console.log('codigo animal selected :', form.value.CodigoAnimalAlimentacao);
      //form.value.racao = this.racao.TipodeEntrada;
      let params = {
        'StatusCRUD': 'Salvar_Alimentacao_Coletivo',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            //this.alertService.presentAlert({ pTitle: 'Salvando alimentação...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            //this.alertService.showLoader(resultado.message, 20);
            //this.goBack();
          }
          else {
            this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
        }
      });
    }
    this.alertService.presentAlert({ pTitle: 'Salvando alimentação...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
    this.goBack1();
  }

  calculateRowTotal() {
    console.log("unit:", this.ValorUnit);
    console.log("qtd:", this.Quantidade);
    this.valorTotal = + this.ValorUnit * +this.Quantidade
  }

}




