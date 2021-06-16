import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaidastockmedicamentoPage } from './saidastockmedicamento.page';

const routes: Routes = [
  {
    path: '',
    component: SaidastockmedicamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaidastockmedicamentoPage]
})
export class SaidastockmedicamentoPageModule {}
