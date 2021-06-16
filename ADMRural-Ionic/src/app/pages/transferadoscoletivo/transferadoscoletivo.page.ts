import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-transferadoscoletivo',
  templateUrl: './transferadoscoletivo.page.html',
  styleUrls: ['./transferadoscoletivo.page.scss'],
})
export class TransferadoscoletivoPage implements OnInit {
  public TipoSelected: string;
  public UnidadSelected: string;
  public SelectedLastTipo: string;
  public valorUnitario: number;
  public valorTotal: number;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    private env: EnvService,


  ) { }
  public TipoEntrada: any;
  public i: number;
  public item: any;
  public animal: any;
  public a: any;
  public ValorUnit: number;
  public id: number;
  public itemSelected: any;
  public value: string;
  public b: any;
  public Datadealimentacao: Date;
  public observacao: string;
  public NFazenda;
  public NFazenda2;
  public CodigoAnimal: number;
  public FazendaSelected: any;

  ngOnInit() {
    //console.log("ionViewDidEnter");
    this.MostraDados();
    this.getFazenda();
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
    this.navCtrl.navigateRoot('/transferanciacoletivolista');
  }
  goBack1() {
    this.navCtrl.navigateRoot('/transferanciacoletivolista');
  }

  MostraDados() {
    let CodigoFazenda = sessionStorage.getItem('CodigoFazenda')
    CodigoFazenda = atob(CodigoFazenda)
    console.log('vlue of CodigoFazenda :', CodigoFazenda);
    let params = {
      'StatusCRUD': 'Pesquisar_animais',
      'formValues': CodigoFazenda,
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.a = JSON.parse(resultado.results);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Tipo Entrada', pMessage: 'Nenhum Animal salvo' });
        }
      } catch (err) {
      }
    });

  }
  selected(ev: any) {
    console.log('event click:', ev)
    console.log('evento click:', ev.detail.value)
    this.animal = ev.detail.value;
    console.log('evento click:', this.animal)
    // this.navCtrl.navigateRoot('/novoitem',ev);
  }

  Transfer(form: NgForm) {
    let animalIdsplit: any;
    animalIdsplit = this.animal;
    console.log('id of animals selected from show function :', animalIdsplit[0]);
    for (var i = 0; i < animalIdsplit.length; i++) {
      console.log(animalIdsplit[i]);
      form.value.CodigoAnimal = animalIdsplit[i];
      form.value.CodigoFazenda = this.FazendaSelected;
      let params = {
        'StatusCRUD': 'Transfer',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey"),
      };
      this.Authorizer.QueryStoreProc('Executar', 'spColetivo', params).then(res => {
        let resultado: any = res[0];
        console.log("resultado", resultado)
        try {
          if (resultado.success) {

          }
          else {
            this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.APP_NAME, pSubtitle: 'Animal', pMessage: 'Não pode transferir Animal' });

        }

      });
    }
    this.alertService.presentAlert({ pTitle: 'Salvando alimentação...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
    this.goBack1();
  }

  getFazenda() {
    let dataFazenda = {
      'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'PesquisarFazenda'
    };
    this.Authorizer.QueryStoreProc('Executar', 'spAnimal', dataFazenda).then(res => {
      let resultado: any = res[0];

      try {
        if (resultado.success) {
          this.NFazenda = JSON.parse(resultado.results);
          console.log("NFazenda: ", this.NFazenda)

        }
        else {

        }
      } catch (err) {

      }
    });
  }
  onChangeFazenda(FazendaSelected: String) {
    console.log('selected fazenda:', FazendaSelected);

  }

}





