import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlantacaoandamentoPage } from './plantacaoandamento.page';

const routes: Routes = [
  {
    path: '',
    component: PlantacaoandamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlantacaoandamentoPage]
})
export class PlantacaoandamentoPageModule {}
