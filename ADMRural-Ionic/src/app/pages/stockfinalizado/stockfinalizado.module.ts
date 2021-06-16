import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StockfinalizadoPage } from './stockfinalizado.page';

const routes: Routes = [
  {
    path: '',
    component: StockfinalizadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockfinalizadoPage]
})
export class StockfinalizadoPageModule {}
