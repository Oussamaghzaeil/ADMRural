import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EntradaestoquePage } from './entradaestoque.page';

const routes: Routes = [
  {
    path: '',
    component: EntradaestoquePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntradaestoquePage]
})
export class EntradaestoquePageModule {}
