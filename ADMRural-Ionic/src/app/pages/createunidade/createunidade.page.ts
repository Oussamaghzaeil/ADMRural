import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-createunidade',
  templateUrl: './createunidade.page.html',
  styleUrls: ['./createunidade.page.scss'],
})
export class CreateunidadePage implements OnInit {
  public TipoUnidad: any;
  public Tipo: string;
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
    private activatedRoute: ActivatedRoute,

  ) { }
  selected(ev: any) {
    console.log('event click:', ev)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.TipoUnidad = ev;
    this.goBack();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      data => {
        console.log('tipo entrada value:', this.Tipo);
        this.Tipo = data.TipoSelected;
      }
    )
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
    //this.navCtrl.navigateRoot('/novoitem', this.TipoEntrada);

    // this.navCtrl.push('/novoitem', this.TipoEntrada)
    this.router.navigate(['/novoitem', this.Tipo, this.TipoUnidad]);
  }
  goBack1() {
    this.navCtrl.navigateRoot('/novoitem');
  }
  goToCriar() {
    this.navCtrl.navigateRoot('/novounidad');
  }
  FilterJSONData(ev: any) {
    console.log('event search bar:', ev.target.value)
    let search = ev.target.value;
    let params = {
      'StatusCRUD': 'Pesquisar_UnidadSearch',
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
      'StatusCRUD': 'Pesquisar_unidad',
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
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: resultado.message });
        }
      } catch (err) {

      }
    });
  }
}




