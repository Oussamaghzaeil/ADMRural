import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SqlStorage } from 'src/providers/sql-storage/sql-storage';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.page.html',
  styleUrls: ['./animais.page.scss'],
})
export class AnimaisPage implements OnInit {
  public ishidden: boolean = true;
  public a: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
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
    //this.imageFileBase64 = "assets/imgs/user.jpg";
    //this.MostraDados();
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
    this.navCtrl.navigateRoot('/situacaoanimal', CodigoFazenda);
    sessionStorage.setItem("CodigoFazenda", btoa(CodigoFazenda))
  }
  goTo() {
    this.navCtrl.navigateRoot('/animaisin');
  }
  ionViewDidEnter() { }

  Check_Network() {
    if (this.network.type == 'none')
      this.mostraFazendaOffline();
    else
      this.MostraDados();
  }

  public items = [];
  mostraFazendaOffline(){
    console.log("Iam here in the offline ");
    
    //let code = JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario;
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
      /* if(this.pesquisando==false){
        this.loading.dismiss();
        this.showAlert("Talonário", "Falha carregando a tabela de bairros. Por favor, tente novamente!");
      }
      this.pesquisando=false; */
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de Fazendas. Por favor, tente novamente!");
      console.log("Iam in the error");
    });

  }
  
  presentAlert(titulo, conteudo) {
    const alert = this.alertController.create({
    message: 'titulo',
    subHeader: 'conteudo',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

  MostraDados() {
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
          this.items = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Você ainda não cadastrou um Coletivo' });
        }
      } catch (err) {
      }
    });
  }
  expandFazenda() {
    this.ishidden = !this.ishidden;
  }
}

