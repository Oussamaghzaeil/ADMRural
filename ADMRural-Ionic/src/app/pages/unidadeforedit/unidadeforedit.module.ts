import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnidadeforeditPage } from './unidadeforedit.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadeforeditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnidadeforeditPage]
})
export class UnidadeforeditPageModule {}
