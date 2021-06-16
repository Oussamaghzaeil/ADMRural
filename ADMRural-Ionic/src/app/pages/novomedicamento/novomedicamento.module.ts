import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovomedicamentoPage } from './novomedicamento.page';

const routes: Routes = [
  {
    path: '',
    component: NovomedicamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovomedicamentoPage]
})
export class NovomedicamentoPageModule {}
