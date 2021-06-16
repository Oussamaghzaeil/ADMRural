import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novotipomedsaida',
  templateUrl: './novotipomedsaida.page.html',
  styleUrls: ['./novotipomedsaida.page.scss'],
})
export class NovotipomedsaidaPage implements OnInit {
  public TipoEntrada: any;
  public tipoQty: any;
  public VlrTotal: any;
  public a: any;
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
  selected(ev: any, qty: any) {
    console.log('event click:', ev)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.TipoEntrada = ev;
    this.tipoQty = qty;
    this.goBack();
  }
  ngOnInit() {
    //console.log("ionViewDidEnter");
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.goBack1();
    })
  }
  ionViewWillEnter() { }
  ionViewDidEnter() { }
  ionViewWillLeave() {
  }
  ionViewDidLeave() {
  }
  goBack() {
    this.router.navigate(['/novaitemsaidamedicao', this.TipoEntrada, this.tipoQty]);
  }
  goBack1() {
    this.navCtrl.navigateRoot('/novaitemsaidamedicao');
  }
  FilterJSONData(ev: any) {
    console.log('event search bar:', ev.target.value)
    let search = ev.target.value;
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda');
    CodigoFazenda = atob(CodigoFazenda);
    console.log("Fazenda ==>", CodigoFazenda);
    let form = {
      'CodigoFazenda': CodigoFazenda,
      'searchData': search
    }
    let params = {
      'StatusCRUD': 'Pesquisar_search_med',
      'formValues': form,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spEstoqueSaida', params).then(res => {
      console.log("The Result ==>", res);
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
    // paramStatus: Pesquisando, Editando, Deletando 
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda');
    CodigoFazenda = atob(CodigoFazenda);
    console.log("Fazenda ==>", CodigoFazenda);
    let form = {
      'CodigoFazenda': CodigoFazenda
    }
    let params = {
      'StatusCRUD': 'Pesquisar_med',
      'formValues': form,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spEstoqueSaida', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
          console.log("The value of a ==>", this.a);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum tipo salvo' });
        }
      } catch (err) {
      }
    });

  }
}
