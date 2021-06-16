import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ColetivoopcoesPage } from './coletivoopcoes.page';

const routes: Routes = [
  {
    path: '',
    component: ColetivoopcoesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ColetivoopcoesPage]
})
export class ColetivoopcoesPageModule {}
