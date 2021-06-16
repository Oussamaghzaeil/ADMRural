import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AplicacadomedicamentoPage } from './aplicacadomedicamento.page';

const routes: Routes = [
  {
    path: '',
    component: AplicacadomedicamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AplicacadomedicamentoPage]
})
export class AplicacadomedicamentoPageModule {}
