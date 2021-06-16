import { Component, OnInit } from '@angular/core';
import { NavController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-tipoestoquesaida',
  templateUrl: './tipoestoquesaida.page.html',
  styleUrls: ['./tipoestoquesaida.page.scss'],
})
export class TipoestoquesaidaPage implements OnInit {


  constructor(
    private navCtrl: NavController,
    private platform: Platform,
   
    ) { }

  

  goBack() {
    this.navCtrl.navigateRoot('/saidadeestoque');
  }



  ngOnInit() {
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/saidadeestoque');
    })
    
  }
  goToAnim(){
    this.navCtrl.navigateRoot('/saidaestoqueanimais');
    }

  goToAlim(){
    this.navCtrl.navigateRoot('/saidastockali');
    }
  
    goToMed(){
      this.navCtrl.navigateRoot('/saidastockmedicamento');
    }

  goToOtro(){
    this.navCtrl.navigateRoot('/saidastockoutro');
  }
}

