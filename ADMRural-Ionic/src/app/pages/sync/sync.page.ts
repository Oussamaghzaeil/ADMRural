import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, Platform, AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { SqlStorage } from 'src/providers/sql-storage/sql-storage';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {

  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/fazenda.jpg";
  public photopath: String;
  public ishidden: boolean = true;
  public a: any;

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
    private sqlstore: SqlStorage,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateRoot('/menu/options/tabs/main');
  }

  Syncronized(){
    this.MostraFazenda();
    this.getUfs();
    this.getanimais();
    
  }

  MostraFazenda() {
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', params).then(res => {
      let resultado: any = res[0];
      //console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
          //console.log("the resulted value ==>",this.a);

          for (let i = 0; i <= this.a.length; i++) {
            this.sqlstore.saveFazenda(this.a[i]);
          }
          
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Você ainda não cadastrou um Estoque' });
        }
      } catch (err) { }
    });
    //console.log("the value after function ==>",this.a);

  }
  public ufs: any;
  getUfs() {
    let dataUfs = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'Pesquisaruf'
    };
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', dataUfs).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.ufs = JSON.parse(resultado.results);
          //console.log("Ufs: ", this.ufs)
          for (let i = 0; i <= this.ufs.length; i++) {
            this.sqlstore.saveUF(this.ufs[i]);
          }
          this.getanimais();
          
        }
        else {
        }
      } catch (err) {
      }
    });
  }

  public municipio: any;
  getMunicipio() {
    console.log("Iam here in the Municipio");

    let dataCidades = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'PesquisarMunicipio'
    };
    this.Authorizer.QueryStoreProc('Executar', 'spfaz', dataCidades).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.municipio = JSON.parse(resultado.results);
          console.log("Municipio: ", this.municipio)
          for (let i = 0; i <= this.municipio.length; i++) {
            this.sqlstore.saveMunicipio(this.municipio[i]);
          }
        }
        else {
        }
      } catch (err) {
      }
    });
  }

  public animais: any;
  getanimais() {
    let dataAnimias = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'Pesquisar_Animal',
    };
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', dataAnimias).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          this.animais = JSON.parse(resultado.results);
          console.log("Animals: ", this.animais)
          for (let i = 0; i <= this.animais.length; i++) {
            this.sqlstore.saveAnimais(this.animais[i]);
          }
        }
        else {
        }
      } catch (err) {
      }
    });
  }



  public items = [];
  mostraBairros() {
    let code = JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario;
    let sql: string = "select CodigoFazenda, NomeFazenda, ActiveFazenda, ObservacoesFazenda, UfFazenda, NomeMunicipioFazenda, EnderecoFazenda, LatitudeFazenda, LongitudeFazenda, ValorAtualFazenda, ValorInicialFazenda, ImgFazenda, CodigoUsuario";
    sql += " from tblFazendasv1";
    sql += " where CodigoUsuario =?";

    let data: any = [code];

    this.sqlstore.getQuery(sql, data).then((data) => {
      let recs = data;
      for (let i = 0; i < recs.rows.length; i++) {
        let ite = recs.rows.item(i);

        this.items.push({
          CodigoFazenda: ite.CodigoFazenda,
          CodigoUsuario: ite.CodigoUsuario,
          EnderecoFazenda: ite.EnderecoFazenda,
          ImgFazenda: ite.ImgFazenda,
          LatitudeFazenda: ite.LatitudeFazenda,
          LongitudeFazenda: ite.LongitudeFazenda,
          NomeFazenda: ite.NomeFazenda,
          NomeMunicipioFazenda: ite.NomeMunicipioFazenda,
          ObservacoesFazenda: ite.ObservacoesFazenda,
          UfFazenda: ite.UfFazenda,
          ValorAtualFazenda: ite.ValorAtualFazenda,
          ValorInicialFazenda: ite.ValorInicialFazenda

        });
      }
      console.log("the data received ==>", this.items);

      this.mostraUfs();


    }, (error) => {
      /* if(this.pesquisando==false){
        this.loading.dismiss();
        this.showAlert("Talonário", "Falha carregando a tabela de bairros. Por favor, tente novamente!");
      }
      this.pesquisando=false; */
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de Fazendas. Por favor, tente novamente!");
      console.log("Iam in the error");
    });

  }
  public items1 = [];
  mostraUfs() {
    let code = JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario;
    let sql: string = "select CodigoBaseUF, Nome, Sigla";
    sql += " from tblBaseUF";

    let data: any = [];

    this.sqlstore.getQuery(sql, data).then((data) => {
      let recs = data;
      for (let i = 0; i < recs.rows.length; i++) {
        let ite = recs.rows.item(i);

        this.items1.push({
          CodigoBaseUF: ite.CodigoBaseUF,
          Nome: ite.Nome,
          Sigla: ite.Sigla
        });
      }
      console.log("the data UF received ==>", this.items1);
      //this.mostraMunicipio();


    }, (error) => {
      /* if(this.pesquisando==false){
        this.loading.dismiss();
        this.showAlert("Talonário", "Falha carregando a tabela de bairros. Por favor, tente novamente!");
      }
      this.pesquisando=false; */
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de UF. Por favor, tente novamente!");
      console.log("Iam in the error");
    });

  }
  public items2 = [];
  mostraMunicipio() {
    let code = JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario;
    let sql: string = "select CodigoBaseMunicipio, CodigoBaseUF, Nome, Populacao, IndicadorCapital";
    sql += " from tblBaseMunicipio";

    let data: any = [];

    this.sqlstore.getQuery(sql, data).then((data) => {
      let recs = data;
      for (let i = 0; i < recs.rows.length; i++) {
        let ite = recs.rows.item(i);

        this.items2.push({
          CodigoBaseMunicipio: ite.CodigoBaseMunicipio,
          CodigoBaseUF: ite.CodigoBaseUF,
          Nome: ite.Nome,
          Populacao: ite.Populacao,
          IndicadorCapital: ite.IndicadorCapital
        });
      }
      console.log("the data Municipio received ==>", this.items2);


    }, (error) => {
      /* if(this.pesquisando==false){
        this.loading.dismiss();
        this.showAlert("Talonário", "Falha carregando a tabela de bairros. Por favor, tente novamente!");
      }
      this.pesquisando=false; */
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de Municipio. Por favor, tente novamente!");
      console.log("Iam in the error");
    });

  }

  presentAlert(titulo, conteudo) {
    const alert = this.alertCtrl.create({
      message: 'titulo',
      subHeader: 'conteudo',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

}
