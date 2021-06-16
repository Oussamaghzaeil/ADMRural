import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaidaestoqueanimaisvendidosPage } from './saidaestoqueanimaisvendidos.page';

const routes: Routes = [
  {
    path: '',
    component: SaidaestoqueanimaisvendidosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaidaestoqueanimaisvendidosPage]
})
export class SaidaestoqueanimaisvendidosPageModule {}
