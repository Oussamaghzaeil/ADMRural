import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DespesasfazendaPage } from './despesasfazenda.page';

const routes: Routes = [
  {
    path: '',
    component: DespesasfazendaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DespesasfazendaPage]
})
export class DespesasfazendaPageModule {}
