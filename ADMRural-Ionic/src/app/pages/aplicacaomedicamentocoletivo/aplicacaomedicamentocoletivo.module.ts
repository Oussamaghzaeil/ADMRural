import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AplicacaomedicamentocoletivoPage } from './aplicacaomedicamentocoletivo.page';

const routes: Routes = [
  {
    path: '',
    component: AplicacaomedicamentocoletivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AplicacaomedicamentocoletivoPage]
})
export class AplicacaomedicamentocoletivoPageModule {}
