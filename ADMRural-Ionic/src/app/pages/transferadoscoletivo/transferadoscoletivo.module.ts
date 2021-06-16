import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransferadoscoletivoPage } from './transferadoscoletivo.page';

const routes: Routes = [
  {
    path: '',
    component: TransferadoscoletivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransferadoscoletivoPage]
})
export class TransferadoscoletivoPageModule {}
