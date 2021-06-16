import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AplicacaomedicamentoPage } from './aplicacaomedicamento.page';

const routes: Routes = [
  {
    path: '',
    component: AplicacaomedicamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AplicacaomedicamentoPage]
})
export class AplicacaomedicamentoPageModule {}
