import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-stockanimais',
  templateUrl: './stockanimais.page.html',
  styleUrls: ['./stockanimais.page.scss'],
})
export class StockanimaisPage implements OnInit {
  public imageFileBase64: any = "assets/imgs/fazenda.jpg";
  public photopath: String;
  masks: any;
  public id: number;
  public identificao: string;
  public selected: boolean = false;
  public TipoAnimal: string;
  public RacaAnimal: string;
  public SexoAnimal: string;
  public a: any;
  public animal : any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController

  ) { }

  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/tipoestoque');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/tipoestoque');
  }
  goToo(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/editanimalstok', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }
  ionViewDidEnter() { }
  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando    

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.photopath = JSON.parse(resultado.results)[0].ImgAnimal;
          let path = this.env.API_HOST + '/Rural/';
          this.imageFileBase64 = path + JSON.parse(resultado.results)[0].ImgAnimal;
          this.a = JSON.parse(resultado.results);
          for (let i = 0; i <= this.a.length; i++) {
            let b = this.a
            if (b[i].ImgAnimal) {
              b[i].ImgAnimal = path + this.a[i].ImgAnimal;
              this.a = b;
            }
            else {
              b[i].ImgAnimal = "assets/imgs/back.jpg";
              this.a = b;
            }
          }
          //this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Não há animais nesta fazenda' });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        // this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Paciente', pMessage: 'Nenhum usuário!' });
      }
    });
  }

  GetTipo1(item) {
    console.log('id of the item selected:', item)
    let itens: any;
    itens = item.split(',');
    console.log('item after split:', itens)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.id = itens[0];
    this.identificao = itens[1];
    console.log('item identificacao:', this.identificao)
    this.TipoAnimal = itens[2];
    this.SexoAnimal = itens[3];
    this.RacaAnimal = itens[4];
  }

  onChangeSituacao(Situacao: string) {
    console.log('item selected :', Situacao)
    if (Situacao != "") {
      this.selected = true;
    }
    else {
      this.selected = false;
    }
  }


}

