import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ColaboradoresFazendaPage } from './ColaboradoresFazenda.page';

const routes: Routes = [
  {
    path: '',
    component: ColaboradoresFazendaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ColaboradoresFazendaPage]
})
export class ColaboradoresFazendaPageModule {}
