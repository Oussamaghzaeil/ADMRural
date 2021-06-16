import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaidaestoqueanimaistransfPage } from './saidaestoqueanimaistransf.page';

const routes: Routes = [
  {
    path: '',
    component: SaidaestoqueanimaistransfPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaidaestoqueanimaistransfPage]
})
export class SaidaestoqueanimaistransfPageModule {}
