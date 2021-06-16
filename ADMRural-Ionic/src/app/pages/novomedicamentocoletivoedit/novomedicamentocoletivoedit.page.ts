import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService, } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-novomedicamentocoletivoedit',
  templateUrl: './novomedicamentocoletivoedit.page.html',
  styleUrls: ['./novomedicamentocoletivoedit.page.scss'],
})
export class NovomedicamentocoletivoeditPage implements OnInit {
  public Datainicio: Date;
  public doses: number;
  public repitir: number = 1;
  public days: number;
  public Datafim: any;
  public Datainicial: any;
  public CodigoTratamentoCol: any;
  public CodigoTratamentoColetivo: any;
  public CodigoTratamento: number;
  public codigoanimal: string;
  public medicacao : any;
  public carencia :any;
  constructor(private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public platform: Platform ) { }
  ngOnInit() {
    this.CodigoTratamentoCol = sessionStorage.getItem('Codigoitem');
    this.CodigoTratamentoColetivo = atob(this.CodigoTratamentoCol);
    console.log('id of tratamento coletivo :', this.CodigoTratamentoColetivo);
    this.notify();
    this.platform.backButton.subscribe(() => {
      this.goBack();
    })
  }
  notify() {
    if (this.Datafim == undefined || this.Datafim == NaN) { this.Datafim = 0; }
  }
  goBack() {
    this.navCtrl.navigateRoot('/viewcoletivotratamento');
  }
  addDays() {
    this.days = this.doses * this.repitir;
    var Datafim = new Date(this.Datainicio);
    Datafim.setDate(Datafim.getDate() + this.days);
    console.log('the last date :', Datafim);
    this.Datafim = Datafim.getDate() + '/' + (Datafim.getMonth() + 1) + '/' + Datafim.getFullYear();
    console.log('the last date :', this.Datafim);
  }
  Criacao(form: NgForm) {
    
    form.value.CodigoTratamento = this.CodigoTratamentoColetivo;
    let params = {
      'StatusCRUD': 'Criacao_medicamento',
      'formValues': form.value,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log("Novo medicamento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        if (resultado.success) {
          // this.alertService.presentAlert({ pTitle: 'Salvando Medicamento...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          // this.alertService.showLoader(resultado.message, 1000);
          this.goBack();
        } else {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    }
    );
  }




}
