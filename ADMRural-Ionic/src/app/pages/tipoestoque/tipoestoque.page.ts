import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tipoestoque',
  templateUrl: './tipoestoque.page.html',
  styleUrls: ['./tipoestoque.page.scss'],
})
export class TipoestoquePage implements OnInit {


  constructor(
    private navCtrl: NavController,
    private platform: Platform,

  ) { }
  goBack() {
    this.navCtrl.navigateRoot('/entradaestoque');
  }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/entradaestoque');
    })

  }
  goToAnim() {
    this.navCtrl.navigateRoot('/stockanimais');
  }

  goToAlim() {
    this.navCtrl.navigateRoot('/stockalim');
  }

  goToMed() {
    this.navCtrl.navigateRoot('/medicamento');
  }

  goToOtro() {
    this.navCtrl.navigateRoot('/stock');
  }
}
