import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StockfinalizadoalimPage } from './stockfinalizadoalim.page';

const routes: Routes = [
  {
    path: '',
    component: StockfinalizadoalimPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockfinalizadoalimPage]
})
export class StockfinalizadoalimPageModule {}
