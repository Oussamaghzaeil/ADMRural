import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovopontosdeinteressePage } from './novopontosdeinteresse.page';

const routes: Routes = [
  {
    path: '',
    component: NovopontosdeinteressePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovopontosdeinteressePage]
})
export class NovopontosdeinteressePageModule {}
