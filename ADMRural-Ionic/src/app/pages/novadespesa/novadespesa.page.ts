import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-novadespesa',
  templateUrl: './novadespesa.page.html',
  styleUrls: ['./novadespesa.page.scss'],
})
export class NovadespesaPage implements OnInit {

  public CodigoFazenda: any;
  public NomeFazenda: any;

  public CodigoDespesa: any;
  public opcao: any;

  public classesDespesa: any;
  public ClasseSelected:any;

  public CodigoClasseDespesa: any;
  public NomeClasseDespesa: any;
  public CodigoTipoDespesa: any;
  public DataDespesa: any;
  public HoraDespesa: any;
  public ValorDespesa: any;
  public Observacao: any;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/despesasfazenda');
    })

    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    this.CodigoFazenda = atob(CodigoFazenda)
    console.log('CodigoFazenda :', this.CodigoFazenda);

    let CodigoDespesa = sessionStorage.getItem('CodigoDespesa')
    this.CodigoDespesa = atob(CodigoDespesa)
    console.log('CodigoDespesa:', this.CodigoDespesa);

    this.MostrarNomeFazenda();
    //this.ConsulaClasse();

    if (this.CodigoDespesa) {
      this.opcao = 2;
      //console.log('information')
      this.mostrarInfoDespesa(this.CodigoDespesa);
    } else {
      this.opcao = 1;
     // console.log('new')
    }

    this.activatedRoute.params.subscribe(
      data => {
        //console.log('Classe despesa value:', this.ClasseSelected);
        if (data.ClasseDesp) {
          this.ClasseSelected = data.ClasseDesp;
          this.ConsulaClasse(this.ClasseSelected);
        }
        //console.log('Classe despesa value after:', this.ClasseSelected);
      }
    )
  }

  goBack() {
    this.navCtrl.navigateRoot('/despesasfazenda');
  }
  /* ------------------------------ SHOW THE NAME OF THE FAZENDA ---------------------------------------  */
  MostrarNomeFazenda() {
    let params = {
      'StatusCRUD': 'Pesquisar_Fazenda',
      'CodigoFazenda': this.CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      //console.log("NomeFazenda", JSON.parse(resultado.results))
      if (resultado.success) {
        this.NomeFazenda = JSON.parse(resultado.results)[0].NomeFazenda;
      }
    });
  }
  /* ------------------------------ SHOW THE NAME OF THE FAZENDA ---------------------------------------  */
  /* ---------------------------------------- SELECT CLASSE ----------------------------------------------  */
  ConsulaClasse(codClasseDesp:any) {
    let params = {
      'StatusCRUD': '',
      'CodigoClasseDespesa': codClasseDesp,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spConsultaClasseDespesa', params).then(res => {
      let resultado: any = res[0];
      //console.log("ClassesDespesa", JSON.parse(resultado.results))
      if (resultado.success) {
        this.CodigoClasseDespesa = JSON.parse(resultado.results)[0].CodigoClasseDespesa;
        this.NomeClasseDespesa = JSON.parse(resultado.results)[0].NomeClasseDespesa;
      }
    });
  }
  /* ---------------------------------------- END SELECT CLASSE ----------------------------------------------  */
  goInsertClasse() {
    this.navCtrl.navigateRoot('/novaclassedesp');
  }
  /* ------------------------------------------ NEW EXPENSE --------------------------------------------------  */
  CriacaoNovo(form: NgForm) {
    //console.log('Formulario:', form)
    let params = {
      'StatusCRUD': 'Nova_Despesa',
      'formValues': form.value,
      'CodigoFazenda': this.CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    //console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      //  console.log("Respuesa", JSON.parse(resultado.results))
      if (resultado.success) {
        this.alertService.presentAlert({ pTitle: 'Salvando Despesa...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
        //this.alertService.showLoader(resultado.message, 500);
        this.goBack();
      }
    });
  }
  /* ------------------------------------------ END NEW EXPENSE --------------------------------------------------  */
  mostrarInfoDespesa(codDespesa: any) {
    let params = {
      'StatusCRUD': 'Info_Despesa',
      'CodDespesa': codDespesa,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spCRUDDespesas', params).then(res => {
      let resultado: any = res[0];
      console.log("ClassesDespesa", JSON.parse(resultado.results))
      if (resultado.success) {
        this.CodigoClasseDespesa = (JSON.parse(resultado.results)[0].CodigoClasseDespesa).toString();
        this.NomeClasseDespesa = JSON.parse(resultado.results)[0].NomeClasseDespesa;
        this.CodigoTipoDespesa = (JSON.parse(resultado.results)[0].CodigoTipoDespesa).toString();
        this.DataDespesa = JSON.parse(resultado.results)[0].DataDespesa;
        this.HoraDespesa = JSON.parse(resultado.results)[0].HoraDespesa ;
        this.ValorDespesa = JSON.parse(resultado.results)[0].ValorDespesa;
        this.Observacao = JSON.parse(resultado.results)[0].Observacao;
      }
    });

  }


  //---------------------MASK-----------------------------------------//

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

  //--------------------END MASK-------------------------------------//

}
