import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import {FaleConoscoModel}from 'src/app/models/faleconosco.model'

@Component({
  selector: 'app-faleconosco',
  templateUrl: './faleconosco.page.html',
  styleUrls: ['./faleconosco.page.scss'],
})
export class FaleconoscoPage implements OnInit {
  public faleConosco = new FaleConoscoModel();

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private Authorizer: AuthService,
    private alertService: AlertService,) {

     }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }

  save(formFaleConosco: NgForm) {

    if (formFaleConosco.value.Comentario==null || formFaleConosco.value.Comentario.trim()=='') {
      
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Fale conosco', pMessage: 'Formulario naõ posse estar vacio' });
      return;
    }
   else{
    this.FaleConoscoCreate('Criar', formFaleConosco,null); 
  }    
}

FaleConoscoCreate(StatusCRUD: string, formFaleConosco: NgForm, Codigo: string) {


  let params = {
    'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem("SessionUser"))[0].CodigoUsuario,
    'Email': JSON.parse(sessionStorage.getItem("SessionUser"))[0].Email,
    'Hashkey': sessionStorage.getItem("SessionHashkey"),
    'StatusCRUD': StatusCRUD,
    'Codigo': (Codigo) ? Codigo : "",
    'formValues':(formFaleConosco) ? formFaleConosco.value : ""

  };

  this.Authorizer.QueryStoreProc('Executar', 'spFaleConoscoCreate', params).then(res => {
    let resultado: any = res[0];
    try {
      if (resultado.success) {

        switch (StatusCRUD) {
          case 'Criar':
            this.alertService.presentAlert({ pTitle: '', pSubtitle: '', pMessage:'Comentário enviado com sucesso' });
            this.navCtrl.navigateRoot('/menu/options/tabs/main');
            break;
          
          default:
          // code block
        }
      }
      else {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'FaleConosco', pMessage: resultado.message });
        this.navCtrl.navigateRoot('/login');
      }
    } catch (err) {
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'FaleConosco', pMessage: resultado.message });
      this.navCtrl.navigateRoot('/login');
    }
  });

}

goBack() {
  this.navCtrl.navigateRoot('/menu/options/tabs/main');
}


}
