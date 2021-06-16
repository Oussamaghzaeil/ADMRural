import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { ValidationService } from 'src/app/services/validation.service';
import { Network } from '@ionic-native/network/ngx';
import { SqlStorage } from 'src/providers/sql-storage/sql-storage';
const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-novoanimal',
  templateUrl: './novoanimal.page.html',
  styleUrls: ['./novoanimal.page.scss'],
})
export class NovoanimalPage implements OnInit {
  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('form') form: NgForm;
  public Latitude: any;
  public Longitude: any;
  public Endereco: any;
  public numberMask: any;
  public valorInicial: any = 65444.46;
  public Valor_atual: any;
  public Valor_atual_aux: any;
  public Valor_inicial: any;
  public selectedUf: any;
  public cidades: any;
  public cidades2: any;
  public formattedValue: any;
  public selected: boolean = false;
  public Datadenascimento : Date;
  public Datadeaquisicao : Date;
  public Tipovalor: any;
  public Tipopeso :string;
  masks: any;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    private validations: ValidationService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private sqlstore: SqlStorage,
    private network: Network
  ) { }
  public initialValue: number = 1;
  public initialValueQuantidade: number = 1;
  public tipos: string[] = ["Ave", "Bovino", "Caprino", "Equino", "Ovino", "Peixe", "Suíno"];
  public unidades: string[] = ["Arroba", "Grama", "Kg", "Tonelada"];
  public AppName: String = 'ADM Rural';
  public fazendas: any;
  public fazenda: any;
  public currentIndex: any;
  public justLoad: boolean = true;
  public animais: any;
  public animais_aux: any;
  public animais2: any;
  public animais2_aux: any;
  public selectedAnimais: any;
  public selectedAnimal: any;
  public usercod: any;
  today: Date = new Date();
  public tratamentos: any;
  public selectedTratamentos: any;
  public alimentacoes: any;
  public selectedAlimentacoes: any;
  public pathimg: any;
  public quantidadeanimal: number;
  public tipovalor: string;
  public valoranimal: number;
  public PesoSelected: boolean = false;
  public tipopeso: string;
  public pesoanimal: number;
  public i: number = 0;
  ngOnInit() {
    //console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(() => {
      this.Cancelar();
      this.navCtrl.navigateRoot('/animaisin');
    })
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
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
    this.navCtrl.navigateRoot('/animaisin');
  }

  AuthCricao(form: NgForm) {
    if (this.network.type == 'none')
      this.CriacaoNovoOffline(form);
    else
      this.CriacaoNovo(form);
  }

  public items = [];
  CriacaoNovoOffline(form: NgForm) {

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)

    console.log(form.value)
    this.items.push({
      CodigoFazendaAnimal: CodigoFazenda,
      TipoAnimal: form.value.Tipo,
      IdentificacaoAnimal:form.value.Identificacao,
      path: form.value.pathimg,
      SexoAnimal: form.value.Sexo,
      RacaAnimal: form.value.Raca,
      QtdAtualAnimal: form.value.Cantidad_atual,
      UnidadPesoAnimal: form.value.Unidad,
      PesoAtualAnimal: form.value.pesoanimal,
      ValorAtualAnimal: form.value.valoranimal,
      Datadenascimento: form.value.Datadenascimento,
      Datadeaquisicao: form.value.Datadeaquisicao,
      Situacao: form.value.Situacao,
      HiddenAnimal: true,
      ObservacoesAnimal: form.value.ObservacoesAnimal
    });

    this.sqlstore.saveAnimais(this.items);

    this.alertService.presentAlert({ pTitle: 'Salvando Animais...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
    this.goBack();

    //this.navCtrl.navigateRoot('/menu/options');

  }
  

  CriacaoNovo(form: NgForm) {
    if (this.tipovalor == "unitario") {
      this.valoranimal = form.value.Valor;
    }
    else if (this.tipovalor == "total") {
      this.valoranimal = (form.value.Valor / this.quantidadeanimal);
    }
    if (this.tipopeso == "unitarioPeso") {
      this.pesoanimal = form.value.Peso;
    }
    else if (this.tipopeso == "totalPeso") {
      this.pesoanimal = (form.value.Peso / this.quantidadeanimal);
    }
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    let Quantidade = form.value.Quantidade;
    let j = form.value.Inicial;
    console.log("Quantidade: ", Quantidade)
    console.log("i: ", j)
    let i = j;
    while (i + 1 <= j + Quantidade) {
      let newAnimal = {
        CodigoFazendaAnimal: CodigoFazenda,
        TipoAnimal: form.value.Tipo,
        IdentificacaoAnimal: i + "-" + form.value.Identificacao,
        path: this.pathimg,
        SexoAnimal: form.value.Sexo,
        RacaAnimal: form.value.Raca,
        QtdAtualAnimal: form.value.Cantidad_atual,
        UnidadPesoAnimal: form.value.Unidad,
        PesoAtualAnimal: this.pesoanimal,
        ValorAtualAnimal: this.valoranimal,
        Datadenascimento: form.value.Datadenascimento,
        Datadeaquisicao: form.value.Datadeaquisicao,
        Situacao: form.value.Situacao,
        HiddenAnimal: true,
        ObservacoesAnimal: form.value.ObservacoesAnimal
      };
      console.log('newAnimal:', newAnimal)
      i = i + 1;
      console.log('value after adding one =', i)
      let dataAnimais = {
        'StatusCRUD': 'Criacao',
        'formValues': newAnimal,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      this.Authorizer.QueryStoreProc('Executar', 'spAnimal', dataAnimais).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {
            if (this.i < 1) {
              this.alertService.presentAlert({ pTitle: 'Salvando Animais...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
              //this.alertService.showLoader(resultado.message, 500);
              this.i = this.i + 1;
              console.log('value of i : ', i);
              this.goBack();
            }
          }
          else {
            this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
        }
      });

    }

  }

  //--------------------------------MAsk-----------------------------------------------//

  numberOnlyValidation(event: any, opt:number) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
      return;
    }
    let val:string = '';
    /* if(opt==1)
      val = this.quantidade;
    else if(opt==2){
      val = this.valor;
    }else if(opt==3)
      val = this.acrescimo;
    if(typeof(val)=='undefined')
      val='';
    if(val==null)
      val='';
    if(val.length==10)
      event.preventDefault(); */
  }  

  format(valString) {
    if (!valString) {
        return '';
    }
    if(typeof(valString)=='undefined')
      return '';

    //991.000.000,00
    let val:string = valString;
    val = val.replace('.','');
    val = val.replace('.','');
    val = val.replace(',','');
    val = val.trim();
    let val2 = parseFloat(val);
    val = val2.toString().trim();
    console.log("val:", val);
    if(val.length==1)
      val = '0,0' + val;
    else if(val.length==2)
      val = '0,' + val;
    else if(val.length==3){
      let par1 = val.substring(0,1);
      let par2 = val.substring(1);
      val = par1 + ',' + par2;
    }else if(val.length==4){
      let par1 = val.substring(0,2);
      let par2 = val.substring(2);
      val = par1 + ',' + par2;
    }else if(val.length==5){
      let par1 = val.substring(0,3);
      let par2 = val.substring(3);
      val = par1 + ',' + par2;
    }else if(val.length==6){
      let par1 = val.substring(0,1);
      let par2 = val.substring(1,4);
      let par3 = val.substring(4);
      val = par1 + '.' + par2 + ',' + par3;
    }else if(val.length==7){
      let par1 = val.substring(0,2);
      let par2 = val.substring(2,5);
      let par3 = val.substring(5);
      console.log("par1:", par1);
      console.log("par2:", par2);
      console.log("par3:", par3);
      val = par1 + '.' + par2 + ',' + par3;
    }else if(val.length==8){
      let par1 = val.substring(0,3);
      let par2 = val.substring(3,6);
      let par3 = val.substring(6);
      val = par1 + '.' + par2 + ',' + par3;
    }else if(val.length==9){
      let par1 = val.substring(0,1);
      let par2 = val.substring(1,4);
      let par3 = val.substring(4,7);
      let par4 = val.substring(7);
      val = par1 + '.' + par2 + '.' + par3 + ',' + par4;
    }else if(val.length==10){
      let par1 = val.substring(0,2);
      let par2 = val.substring(2,5);
      let par3 = val.substring(5,8);
      let par4 = val.substring(8);
      val = par1 + '.' + par2 + '.' + par3 + ',' + par4;
    }else if(val.length==11){
      let par1 = val.substring(0,3);
      let par2 = val.substring(3,6);
      let par3 = val.substring(6,9);
      let par4 = val.substring(9);
      val = par1 + '.' + par2 + '.' + par3 + ',' + par4;
    }

    if(val.length>14)
      val = val.substring(0,14);

    //this.calculoTotal();

    return val;
  }

  //-------------------------------END MASK-------------------------------------------//

  formatkg(valString: any, idComponent: any) {
    this.validations.formatquilo(valString, idComponent)
  }

  initialsValid() {
    const initial = this.form.value['Inicial'];
    const initialQuantidade = this.form.value['Quantidade'];
    return initial > 0 && initialQuantidade > 0
  }
  async Cancelar() {
    const alert = await this.alertController.create({
      header: 'Cancelar...',
      message: 'Tem certeza de que deseja cancelar esta operação?',
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
            this.goBack();
            //await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  onChangeSituacao(Situacao: string, form: NgForm) {
    if (Situacao == "unitario" || Situacao == "total") {
      this.selected = true;
      this.tipovalor = Situacao;
      console.log('tipo valor :', this.tipovalor);
      this.quantidadeanimal = form.value.Quantidade;
      console.log('animals :', this.quantidadeanimal);
    }
    else {
      this.selected = false;
    }
  }
  onChangeTipoPeso(Situacao: string, form: NgForm) {
    if (Situacao == "unitarioPeso" || Situacao == "totalPeso") {
      this.PesoSelected = true;
      this.tipopeso = Situacao;
      console.log('tipo peso :', this.tipopeso);
      this.quantidadeanimal = form.value.Quantidade;
      console.log('animals :', this.quantidadeanimal);
    }
    else {
      this.PesoSelected = false;
    }
  }

}
