import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewcoletivotratamentoPage } from './viewcoletivotratamento.page';

const routes: Routes = [
  {
    path: '',
    component: ViewcoletivotratamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewcoletivotratamentoPage]
})
export class ViewcoletivotratamentoPageModule {}
