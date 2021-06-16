import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewmedicamentoPage } from './viewmedicamento.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmedicamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewmedicamentoPage]
})
export class ViewmedicamentoPageModule {}
