import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovoplantacaoPage } from './novoplantacao.page';

const routes: Routes = [
  {
    path: '',
    component: NovoplantacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovoplantacaoPage]
})
export class NovoplantacaoPageModule {}
