

import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
const STORAGE_KEY = 'my_images';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { SqlStorage } from 'src/providers/sql-storage/sql-storage';

@Component({
  selector: 'app-fazenda',
  templateUrl: './fazenda.page.html',
  styleUrls: ['./fazenda.page.scss'],
})
export class FazendaPage implements OnInit {
  @ViewChild('inputcamera') cameraInput: ElementRef;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/fazenda.jpg";
  public photopath: String;
  public ishidden: boolean = true;
  public a: any;

  public perfil: number;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    public alertCtrl: AlertController,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private sqlstore: SqlStorage,
    private network: Network
  ) { }

  ngOnInit() {
     this.perfil =  JSON.parse(sessionStorage.getItem("SessionUser"))[0].perfil;
    this.Check_Network();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }
  goBack() {
    this.navCtrl.navigateRoot('/menu/options/tabs/main');
  }
  goToo(CodigoFazenda) {
    console.log("Codigo fazenda", CodigoFazenda);
    this.navCtrl.navigateRoot('/editfazenda', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }
  goTo() {
    this.navCtrl.navigateRoot('/createfazenda');
  }
  ionViewDidEnter() {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    this.imageFile = null;
    element.onchange = () => {
      // Depois colocar um loading aqui!!!     
      const reader = new FileReader();
      reader.onload = (r: any) => {
        //THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
        //THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
        //UP TO YOU, NOT REALLY BOTHERED
        let base64 = r.target.result as string;
        this.imageFileBase64 = r.target.result as string; //MEU JC
     
      };
      reader.readAsDataURL(element.files[0]);
      this.imageCroquiExtension = element.files[0].type;
      this.imageFile = element.files[0];
    };
  }
  //delete(form: NgForm)
  async cancelar(CodigoFazenda) {
    console.log(CodigoFazenda)
    const alert = await this.alertController.create({
      header: 'Excluindo Fazenda...',
      message: 'Deseja excluir o Fazenda?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIM',
          handler: async () => {
            console.log('Confirm Ok');
            console.log('aaa', CodigoFazenda)
            this.delete(CodigoFazenda);
            await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }

  //delete(form: NgForm)
  delete(CodigoFazenda) {
    console.log(CodigoFazenda)
    //create form 
    let myForm: FormGroup;
    // ------ NEW FORM WITH EDIT DATA
    myForm = this.formBuilder.group({
      CodigoFazenda: CodigoFazenda
    });
    let params = {
      'StatusCRUD': 'Deletefazenda',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spfaz", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Excluindo Fazenda..', pSubtitle: '', pMessage: 'Fazenda excluído com sucesso!' });
          this.MostraDados();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este fazenda!' });
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Nenhum usuário!' });
      }
    });
    this.MostraDados();
  }
  Check_Network() {
    if (this.network.type == 'none')
      this.mostraFazendaOffline();
    else
      this.MostraDados();
  }

  public items = [];
  mostraFazendaOffline(){
    console.log("Iam here in the offline ");
        let code = 10064;
    let sql:string="select CodigoFazenda, NomeFazenda, ActiveFazenda, ObservacoesFazenda, UfFazenda, NomeMunicipioFazenda, EnderecoFazenda, LatitudeFazenda, LongitudeFazenda, ValorAtualFazenda, ValorInicialFazenda, ImgFazenda, CodigoUsuario";
    sql += " from tblFazendasv1";
    sql += " where CodigoUsuario =?";
    let data:any = [code];  
    this.sqlstore.getQuery(sql, data).then((data)=> {
      let recs = data;
      
      for (let i = 0; i < recs.rows.length; i++) {
        let ite = recs.rows.item(i);
        this.items.push( {
          CodigoFazenda          : ite.CodigoFazenda,
          CodigoUsuario          : ite.CodigoUsuario,
          EnderecoFazenda        : ite.EnderecoFazenda,
          ImgFazenda             : "assets/imgs/fazenda.jpg",
          LatitudeFazenda        : ite.LatitudeFazenda,
          LongitudeFazenda       : ite.LongitudeFazenda,
          NomeFazenda            : ite.NomeFazenda,
          NomeMunicipioFazenda   : ite.NomeMunicipioFazenda,
          ObservacoesFazenda     : ite.ObservacoesFazenda,
          UfFazenda              : ite.UfFazenda,
          ValorAtualFazenda      : ite.ValorAtualFazenda,
          ValorInicialFazenda    : ite.ValorInicialFazenda

        });          
      }
      console.log("the data received ==>",this.items);
      
      
    }, (error)=>{      
     
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de Fazendas. Por favor, tente novamente!");
      console.log("Iam in the error");
    });

  }
  
  presentAlert(titulo, conteudo) {
    const alert = this.alertCtrl.create({
    message: 'titulo',
    subHeader: 'conteudo',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }


  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.photopath = JSON.parse(resultado.results)[0].ImgFazenda;
          let path = this.env.API_HOST + '/Rural/';
          this.imageFileBase64 = path + JSON.parse(resultado.results)[0].ImgFazenda;
          this.items = JSON.parse(resultado.results);
          for (let i = 0; i <= this.items.length; i++) {
            let b = this.items
            if (b[i].ImgFazenda) {
              b[i].ImgFazenda = path + this.items[i].ImgFazenda;
              this.items = b;
            }
            else {
              b[i].ImgFazenda = "assets/imgs/fazenda.jpg";
              this.items = b;
            }
          }
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Você ainda não cadastrou uma fazenda' });
        }
      } catch (err) {
         this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Paciente', pMessage: 'Nenhum usuário!' });
      }
    });

  }
  expandFazenda() {
    this.ishidden = !this.ishidden;
  }
}

