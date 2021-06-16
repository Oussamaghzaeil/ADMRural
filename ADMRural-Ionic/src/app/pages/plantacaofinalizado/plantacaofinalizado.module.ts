import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlantacaofinalizadoPage } from './plantacaofinalizado.page';

const routes: Routes = [
  {
    path: '',
    component: PlantacaofinalizadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlantacaofinalizadoPage]
})
export class PlantacaofinalizadoPageModule {}
