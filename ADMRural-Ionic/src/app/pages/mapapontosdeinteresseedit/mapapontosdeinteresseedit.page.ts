import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpParams } from '@angular/common/http';
import { NavController, ModalController } from '@ionic/angular';
import { MapService } from 'src/app/services/map.service';
import { Router } from '@angular/router';
//MODELS
import { Localizacao } from "../../models/localizacao";
@Component({
  selector: 'app-mapapontosdeinteresseedit',
  templateUrl: './mapapontosdeinteresseedit.page.html',
  styleUrls: ['./mapapontosdeinteresseedit.page.scss'],
})
export class MapapontosdeinteresseeditPage implements OnInit {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private mapService: MapService,
    private alertService: AlertService,
    private Authorizer: AuthService,
  ) { }
  public codigo: string;
  public mapURL: any;
  public localizacaos: Array<Localizacao> = [];
  public localizacao = new Localizacao();

  ngOnInit() {
    this.getCordinadas();
  }
  goBack() {
    this.navCtrl.navigateRoot('/editpontosdeinteresse');
  }

  async CargarMapa() {
    let colorMarket: any;
    if (this.localizacaos.length == 0) {
      this.mapURL = "";
      this.alertService.loaderDismiss();
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: 'Sem dados a mostrar' });
      return;
    }
    let token = await this.mapService.getToken();
    for (let index = 0; index < this.localizacaos.length; index++) {
      let customMarkert =
        '<p><b>Latitude: </b>' + this.localizacaos[index].latitude + '</p>' +
        '<p style="background-color:#D3D3D3;"><b>Longitude:</b> ' + this.localizacaos[index].longitude + '</p>';
      let params = {
        'token': token,
        'latitude': this.localizacaos[index].latitude,
        'longitude': this.localizacaos[index].longitude,
        'marker': customMarkert,
        'color': colorMarket,
      }
      if (index > (this.localizacaos.length - 5)) {
        await this.mapService.setCoordenates(params);
      } else {
        this.mapService.setCoordenates(params);
      }
    }
    let params = new HttpParams()
      .set("token", token)

    this.mapURL = this.mapService.getMapaURLMassive(params);

  }



  getCordinadas() {
    let Codigoitem = sessionStorage.getItem('Codigoitem')
    console.log('vlue of codigo medicao :', atob(Codigoitem));
    this.codigo = atob(Codigoitem);
    let params = {
      'StatusCRUD': 'Pesquisar_Cordinadas_edit',
      'formValues': this.codigo,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spPontosdeInteresse', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.codigo = JSON.parse(resultado.results)[0].Codigo;
          let results = JSON.parse(resultado.results);
          this.localizacaos = results.map(function callback(value) {
            let localizacao = new Localizacao();
            localizacao.latitude = value.Latitude;
            localizacao.longitude = value.Longitude;
            return localizacao;
          });
          this.CargarMapa();
          console.log('codigo medicao : ', this.codigo);
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Não fazenda' });

      }
    });
  }
}
