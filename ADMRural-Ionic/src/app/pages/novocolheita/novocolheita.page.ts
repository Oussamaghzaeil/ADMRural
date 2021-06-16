import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService, } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-novocolheita',
  templateUrl: './novocolheita.page.html',
  styleUrls: ['./novocolheita.page.scss'],
})
export class NovocolheitaPage implements OnInit {
  @ViewChild('form') form: NgForm;

  public incluirPronto: string;
  public aplicacao: boolean = true;
  public j: boolean = true;
  public dados: any;
  public dadosaplicacao: any;
  public DataTratamento: any;
  public tipotratamento: any;
  public DataTratamentofinal: any;
  public MedicamentoTratamento: any;
  public CodigoTratamento: number;
  public ValorMaquina: number;
  public MaodeObra: number;
  public OutrosCustos: number;
  public ValorTotal: number;
  public id: number;
  public DatadaPlantacao : any;
  public b : any;
  public Tipo : string;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public navController: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) { }
  calculateRowTotal() {
    console.log("qtd:", this.ValorMaquina);
    console.log("qtd:", this.MaodeObra);
    console.log("qtd:", this.OutrosCustos);
    let Maod = this.MaodeObra;
    let Outros = this.OutrosCustos
    this.ValorTotal = + this.ValorMaquina + Maod + Outros
  }
  ngOnInit() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    this.MostraDadosTipo();
    this.notify();
  }
  notify() {
    if (this.ValorMaquina == undefined || this.ValorMaquina == NaN) { this.ValorMaquina = 0; }
    if (this.MaodeObra == undefined || this.MaodeObra == NaN) { this.MaodeObra = 0; }
    if (this.OutrosCustos == undefined || this.OutrosCustos == NaN) { this.OutrosCustos = 0; }
    if (this.ValorTotal == undefined || this.ValorTotal == NaN) { this.ValorTotal = 0; }
  }
  ionViewWillEnter() { }
  ionViewDidEnter() { }
  ionViewWillLeave() { }
  ionViewDidLeave() { }
  goBack() {
    this.navCtrl.navigateRoot('/colheitain');
  }
  Criacao(form: NgForm) {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    form.value.CodigoFazenda = atob(CodigoFazenda)
    form.value.Tipo = this.Tipo
    let params = {
      'StatusCRUD': 'Criacao_Colheita',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Novo Tratamento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spColheita', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Salvando Colheita...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          //this.alertService.showLoader(resultado.message, 1000);
          this.goBack();
        } else {
          //this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    }
    );
  }
  GetTipo1(item) {
    console.log('id of the item selected:', item)
    let itens: any;
    itens = item.split(',');
    console.log('item after split:', itens)
    // this.navCtrl.navigateRoot('/novoitem',ev);
    this.id = itens[0];
    console.log('Codigo:', this.id)
    this.Tipo = itens[1];
    console.log('tipo:', this.Tipo)
    this.DatadaPlantacao = itens[2];
    console.log('date ', this.DatadaPlantacao)
  }
  MostraDadosTipo() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Get_Tipo',
      'formValues': CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColheita', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)

      if (resultado.success) {
        this.b = JSON.parse(resultado.results);
      }
    });
  }

  //-------------------------MASK-------------------------------------//

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

  //-----------------------------MASK END---------------------------------//
}





