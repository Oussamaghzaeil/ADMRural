import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaidadeestoquePage } from './saidadeestoque.page';

const routes: Routes = [
  {
    path: '',
    component: SaidadeestoquePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaidadeestoquePage]
})
export class SaidadeestoquePageModule {}
