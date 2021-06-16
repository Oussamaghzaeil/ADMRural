import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaidaestoqueanimaisperdidosPage } from './saidaestoqueanimaisperdidos.page';

const routes: Routes = [
  {
    path: '',
    component: SaidaestoqueanimaisperdidosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaidaestoqueanimaisperdidosPage]
})
export class SaidaestoqueanimaisperdidosPageModule {}
