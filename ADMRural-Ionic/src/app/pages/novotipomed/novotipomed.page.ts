import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-novotipomed',
  templateUrl: './novotipomed.page.html',
  styleUrls: ['./novotipomed.page.scss'],
})
export class NovotipomedPage implements OnInit {
  public TipoEntrada: any;
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
  selected(ev: any) {
    console.log('event click:', ev)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.TipoEntrada = ev;
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
    this.router.navigate(['/novoitemmed', this.TipoEntrada]);
  }
  goBack1() {
    this.navCtrl.navigateRoot('/novoitemmed');
  }
  goToCriar() {
    this.navCtrl.navigateRoot('/criartipomed');
  }
  FilterJSONData(ev: any) {
    console.log('event search bar:', ev.target.value)
    let search = ev.target.value;
    let params = {
      'StatusCRUD': 'Pesquisar_search_med',
      'formValues': search,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
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
    let params = {
      'StatusCRUD': 'Pesquisar_med',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
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
}




