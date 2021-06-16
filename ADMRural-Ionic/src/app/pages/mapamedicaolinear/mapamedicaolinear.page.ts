import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpParams } from '@angular/common/http';
import { NavController, ModalController } from '@ionic/angular';
import { MapService } from 'src/app/services/map.service';
import { Router } from '@angular/router';
import leaflet from 'leaflet';
//MODELS
import { Localizacao } from "../../models/localizacao";
@Component({
  selector: 'app-mapamedicaolinear',
  templateUrl: './mapamedicaolinear.page.html',
  styleUrls: ['./mapamedicaolinear.page.scss'],
})
export class MapamedicaolinearPage implements OnInit {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private mapService: MapService,
    private alertService: AlertService,
    private Authorizer: AuthService,
  ) { }
  public map: any;
  public codigoMedicao: string;
  public mapURL: any;
  public localizacaos: Array<Localizacao> = [];
  public localizacao = new Localizacao();

  ngOnInit() {
    this.getCordinadas();
  }
  goBack() {
    //this.navCtrl.navigateRoot('/novomedicaodearea');
    this.router.navigate(['/novomedicaolinear', this.codigoMedicao]);
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
        'marker': this.localizacaos[index].customMarker,
        'color': colorMarket,
      }
    }
    //LOGIC TO MAP

    if (this.map != undefined || this.map != null) {
      console.log("Iam here with map");
      this.map.remove();
    }
   
    this.map = leaflet.map('map', {
      center: [this.localizacaos[0].latitude, this.localizacaos[0].longitude],
      zoom: 14
    });
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20,
      minZoom: 7
    }).addTo(this.map);
    var pointList: Array<any> = [];
    for (let index = 0; index < this.localizacaos.length; index++) {
      pointList.push(new leaflet.LatLng(this.localizacaos[index].latitude, this.localizacaos[index].longitude));    
    }
    var firstpolyline = new leaflet.Polyline(pointList, {
      color: 'red',
      weight: 2,
      opacity: 1.0,
      smoothFactor: 1
    });
    firstpolyline.addTo(this.map);
    //Create markerts
    let localizacaosLength = this.localizacaos.length - 1;
    var markerA: any = leaflet.marker([this.localizacaos[0].latitude, this.localizacaos[0].longitude])
                      .bindPopup(this.localizacaos[0].customMarker).addTo(this.map);
    var markerB: any = leaflet.marker([this.localizacaos[localizacaosLength].latitude, this.localizacaos[localizacaosLength].longitude])
    .bindPopup(this.localizacaos[localizacaosLength].customMarker).addTo(this.map);
    // markerB.bindPopup('FIM :').addTo(this.map);
  }



  getCordinadas() {
    
    let params = {
      'StatusCRUD': 'Pesquisar_Cordinadas_Linear',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spMedicao', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.codigoMedicao = JSON.parse(resultado.results)[0].CodigoMedicao;
          let results = JSON.parse(resultado.results);
          this.localizacaos = results.map(function callback(value) {
            let localizacao = new Localizacao();
            localizacao.latitude = value.Latitude;
            localizacao.longitude = value.Longitude;
            return localizacao;
          });
          this.CargarMapa();
          console.log('codigo medicao : ', this.codigoMedicao);
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Não fazenda' });

      }
    });
  }
}
