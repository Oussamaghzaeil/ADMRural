import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import {  FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import {  Platform } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-unidadeforedit',
  templateUrl: './unidadeforedit.page.html',
  styleUrls: ['./unidadeforedit.page.scss'],
})
export class UnidadeforeditPage implements OnInit {







  public TipoUnidad: any;
  public Tipo: string;



  constructor(
    private router : Router,
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

    let Codigoitem = sessionStorage.getItem('Codigoitem')
    Codigoitem = atob(Codigoitem)
    console.log('vlue of Codigoitem :', Codigoitem);
    

    let params = {
      'StatusCRUD': 'Update_Unidade',
      'formValues': ev,Codigoitem,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    this.Authorizer.QueryStoreProc('Executar', 'spEstoque', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {


          this.alertService.presentAlert({ pTitle: 'Salvando Item...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          this.alertService.showLoader(resultado.message, 500);
          this.goBack();

        }


        else {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    });
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

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }

  ionViewWillLeave() {
  }

  ionViewDidLeave() {
  }


  goBack() {
   
   this.navCtrl.navigateRoot('/editandamento',);
  }

  goBack1() {
    this.navCtrl.navigateRoot('/editandamento',);

  
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
      'CodigoUsuarioSistema': 0,
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




  public a: any;
  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Pesquisar_unidad',
      'formValues': '',
      'CodigoUsuarioSistema': 0,
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




