import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SqlStorage } from 'src/providers/sql-storage/sql-storage';
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-animaisin',
  templateUrl: './animaisin.page.html',
  styleUrls: ['./animaisin.page.scss'],
})
export class AnimaisinPage implements OnInit {
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
  public animal: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
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
  goToo(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/editanimal', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }
  ngOnInit() {
    //this.MostraDados();
    this.Check_Network();
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/situacaoanimal');
    })
  }

  Check_Network() {
    if (this.network.type == 'none')
      this.mostraAnimalOffline();
    else
      this.MostraDados();
  }

  public items = [];
  mostraAnimalOffline() {
    
    console.log("Iam here in the offline ");
    //let code = JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario;
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    let code = atob(CodigoFazenda);
console.log("The codigo Fazenda ==>",code);

    let sql: string = "select CodigoFazendaAnimal, FazendaAnimal, ImgAnimal, TipoAnimal, IdentificacaoAnimal, SexoAnimal, RacaAnimal, QtdAtualAnimal, UnidadPesoAnimal, PesoAtualAnimal, ValorAtualAnimal, HiddenAnimal, InactiveAnimal, ChangeLog, ObservacoesAnimal, Datadenascimento, Datadeaquisicao, Situacao, Dataa, Precosaida, ObservacoesAnimalvendo,Datadevendo, Transferencia, CodigoAnimalInicial, Coletivo";
    sql += " from tblAnimais";
    sql += " where CodigoFazendaAnimal =?";

    let data: any = [code];

    this.sqlstore.getQuery(sql, data).then((data) => {
      let recs = data;

      for (let i = 0; i < recs.rows.length; i++) {
        let ite = recs.rows.item(i);
        this.items.push({
          CodigoUsuario: ite.CodigoUsuario,
          CodigoFazendaAnimal: ite.CodigoFazendaAnimal,
          FazendaAnimal: ite.FazendaAnimal,
          ImgAnimal: "assets/imgs/fazenda.jpg",
          TipoAnimal: ite.TipoAnimal,
          IdentificacaoAnimal: ite.IdentificacaoAnimal,
          SexoAnimal: ite.SexoAnimal,
          RacaAnimal: ite.RacaAnimal,
          QtdAtualAnimal: ite.QtdAtualAnimal,
          UnidadPesoAnimal: ite.UnidadPesoAnimal,
          PesoAtualAnimal: ite.PesoAtualAnimal,
          ValorAtualAnimal: ite.ValorAtualAnimal,
          HiddenAnimal: ite.HiddenAnimal,
          InactiveAnimal: ite.InactiveAnimal,
          ChangeLog: ite.ChangeLog,
          ObservacoesAnimal: ite.ObservacoesAnimal,
          Datadenascimento: ite.Datadenascimento,
          Datadeaquisicao: ite.Datadeaquisicao,
          Situacao: ite.Situacao,
          Dataa: ite.Dataa,
          Precosaida: ite.Precosaida,
          ObservacoesAnimalvendo: ite.ObservacoesAnimalvendo,
          Datadevendo: ite.Datadevendo,
          Transferencia: ite.Transferencia,
          CodigoAnimalInicial: ite.CodigoAnimalInicial,
          Coletivo: ite.Coletivo


        });
      }
      console.log("the data received ==>", this.items);

    }, (error) => {
      this.presentAlert("ADM-RURAL", "Falha carregando a tabela de Animais. Por favor, tente novamente!");
      console.log("Iam in the error");
    });

  }

  presentAlert(titulo, conteudo) {
    const alert = this.alertController.create({
      message: 'titulo',
      subHeader: 'conteudo',
      buttons: ['Dismiss']
    }).then(alert => alert.present());
  }

  goBack() {
    this.navCtrl.navigateRoot('/situacaoanimal');
  }
  goTo() {
    this.navCtrl.navigateRoot('/novoanimal');
  }
  goToVacina(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/vacina', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }
  goToSell(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/selling', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }
  goToAlim(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/alimentacaoanimal', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }
  goToTrans(CodigoAnimal) {
    console.log("Codigo animal", CodigoAnimal);
    this.navCtrl.navigateRoot('/transfer', CodigoAnimal);
    sessionStorage.setItem("CodigoAnimal", btoa(CodigoAnimal))
  }
  ionViewDidEnter() { }
  async cancelar(CodigoAnimal) {
    console.log(CodigoAnimal)
    const alert = await this.alertController.create({
      header: 'Excluindo Animal...',
      message: 'Deseja excluir o Animal?',
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
            console.log('aaa', CodigoAnimal)
            this.delete(CodigoAnimal);
            await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }
  delete(CodigoAnimal) {
    console.log(CodigoAnimal)
    //create form 
    let myForm: FormGroup;
    // ------ NEW FORM WITH EDIT DATA
    myForm = this.formBuilder.group({
      CodigoAnimal: CodigoAnimal
    });
    let params = {
      'StatusCRUD': 'Deleteanimal',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spAnimal", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Excluindo Animal..', pSubtitle: '', pMessage: 'Animal excluído com sucesso!' });
          this.MostraDados();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este Animal!' });
          //this.navCtrl.navigateRoot('/login');
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Fazenda', pMessage: 'Nenhum usuário!' });
      }
    });
    this.MostraDados();
  }
  MostraDados() {
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
          this.items = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fazenda', pMessage: 'Você não tem animais cadastrados' });
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

